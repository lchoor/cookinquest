# CookInQuest hidden-object scene plates

High-resolution photographic plates extracted from the 2016 prototype's full-page
renders (`cookinquest/render/proto/p-NN.jpg`, all 2731x2048), with the 2016 blue
game-UI sidebar (pause control, item checklist, "Hint $20" button, budget readout)
cropped off entirely. Source archives in `render/`, `prepped/` and `public/` were
not modified — these are new files written only into `prototype/art/`.

## Page selection

Each hunt scene recurs across several pages of the deck as the sidebar's item
checklist progressively strikes through (items found). The page chosen below is
the earliest/cleanest occurrence with zero struck-through items in the sidebar —
i.e. the state before the player has found anything.

| Scene | Course | Page chosen | Why |
|---|---|---|---|
| Indian grocery store aisle | Beverage / chai | `p-34.jpg` | Sidebar reads "Milk / Sugar / Item 3–15" with nothing struck through — the clean pre-search state. (`p-35`/`p-36` show the same scene with Milk found/struck and a popup.) |
| Open-air produce market stall | Appetizer / pakoda | `p-48.jpg` | Given by the task as known-correct; confirmed clean — sidebar "Cooking Oil / Bell Peppers / Item 3–15", nothing struck. (`p-49` shows the same scene with Cooking Oil struck and a pasted-on oil-bottle cutout.) |
| Laid Indian dinner table (thaali) | Entree / thaali | `p-62.jpg` | Clean pre-search state, sidebar "Spices / Vegetables / Item 3–15", nothing struck, budget $59. (`p-63` onward shows Spices then Vegetables struck through and found-item popups.) Note: PROTO-ASSETS.md's existing `hunt-table.jpg` asset used `p-66`, which is a later/dirtier frame from the same sequence — `p-62` is cleaner and was used here instead. |
| Bakery pastry display case | Dessert / gulab jamun | `p-76.jpg` | Clean pre-search state, sidebar "Rose Water / Item 2–15" (only one named item, an authoring gap noted elsewhere in the deck), nothing struck, budget $17. (`p-77`/`p-78` show Rose Water struck and a pasted-on rose-water-bottle cutout plus a found-item popup.) |

## Crop coordinates

The prompt's estimate of the sidebar ending near x=460 (17% of 2731) was too
narrow. Actual measurement (per-pixel RGB scan across multiple rows, in the
plain blue background band between the rounded UI boxes, looking for the
transition from sidebar-blue to photo) found the sidebar/photo boundary at a
**consistent x=602–604px** on all four source pages (it's the same fixed UI
overlay position in every 2016 screen render) — i.e. **22.1% of the 2731px
width**, not 16.8%.

Crop box used for all four (full-res source coords, 2731x2048):

```
(605, 0) → (2731, 2048)
```

x=605 was chosen with a ~2px safety margin past the measured 602–604
transition to guarantee no anti-aliased sidebar-edge pixels survive, while
keeping the maximum photographic area. No resizing/downscaling was applied —
each plate is a lossless crop from the native page render, saved at JPEG
quality 82.

## Output plates

| File | Source page | Source dims | Crop box | Output dims | File size |
|---|---|---|---|---|---|
| `scene-grocery.jpg` | p-34 | 2731x2048 | (605,0)–(2731,2048) | 2126x2048 | 679 KB |
| `scene-market.jpg` | p-48 | 2731x2048 | (605,0)–(2731,2048) | 2126x2048 | 609 KB |
| `scene-table.jpg` | p-62 | 2731x2048 | (605,0)–(2731,2048) | 2126x2048 | 462 KB |
| `scene-bakery.jpg` | p-76 | 2731x2048 | (605,0)–(2731,2048) | 2126x2048 | 465 KB |

All four are under the 700KB target (largest is `scene-grocery.jpg` at 679KB).
Verified via `sips -g pixelWidth -g pixelHeight` (all report 2126x2048,
confirming no distortion/stretching — pure crop, no resize) and by reading each
output back: sidebar chrome is fully gone in all four, the photograph edge is
sharp and undistorted, and no leftover UI fragments remain at the crop line.

## Defects per scene

### scene-grocery.jpg (Indian grocery store aisle)
- A real, legible store banner mid-shot reads **"www.shopaisaligram.com"** plus
  a phone number and "Home Delivery" text (Hindi/English packaging elsewhere on
  the shelves). This is an identifiable real business name/URL baked into the
  stock photo — flagged here per the NDA/client-work convention; same issue was
  already noted for this photo in `prepped/PROTO-ASSETS.md`. No non-Indian
  signage found.
- No compression artefacts of note at quality 82; no pasted-cutout items in
  this frame (it's the pre-search state, before any hint/found overlays are
  composited in).

### scene-market.jpg (produce market stall) — CRITICAL DEFECT
Confirmed: this is a Spanish/European market, not Indian, with multiple
handwritten chalkboard price signs in euros. Precise locations in the
2126x2048 cropped output:

| Sign | Text | Pixel box (x, y) | % position (L–R, T–B) |
|---|---|---|---|
| Tomato sign | "Tomate raf 1,29" | (244–445, 766–1026) | 11–21% across, 37–50% down |
| Green bean sign | "Judías verdes 0,99" (handwritten "099") | (551–848, 766–1206) | 26–40% across, 37–59% down |
| Small unlabeled sign | "1.19" | (986–1155, 941–1100) | 46–54% across, 46–54% down |
| Peach/nectarine sign | "Nectarina Ledina 1,19" | (1251–1654, 909–1238) | 59–78% across, 44–60% down |
| Juice stand sign (star-shaped) | **"ZUMOS NATURALES 1€"** | (1700–2030, 1680–2020) | 80–95% across, 82–99% down |
| Partial black sign | illegible, cut off at right edge | (2014–2126, 750–909) | 95–100% across, 37–44% down |

All six signs sit in the lower-left through lower-right/bottom band of the
frame (roughly y=760 to y=2020, i.e. the bottom 60% of the image), clustered
around the produce piles and the juice cups. The euro currency symbol (€) is
unambiguous in the "ZUMOS NATURALES 1€" sign in the bottom-right corner. A
later build step deciding whether to crop tighter, blur, or overlay these
should note that the tightest crop that removes ALL of them would have to cut
roughly the bottom 60% and right 20% of the frame, which would eliminate most
of the produce — blurring or a foreground overlay (a produce crate, an "open"
sign, or similar) covering the bottom band is likely the more practical fix.
- Also note: a pasted-in cooking-oil-bottle cutout and price-tag stickers are
  visible only on the *found-item* pages (p-49 onward), not on p-48 — the
  clean page chosen here has no pasted-cutout seam issues.

### scene-table.jpg (laid Indian dinner table / thaali)
- No Spanish or other non-Indian signage found anywhere in this frame.
- One minor continuity note: among the dishes is a round flatbread topped with
  what reads visually as pepperoni-style pizza toppings (red and green diced
  peppers on a flatbread) — plausibly intended as a stylized naan/pizza fusion
  dish, but worth a second look if strict Indian-thaali authenticity matters.
  Not a legible-text issue, just a visual continuity note.
- No pasted-cutout seams (this is the pre-search frame, before found-item
  graphics are composited in).

### scene-bakery.jpg (bakery pastry display case)
- No Spanish or other non-Indian signage found. Case labels are English/French
  loanwords only — a small "Turtle Tart" card is visible bottom-left (partially
  cropped by the frame edge); a "Crème Brûlée" style label was noted in
  `PROTO-ASSETS.md` for this same case but is not clearly legible in this
  particular crop.
- No pasted-cutout seams (pre-search frame).
- Image is noticeably darker/lower-contrast than the other three scenes
  (the original photo itself, not a crop artefact) — worth a levels pass in a
  later art step if it needs to sit visually consistent next to the other
  three plates.

## Verification performed

- `sips -g pixelWidth -g pixelHeight` on all four outputs: confirmed 2126x2048
  for all, matching the intended crop box with no distortion.
- `ls -la`: confirmed all four files present and under 700KB.
- Read each output image back directly: confirmed sidebar chrome is completely
  gone at the crop line in all four, photographic content is intact edge to
  edge with no stretching, and the flagged defects above are visible exactly
  where documented.
