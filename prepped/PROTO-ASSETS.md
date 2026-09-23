# CookInQuest prepped assets

Cut from full-res prototype renders at `cookinquest/render/proto/p-NN.jpg` (2731x2048 unless noted). All full-page screenshots are already 4:3 full-bleed with no letterboxing to trim, so those crop boxes are the full source frame; the three exceptions (`logo-lockup`, `app-icon`, `gauge-row`) have real crops. All saved as JPEG quality 88, optimize, progressive.

| Output filename | Source | Crop box (px, full-res coords) | Output size | KB | Description |
|---|---|---|---|---|---|
| title-screen.jpg | p-95 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 307 | Title screen: mascot, "CookIndia Quest" logo, PLAY/OPTIONS/QUIT/Help torn-paper menu |
| help-economy.jpg | p-16 | 0,0 – 2731,2048 (full frame) | 1600x1200 | 247 | Help modal, "finding items" page: $20 hints, $100 budget, earning money |
| mode-choice.jpg | p-22 | 0,0 – 2731,2048 (full frame) | 1600x1200 | 268 | "do you want to play timed or relaxed game?" popup over KhannaTown map |
| quest-welcome.jpg | p-24 | 0,0 – 2731,2048 (full frame) | 1600x1200 | 326 | "Welcome to CookIndia Quest... KhannaTown... Restaurant Row Chef's Challenge" narrative popup |
| map-restaurant-row.jpg | p-26 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 311 | KhannaTown map, 3x3 restaurant grid, TajMahal unlocked, 8 padlocked |
| course-hub-start.jpg | p-31 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 334 | TajMahal 4-course menu card, all four courses 0/15 |
| course-hub-progress.jpg | p-75 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 311 | Same hub, Beverage/Appetizer/Entree 15/15 complete, Dessert 0/15 |
| hunt-grocery.jpg | p-34 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 524 | Hidden-object scene, Indian grocery store aisle, sidebar list + Hint $20 + budget $100 |
| hunt-table.jpg | p-66 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 395 | Hidden-object scene, Indian dinner table (spice bowls, candles, naan) |
| hunt-bakery.jpg | p-76 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 390 | Hidden-object scene, bakery pastry display case |
| found-milk.jpg | p-36 | 0,0 – 2731,2048 (full frame) | 1400x1050 | 163 | "Milk" found-item popup with carton art and flavour text |
| bonus-congrats.jpg | p-55 | 0,0 – 2731,2048 (full frame) | 1400x1050 | 173 | CONGRATULATIONS popup, Speed/Time/Total bonus ($10/$10/$20) |
| shop-tea.jpg | p-43 | 0,0 – 2731,2048 (full frame) | 1600x1200 | 201 | Shopping List, tea ladder: Lipton Free / TATA $10 / Taj Mahal $20 / Red Label Marigold $45 |
| shop-tea-chosen.jpg | p-44 | 0,0 – 2731,2048 (full frame) | 1600x1200 | 200 | Same ladder, Red Label Marigold selected in red, budget dropped to $74 |
| shop-rice.jpg | p-71 | 0,0 – 2731,2048 (full frame) | 1600x1200 | 212 | Shopping List, rice+wheat ladder: Generic Free / Great Value $25 / Tilda $40 / Dawat $65 |
| prep-intro.jpg | p-86 | 0,0 – 2731,2048 (full frame) | 1600x1200 | 255 | Meal-preparation round intro popup |
| prep-station.jpg | p-87 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 284 | Prep station: full ingredient toolbar (11 items) + 5 appliances with doneness gauges |
| prep-loaded.jpg | p-90 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 224 | Ingredients loaded onto all 5 appliances, gauges at the blue/cold end |
| prep-cooking.jpg | p-91 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 206 | Same scene, gauges advanced into the green middle band |
| final-dish.jpg | p-92 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 256 | Assembled chai + thali final dish |
| rating-five-star.jpg | p-93 | 0,0 – 2731,2048 (full frame) | 1800x1350 | 390 | 5-star critic review screen, full review text |
| logo-lockup.jpg | p-02 | 0,0 – 2659,1533 (trimmed ~34px white margin off bottom; card bleeds to top/left/right edges already) | 1200x692 | 100 | "CookIndia Quest" logo lockup on its orange/red gradient card |
| app-icon.jpg | p-01 | 23,12 – 425,414 (square, trimmed white margin) | 402x402 | 21 | Chef-toque app icon tile (blue rounded square, tricolor turban band). Source is only 448x429px, so output ships untouched at 402x402 — **not upscaled** to the requested 800px |
| gauge-row.jpg | p-91 | 600,1533 – 2731,2048 (appliance row only, sidebar and Taj Mahal background excluded) | 1600x387 | 75 | The five appliance icons (pot, fryer, tawa, rice cooker, saucepan) with their blue→green→red doneness gauges, mid-cook position |

All outputs were verified by reading the saved file back: full screen present, clean edges, no leftover page margin, text legible.

## Quality flags

Flag legend: (a) placeholder sidebar text "Item 3".."Item 15" visible, (b) Spanish/European signage in a market photo, (c) "Desert" misspelling of "Dessert", (d) other typo/rough edge.

| Asset | (a) Item 3..15 | (b) Euro/Spanish signage | (c) "Desert" typo | (d) other |
|---|---|---|---|---|
| title-screen.jpg | no | no | no | no |
| help-economy.jpg | no | no | no | no |
| mode-choice.jpg | no | no | no | no |
| quest-welcome.jpg | no | no | no | no |
| map-restaurant-row.jpg | no | no | no | no |
| course-hub-start.jpg | no | no | **yes** — "Desert / Gulab Jamun / 0/15" | no |
| course-hub-progress.jpg | no | no | **yes** — "Desert / Gulab Jamun / 0/15" | no |
| hunt-grocery.jpg | **yes** — sidebar shows Milk, Sugar, Item 3–15 | no (see note) | no | **yes** — a real store banner reads "www.shopaisaligram.com" + a phone number, clearly legible; this is an identifiable business name/URL in a stock photo, worth checking against the NDA/client-work convention before shipping |
| hunt-table.jpg | **yes** — Spices, Vegetables, Item 3–15 | no | no | no |
| hunt-bakery.jpg | **yes** — Rose Water, Item 2–15 | no | no | Case labels read "Turtle Tart" and "Crème Brûlée" (English/French, legible but minor) |
| found-milk.jpg | **yes** — Milk (struck through), Sugar, Item 3–15 | no | no | no |
| bonus-congrats.jpg | **yes** — Cooking Oil, Bell Peppers, Item 3–15 (all struck through) | no | no | no |
| shop-tea.jpg | no | no | no | no |
| shop-tea-chosen.jpg | no | no | no | no |
| shop-rice.jpg | no | no | no | no |
| prep-intro.jpg | no | no | no | **yes** — sidebar reads "Drag items from the foolbar to the meal preparation area" ("foolbar" instead of "toolbar") |
| prep-station.jpg | no | no | no | **yes** — same "foolbar" typo in the persistent sidebar instructions |
| prep-loaded.jpg | no | no | no | **yes** — same "foolbar" typo in the persistent sidebar instructions |
| prep-cooking.jpg | no | no | no | **yes** — same "foolbar" typo in the persistent sidebar instructions |
| final-dish.jpg | no | no | no | no (sidebar instructions not in this crop's readable range, but frame is cropped tight to the dish/cup — check before use if pairing with the same sidebar) |
| rating-five-star.jpg | no | no | no | **yes** — same "foolbar" typo in sidebar; **also** review body text reads "I could tell this meal was prepapred with the finest..." ("prepapred" instead of "prepared") |
| logo-lockup.jpg | no | no | no | no |
| app-icon.jpg | no | no | no | no |
| gauge-row.jpg | no | no | no | no |

Note on (b): I checked all three hidden-object scenes (grocery, dinner table, bakery) and the shopping-list ingredient art closely at full resolution. No Spanish or other European-language signage was found anywhere in this asset set — the grocery store signage is English/Indian-brand ("www.shopaisaligram.com", Hindi-English product packaging), and the bakery case cards are English ("Turtle Tart") with one French loanword ("Crème Brûlée"). If the "Spanish/European signage" issue exists in the prototype, it isn't on any of the 23 pages requested here — worth flagging to Lochana in case it's on a page outside this list.

## Verification failures
None. All 24 files passed visual verification (full screen present, clean trim, no margin, legible text/art) on the first pass.
