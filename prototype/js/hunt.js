// CookInQuest prototype — the hunt scene (section 2 of the build).
//
// Reads window.CIQ_DATA and window.CIQ_ENGINE, renders window.CIQ_SCREENS.hunt
// and window.CIQ_SCREENS.levelComplete. Never reimplements engine rules — every
// budget/find/hint/miss/completion decision is delegated to CIQ_ENGINE and this
// file only renders whatever state comes back.
//
// Consumes window.CIQ_SPRITES (item id -> {label, w, h, svg}) defensively: if
// the map or a given id is missing, a clearly-marked dev placeholder shape is
// drawn instead so the screen stays testable.
//
// This build only authors placements/regions for the beverage course (scene
// "grocery"). Selecting another course renders an honest "not built yet"
// panel instead of guessing at unbuilt content.

(function () {
  'use strict';

  var DATA = window.CIQ_DATA;
  var UI = window.CIQ_UI;

  // ==========================================================================
  // 1. HOTSPOT PLACEMENT TABLE — authored by hand against art/scene-grocery.jpg
  // (2126x2048). xPct/yPct is the BASE (bottom-centre, where the object rests
  // on a surface) of the sprite, in percent of scene width/height. `scale`
  // multiplies BASE_W_PCT (6.0% of scene width at scale 1) to land each item
  // inside the 3-8%-of-scene-width fairness band. `rotate` is degrees. `z`
  // is stacking order among sprites (also loosely encodes depth: 1 = far,
  // 5 = near). `occludePct` is the fraction of the sprite clipped away on
  // `occludeSide` to simulate sitting partly behind existing shelf/prop
  // geometry in the photograph (DIRECTION.md: "40-70% visible... never fully
  // covered" — occludePct is kept in [0.30, 0.60] so visibility always lands
  // in that band). `hard` + `why` document the 2-3 genuinely hard placements
  // per DIRECTION.md's fairness rules.
  // ==========================================================================
  var BASE_W_PCT = 6.0;

  var PLACEMENTS = {
    grocery: [
      // --- BL: easiest find. Still occluded per the blanket fairness rule,
      // but it sits at the real photographed "Milk" carton — bright, high
      // contrast, uncluttered neighbours. This is the spec's "attainable
      // object" the first-time player should stumble onto without a tutorial.
      { id: 'bev-milk', xPct: 6, yPct: 63, scale: 1.05, rotate: -3, z: 3, occludeSide: 'left', occludePct: 0.30, hard: false,
        why: 'Easy — real photographed milk carton, well lit, low clutter neighbours.' },

      // --- TR: mid shelf, pale packet among pale/beige boxes. Re-anchored
      // (defect fix) from xPct 85/occludeSide 'right' — that box sat entirely
      // inside the right cabinet's glass front, nowhere near the upright the
      // original "why" claimed it was tucked behind, so it floated in open
      // space over the glass with nothing to visually ground it. 82/'left'
      // actually straddles that upright (measured ~79.1% of scene width) and
      // 44% lands the base right on a shelf lip just below it.
      { id: 'bev-sugar', xPct: 82, yPct: 44, scale: 0.9, rotate: 2, z: 2, occludeSide: 'left', occludePct: 0.35, hard: false,
        why: 'Medium — right wall mid shelf, tucked behind the shelf upright.' },

      // --- BL: fact item, back-centre shelf, mid/far depth.
      { id: 'bev-black-tea-leaves', xPct: 44, yPct: 69, scale: 0.85, rotate: 0, z: 2, occludeSide: 'bottom', occludePct: 0.45, hard: false,
        why: 'Medium — back-centre shelf, lower edge sits behind the shelf lip in front of it.' },

      // --- BR: near/floor, warm brown against the wood-tone floor and boxes.
      { id: 'bev-fresh-ginger', xPct: 63, yPct: 88, scale: 1.0, rotate: 8, z: 4, occludeSide: 'left', occludePct: 0.40, hard: false,
        why: 'Medium — dropped on the aisle floor near the wire rack, colour-close to the wood floor.' },

      // --- TL: HARD. Far top-left corner, near the 3% floor of the size
      // band, on the deepest/highest glass shelf among a wall of similarly
      // small colourful boxes. Genuinely requires scanning the far
      // background rather than the midground the eye lands on first.
      { id: 'bev-green-cardamom-pods', xPct: 9, yPct: 8, scale: 0.5, rotate: -6, z: 1, occludeSide: 'bottom', occludePct: 0.60, hard: true,
        why: 'HARD — tiny (near the size floor), far top-left corner, highest/deepest shelf, buried in a wall of similarly small boxes.' },

      // --- BL: colour camouflage against the wooden step-ladder rack.
      { id: 'bev-cinnamon-sticks', xPct: 37, yPct: 80, scale: 0.8, rotate: 15, z: 3, occludeSide: 'top', occludePct: 0.45, hard: false,
        why: 'Medium — laid across the wooden rack; brown sticks read close to the wood tone.' },

      // --- TR: far corner, dark item among dark red boxes.
      { id: 'bev-whole-cloves', xPct: 93, yPct: 12, scale: 0.6, rotate: 0, z: 1, occludeSide: 'right', occludePct: 0.45, hard: false,
        why: 'Medium — top-right corner shelf, dark cloves against dark red packaging, far depth.' },

      // --- BR: small, low-contrast against a shadowed floor patch.
      { id: 'bev-black-peppercorns', xPct: 70, yPct: 92, scale: 0.55, rotate: 0, z: 4, occludeSide: 'bottom', occludePct: 0.55, hard: false,
        why: 'Medium — small dark peppercorns near the floor bucket shadow, close to the frame edge.' },

      // --- TL: pale pouch among the left wall's colourful mid shelf.
      { id: 'bev-fennel-seeds', xPct: 17, yPct: 36, scale: 0.75, rotate: -4, z: 2, occludeSide: 'left', occludePct: 0.40, hard: false,
        why: 'Medium — left wall mid shelf, pale pouch among similarly pale packets.' },

      // --- BR: partially behind the bottled goods on the back shelf.
      { id: 'bev-star-anise', xPct: 55, yPct: 71, scale: 0.7, rotate: 20, z: 2, occludeSide: 'top', occludePct: 0.50, hard: false,
        why: 'Medium — star-shaped pod, half hidden behind bottles on the centre back shelf.' },

      // --- BL: near floor, rounded brown item among scattered boxes.
      { id: 'bev-nutmeg', xPct: 23, yPct: 88, scale: 0.7, rotate: 0, z: 4, occludeSide: 'right', occludePct: 0.40, hard: false,
        why: 'Medium — round nutmeg among the scattered boxes on the left aisle floor.' },

      // --- TL: fact item. Green-on-green colour camouflage, far depth.
      { id: 'bev-tulsi-leaves', xPct: 31, yPct: 16, scale: 0.65, rotate: -10, z: 1, occludeSide: 'bottom', occludePct: 0.45, hard: false,
        why: 'Medium — green sprig against the green-painted back shelving, far/upper-left.' },

      // --- TR: thin threads, small scale, right wall mid shelf.
      { id: 'bev-saffron-threads', xPct: 82, yPct: 26, scale: 0.5, rotate: 5, z: 2, occludeSide: 'left', occludePct: 0.45, hard: false,
        why: 'Medium — thin red-orange threads on the right wall upper-mid shelf, small scale.' },

      // --- BL: HARD. Colour-proximity camouflage — the fairness rule's
      // textbook case: not hidden or far away, just visually identical in
      // hue to the near-identical amber jars surrounding it on the rack.
      { id: 'bev-honey-jar', xPct: 47, yPct: 69, scale: 1.1, rotate: -2, z: 3, occludeSide: 'bottom', occludePct: 0.55, hard: true,
        why: 'HARD — amber honey jar sits among the rack\'s near-identical amber spice jars; found by colour-proximity camouflage, not by size or position.' },

      // --- BR: HARD. Bottom frame edge, inside the near-foreground blur/
      // vignette band close to the checkout counter glass — forces the
      // player to search right at the edge of the frame, not just the
      // obvious midground.
      { id: 'bev-tea-strainer', xPct: 60, yPct: 97, scale: 0.75, rotate: -8, z: 5, occludeSide: 'bottom', occludePct: 0.60, hard: true,
        why: 'HARD — small silver strainer at the very bottom frame edge, partly swallowed by the near-foreground vignette/blur.' },
    ],
  };

  // ==========================================================================
  // 2. NAMED SCENERY REGIONS — for the accessible spatial search cursor.
  // A 5-column x 4-row grid over the scene (cols span 20% of width each, rows
  // span 25% of height each), authored against the same photograph. Arrow
  // keys move a cursor across this grid; Space/Enter "tests" whichever
  // unfound placement's centre falls inside the current cell (nearest first).
  // Checklist rows never do this — see buildRibbon(): they carry no handlers.
  // ==========================================================================
  var REGIONS = {
    grocery: [
      ['Far left, top glass shelf', 'Back-left ceiling shelf', 'Ceiling light and back wall', 'Back-right ceiling shelf', 'Far right, top glass shelf'],
      ['Left wall, upper shelf', 'Left-centre shelf, packaged goods', 'Back wall, centre shelves', 'Right-centre shelf, packaged goods', 'Right wall, upper shelf'],
      ['Left wall, milk and bottles', 'Centre-left shelf, jars', 'Centre rack, jars and boxes', 'Centre-right shelf, near the doorway', 'Right wall, jars and tins'],
      ['Left aisle floor, bagged goods', 'Centre rack base, lower shelf', 'Aisle floor, scattered packets', 'Right aisle floor, near the sacks', 'Right wall base, counter edge'],
    ],
  };
  var REGION_COLS = 5, REGION_ROWS = 4;

  var SCENE_NATURAL = { grocery: { w: 2126, h: 2048, file: 'art/scene-grocery.jpg' } };

  // ==========================================================================
  // 2b. SIGN OVERLAYS — authored Devanagari signage covering real-world scene
  // defects (DIRECTION.md section 6 "Scene defects, and the decided fix").
  // grocery's defect is a legible real shop URL + phone number on a banner
  // between the back shelves. Re-measured against the actual banner in
  // art/scene-grocery.jpg: the real "www.shopatsaligram.com" + phone banner
  // spans x630-1300 of the 2126px plate (~29.6-61.2%, 31.5% of scene width).
  // `coverage` below is sized to that footprint plus a slim safety margin
  // (~33-35% of scene width total) rather than the old 41%-wide box, which
  // read as a graphic pasted over the shop rather than a board hanging in
  // it — see the DIRECTION.md task note on this. Height is left at its
  // previously-tuned span, which already clears both the URL line and the
  // phone-number line beneath it with margin. This is a fresh sign authored
  // in the same painted-signboard visual language as js/sprites.js's
  // CIQ_SPRITES.priceCards (that set targets the MARKET scene's Spanish
  // chalkboards specifically, so it isn't reused as-is here), repainting the
  // same banner shape/position rather than blurring or cropping it out, per
  // the decided fix.
  // ==========================================================================
  var SIGN_OVERLAYS = {
    grocery: [
      {
        id: 'grocery-banner-cover',
        coverage: { leftPct: 28.3, rightPct: 62.7, topPct: 32.5, bottomPct: 45.5,
          note: 'Replaces the "www.shopatsaligram.com" + phone number banner (art/PLATES.md grocery defect; real banner measured at x630-1300 of 2126, i.e. 29.6-61.2%).' },
        rotate: -1,
        svg: '<svg viewBox="0 0 620 160" xmlns="http://www.w3.org/2000/svg">' +
          '<defs>' +
          '<linearGradient id="g-groc-sign-bg" x1="14" y1="14" x2="606" y2="146" gradientUnits="userSpaceOnUse">' +
          '<stop offset="0" stop-color="#D9C393"/><stop offset="1" stop-color="#B99A5E"/>' +
          '</linearGradient>' +
          '<linearGradient id="g-groc-sign-tag" x1="14" y1="14" x2="144" y2="146" gradientUnits="userSpaceOnUse">' +
          '<stop offset="0" stop-color="#B4491F"/><stop offset="1" stop-color="#7E2E10"/>' +
          '</linearGradient>' +
          '<linearGradient id="g-groc-sign-frame" x1="0" y1="0" x2="620" y2="160" gradientUnits="userSpaceOnUse">' +
          '<stop offset="0" stop-color="#9A7748"/><stop offset="1" stop-color="#54371A"/>' +
          '</linearGradient>' +
          '<radialGradient id="g-groc-sign-shadow" cx="0.5" cy="0.5" r="0.5">' +
          '<stop offset="0" stop-color="#0A0503" stop-opacity="0.68"/><stop offset="1" stop-color="#0A0503" stop-opacity="0"/>' +
          '</radialGradient>' +
          '</defs>' +
          '<g transform="rotate(-1 310 80)">' +
          '<ellipse cx="310" cy="155" rx="272" ry="15" fill="url(#g-groc-sign-shadow)"/>' +
          '<rect x="6" y="6" width="608" height="148" rx="14" fill="url(#g-groc-sign-frame)"/>' +
          '<rect x="14" y="14" width="592" height="132" rx="9" fill="url(#g-groc-sign-bg)" stroke="#00000030" stroke-width="1"/>' +
          '<rect x="14" y="14" width="130" height="132" rx="8" fill="url(#g-groc-sign-tag)"/>' +
          '<text x="79" y="68" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="28" fill="#FBEFDA" text-anchor="middle">होम</text>' +
          '<text x="79" y="102" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="20" fill="#FBEFDA" text-anchor="middle">डिलीवरी</text>' +
          '<circle cx="183" cy="80" r="26" fill="#F0A93E" stroke="#8C5A12" stroke-width="2.4"/>' +
          '<path d="M183,60 C192,66 192,80 183,88 C174,80 174,66 183,60 Z" fill="#3F7A34"/>' +
          '<path d="M183,88 L183,60" stroke="#2A5424" stroke-width="1.4" opacity="0.6"/>' +
          '<text x="404" y="98" font-family="\'Noto Sans Devanagari\', \'Mangal\', sans-serif" font-weight="700" font-size="48" fill="#1E5732" text-anchor="middle">किराना स्टोर</text>' +
          '<path d="M244,118 L578,118" stroke="#A5301A" stroke-width="3" opacity="0.55" stroke-linecap="round"/>' +
          '<path d="M22,20 L598,20" stroke="#FFFFFF" stroke-width="1" opacity="0.18"/>' +
          '</g>' +
          '</svg>',
      },
    ],
  };

  var ZOOM_MIN = 1.3, ZOOM_MAX = 2.4, ZOOM_DEFAULT = 1.45;

  // ==========================================================================
  // 3. Small helpers
  // ==========================================================================
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function getSprite(itemId) {
    var map = window.CIQ_SPRITES;
    if (map && map[itemId] && map[itemId].svg) return { w: map[itemId].w, h: map[itemId].h, svg: map[itemId].svg, placeholder: false };
    // Defensive fallback: window.CIQ_SPRITES missing entirely, or this id has
    // no entry yet. Clearly-marked dev placeholder — dashed magenta box, "?" —
    // so the scene stays testable without the other agent's file.
    var w = 100, h = 120;
    var svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="4" y="4" width="' + (w - 8) + '" height="' + (h - 8) + '" rx="14" fill="rgba(232,98,159,0.20)" stroke="#E8629F" stroke-width="3" stroke-dasharray="7 5"/>' +
      '<text x="' + (w / 2) + '" y="' + (h / 2 + 12) + '" font-family="sans-serif" font-size="34" fill="#E8629F" text-anchor="middle">?</text>' +
      '</svg>';
    return { w: w, h: h, svg: svg, placeholder: true };
  }

  function occludeClipPath(side, pct) {
    var p = Math.round(clamp(pct, 0, 0.9) * 100) + '%';
    if (side === 'top') return 'inset(' + p + ' 0 0 0)';
    if (side === 'bottom') return 'inset(0 0 ' + p + ' 0)';
    if (side === 'left') return 'inset(0 0 0 ' + p + ')';
    return 'inset(0 ' + p + ' 0 0)'; // 'right'
  }

  function factsFor(course) {
    return course.items.filter(function (i) { return i.isFact; });
  }

  // ==========================================================================
  // 4. Hunt screen — persistent mount, patched (not rebuilt) on every
  // engine 'stateChange' while the player stays on the same course. A full
  // rebuild on every tap would wipe in-flight find/miss animations and reset
  // pan/zoom, so renderHunt() only rebuilds when re-entering hunt fresh.
  // ==========================================================================
  var mounted = null; // set by build(), cleared by teardown()

  function renderHunt(ctx) {
    var state = ctx.engine.getState();
    var course = ctx.data.courses[state.course];

    if (mounted && mounted.screenEl.isConnected && mounted.courseIndex === state.course) {
      patch(ctx, state, course);
      return;
    }
    if (mounted) teardown();
    build(ctx, state, course);
  }

  function teardown() {
    if (!mounted) return;
    if (mounted.resizeHandler) window.removeEventListener('resize', mounted.resizeHandler);
    if (mounted.factTimer) window.clearTimeout(mounted.factTimer);
    mounted = null;
  }

  function build(ctx, state, course) {
    var engine = ctx.engine;
    var data = ctx.data;
    var natural = SCENE_NATURAL[course.sceneId];
    var placements = PLACEMENTS[course.sceneId];

    if (!natural || !placements) {
      var notBuilt = UI.el('div', { class: 'screen screen--placeholder hunt-not-built' }, [
        UI.el('p', { class: 'placeholder__eyebrow' }, course.name + ' · ' + course.sceneName),
        UI.el('h1', { class: 'placeholder__title' }, 'This hunt ships in a later pass'),
        UI.el('p', { class: 'placeholder__body' }, 'Section 2 authors placements for the Beverage course only. ' + course.name + ' reuses the same template later.'),
        UI.el('button', {
          type: 'button', class: 'btn btn--primary btn--large',
          onClick: function () { if (engine.debug) engine.debug.setState({ route: 'courseHub' }); },
        }, 'Back to Course Hub'),
      ]);
      UI.mount(ctx.root, notBuilt);
      mounted = { screenEl: notBuilt, courseIndex: state.course, resizeHandler: null, factTimer: null };
      return;
    }

    var reviewMode = (state.foundItemIds[state.course] || []).length >= 15;

    // ---- viewport / world -------------------------------------------------
    var worldEl = UI.el('div', { class: 'hunt-world' });
    var bgImg = UI.el('img', { class: 'hunt-world__bg', src: natural.file, alt: '', draggable: 'false' });
    worldEl.appendChild(bgImg);

    // ---- sign overlays (defect cover, see SIGN_OVERLAYS above) ------------
    (SIGN_OVERLAYS[course.sceneId] || []).forEach(function (sign) {
      var wPct = sign.coverage.rightPct - sign.coverage.leftPct;
      var hPct = sign.coverage.bottomPct - sign.coverage.topPct;
      var signWrap = UI.el('div', {
        class: 'hunt-sign-overlay',
        style: 'left:' + sign.coverage.leftPct + '%; top:' + sign.coverage.topPct + '%; width:' + wPct + '%; height:' + hPct + '%;',
        'aria-hidden': 'true',
      });
      signWrap.innerHTML = sign.svg;
      worldEl.appendChild(signWrap);
    });

    var cursorEl = UI.el('div', { class: 'hunt-spatial-cursor', 'aria-hidden': 'true', hidden: true });
    worldEl.appendChild(cursorEl);

    var viewportEl = UI.el('div', {
      class: 'hunt-viewport',
      tabindex: '0',
      role: 'group',
      'aria-roledescription': 'hidden object search area',
      'aria-label': course.sceneName + ' hunt scene. Drag, pinch or use arrow keys to move the search cursor across named areas of the scene, and press Space or Enter to search the current area. Tap or click directly on the scene also searches that spot.',
    }, [worldEl]);

    var atmosphereEl = UI.el('div', { class: 'hunt-atmosphere', 'aria-hidden': 'true' }, [
      UI.el('div', { class: 'hunt-atmosphere__grade' }),
      UI.el('div', { class: 'hunt-atmosphere__vignette' }),
      UI.el('div', { class: 'hunt-atmosphere__foreground' }),
      UI.el('div', { class: 'hunt-atmosphere__grain' }),
    ]);

    // ---- hotspots -----------------------------------------------------------
    var hotspotEls = {};
    placements.forEach(function (p) {
      var item = course.items.filter(function (i) { return i.id === p.id; })[0];
      if (!item) return;
      var sprite = getSprite(p.id);
      var wPct = BASE_W_PCT * p.scale;
      var pxWidth = (wPct / 100) * natural.w;
      var aspect = sprite.h / sprite.w;
      var pxHeight = pxWidth * aspect;
      var hPct = (pxHeight / natural.h) * 100;
      var left = p.xPct - wPct / 2;
      var top = p.yPct - hPct;

      var spriteWrap = UI.el('div', {
        class: 'hunt-hotspot__sprite',
        style: 'transform: rotate(' + p.rotate + 'deg); clip-path: ' + occludeClipPath(p.occludeSide, p.occludePct) + ';',
      });
      spriteWrap.innerHTML = sprite.svg;

      var hotspot = UI.el('div', {
        class: 'hunt-hotspot' + (sprite.placeholder ? ' hunt-hotspot--placeholder' : ''),
        style: 'left:' + left + '%; top:' + top + '%; width:' + wPct + '%; height:' + hPct + '%; z-index:' + (20 + p.z) + ';',
        'data-item-id': p.id,
        // Scene depth (1 = far, 5 = near), from PLACEMENTS' own z field —
        // drives the near/far blur band in css/hunt.css so composited
        // sprites pick up the same depth falloff as the photograph instead
        // of every sprite rendering uniformly, artificially sharp.
        'data-depth': p.z,
        // Excluded from the accessibility tree on purpose (spec section 8):
        // the accessible path to a find is the named-region spatial cursor
        // below, not swipe-discoverable hotspots — otherwise VoiceOver would
        // turn into a free answer list instead of preserving the search.
        'aria-hidden': 'true',
        title: sprite.placeholder ? item.name + ' (placeholder sprite)' : undefined,
      }, [spriteWrap]);

      worldEl.appendChild(hotspot);
      hotspotEls[p.id] = hotspot;
    });

    // ---- HUD ------------------------------------------------------------
    var hudEl = UI.el('div', { class: 'hunt-hud' });

    var budgetValueEl = UI.el('span', { class: 'chip__value hunt-status__budget-value', style: 'font-variant-numeric: tabular-nums;' }, '$' + state.budget);
    var foundValueEl = UI.el('span', { class: 'hunt-status__found-value' }, (state.foundItemIds[state.course] || []).length + '/15');
    var statusEl = UI.el('div', { class: 'hunt-status' }, [
      UI.el('div', { class: 'chip hunt-status__budget' }, [
        UI.el('span', { class: 'chip__label' }, 'Budget'),
        budgetValueEl,
      ]),
      UI.el('div', { class: 'chip hunt-status__meta' }, [
        UI.el('span', { class: 'hunt-status__found' }, ['Found ', foundValueEl]),
        UI.el('span', { class: 'hunt-status__miss' }, 'Miss −$' + data.meta.missPenalty),
      ]),
    ]);

    var contrastLevels = [1, 1.18, 1.35];
    var contrastLabels = ['Normal', 'High', 'Higher'];
    var contrastIdx = 0;
    var contrastBtn = UI.el('button', {
      type: 'button', class: 'btn btn--chip hunt-toolbar__btn',
      'aria-label': 'Scene contrast: ' + contrastLabels[contrastIdx] + '. Tap to change.',
      onClick: function () {
        contrastIdx = (contrastIdx + 1) % contrastLevels.length;
        bgImg.style.filter = 'saturate(1.05) sepia(0.08) brightness(1.02) contrast(' + contrastLevels[contrastIdx] + ')';
        contrastBtn.setAttribute('aria-label', 'Scene contrast: ' + contrastLabels[contrastIdx] + '. Tap to change.');
        contrastBtn.textContent = 'Contrast: ' + contrastLabels[contrastIdx];
        UI.announce('Scene contrast ' + contrastLabels[contrastIdx]);
      },
    }, 'Contrast: Normal');

    var factsToggleBtn = UI.el('button', {
      type: 'button', class: 'btn btn--chip hunt-toolbar__btn',
      onClick: function () { toggleFactsPanel(); },
    }, 'Facts (' + state.factsUnlocked.length + ')');

    var pauseBtn = UI.el('button', {
      type: 'button', class: 'btn btn--chip hunt-toolbar__btn',
      'aria-label': 'Pause',
      onClick: function () { engine.tapPause(); },
    }, 'Pause');

    var toolbarEl = UI.el('div', { class: 'hunt-toolbar' }, [factsToggleBtn, contrastBtn, pauseBtn]);

    // ---- ribbon (two fixed rows, references only — see spec section 8) ----
    var cardEls = {};
    var rowTop = UI.el('div', { class: 'hunt-ribbon__row' });
    var rowBottom = UI.el('div', { class: 'hunt-ribbon__row' });
    course.items.forEach(function (item, i) {
      var sprite = getSprite(item.id);
      var iconWrap = UI.el('span', { class: 'hunt-card__icon', 'aria-hidden': 'true' });
      iconWrap.innerHTML = sprite.svg;
      var card = UI.el('div', { class: 'hunt-card', role: 'listitem' }, [
        iconWrap,
        UI.el('span', { class: 'hunt-card__name' }, item.name),
      ]);
      cardEls[item.id] = card;
      (i < 8 ? rowTop : rowBottom).appendChild(card);
    });
    var ribbonEl = UI.el('div', { class: 'hunt-ribbon', role: 'list', 'aria-label': course.dish + ' items to find, references only' }, [rowTop, rowBottom]);

    // ---- hint button --------------------------------------------------------
    var hintBtn = UI.el('button', {
      type: 'button', class: 'btn btn--primary hunt-hint-btn',
      onClick: function () {
        if (reviewMode) return;
        var ok = engine.requestHint();
        if (ok && mounted && mounted.screenEl.isConnected) {
          var st = engine.getState();
          UI.announce('Hint used. ' + (data.courses[st.course].items.filter(function (i) { return i.id === st.activeHintItemId; })[0] || {}).name + ' is shimmering somewhere in the scene.');
        }
      },
    }, 'Hint −$' + data.meta.hintCost);

    // ---- fact strip + facts panel -------------------------------------------
    var factStripEl = UI.el('div', { class: 'hunt-fact-strip', hidden: true, role: 'status', 'aria-live': 'polite' });
    // Opaque chrome, not .glass — DIRECTION.md section 4 bans Liquid Glass
    // (or any translucent material) over a hunt scene; this panel floats
    // directly over the searchable photo, so it gets the same solid pill
    // chrome as the rest of the HUD instead.
    var factsPanelEl = UI.el('div', { class: 'hunt-facts-panel', hidden: true, role: 'region', 'aria-label': 'Facts log' });

    hudEl.appendChild(statusEl);
    hudEl.appendChild(toolbarEl);
    hudEl.appendChild(ribbonEl);
    hudEl.appendChild(hintBtn);
    hudEl.appendChild(factStripEl);
    hudEl.appendChild(factsPanelEl);

    var screenEl = UI.el('div', { class: 'screen hunt-screen' + (reviewMode ? ' hunt-screen--review' : '') }, [viewportEl, atmosphereEl, hudEl]);
    UI.mount(ctx.root, screenEl);

    mounted = {
      screenEl: screenEl,
      courseIndex: state.course,
      course: course,
      natural: natural,
      viewportEl: viewportEl,
      worldEl: worldEl,
      cursorEl: cursorEl,
      hotspotEls: hotspotEls,
      cardEls: cardEls,
      budgetValueEl: budgetValueEl,
      foundValueEl: foundValueEl,
      hintBtn: hintBtn,
      factsToggleBtn: factsToggleBtn,
      factStripEl: factStripEl,
      factsPanelEl: factsPanelEl,
      factsPanelOpen: false,
      lastBudget: state.budget,
      reviewMode: reviewMode,
      resizeHandler: null,
      factTimer: null,
      stripPinned: false,
      regionCursor: { row: 1, col: 2 },
      engine: engine,
      data: data,
    };

    function toggleFactsPanel() {
      // Defect fix: the log has nothing to show until the first fact is
      // unlocked. Rather than opening onto an empty message floating over
      // the scene, treat the toggle as a no-op until there is content.
      if (!mounted.factsPanelOpen && engine.getState().factsUnlocked.length === 0) {
        UI.announce('No facts unlocked yet. Find an ingredient marked with a leaf to learn something about it.');
        return;
      }
      mounted.factsPanelOpen = !mounted.factsPanelOpen;
      renderFactsPanel();
    }
    mounted.toggleFactsPanel = toggleFactsPanel;

    function renderFactsPanel() {
      UI.clear(factsPanelEl);
      factsPanelEl.hidden = !mounted.factsPanelOpen;
      if (!mounted.factsPanelOpen) return;
      var st = engine.getState();
      var closeBtn = UI.el('button', {
        type: 'button', class: 'btn btn--chip hunt-facts-panel__close', 'aria-label': 'Close facts log',
        onClick: function () { mounted.factsPanelOpen = false; renderFactsPanel(); },
      }, 'Close');
      var list = UI.el('div', { class: 'hunt-facts-panel__list' });
      if (st.factsUnlocked.length === 0) {
        list.appendChild(UI.el('p', { class: 'hunt-facts-panel__empty' }, 'Find an ingredient marked with a leaf to learn something about it.'));
      } else {
        st.factsUnlocked.forEach(function (id) {
          var f = data.facts[id];
          if (!f) return;
          list.appendChild(UI.el('div', { class: 'hunt-facts-panel__entry' }, [
            UI.el('p', { class: 'hunt-facts-panel__entry-title' }, f.title),
            UI.el('p', { class: 'hunt-facts-panel__entry-body' }, f.body),
          ]));
        });
      }
      factsPanelEl.appendChild(UI.el('h2', { class: 'hunt-facts-panel__title' }, 'Facts log'));
      factsPanelEl.appendChild(closeBtn);
      factsPanelEl.appendChild(list);
    }

    // ---- pan / zoom viewport controller -----------------------------------
    var vp = createViewport(viewportEl, worldEl, natural, cursorEl);
    mounted.vp = vp;
    mounted.resizeHandler = function () { vp.refresh(); positionCursor(); };
    window.addEventListener('resize', mounted.resizeHandler);
    vp.centerOn(50, 55);

    // ---- pointer tap-to-find (drag vs tap disambiguated inside vp) --------
    vp.onTap(function (screenX, screenY, targetEl) {
      if (mounted.reviewMode) return;
      var hotEl = targetEl && targetEl.closest ? targetEl.closest('.hunt-hotspot') : null;
      var itemId = null;
      if (hotEl && hotEl.dataset.found !== 'true') itemId = hotEl.dataset.itemId;
      attemptTap(itemId || '__scenery__', screenX, screenY, hotEl);
    });

    // ---- keyboard: spatial cursor (also IS the "arrow keys pan too" path) --
    function positionCursor() {
      var row = mounted.regionCursor.row, col = mounted.regionCursor.col;
      cursorEl.style.left = (col * (100 / REGION_COLS)) + '%';
      cursorEl.style.top = (row * (100 / REGION_ROWS)) + '%';
      cursorEl.style.width = (100 / REGION_COLS) + '%';
      cursorEl.style.height = (100 / REGION_ROWS) + '%';
    }
    positionCursor();

    viewportEl.addEventListener('focus', function () { cursorEl.hidden = false; });
    viewportEl.addEventListener('blur', function () { cursorEl.hidden = true; });

    viewportEl.addEventListener('keydown', function (e) {
      if (mounted.reviewMode && e.key !== 'Tab') { /* still allow pan/look in review mode */ }
      var key = e.key;
      var moved = false;
      var rc = mounted.regionCursor;
      if (key === 'ArrowRight' || key === 'd' || key === 'D') { rc.col = clamp(rc.col + 1, 0, REGION_COLS - 1); moved = true; }
      else if (key === 'ArrowLeft' || key === 'a' || key === 'A') { rc.col = clamp(rc.col - 1, 0, REGION_COLS - 1); moved = true; }
      else if (key === 'ArrowDown' || key === 's' || key === 'S') { rc.row = clamp(rc.row + 1, 0, REGION_ROWS - 1); moved = true; }
      else if (key === 'ArrowUp' || key === 'w' || key === 'W') { rc.row = clamp(rc.row - 1, 0, REGION_ROWS - 1); moved = true; }
      else if (key === '+' || key === '=') { vp.zoomBy(1.15); e.preventDefault(); return; }
      else if (key === '-' || key === '_') { vp.zoomBy(1 / 1.15); e.preventDefault(); return; }
      else if (key === ' ' || key === 'Enter') {
        e.preventDefault();
        testCurrentRegion();
        return;
      } else {
        return;
      }
      e.preventDefault();
      if (moved) {
        positionCursor();
        var cx = (rc.col + 0.5) * (100 / REGION_COLS);
        var cy = (rc.row + 0.5) * (100 / REGION_ROWS);
        vp.centerOn(cx, cy);
        UI.announce(REGIONS[course.sceneId][rc.row][rc.col]);
      }
    });

    function testCurrentRegion() {
      if (mounted.reviewMode) { UI.announce('This course is already complete.'); return; }
      var rc = mounted.regionCursor;
      var x0 = rc.col * (100 / REGION_COLS), x1 = x0 + 100 / REGION_COLS;
      var y0 = rc.row * (100 / REGION_ROWS), y1 = y0 + 100 / REGION_ROWS;
      var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      var st = engine.getState();
      var found = st.foundItemIds[st.course] || [];
      var best = null, bestDist = Infinity;
      placements.forEach(function (p) {
        if (found.indexOf(p.id) !== -1) return;
        if (p.xPct < x0 || p.xPct >= x1 || p.yPct < y0 || p.yPct >= y1) return;
        var d = Math.pow(p.xPct - cx, 2) + Math.pow(p.yPct - cy, 2);
        if (d < bestDist) { bestDist = d; best = p; }
      });
      var hotEl = best ? hotspotEls[best.id] : null;
      attemptTap(best ? best.id : '__scenery__', null, null, hotEl);
    }

    // ---- the one place a tap (pointer or keyboard) becomes an engine call --
    function attemptTap(itemId, screenX, screenY, hotEl) {
      var result = engine.tapItem(itemId);
      if (!mounted || !mounted.screenEl.isConnected) return; // course completed -> screen already swapped to levelComplete

      if (result.result === 'find') {
        playFindBeat(hotEl, result, course);
      } else if (result.result === 'miss') {
        playMissBeat(screenX, screenY, true);
        UI.announce('Miss. Budget now $' + engine.getState().budget + '.');
      } else if (result.result === 'locked') {
        playMissBeat(screenX, screenY, false);
      } else if (result.result === 'course-complete') {
        UI.announce('This course is already complete.');
      }
    }
    mounted.attemptTap = attemptTap;

    // ---- feedback beats -----------------------------------------------------
    function playFindBeat(hotEl, result, course) {
      var st = engine.getState();
      var item = course.items.filter(function (i) { return i.id === (hotEl && hotEl.dataset.itemId); })[0];
      var reduced = prefersReducedMotion();

      if (hotEl) {
        hotEl.dataset.found = 'true';
        if (reduced) {
          hotEl.classList.add('hunt-hotspot--found');
        } else {
          hotEl.classList.add('hunt-hotspot--finding');
          spawnParticles(hotEl);
          window.setTimeout(function () {
            if (!hotEl.isConnected) return;
            hotEl.classList.remove('hunt-hotspot--finding');
            hotEl.classList.add('hunt-hotspot--found');
          }, UI.tokenMs('--dur-find', 400));
        }
      }

      // ribbon card strike-through + collapse
      var card = item && mounted.cardEls[item.id];
      if (card) card.classList.add('hunt-card--found');

      // found counter tick
      var newFound = (st.foundItemIds[st.course] || []).length;
      foundValueEl.textContent = newFound + '/15';

      // provisional Find Bonus ghost numeral, near the budget chip
      if (result.provisionalBonus && !reduced) {
        spawnGhostNumeral(statusEl, '+$1 Find Bonus', 'mint');
      }

      // fact strip (nonblocking) + persistent facts log
      if (result.isFact && item) {
        var f = data.facts[item.id];
        if (f) showFactStrip(f);
        factsToggleBtn.textContent = 'Facts (' + st.factsUnlocked.length + ')';
        if (mounted.factsPanelOpen) renderFactsPanel();
      }

      UI.announce('Found: ' + (item ? item.name : 'item') + '. ' + newFound + ' of 15 found.');
    }

    function playMissBeat(screenX, screenY, charged) {
      var reduced = prefersReducedMotion();
      if (screenX != null && screenY != null && viewportEl.isConnected) {
        var rect = viewportEl.getBoundingClientRect();
        var lx = screenX - rect.left, ly = screenY - rect.top;
        spawnMissAura(lx, ly, charged);
        if (charged && !reduced) spawnGhostNumeralAt(lx, ly, '−$' + data.meta.missPenalty, 'chilli');
      }
      if (charged) {
        statusEl.classList.remove('hunt-status--shake');
        void statusEl.offsetWidth; // restart animation
        statusEl.classList.add('hunt-status--shake');
      }
    }

    function spawnParticles(hotEl) {
      var count = 10;
      var host = document.createElement('div');
      host.className = 'hunt-particle-host';
      host.style.left = '50%';
      host.style.top = '40%';
      for (var i = 0; i < count; i++) {
        var angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        var dist = 26 + Math.random() * 18;
        var p = document.createElement('span');
        p.className = 'hunt-particle';
        p.style.setProperty('--dx', (Math.cos(angle) * dist) + 'px');
        p.style.setProperty('--dy', (Math.sin(angle) * dist) + 'px');
        host.appendChild(p);
      }
      hotEl.appendChild(host);
      window.setTimeout(function () { if (host.parentNode) host.parentNode.removeChild(host); }, UI.tokenMs('--dur-count', 600) + 50);
    }

    function spawnGhostNumeral(anchorEl, text, tone) {
      var rect = anchorEl.getBoundingClientRect();
      spawnGhostNumeralViewportRelative(anchorEl, text, tone);
    }
    function spawnGhostNumeralViewportRelative(anchorEl, text, tone) {
      var n = document.createElement('span');
      n.className = 'hunt-ghost-numeral hunt-ghost-numeral--' + tone;
      n.textContent = text;
      anchorEl.appendChild(n);
      window.setTimeout(function () { if (n.parentNode) n.parentNode.removeChild(n); }, UI.tokenMs('--dur-count', 600) + 50);
    }
    function spawnGhostNumeralAt(x, y, text, tone) {
      var n = document.createElement('span');
      n.className = 'hunt-ghost-numeral hunt-ghost-numeral--' + tone + ' hunt-ghost-numeral--floating';
      n.style.left = x + 'px';
      n.style.top = y + 'px';
      n.textContent = text;
      viewportEl.appendChild(n);
      window.setTimeout(function () { if (n.parentNode) n.parentNode.removeChild(n); }, UI.tokenMs('--dur-count', 600) + 50);
    }
    function spawnMissAura(x, y, charged) {
      var ring = document.createElement('span');
      ring.className = 'hunt-miss-aura' + (charged ? '' : ' hunt-miss-aura--free');
      ring.style.left = x + 'px';
      ring.style.top = y + 'px';
      viewportEl.appendChild(ring);
      window.setTimeout(function () { if (ring.parentNode) ring.parentNode.removeChild(ring); }, UI.tokenMs('--dur-quick', 150) + 250);
    }

    // ---- fact strip open/collapse -------------------------------------------
    function showFactStrip(fact) {
      if (mounted.factTimer) { window.clearTimeout(mounted.factTimer); mounted.factTimer = null; }
      UI.clear(factStripEl);
      factStripEl.hidden = false;
      factStripEl.appendChild(UI.el('span', { class: 'hunt-fact-strip__badge' }, 'Fact'));
      factStripEl.appendChild(UI.el('span', { class: 'hunt-fact-strip__title' }, fact.title + ': '));
      factStripEl.appendChild(UI.el('span', { class: 'hunt-fact-strip__body' }, fact.body));
      factStripEl.appendChild(UI.el('button', {
        type: 'button', class: 'hunt-fact-strip__close', 'aria-label': 'Dismiss fact',
        onClick: function () { collapseFactStrip(); },
      }, '×'));
      factStripEl.classList.remove('hunt-fact-strip--in');
      void factStripEl.offsetWidth;
      factStripEl.classList.add('hunt-fact-strip--in');

      mounted.stripPinned = false;
      factStripEl.addEventListener('focusin', pinStrip);
      factStripEl.addEventListener('pointerenter', pinStrip);
      function pinStrip() { mounted.stripPinned = true; }

      var reduced = prefersReducedMotion();
      var delay = reduced ? 3500 : 6000;
      mounted.factTimer = window.setTimeout(function tick() {
        if (!mounted) return;
        if (mounted.stripPinned || factStripEl.matches(':hover') || factStripEl.contains(document.activeElement)) {
          mounted.factTimer = window.setTimeout(tick, 1500);
          return;
        }
        collapseFactStrip();
      }, delay);
    }
    function collapseFactStrip() {
      if (mounted.factTimer) { window.clearTimeout(mounted.factTimer); mounted.factTimer = null; }
      factStripEl.classList.remove('hunt-fact-strip--in');
      factStripEl.hidden = true;
    }

    // Initial hint shimmer / found ghosts (e.g. resuming mid-course).
    applyPersistentState(state, true);
  }

  function applyPersistentState(state, initial) {
    if (!mounted) return;
    var st = state;
    var found = st.foundItemIds[st.course] || [];
    Object.keys(mounted.hotspotEls).forEach(function (id) {
      var el = mounted.hotspotEls[id];
      var isFound = found.indexOf(id) !== -1;
      el.dataset.found = isFound ? 'true' : 'false';
      el.classList.toggle('hunt-hotspot--found', isFound);
      el.classList.toggle('hunt-hotspot--hint', !isFound && st.activeHintItemId === id);
    });
    Object.keys(mounted.cardEls).forEach(function (id) {
      mounted.cardEls[id].classList.toggle('hunt-card--found', found.indexOf(id) !== -1);
    });
  }

  function patch(ctx, state, course) {
    if (!mounted) return;
    var m = mounted;

    if (state.budget !== m.lastBudget) {
      UI.countUp(m.budgetValueEl, m.lastBudget, state.budget, { prefix: '$' });
      m.lastBudget = state.budget;
    }
    var found = state.foundItemIds[state.course] || [];
    m.foundValueEl.textContent = found.length + '/15';

    var reviewMode = found.length >= 15;
    m.reviewMode = reviewMode;
    m.screenEl.classList.toggle('hunt-screen--review', reviewMode);

    if (reviewMode) {
      m.hintBtn.textContent = 'Course complete';
      m.hintBtn.setAttribute('aria-disabled', 'true');
      m.hintBtn.disabled = true;
    } else if (state.activeHintItemId) {
      m.hintBtn.textContent = 'Hint active';
      m.hintBtn.setAttribute('aria-disabled', 'true');
      m.hintBtn.disabled = true;
    } else if (state.budget < ctx.data.meta.hintCost) {
      m.hintBtn.textContent = 'Need $' + ctx.data.meta.hintCost;
      m.hintBtn.setAttribute('aria-disabled', 'true');
      m.hintBtn.disabled = true;
    } else {
      m.hintBtn.textContent = 'Hint −$' + ctx.data.meta.hintCost;
      m.hintBtn.removeAttribute('aria-disabled');
      m.hintBtn.disabled = false;
    }

    m.factsToggleBtn.textContent = 'Facts (' + state.factsUnlocked.length + ')';

    applyPersistentState(state, false);
  }

  // ==========================================================================
  // 5. Pan / zoom viewport controller. Works purely in the viewport's own
  // logical CSS-pixel space (the .frame is scaled via `transform`, which does
  // not change clientWidth/clientHeight, so no device-scale math is needed).
  // ==========================================================================
  function createViewport(viewportEl, worldEl, natural, cursorEl) {
    var zoom = ZOOM_DEFAULT;
    var panX = 0, panY = 0;
    var coverScale = 1;

    function refreshCoverScale() {
      var w = viewportEl.clientWidth || 1, h = viewportEl.clientHeight || 1;
      coverScale = Math.max(w / natural.w, h / natural.h);
    }
    refreshCoverScale();

    function worldScale() { return zoom * coverScale; }

    function apply() {
      var scale = worldScale();
      var worldW = natural.w * scale, worldH = natural.h * scale;
      var vw = viewportEl.clientWidth, vh = viewportEl.clientHeight;
      panX = clamp(panX, Math.min(0, vw - worldW), 0);
      panY = clamp(panY, Math.min(0, vh - worldH), 0);
      worldEl.style.width = worldW + 'px';
      worldEl.style.height = worldH + 'px';
      worldEl.style.left = panX + 'px';
      worldEl.style.top = panY + 'px';
    }

    function centerOn(scenePctX, scenePctY) {
      var scale = worldScale();
      var sx = (scenePctX / 100) * natural.w * scale;
      var sy = (scenePctY / 100) * natural.h * scale;
      var vw = viewportEl.clientWidth, vh = viewportEl.clientHeight;
      panX = vw / 2 - sx;
      panY = vh / 2 - sy;
      apply();
    }

    function zoomAt(localX, localY, newZoom) {
      newZoom = clamp(newZoom, ZOOM_MIN, ZOOM_MAX);
      var oldScale = worldScale();
      var sceneX = (localX - panX) / oldScale;
      var sceneY = (localY - panY) / oldScale;
      zoom = newZoom;
      var newScale = worldScale();
      panX = localX - sceneX * newScale;
      panY = localY - sceneY * newScale;
      apply();
    }

    function zoomBy(factor) {
      var vw = viewportEl.clientWidth, vh = viewportEl.clientHeight;
      zoomAt(vw / 2, vh / 2, zoom * factor);
    }

    apply();

    // ---- pointer input: drag pan, pinch zoom, tap detection ----------------
    var pointers = {}; // id -> {x,y}
    var dragStart = null; // {x,y,panX,panY,downTarget}
    var pinchStart = null; // {dist,mid,zoom,panX,panY}
    var isDragging = false;
    var TAP_THRESHOLD = 8;
    var onTapCb = null;

    function localPoint(e) {
      var rect = viewportEl.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function pointersArray() { return Object.keys(pointers).map(function (k) { return pointers[k]; }); }
    function midpoint(a, b) { return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
    function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

    viewportEl.addEventListener('pointerdown', function (e) {
      // Guarded: setPointerCapture can throw (e.g. a pointer id the browser
      // doesn't consider active, which also happens with synthetic test
      // events) — an uncaught throw here would abort the rest of this
      // handler and silently drop the tap/drag registration below it.
      try { viewportEl.setPointerCapture && viewportEl.setPointerCapture(e.pointerId); } catch (err) { /* non-fatal */ }
      var p = localPoint(e);
      pointers[e.pointerId] = p;
      var arr = pointersArray();
      if (arr.length === 1) {
        isDragging = false;
        dragStart = { x: p.x, y: p.y, panX: panX, panY: panY, downTarget: e.target };
        pinchStart = null;
      } else if (arr.length === 2) {
        dragStart = null;
        pinchStart = { dist: dist(arr[0], arr[1]), mid: midpoint(arr[0], arr[1]), zoom: zoom, panX: panX, panY: panY };
      }
    });

    viewportEl.addEventListener('pointermove', function (e) {
      if (!(e.pointerId in pointers)) return;
      var p = localPoint(e);
      pointers[e.pointerId] = p;
      var arr = pointersArray();
      if (arr.length === 1 && dragStart) {
        var dx = p.x - dragStart.x, dy = p.y - dragStart.y;
        if (Math.hypot(dx, dy) > TAP_THRESHOLD) isDragging = true;
        panX = dragStart.panX + dx;
        panY = dragStart.panY + dy;
        apply();
        e.preventDefault();
      } else if (arr.length === 2 && pinchStart) {
        isDragging = true;
        var newDist = dist(arr[0], arr[1]);
        var newMid = midpoint(arr[0], arr[1]);
        var ratio = newDist / (pinchStart.dist || 1);
        panX = pinchStart.panX + (newMid.x - pinchStart.mid.x);
        panY = pinchStart.panY + (newMid.y - pinchStart.mid.y);
        zoomAt(newMid.x, newMid.y, pinchStart.zoom * ratio);
        e.preventDefault();
      }
    });

    function endPointer(e) {
      var wasSingle = pointersArray().length === 1 && (e.pointerId in pointers);
      var tapTarget = dragStart ? dragStart.downTarget : null;
      var wasDragging = isDragging;
      delete pointers[e.pointerId];
      var remaining = pointersArray().length;
      if (remaining === 0) {
        if (wasSingle && !wasDragging && onTapCb) {
          var rect = viewportEl.getBoundingClientRect();
          onTapCb(e.clientX, e.clientY, tapTarget);
        }
        dragStart = null;
        pinchStart = null;
        isDragging = false;
      } else if (remaining === 1) {
        // dropped from pinch back to a single finger — restart drag baseline
        var id = Object.keys(pointers)[0];
        dragStart = { x: pointers[id].x, y: pointers[id].y, panX: panX, panY: panY, downTarget: null };
        pinchStart = null;
      }
    }
    viewportEl.addEventListener('pointerup', endPointer);
    viewportEl.addEventListener('pointercancel', endPointer);

    viewportEl.addEventListener('wheel', function (e) {
      e.preventDefault();
      var p = localPoint(e);
      if (e.ctrlKey) {
        zoomAt(p.x, p.y, zoom * (1 - e.deltaY * 0.01));
      } else {
        panX -= e.deltaX;
        panY -= e.deltaY;
        apply();
      }
    }, { passive: false });

    return {
      refresh: function () { refreshCoverScale(); apply(); },
      centerOn: centerOn,
      zoomAt: zoomAt,
      zoomBy: zoomBy,
      onTap: function (cb) { onTapCb = cb; },
    };
  }

  // ==========================================================================
  // 6. Level complete — results panel. Rebuilt fresh each time it's entered
  // (no continuous interaction while here, so a persistent-mount guard isn't
  // needed the way hunt's is), staged per the task's animation sequence.
  // ==========================================================================
  function renderLevelComplete(ctx) {
    var engine = ctx.engine, data = ctx.data;
    var state = engine.getState();
    var course = data.courses[state.course];
    var reduced = prefersReducedMotion();

    var unaided = 15 - state.assistedItemIds[state.course].length;
    var bonus = state.findBonus[state.course];
    var preBonusBudget = state.budget - bonus;
    var ledger = state.transactions.filter(function (t) { return t.courseId === course.id; });

    var art = SCENE_NATURAL[course.sceneId];
    var backdrop = UI.el('div', { class: 'lc-backdrop', 'aria-hidden': 'true' },
      art ? [UI.el('img', { class: 'lc-backdrop__img', src: art.file, alt: '' })] : []);

    var titleEl = UI.el('h1', { class: 'lc-title' }, course.dish + ' complete');

    var rows = [
      { label: 'Unaided finds', value: unaided + ' / 15' },
      { label: 'Find Bonus earned', value: '+$' + bonus },
      { label: 'Hints used this course', value: String(state.assistedItemIds[state.course].length) },
    ];
    var rowsEl = UI.el('div', { class: 'lc-rows' }, rows.map(function (r, i) {
      return UI.el('div', { class: 'lc-row', style: reduced ? '' : ('animation-delay:' + (i * 100) + 'ms;') }, [
        UI.el('span', { class: 'lc-row__label' }, r.label),
        UI.el('span', { class: 'lc-row__value' }, r.value),
      ]);
    }));

    var ledgerEl = UI.el('div', { class: 'lc-ledger', style: reduced ? '' : ('animation-delay:' + (rows.length * 100) + 'ms;') }, [
      UI.el('h2', { class: 'lc-ledger__title' }, 'Ledger'),
      UI.el('div', { class: 'lc-ledger__list' }, ledger.map(function (t) {
        var sign = t.amount > 0 ? '+' : '';
        return UI.el('div', { class: 'lc-ledger__row' }, [
          UI.el('span', { class: 'lc-ledger__label' }, t.label),
          UI.el('span', { class: 'lc-ledger__amount' }, sign + '$' + t.amount),
        ]);
      })),
    ]);

    var budgetValueEl = UI.el('span', { class: 'lc-budget__value', style: 'font-variant-numeric: tabular-nums;' }, '$' + preBonusBudget);
    var budgetEl = UI.el('div', { class: 'lc-budget', style: reduced ? '' : ('animation-delay:' + ((rows.length + 1) * 100) + 'ms;') }, [
      UI.el('span', { class: 'lc-budget__label' }, 'Restaurant budget'),
      budgetValueEl,
    ]);

    var continueBtn = UI.el('button', {
      type: 'button', class: 'btn btn--primary btn--large lc-continue',
      onClick: function () { engine.continueToShop(); },
    }, 'Continue');

    var panel = UI.el('div', { class: 'lc-panel glass' }, [titleEl, rowsEl, ledgerEl, budgetEl, continueBtn]);
    var screen = UI.el('div', { class: 'screen lc-screen' }, [backdrop, panel]);
    UI.mount(ctx.root, screen);

    // Staged entrance: scene recedes -> title overshoot -> rows stagger ->
    // budget counts up -> ready for Continue.
    var panelDelay = reduced ? 0 : UI.tokenMs('--dur-panel', 300);
    window.requestAnimationFrame(function () {
      screen.classList.add('lc-screen--in');
    });
    window.setTimeout(function () {
      if (!screen.isConnected) return;
      var countDelay = reduced ? 0 : (rows.length + 2) * 100;
      window.setTimeout(function () {
        if (!screen.isConnected) return;
        UI.countUp(budgetValueEl, preBonusBudget, state.budget, { prefix: '$' });
      }, countDelay);
    }, panelDelay);

    continueBtn.focus();
  }

  window.CIQ_SCREENS = window.CIQ_SCREENS || {};
  window.CIQ_SCREENS.hunt = renderHunt;
  window.CIQ_SCREENS.levelComplete = renderLevelComplete;
})();
