# CookIndia Quest — Prototype Flow Map

Source: `drop/Final prototype - LochC_iPadMini_HOG_CookIndiaQuest.pdf` (95 pages), cross-checked against `prepped/PROTO-ASSETS.md` and `prepped-wf/WF-ASSETS.md`. All 95 pages were read in sequential chunks. Confidence note: exact dollar figures and copy for the Appetizer, Entree, prep-round and rating screens were read twice and are high-confidence verbatim. A few figures (noted inline as UNCLEAR) come from a single read pass and could not be re-verified pixel-for-pixel against the source image in this session — treat those specific numbers as "very likely but not double-checked."

## Screen inventory

| Screen ID | Page(s) | Screen name | On-screen elements | Interactive affordances | Exact copy / rules | State variations |
|---|---|---|---|---|---|---|
| `app-icon` | p1 | (Home screen icon) | Chef-toque icon tile, tricolor turban band, blue rounded square | Not in-app; this is the iOS app icon, not a game screen | — | n/a |
| `logo-lockup` | p2 | Logo card | "CookIndia Quest" wordmark on orange/red gradient card | None visible — likely a splash/branding frame before the title screen | — | none observed |
| `title-screen` | p3–4, p10–11, p95 | Title Screen | Chef mascot, "CookIndia Quest" logo, torn-paper menu | Tap **PLAY** → mode-choice; **OPTIONS** → options-modal; **QUIT** → dead end (exits app, not modeled further); **Help** → help-modal | — | Repeats identically across the deck (shown at start, mid-deck, and again at the very end after the rating screen closes the demo loop) |
| `options-modal` | p5–6, p9 | Options | Music volume slider, sound volume slider, "Clear Saved Game" button, "Support" button, "Done" button | Sliders adjust volume; **Clear Saved Game** → clear-save-confirm; **Support** → UNCLEAR (no destination screen captured, likely an external link/dead end in this prototype); **Done** → back to title-screen | — | p6 shows "OPTIONS" title in red (pressed/hover state); p9 shows "Done" in red (pressed/selected state) |
| `clear-save-confirm` | p7–8 | Clear-save confirmation | "Are you sure you want to clear your saved game?" prompt, Yes/No buttons | **Yes** → clears save, presumably returns to options/title; **No** → back to options-modal | "Are you sure you want to clear your saved game?" | p8 shows "Yes" highlighted red (selected state) |
| `help-modal` | p12–~21 (6 paginated pages) | Help | Paginated modal with 6 dot-indicator pages, topic per page: (1) the map/restaurants, (2) the menu/four courses, (3) finding items, (4) the hint/budget economy ("$20 hints, $100 budget, earning money" per PROTO-ASSETS `help-economy.jpg`), (5) meal preparation part 1, (6) meal preparation part 2 | Dot navigation advances pages; close/back mechanism not captured on any page read (UNCLEAR how it returns to title) | Page 4 explains the hint/budget economy in dollar terms (exact wording UNCLEAR — paraphrased from asset manifest, not independently re-verified this pass) | Each of the 6 pages is a distinct content state, same modal chrome, active dot changes |
| `mode-choice` | p22 | Mode choice | Popup over the KhannaTown map background asking whether to play Timed or Relaxed, with a menu/pause sidebar summarizing the goal ("create meals of six different cuisines at several different restaurants…" paraphrase) | Tap **Timed** or **Relaxed** — both appear to lead to the same next screen (quest-welcome); this looks like a difficulty/timer setting rather than a content branch | Exact button copy not independently re-verified this pass — UNCLEAR verbatim wording | none observed beyond the two choice buttons |
| `quest-welcome` | p24 | Quest welcome / narrative | Narrative popup: "Welcome to CookIndia Quest… KhannaTown… Restaurant Row Chef's Challenge" (paraphrase of on-screen narrative copy) | Dismiss (OK/tap) → map-restaurant-row | Verbatim copy UNCLEAR — recorded as paraphrase, not independently re-verified this pass | none observed |
| `map-restaurant-row` | p26–27 | KhannaTown map / Restaurant Row | 3×3 grid of restaurants, TajMahal unlocked, the other 8 padlocked | Tap **TajMahal** (only tappable restaurant) → restaurant-welcome; the 8 padlocked restaurants are non-interactive in this prototype | — | none observed; padlocked restaurants never change state anywhere in the deck |
| `restaurant-welcome` | ~p30 | TajMahal welcome | Narrative popup introducing the restaurant: "Welcome to TajMahal, the premiere restaurant in KhannaTown…" (paraphrase) | Dismiss → course-hub | Verbatim copy UNCLEAR — paraphrase only | none observed |
| `course-hub` | p31 (start), p61 (mid), p75 (end of Entree), ~p85 (end of Dessert) | TajMahal menu / course hub | TajMahal card art, four course tiles: Beverage/"chai tea", Appetizer/"Pakoda", Entree/"Thaali", Desert/"Gulab Jamun" (sic — "Desert" misspelling persists throughout), each showing an X/15 found-items counter; budget counter; sidebar copy | Tap any unlocked/incomplete course tile → hunt-scene for that course; once all four read 15/15, implicitly advances to prep-intro | "Select a course to search for the required ingredients. Clear all four courses to advance to the meal preparation round." | Counters progress 0/15 → 15/15 per course independently as the player completes each hunt; budget also updates here between courses |
| `hunt-grocery` | ~p34 | Hidden-object scene — Indian grocery store aisle | Sidebar item checklist (first 2 items named per course, remainder placeholder "Item 3"–"Item 15"), Hint $20 button, budget counter, menu/pause button | Tap a found object in the scene → found-item-popup; tap **Hint** (costs $20, deducted from budget) to reveal an item's location | Hint button reads "$20"; budget shown as "$100" at course start | Sidebar items strike through (with red strikethrough) as each is found; named items here: Milk, Sugar |
| `hunt-fruitstand` | ~p46 | Hidden-object scene — fruit/market stand (Appetizer) | Same chrome as other hunt scenes; sidebar named items: Cooking Oil, Bell Peppers, then Item 3–15; Hint $20; budget counter | Same as above | Hint "$20" | Confirmed: this scene contains real Spanish-language market signage ("Zumos Naturales", handwritten "0.99"/"1.19"/"1.20" price cards) — an NDA/authenticity flag worth noting since it's foreign, non-Indian signage in an "Indian cooking" game |
| `hunt-table` | ~p62–66 | Hidden-object scene — Indian dinner table (Entree) | Sidebar named items: Spices, Vegetables, then Item 3–15; Hint $20; budget counter | Same as above | Hint "$20" | Items strike through as found |
| `hunt-bakery` | ~p76 | Hidden-object scene — bakery pastry case (Dessert) | Sidebar named items: Rose Water only, then Item 2–15 (only ONE item is named here, unlike the other three hunts which each name 2 — likely an authoring gap/placeholder oversight); Hint $20; budget counter | Same as above | Hint "$20" | — |
| `found-item-popup` | Recurring — appears once per named item (Milk ~p36, Sugar, Cooking Oil ~p47, Bell Peppers ~p50, Spices ~p64, Vegetables ~p67, Rose Water ~p78ish) | Found-item popup | Item name as title, item photo/art, 1–3 sentence flavor text explaining what the ingredient is for, "Ok" button | Tap **Ok** → returns to the hunt scene with that item struck through in the sidebar | Example verbatim (Cooking Oil): "You've found the Cooking oil. With this sunflower oil, you can make pakoda and cook your dishes. Enjoy!" Example (Bell Peppers): "You've found the organic bell beppers. With this vegetable, you can cook your dishes. Enjoy!" (sic — "beppers" typo). Example (Spices): "You've found the variety of spices. With thiese spices, you can cook your dishes and add flavors. Enjoy!" (sic — "thiese" typo). Example (Vegetables): "You've found the variety of vegetables. With these fresh vegetables, you can cook your entree with a range of flavors. Enjoy!" | Ok button toggles from black to red between the two pages showing the same popup (idle vs. pressed state) |
| `congratulations-bonus` | Recurring, once per course completed (~p52–53 Appetizer, ~p69–70 Entree, plus one for Beverage and one for Dessert elsewhere in the deck) | Congratulations / bonus screen | "CONGRATULATIONS" headline, "You found all of the hidden objects in this location." body, Speed Bonus / Time Bonus / Total Bonus dollar lines, "Ok" button | Tap **Ok** → shopping-list for that course's ingredient | "CONGRATULATIONS — You found all of the hidden objects in this location. Speed Bonus: $[X] Time Bonus: $[Y] Total Bonus: $[X+Y]" | Confirmed values: Appetizer course = Speed $10 / Time $10 / Total $20, budget $74→$94. Entree course = Speed $11 / Time $12 / Total $23, budget $59→$82. Beverage and Dessert course bonus amounts were seen once but not independently re-verified this session — UNCLEAR exact figures for those two |
| `shopping-list` | Recurring, once per course (~p43–44 Beverage/tea, ~p54–55 Appetizer/gram flour, ~p71–72 Entree/rice+wheat, and one for Dessert/semolina) | Shopping List | Sidebar rule copy, ingredient photo, a 4-tier price ladder (free generic tier + three paid tiers of increasing price), budget counter, menu/pause button | Tap a tier to select it (highlights red) → purchase-confirmation; spending deducts from budget | "Every chef knows the best ingredients are the key to a successful meal. Choose the item you would like to purchase. Spend your money wisely, you may need it later." Tea tiers (Beverage, per PROTO-ASSETS cross-check): Lipton Free / TATA $10 / Taj Mahal Tea $20 / Red Label Marigold $45. Gram flour tiers (Appetizer, verified): Generic Gram Flour Free / MTR Flour $19 / Swad Flower $22 / Fresh Ground $35. Rice+wheat tiers (Entree, verified): Generic Rice & Wheat Free / Great Value $25 / Tilda $40 / Dawat Rice and Wheat $65. Semolina tiers (Dessert) were seen once but not re-verified — UNCLEAR exact prices this session | Selected tier row turns red; budget line updates live |
| `purchase-confirmation` | Recurring, once per course (~p44 tea, ~p56–57 gram flour, ~p73–74 rice+wheat, plus one for semolina) | Purchase confirmation | Ingredient name title, ingredient photo, 2–3 sentence flavor text confirming the purchase, "Ok" button | Tap **Ok** → back to course-hub with that course now 15/15 | Verified (Fresh Ground gram flour): "You've purchased a top fresh ground gram flour This will make fluffy pakodas to go withhot chai tea and should please even the most sophisticated tastes." (sic — missing space "withhot"). Verified (Dawat rice+wheat): "You've purchased the best rice and wheat flour. This will make fluffy rotis to go with entree and great rice and should please even the most sophisticated tastes." | Ok button idle (black) vs. pressed (red) state pages |
| `prep-intro` | ~p86 | Meal-preparation round intro | Intro popup explaining the upcoming prep round | Dismiss → prep-station | Exact copy not independently re-verified this session — UNCLEAR verbatim wording | none observed |
| `prep-station` | ~p87–91 | Meal preparation station | Full ingredient toolbar (11 ingredient chips), 5 cooking appliances (pot, fryer, tawa/pan, rice cooker, saucepan) each with a doneness gauge that runs blue (cold/raw) → green (cooking) → red (done); persistent sidebar instructions | Drag an ingredient chip onto an appliance to load it; gauges then progress automatically/over time from blue toward red as the dish cooks | Sidebar instruction text (confirmed, with typo): "Drag items from the foolbar to the meal preparation area" (sic — "foolbar" instead of "toolbar", present on every page of this screen) | Three captured states: (1) empty toolbar, ingredients not yet placed; (2) ingredients loaded onto all 5 appliances, gauges at the blue/cold end; (3) same layout, gauges advanced into the green middle band |
| `final-dish` | ~p92 | Final assembled dish | Assembled chai (cup) + thali plate, framed presentation shot | Presumably a tap/OK to proceed → rating-screen | — | none observed |
| `rating-screen` | ~p93 | Critic rating | 5-star rating, full review-text block, presumably an OK/continue control | Tap continue → UNCLEAR destination (deck loops back to title-screen immediately after, but see wireframe note below) | Confirmed review text contains the typo "prepapred" ("...this meal was prepapred with the finest..."). Sidebar still shows the "foolbar" typo. | Only one state captured — a 5-star result. No lower-star outcome was observed anywhere in the deck, so it's UNCLEAR whether ingredient-tier choice (cheap vs. premium) actually affects the star rating, or whether 5 stars is the only outcome ever shown |

## 1. Main game loop (linear, launch to end of round)

1. `title-screen` — mascot + PLAY/OPTIONS/QUIT/Help
2. Tap **PLAY** → `mode-choice` — pick Timed or Relaxed
3. → `quest-welcome` — narrative intro to KhannaTown / Restaurant Row
4. → `map-restaurant-row` — 3×3 restaurant grid, only TajMahal unlocked
5. Tap **TajMahal** → `restaurant-welcome`
6. → `course-hub` — 4 courses, all 0/15, budget $100
7. Tap a course (deck shows Beverage first) → `hunt-grocery` (or the equivalent hunt scene for whichever course)
8. Find each object → `found-item-popup` (×2 named items + presumably 13 more unnamed/placeholder items per course, per the Item 3–15 sidebar rows)
9. All 15 found → `congratulations-bonus` (Speed/Time/Total bonus added to budget)
10. → `shopping-list` — choose an ingredient tier (free or paid)
11. → `purchase-confirmation` — budget deducted
12. → back to `course-hub`, that course now 15/15
13. Repeat steps 7–12 for the remaining 3 courses (Appetizer → Entree → Dessert, in the order observed in the deck)
14. All four courses 15/15 → `prep-intro`
15. → `prep-station` — drag ingredients onto 5 appliances, gauges cook blue → green → red
16. → `final-dish` — assembled chai + thali
17. → `rating-screen` — 5-star review
18. (Deck loops back to `title-screen`)

## 2. Branch points observed

- **PLAY vs. OPTIONS vs. QUIT vs. Help** at the title screen — four top-level destinations; QUIT and Help do not rejoin the main loop in any page captured.
- **Timed vs. Relaxed** at `mode-choice` — both appear to lead to the same next screen (`quest-welcome`); no divergent content was observed for either choice, so this reads as a difficulty/timer toggle rather than a content branch.
- **Clear Saved Game → Yes/No** at `clear-save-confirm` — Yes presumably wipes progress and returns to title/options; No cancels back to `options-modal`.
- **Restaurant selection** at `map-restaurant-row` — only TajMahal is choosable; the other 8 are padlocked and never become interactive in this deck.
- **Course selection order** at `course-hub` — the player can apparently pick any of the 4 course tiles in any order (the deck happens to show Beverage → Appetizer → Entree → Dessert, but nothing in the UI enforces that order).
- **Hint button ($20)** inside every hunt scene — an economy choice: spend budget to reveal an item vs. search unaided.
- **Ingredient tier choice** in every `shopping-list` — free generic tier vs. three increasingly expensive paid tiers; this is the core "spend wisely, you may need it later" resource-management choice the game is built around. It was not possible to confirm from the pages read whether tier choice affects the final star rating (only a 5-star outcome was observed).

## 3. Dead ends / unreachable screens

- The **8 padlocked restaurants** on `map-restaurant-row` — visibly present but never unlockable or enterable anywhere in the 95 pages. This is the clearest sign the prototype only builds out TajMahal / Restaurant Row.
- **QUIT** on the title screen — presumably exits the app; no further screen follows it in the deck.
- **Support** button in `options-modal` — no destination screen was captured; likely an external link or unimplemented stub in this prototype.
- The **Help modal's** close/return path was never shown — only its 6 content pages were captured, not how the player backs out to the title screen.
- **Post-rating routing** — the deck simply loops back to the `title-screen` after the rating screen. A wireframe note on `wf-rating.jpg` (in `prepped-wf/WF-ASSETS.md`) annotates the intended behavior as "repeat for other restaurants / Go to map / New restaurant unlocked," but none of that follow-through (unlocking a second restaurant, returning to the map) is actually depicted anywhere in this final prototype — it's a documented intent, not an observed screen.

## 4. Unique screen count

**21 distinct screens/screen-types** (excluding the standalone app-icon and logo-lockup branding assets, which are not in-game screens):

1. title-screen
2. options-modal
3. clear-save-confirm
4. help-modal (6 paginated states)
5. mode-choice
6. quest-welcome
7. map-restaurant-row
8. restaurant-welcome
9. course-hub
10. hunt-grocery
11. hunt-fruitstand
12. hunt-table
13. hunt-bakery
14. found-item-popup (templated, 7+ item instances observed)
15. congratulations-bonus (templated, 4 course instances)
16. shopping-list (templated, 4 course instances)
17. purchase-confirmation (templated, 4 course instances)
18. prep-intro
19. prep-station (3 state variations)
20. final-dish
21. rating-screen

If the 4 hunt-scene skins, the 4 shopping-list skins, and the 4 congratulations/purchase-confirmation instances are each counted as fully separate screens (since their art and copy differ meaningfully), the total rises to roughly **30 screen instances**; 21 is the count of distinct *templates/types*.
