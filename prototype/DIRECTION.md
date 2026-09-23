# CookInQuest 2026 — Build direction

The playable HTML prototype of `FIGMA-MAKE-SPEC-2026.md`. The spec is the authority on
content, rules and screens. This file is the authority on **how it should look and feel**,
so later build sections do not have to re-derive it.

Built in sections. Each section must be good before the next starts.

| Section | Scope | Status |
|---|---|---|
| 1 | Shell, device frame, title, map, course hub, help sheet, pause sheet | **done, verified** |
| 2 | Hunt scene (Beverage) + level complete | **done, verified** |
| 3 | Shop ladder, purchase confirm | not started |
| 4 | Prep station, plating | not started |
| 5 | Verdict, progression, save/resume | not started |
| 6 | Replicate hunt across the other 3 courses | not started |

---

## 1. The visual thesis

The 2016 original was warm, hand-made and homespun: torn paper, hand-lettered logo, a
cartoon chef in a turban, bright photographic scenes, a plain text sidebar.

The 2026 remake keeps the warmth and **inverts the value structure**. Chrome goes deep
roasted-spice dark; the photographic scene becomes the brightest thing on screen. Quiet
interface, luminous content. This is what separates a remake from a re-skin, and it is
the same move June's Journey and Hidden City make with their deep jewel-toned chrome.

Everything else follows from that one decision.

---

## 2. How the hunt scenes get modernised

The owner's call: **keep the 2016 photographic scenes**, but render them the way a
contemporary hidden-object game would. Not vector illustration, not a flat photo with tap
rectangles over it.

Modern HOG scenes are built as five authored layers. Ours maps onto that:

| Layer | Ours |
|---|---|
| 1. Background plate | The 2016 photograph, colour-graded |
| 2. Grade / atmosphere | Warm key light on midground, cooler and hazier at the edges |
| 3. Findable objects | Authored SVG objects composited in, with matched light and contact shadow |
| 4. Foreground framing | Vignette, a soft pre-blurred foreground element, depth separation |
| 5. Grain / haze | SVG `feTurbulence` noise, low opacity |

**The scene pans and zooms.** This is the single biggest modernisation. Contemporary HOGs
never fit the scene to the frame — the scene is 1.3–1.6x the viewport and the player
pinch-zooms and pans across it. That is also what rescues our source material: the 2016
JPEGs are only 1600px wide, and showing a *portion* of the image at a time keeps effective
pixel density up instead of scaling the whole thing down into softness.

### Fairness rules for findable objects
From HOG studio practice — these are what make a scene hard but never unfair:
- Objects occupy **3–8% of scene width**. Small enough to demand scanning, large enough to be unambiguous once seen.
- **40–70% visible.** Partially occluded behind another prop, never fully covered.
- Camouflage by **colour proximity**, not by hiding. A brass tin against brass shelving is fair. An invisible object is not.
- Distribute across all four quadrants and across near/mid/far depth. 2–3 in genuinely hard zones, the rest medium.
- 15 findables per scene, fixed by the spec. That sits comfortably inside the genre's 12–20.

### Feedback beats
- **Correct find:** object scales 1 → 1.15 then fades (~400ms, ease-out), leaves a faint ghost outline, 8–12 particle sparkle burst (~500ms), item row strikes through, counter ticks. All near-simultaneous so it reads as one beat.
- **Wrong tap:** localised red aura at the tap point (~200ms), a `−$2` ghost numeral rising and fading over 500ms, currency chip flashes red and shakes ±4px. Never a full-screen shake.
- **Hint:** the assisted target breathes on a slow 1.5–2s shimmer loop until found. Never an instant reveal.

---

## 3. HUD layout

Contemporary HOGs converge on a cross layout, and it survives contact with our spec:

| Position | Element |
|---|---|
| Top left | Budget chip. Currency is a status readout, so it sits top-left, never bottom. |
| Top right | Pause, 44x44 minimum |
| Bottom centre | The item list |
| Bottom right | `Hint −$20` — the right-thumb reach zone, and deliberately far from the budget chip so "spend" and "status" never blur |

**The item list is the one place research and spec disagree, and the spec wins.** Research
strongly favours a bottom ribbon of icon thumbnails over a text sidebar, because icons scan
faster in clutter and a sidebar eats 15–20% of scene width. But spec section 7 requires the
hunt to "always show the 15 real names".

Resolution: **a two-row bottom ribbon of named cards** — icon *and* real name on each card.
Bottom-anchored like a modern HOG, names intact like the spec demands, and two fixed rows
rather than a scrolling strip so nothing is ever hidden off-screen. (Scrolling ribbons are a
real, documented complaint in June's Journey reviews: players forget what they have not yet
found.)

No timer anywhere. This build is untimed by design, which is a gift — the timer is the
single biggest source of scene-covering urgency chrome in this genre, and we get to be
calmer than any of our references.

HUD chrome stays under ~12% of screen area. Floating pill chips at 90–96% opacity with a
drop shadow. Never a full-width solid bar — that is what reads as dated.

---

## 4. Liquid Glass, and where it is banned

Liquid Glass is iPadOS 26's material for the **navigation and control layer floating above
content**. Apple's own guidance is that it does not belong to content itself.

- **Allowed:** pause sheet, help sheet, modal backdrops, map and meta-screen chrome.
- **Banned:** anywhere over a hunt scene. Spec section 1 is explicit, and it is right — scene legibility outranks material fashion. Glass over a surface the player must visually search is actively hostile.

The CSS recipe lives in `css/tokens.css` as `.glass`. It degrades to opaque chrome under
`prefers-reduced-transparency`. Corner radii follow the concentric rule: a nested control's
radius equals its parent's radius minus the padding between them.

---

## 5. Non-negotiables

- **44x44pt minimum** on every control. Spec section 2, Apple HIG.
- **Dragging is never required.** Every drag interaction — prep station, plating — must also work as tap-select then tap-place. Spec section 8.
- **No colour-only meaning.** Every gauge zone, lock state and affordability state carries a text label.
- **Zero tutorial.** No coach marks, no pulsing answers, no forced first run. The normal interface explains every rule at the moment it matters. Spec section 7.
- **Every balance derives from the transaction ledger.** Never a manually assigned total. The spec is emphatic and the case study rests on it.
- **Real brand names verbatim.** Lipton, TATA, Taj Mahal, Red Label Marigold, MTR, Swad, Great Value, Tilda, Dawat.

---

## 6. Resolved gaps

**Level 2's scene was found.** It is page 48 of the 2016 prototype renders — an open-air
produce stall, densely cluttered, good hidden-object material. It never made it into
`prepped/`, which is why it read as missing.

**All four plates were re-extracted at full resolution.** The `prepped/` copies had been
downscaled to 1600px; the original page renders are 2731x2048. The four scenes now live in
`art/scene-{grocery,market,table,bakery}.jpg` at **2126x2048**, with the 2016 UI sidebar
cropped off at a measured x=605 (the sidebar is a fixed overlay at 22.1% of width, not the
~17% first assumed). Against a 1210pt frame that is a genuine 1.7x resolution gain, which is
what makes pan-and-zoom viable rather than mushy. See `art/PLATES.md`.

### Scene defects, and the decided fix

The photographs carry real-world artefacts that break the India setting:

| Scene | Defect |
|---|---|
| market | Six Spanish chalkboards priced in euros — "Tomate raf 1,29", "Judías verdes 0,99", "ZUMOS NATURALES 1€". A Barcelona-style stall standing in for an Indian one. All six cluster in the bottom 60% / right 20% of the frame. |
| grocery | A legible real shop URL and phone number on a banner. |
| table | A pizza-topped flatbread sitting among the thaali dishes. |
| bakery | Noticeably darker than the other three; an English "Turtle Tart" label clipped at the edge. |

**Decided: overlay authored Hindi/Devanagari price cards** over the Spanish signage and the
real shop URL, matched to each scene's lighting and perspective. This is the only option that
makes the scene genuinely belong in KhannaTown. It also earns its keep twice — the cards
become scene dressing and candidate findable-object cover.

Do **not** blur or paint out. Blurred patches in a hidden-object scene read as damage, and
players will tap them expecting to find something.

The bakery's exposure needs lifting toward the other three during the grade pass. The pizza
flatbread is a 2016 continuity oddity worth keeping and naming in the case study rather than
hiding — it is the kind of detail that shows the rebuild looked closely.

---

## 7. Delivery

Two targets, both required:

1. **Working build** stays at `cookinquest/prototype/` as modular files. Note that
   `/cookinquest/` is gitignored, so this is untracked scratch by design — it is where source
   material lives, not where anything ships from.
2. **A single self-contained HTML file** that can be opened and played on a real iPad —
   all CSS and JS inlined, all images base64-encoded, no external requests except the two
   Google Fonts (with a system fallback stack so it still works offline). Roughly 2.5MB.
   This is the artefact that actually gets handed around and tested on device.

A build step produces (2) from (1). Do not hand-maintain the single file.
