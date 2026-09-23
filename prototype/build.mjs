#!/usr/bin/env node
// build.mjs — bundles the modular CookInQuest prototype into ONE
// self-contained HTML file for offline/iPad playtesting.
//
// Node 18+, zero npm dependencies (node:fs / node:path / node:url only).
// Run from the prototype directory:
//   node build.mjs
//
// Read-only on every source file. Only ever writes into dist/.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const INDEX_HTML = path.join(ROOT, 'index.html');
const DIST_DIR = path.join(ROOT, 'dist');
const OUT_FILE = path.join(DIST_DIR, 'cookinquest-2026.html');

const MIME_BY_EXT = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

const warnings = [];
/** @type {{label:string, bytes:number}[]} */
const assetSizes = [];

// ---------------------------------------------------------------------------
// Image downscaling — BUNDLE-ONLY. art/ is never written to; every image
// that ends up in dist/cookinquest-2026.html is base64 of a re-encoded copy
// living in CACHE_DIR, never the source file's own bytes. The dev/served
// build (index.html loading art/*.jpg directly) is completely untouched by
// any of this — see toDataUri() below, which is the only place that reads
// image bytes for the bundle and always routes through resolveBundleImage()
// first.
//
// Two ceilings, not one, because DIRECTION.md section 2 is explicit that the
// hunt scene's pan-and-zoom (js/hunt.js's viewport controller zooms up to
// ZOOM_MAX = 2.4x on top of a "cover" scale that is already >1 at this
// frame's aspect ratio) is *why* these plates were re-extracted at
// 2126x2048 instead of the 2016 archive's 1600px — source softness there
// shows up directly as blur in a scene the player is actively searching.
// The other three scene plates and the title screen are, today, only ever
// shown as small, pre-cropped/zoomed (220-460%) CSS backgrounds behind a
// warm grade + grain overlay (see COURSE_SCENE_ART in js/screens.js) and can
// take a materially tighter ceiling without a visible cost.
//
// HUNT_SCENE_RULES' keys are art/ basenames actively wired into a hunt
// scene's PLACEMENTS table (today: scene-grocery.jpg only — market/bakery/
// table are drawn per DIRECTION.md section 6 but not yet built as hunts per
// the section 1 status table). Move a basename here when its scene goes
// live so it keeps hunt-grade fidelity instead of the decorative default.
const CACHE_DIR = path.join(ROOT, '.build-cache', 'downscaled');
const HUNT_SCENE_RULE = { maxDim: 1600, quality: 80, reason: 'hunt scene (panned/zoomed live up to 2.4x)' };
const DECORATIVE_SCENE_RULE = { maxDim: 1000, quality: 72, reason: 'course-hub decoration only (pre-cropped/zoomed CSS background)' };
const TITLE_RULE = { maxDim: 1100, quality: 73, reason: 'full-bleed CSS `cover` background' };
const FALLBACK_RULE = { maxDim: 1280, quality: 82, reason: 'default ceiling for any other bundled photo' };
// Small circular UI badges (css/screens.css .map-node__badge is 52pt,
// .ribbon__mascot is 44pt) — the source photos are wildly oversized for a
// ~100px-physical circle even at 2x retina, so these take a much tighter
// ceiling than any of the scene photography above.
const ICON_RULE = { maxDim: 200, quality: 85, reason: 'small circular UI badge (<=52pt on screen)' };

const DOWNSCALE_RULES = {
  'scene-grocery.jpg': HUNT_SCENE_RULE,
  'scene-market.jpg': DECORATIVE_SCENE_RULE,
  'scene-bakery.jpg': DECORATIVE_SCENE_RULE,
  'scene-table.jpg': DECORATIVE_SCENE_RULE,
  'title-screen.jpg': TITLE_RULE,
  'app-icon.jpg': ICON_RULE,
  'logo-lockup.jpg': ICON_RULE,
};

/** @type {{label:string, rule:string, before:number, after:number, skipped:string|null}[]} */
const downscaleReport = [];
let sipsAvailable = null; // tri-state: null = unknown, true/false once probed

function checkSipsAvailable() {
  if (sipsAvailable !== null) return sipsAvailable;
  try {
    execFileSync('sips', ['--help'], { stdio: 'ignore' });
    sipsAvailable = true;
  } catch {
    sipsAvailable = false;
    warnings.push('macOS `sips` not found on PATH — image downscaling skipped, bundling full-resolution originals.');
  }
  return sipsAvailable;
}

function getImagePixelDims(absPath) {
  try {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', absPath], { encoding: 'utf8' });
    const w = /pixelWidth:\s*(\d+)/.exec(out);
    const h = /pixelHeight:\s*(\d+)/.exec(out);
    if (!w || !h) return null;
    return { width: Number(w[1]), height: Number(h[1]) };
  } catch {
    return null;
  }
}

function shortHash(buf, extra) {
  return crypto.createHash('sha1').update(buf).update(extra).digest('hex').slice(0, 16);
}

/**
 * Resolves absPath (a source file under art/) to the path that should
 * actually be read for the bundle: a cached, downscaled+recompressed copy
 * for large raster photos, or absPath itself unchanged for everything else
 * (SVGs, already-small images, or any failure — downscaling is a pure
 * bundle-size optimisation and must never be able to break the build).
 * Idempotent and safe to re-run: the cache filename is a hash of the source
 * file's own bytes plus the maxDim/quality it was encoded at, so an
 * unchanged source with unchanged rules always resolves to the same cache
 * file without re-invoking sips, while any edit to either automatically
 * produces a new cache entry instead of silently reusing a stale one.
 */
function resolveBundleImage(absPath, label) {
  const ext = path.extname(absPath).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') return absPath;
  if (!checkSipsAvailable()) return absPath;

  const basename = path.basename(absPath);
  const rule = DOWNSCALE_RULES[basename] || FALLBACK_RULE;

  const dims = getImagePixelDims(absPath);
  const originalBytes = fs.statSync(absPath).size;
  if (!dims) {
    warnings.push(`Downscale: could not read pixel dimensions of ${basename} — bundling original at full size.`);
    downscaleReport.push({ label, rule: rule.reason, before: originalBytes, after: originalBytes, skipped: 'dimensions unreadable' });
    return absPath;
  }

  const longEdge = Math.max(dims.width, dims.height);
  if (longEdge <= rule.maxDim) {
    // Already at or under the ceiling — sips -Z would otherwise happily
    // upscale it, which is never wanted here.
    downscaleReport.push({ label, rule: rule.reason, before: originalBytes, after: originalBytes, skipped: `already <=${rule.maxDim}px (${dims.width}x${dims.height})` });
    return absPath;
  }

  const srcBuf = readBinaryWithRetry(absPath);
  const key = shortHash(srcBuf, `Z${rule.maxDim}q${rule.quality}`);
  const cacheName = `${path.basename(basename, ext)}-${key}${ext}`;
  const cachePath = path.join(CACHE_DIR, cacheName);

  if (fs.existsSync(cachePath)) {
    downscaleReport.push({ label, rule: rule.reason, before: originalBytes, after: fs.statSync(cachePath).size, skipped: null });
    return cachePath;
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  try {
    execFileSync('sips', [
      '-Z', String(rule.maxDim),
      '-s', 'formatOptions', String(rule.quality),
      absPath,
      '--out', cachePath,
    ], { stdio: 'ignore' });
  } catch (err) {
    warnings.push(`Downscale failed for ${basename} (${err.message}) — bundling original at full size.`);
    downscaleReport.push({ label, rule: rule.reason, before: originalBytes, after: originalBytes, skipped: 'sips invocation failed' });
    return absPath;
  }

  const newBytes = fs.statSync(cachePath).size;
  if (newBytes >= originalBytes) {
    // Re-encoding didn't actually help for this particular photo (JPEG
    // re-compression at a smaller size doesn't always beat a well-tuned
    // source encode) — fall back to the original rather than bundle a
    // bigger file for a smaller image.
    downscaleReport.push({ label, rule: rule.reason, before: originalBytes, after: originalBytes, skipped: 'downscale did not reduce size' });
    return absPath;
  }

  downscaleReport.push({ label, rule: rule.reason, before: originalBytes, after: newBytes, skipped: null });
  return cachePath;
}

// ---------------------------------------------------------------------------
// Small IO helpers — retry-on-read guards against racing a concurrent editor
// that may be mid-write to a source file (see task brief: another agent is
// actively editing css/js/index.html for a design pass).
// ---------------------------------------------------------------------------

function readFileWithRetry(absPath, { retries = 5, delayMs = 120 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return fs.readFileSync(absPath, 'utf8');
    } catch (err) {
      lastErr = err;
      if (attempt < retries) {
        // Synchronous sleep — fine for a short-lived build script.
        const until = Date.now() + delayMs;
        while (Date.now() < until) { /* spin */ }
      }
    }
  }
  throw lastErr;
}

function readBinaryWithRetry(absPath, { retries = 5, delayMs = 120 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return fs.readFileSync(absPath);
    } catch (err) {
      lastErr = err;
      if (attempt < retries) {
        const until = Date.now() + delayMs;
        while (Date.now() < until) { /* spin */ }
      }
    }
  }
  throw lastErr;
}

function isLocalRef(ref) {
  if (!ref) return false;
  const trimmed = ref.trim();
  if (trimmed.startsWith('data:')) return false;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return false;
  if (trimmed.startsWith('//')) return false;
  if (trimmed.startsWith('#')) return false;
  return true;
}

function mimeFor(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  return MIME_BY_EXT[ext] || null;
}

/**
 * Resolve a local image reference to an absolute path and, if it exists,
 * return a base64 data: URI. Returns null (and records a warning) if the
 * file cannot be resolved.
 */
// Memoised by resolved absolute path: several source files can reference the
// exact same art/ asset (e.g. js/hunt.js and js/screens.js both load
// scene-grocery.jpg), and re-reading + re-downscaling + re-base64ing it for
// every occurrence is pure waste. This does NOT by itself shrink the HTML
// output — inlineJsArtPaths() below is what actually avoids embedding the
// same multi-hundred-KB string twice — but it does mean the work (and the
// "Inlined assets" report) only happens once per unique file.
const dataUriByPath = new Map();

function toDataUri(absPath, contextLabel) {
  if (dataUriByPath.has(absPath)) return dataUriByPath.get(absPath);

  const mime = mimeFor(absPath);
  if (!mime) {
    warnings.push(`Skipped ${contextLabel} — unsupported extension "${path.extname(absPath)}" (${absPath})`);
    return null;
  }
  if (!fs.existsSync(absPath) || !fs.statSync(absPath).isFile()) {
    warnings.push(`Could not resolve ${contextLabel} → ${absPath}`);
    return null;
  }
  const label = path.relative(ROOT, absPath);
  const bundlePath = resolveBundleImage(absPath, label);
  const buf = readBinaryWithRetry(bundlePath);
  const b64 = buf.toString('base64');
  const uri = `data:${mime};base64,${b64}`;
  assetSizes.push({ label, bytes: Buffer.byteLength(uri, 'utf8') });
  dataUriByPath.set(absPath, uri);
  return uri;
}

// ---------------------------------------------------------------------------
// CSS asset inlining — rewrites url(...) references to base64 data: URIs.
// Handles single quotes, double quotes, and no quotes. Leaves data: URIs
// (e.g. the inline noise-texture SVGs) untouched.
// ---------------------------------------------------------------------------

function inlineCssUrls(cssText, cssAbsDir) {
  // ONE combined pass with alternation for double-quoted / single-quoted /
  // unquoted url(...) forms. This matters because some url() values in this
  // codebase are themselves data: URIs containing an SVG whose markup has
  // its own literal "url(%23n)" text inside (an SVG filter reference, not a
  // resource to inline) nested inside the outer double-quoted value. Doing
  // three independent full-text passes (one per quote style) would let the
  // unquoted pass rescan and misfire on that inner text even after the
  // outer pass correctly left it alone. A single regex advances its
  // lastIndex past each full match, so nothing already consumed by the
  // outer (data:) match gets re-examined.
  const urlRe = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^'"()\s][^)]*))\s*\)/g;
  return cssText.replace(urlRe, (whole, dq, sq, unquoted) => {
    const ref = (dq ?? sq ?? unquoted ?? '').trim();
    if (!isLocalRef(ref)) return whole;
    const absPath = path.resolve(cssAbsDir, ref);
    const dataUri = toDataUri(absPath, `CSS url(${ref})`);
    return dataUri ? `url("${dataUri}")` : whole;
  });
}

// ---------------------------------------------------------------------------
// JS asset inlining — conservative: only rewrites string literals that
// resolve to a real file under art/ (relative to project root, matching how
// the browser would have resolved a bare "art/foo.jpg" src at runtime).
//
// Cross-script dedup: scene-grocery.jpg (and potentially other art/ files
// later) is loaded from more than one script — js/hunt.js's SCENE_NATURAL
// table and js/screens.js's COURSE_SCENE_ART both carry the literal
// "art/scene-grocery.jpg". Naively inlining each occurrence independently
// embeds the same ~650KB base64 string twice, which was a bigger chunk of
// bundle bloat than any amount of image downscaling could reasonably claw
// back on its own. Instead, the FIRST script (in document order) to
// reference a given art/ file gets a `var __CIQ_IMG_N = "data:...";`
// declaration (collected in sharedImageDecls and injected once, right after
// <body>, by buildBundle() below — before any inlined script runs); every
// later occurrence of the same file, in any script, is rewritten to the
// bare identifier __CIQ_IMG_N instead of re-embedding the string.
// ---------------------------------------------------------------------------

const sharedImageVarByPath = new Map(); // absPath -> "__CIQ_IMG_N"
const sharedImageDecls = []; // ["var __CIQ_IMG_0 = \"data:...\";", ...]

function inlineJsArtPaths(jsText, jsLabel) {
  // Match quoted string literals; test each candidate against the art/ dir.
  const literalRe = /(["'])((?:art\/|\.\.?\/)?[A-Za-z0-9_\-./]+\.(?:jpg|jpeg|png|svg|webp|gif))\1/g;
  return jsText.replace(literalRe, (whole, quote, ref) => {
    if (!isLocalRef(ref)) return whole;
    // Only touch literals that plausibly point into art/.
    if (!/(^|\/)art\//.test(ref) && !ref.startsWith('art/')) return whole;
    const absPath = path.resolve(ROOT, ref);

    const existingVar = sharedImageVarByPath.get(absPath);
    if (existingVar) return existingVar; // reuse — see dedup note above (unquoted: an identifier, not a string)

    const dataUri = toDataUri(absPath, `${jsLabel} literal "${ref}"`);
    if (!dataUri) return whole;

    const varName = `__CIQ_IMG_${sharedImageVarByPath.size}`;
    sharedImageVarByPath.set(absPath, varName);
    sharedImageDecls.push(`var ${varName} = ${JSON.stringify(dataUri)};`);
    return varName;
  });
}

// ---------------------------------------------------------------------------
// HTML <img src="..."> inlining.
// ---------------------------------------------------------------------------

function inlineHtmlImgSrcs(html) {
  const imgRe = /(<img\b[^>]*\bsrc=)(["'])([^"']+)\2/gi;
  return html.replace(imgRe, (whole, prefix, quote, ref) => {
    if (!isLocalRef(ref)) return whole;
    const absPath = path.resolve(ROOT, ref);
    const dataUri = toDataUri(absPath, `HTML <img src="${ref}">`);
    if (!dataUri) return whole;
    return `${prefix}${quote}${dataUri}${quote}`;
  });
}

// ---------------------------------------------------------------------------
// index.html tag scanning — replace local <link rel="stylesheet"> and
// <script src="..."> tags in document order, in place.
// ---------------------------------------------------------------------------

function parseAttrs(tag) {
  const attrs = {};
  const attrRe = /([a-zA-Z-]+)\s*=\s*(["'])(.*?)\2/g;
  let m;
  while ((m = attrRe.exec(tag))) {
    attrs[m[1].toLowerCase()] = m[3];
  }
  return attrs;
}

function buildBundle() {
  const html = readFileWithRetry(INDEX_HTML);

  // --- <link> tags (stylesheets) ---
  const linkTagRe = /<link\b[^>]*>/gi;
  let out = html.replace(linkTagRe, (tag) => {
    const attrs = parseAttrs(tag);
    if ((attrs.rel || '').toLowerCase() !== 'stylesheet') return tag; // keep preconnect etc as-is
    const href = attrs.href;
    if (!isLocalRef(href)) return tag; // remote Google Fonts stylesheet — keep for online font loading
    const absCssPath = path.resolve(ROOT, href);
    let cssText;
    try {
      cssText = readFileWithRetry(absCssPath);
    } catch (err) {
      warnings.push(`Could not read local stylesheet ${href} (${absCssPath}): ${err.message}`);
      return tag;
    }
    const inlined = inlineCssUrls(cssText, path.dirname(absCssPath));
    assetSizes.push({ label: href, bytes: Buffer.byteLength(inlined, 'utf8') });
    return `<style>\n/* inlined from ${href} */\n${inlined}\n</style>`;
  });

  // --- <script src="..."> tags, execution order preserved (document order) ---
  const scriptTagRe = /<script\b[^>]*\bsrc=(["'])([^"']+)\1[^>]*>\s*<\/script>/gi;
  out = out.replace(scriptTagRe, (tag, quote, src) => {
    if (!isLocalRef(src)) return tag;
    const absJsPath = path.resolve(ROOT, src);
    let jsText;
    try {
      jsText = readFileWithRetry(absJsPath);
    } catch (err) {
      warnings.push(`Could not read local script ${src} (${absJsPath}): ${err.message}`);
      return tag;
    }
    const inlined = inlineJsArtPaths(jsText, src);
    assetSizes.push({ label: src, bytes: Buffer.byteLength(inlined, 'utf8') });
    // Escape a stray "</script>" inside source (none expected, but be safe).
    const safe = inlined.replace(/<\/script>/gi, '<\\/script>');
    return `<script>\n/* inlined from ${src} */\n${safe}\n</script>`;
  });

  // --- shared-image-constant declarations (see inlineJsArtPaths' dedup note
  // above) — injected right after <body> opens so every __CIQ_IMG_N is
  // defined before any of the scripts that were just inlined (all of which
  // remain further down in <body>, in their original document order) run
  // and look it up. ---
  if (sharedImageDecls.length) {
    const declScript = `<script>\n/* shared art/ data: URIs — deduped across scripts by build.mjs, see inlineJsArtPaths() */\n${sharedImageDecls.join('\n')}\n</script>\n`;
    out = out.replace(/<body([^>]*)>/i, (m) => `${m}\n${declScript}`);
  }

  // --- <img src="..."> in the HTML itself ---
  out = inlineHtmlImgSrcs(out);

  // --- iPad hardening, injected into the OUTPUT only ---
  out = injectIpadHardening(out);

  return out;
}

// ---------------------------------------------------------------------------
// iPad hardening — only added to the bundled OUTPUT, never to source files.
// Checks for existing tags/rules first so re-running the build never
// duplicates them.
// ---------------------------------------------------------------------------

function injectIpadHardening(html) {
  let out = html;

  const metaChecks = [
    {
      test: /<meta\s+name=["']viewport["'][^>]*>/i,
      tag: '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />',
    },
    {
      test: /<meta\s+name=["']apple-mobile-web-app-capable["'][^>]*>/i,
      tag: '<meta name="apple-mobile-web-app-capable" content="yes" />',
    },
    {
      test: /<meta\s+name=["']apple-mobile-web-app-status-bar-style["'][^>]*>/i,
      tag: '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
    },
  ];

  const toInsert = [];
  for (const check of metaChecks) {
    if (check.test.test(out)) {
      // If viewport already exists, make sure it also carries user-scalable=no etc.
      // Per spec we don't rewrite existing tags — just skip adding a duplicate.
      continue;
    }
    toInsert.push(check.tag);
  }

  if (toInsert.length) {
    out = out.replace(/<\/head>/i, `  ${toInsert.join('\n  ')}\n</head>`);
  }

  // Touch-hardening CSS — only add if not already present anywhere in the doc.
  const hasTouchAction = /touch-action\s*:\s*manipulation/i.test(out);
  const hasTapHighlight = /-webkit-tap-highlight-color/i.test(out);
  const hasOverscroll = /overscroll-behavior\s*:\s*none/i.test(out);

  if (!hasTouchAction || !hasTapHighlight || !hasOverscroll) {
    const rules = [
      '/* iPad hardening — injected by build.mjs, output-only */',
      'html, body {',
      '  overscroll-behavior: none;',
      '  -webkit-tap-highlight-color: transparent;',
      '}',
      '#stage, #screen-root, #overlay-root {',
      '  overscroll-behavior: none;',
      '}',
      'button, a, input, select, textarea, label,',
      '[role="button"], [onclick], [tabindex] {',
      '  touch-action: manipulation;',
      '  -webkit-tap-highlight-color: transparent;',
      '}',
    ].join('\n');
    const styleBlock = `<style>\n${rules}\n</style>\n`;
    out = out.replace(/<\/head>/i, `${styleBlock}</head>`);
  }

  return out;
}

// ---------------------------------------------------------------------------
// Font-fallback check (report only — never edit tokens.css).
// ---------------------------------------------------------------------------

function checkFontFallbacks() {
  const tokensPath = path.join(ROOT, 'css', 'tokens.css');
  if (!fs.existsSync(tokensPath)) {
    return 'tokens.css not found — could not check font fallbacks.';
  }
  const text = readFileWithRetry(tokensPath);
  const fontVarRe = /--font-[a-z-]+\s*:\s*([^;]+);/gi;
  const findings = [];
  let m;
  while ((m = fontVarRe.exec(text))) {
    const stack = m[0];
    const hasSystemFallback = /(-apple-system|BlinkMacSystemFont|system-ui|Georgia|Segoe UI|sans-serif|serif)/i.test(m[1]);
    findings.push({ decl: stack.trim(), hasSystemFallback });
  }
  return findings;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  const bundled = buildBundle();
  fs.writeFileSync(OUT_FILE, bundled, 'utf8');

  const totalBytes = Buffer.byteLength(bundled, 'utf8');
  const fontFindings = checkFontFallbacks();

  console.log('='.repeat(72));
  console.log('CookInQuest bundle build complete');
  console.log('='.repeat(72));
  console.log(`Output:      ${path.relative(ROOT, OUT_FILE)}`);
  console.log(`Total size:  ${formatBytes(totalBytes)} (${totalBytes.toLocaleString()} bytes)`);
  console.log('');

  console.log('Image downscaling (bundle-only — art/ originals untouched; cache: ' + path.relative(ROOT, CACHE_DIR) + '):');
  if (downscaleReport.length) {
    let totalBefore = 0, totalAfter = 0;
    for (const r of downscaleReport) {
      totalBefore += r.before;
      totalAfter += r.after;
      const delta = r.before - r.after;
      const pct = r.before ? Math.round((delta / r.before) * 100) : 0;
      const change = r.skipped
        ? `unchanged (${r.skipped})`
        : `${formatBytes(r.before)} -> ${formatBytes(r.after)}  (-${formatBytes(delta)}, -${pct}%)`;
      console.log(`  ${r.label.padEnd(24)} ${change}  [${r.rule}]`);
    }
    const totalDelta = totalBefore - totalAfter;
    const totalPct = totalBefore ? Math.round((totalDelta / totalBefore) * 100) : 0;
    console.log(`  ${'TOTAL (raw, pre-base64)'.padEnd(24)} ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)}  (-${formatBytes(totalDelta)}, -${totalPct}%)`);
  } else {
    console.log('  No raster images were bundled.');
  }
  console.log('');

  console.log('Inlined assets, largest first:');
  const sorted = [...assetSizes].sort((a, b) => b.bytes - a.bytes);
  for (const { label, bytes } of sorted) {
    console.log(`  ${formatBytes(bytes).padStart(10)}  ${label}`);
  }
  console.log('');

  console.log('Font fallback check (css/tokens.css) — report only, not edited:');
  if (Array.isArray(fontFindings)) {
    for (const f of fontFindings) {
      console.log(`  ${f.hasSystemFallback ? '[OK]' : '[!!]'} ${f.decl}`);
    }
    const allOk = fontFindings.every((f) => f.hasSystemFallback);
    console.log(
      allOk
        ? '  All font stacks already carry system fallbacks — offline legibility is fine even though the Google Fonts <link> stays remote.'
        : '  WARNING: at least one font stack has no system fallback — text may be invisible offline.'
    );
  } else {
    console.log(`  ${fontFindings}`);
  }
  console.log('');

  if (warnings.length) {
    console.log('Warnings:');
    for (const w of warnings) console.log(`  - ${w}`);
  } else {
    console.log('Warnings: none — every local asset resolved.');
  }
  console.log('='.repeat(72));
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

main();
