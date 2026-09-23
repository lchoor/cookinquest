# CookIndia Quest — Figma Make build brief

## Premise

CookIndia Quest is a hidden-object cooking game, originally built in 2016 for iPad Mini. The
player runs a restaurant kitchen in the fictional town of KhannaTown. Per restaurant they get
a $100 budget and four courses. Each course is a hidden-object scene with 15 items to find.
Clearing a scene pays a bonus, then forces a purchase decision: the course's key ingredient
comes in four price tiers, from free generic up to an expensive named brand. Hints cost $20,
wrong taps cost $2. Once all four courses are cleared the player cooks the meal on five
appliances with doneness gauges and is judged 1 to 5 stars by a restaurant critic on three
things: ingredient quality, cooking performance, and time. The game never says that better
ingredients make better food. It charges for them and then judges the result.

**Device frame: iPad Mini, landscape, 1024 x 768.** Fixed. No responsive breakpoints, no
portrait, no phone.

---

## Do NOT

- Do **not** redesign the visual style. This is a faithful rebuild of 2016 art. Warm oranges,
  reds, saturated yellow, brown, green. Torn-paper menu panels. Hand-lettered logo. Photographic
  hidden-object scenes. Chalkboard-style sidebar. Do not flatten it into a modern minimal UI.
- Do **not** substitute or invent brand names. Lipton, TATA, Taj Mahal, Red Label Marigold, MTR,
  Swad, Great Value, Tilda, Dawat and every brand in the data tables are used verbatim.
- Do **not** invent new mechanics. No lives, no combo multipliers, no power-ups, no shop
  currency other than dollars, no fail state. There is no game-over screen anywhere.
- Do **not** build 24 separate hidden-object scenes. Build **four scene archetypes** and reskin
  them per restaurant. See template T5.
- Do **not** add tutorial overlays or tooltips explaining the economy. The Help modal is the only
  place the rules are stated. That is deliberate.
- Do **not** change any dollar amount, price, or point threshold below.

---

## Build 12 templates, not 30 screens

| # | Template | Instances | Layout |
|---|---|---|---|
| **T1** | Title screen | 1 | Full-bleed warm gradient. Chef mascot left. Hand-lettered "CookIndia Quest" logo top centre. Torn-paper menu strip right: PLAY, OPTIONS, QUIT, Help. Menu labels turn red on press. |
| **T2** | **Dialog shell** | reused by 10 screens | Centred torn-paper card over a dimmed screenshot of whatever is behind it. Title, body, optional art slot, one or two buttons. Buttons black idle, red pressed. Used for: Options, Clear-save confirm, Help (6 paged states with a 6-dot indicator), Mode choice, Quest welcome, Restaurant welcome, Found-item popup, Bonus popup, Purchase confirmation, Prep intro. Build once, drive by props. |
| **T3** | Map | 1 layout, 7 data states | KhannaTown illustration background. 3 x 3 grid of restaurant tiles. Tile states: `unlocked` (tappable, glowing), `locked` (padlock), `comingSoon` (padlock plus a "Coming soon" ribbon), `complete` (star count badge). |
| **T4** | Course hub | 6 | Restaurant card art. Four course tiles in a row: course name, dish name, thumbnail, `X/15` counter. Sidebar with the rule copy and the budget chip. Complete tiles show a tick. |
| **T5** | **Hunt scene** | 4 archetypes x 6 restaurants | Full-bleed photographic scene 760 px wide. Right sidebar 264 px: item checklist of 15 rows (found rows get a red strikethrough), `Hint $20` button, budget chip, countdown (Timed only), Menu/Pause pill. Archetypes: **A** shop interior, **B** open-air stall, **C** working table, **D** display case. Restaurants 2 to 6 reuse the same four images with a colour grade and a different hotspot map. |
| **T6** | Shopping list | 24 | Sidebar rule copy left. Large ingredient photo centre. Four price rows stacked right: brand name plus price, tier 1 always reads "Free". Selected row fills red. Budget chip updates live. |
| **T7** | Prep station | 6 | Ingredient toolbar along the bottom, 11 draggable chips. Five appliances across the middle: Pot, Fryer, Tawa, Rice cooker, Saucepan. Each appliance carries a horizontal doneness gauge that fills blue to green to red. Persistent sidebar instruction. |
| **T8** | Gauge component | 5 per prep station | Horizontal bar. Zones: 0 to 44 blue, 45 to 59 amber, 60 to 79 green, 80 to 89 amber, 90 to 100 red. Travelling marker. Blinks plus audio cue at 55. |
| **T9** | Final dish | 6 | Framed hero shot of the assembled plate and drink. Tap to continue. |
| **T10** | Rating screen | 6 restaurants x 5 bands | Restaurant logo, a row of 5 stars with N filled, the review paragraph in a scroll-safe block, OK button. |
| **T11** | HUD | global overlay | Budget chip, Menu/Pause pill, countdown. Persists across T4, T5, T6, T7. |
| **T12** | Pause sidebar | global | Slide-in panel: resume, restart restaurant, back to map, options. |

---

## State

```js
{
  mode: null,                    // "timed" | "relaxed", chosen once per session
  restaurantsUnlocked: 1,        // 1..6
  currentRestaurant: null,       // 1..6
  restaurantResults: [ /* x6 */ { completed: false, stars: 0, budgetLeft: 0 } ],

  budget: 100,                   // reset to 100 on every restaurant entry, clamps at 0
  currentCourse: null,           // 0..3  (0 Beverage, 1 Appetizer, 2 Entree, 3 Dessert)

  courses: [ /* x4 */ {
    foundItems: [ /* 15 bools */ false ],
    foundCount: 0,
    hintsUsed: 0,
    unhintedFinds: 0,            // correct taps not preceded by a hint on that item
    wrongTaps: 0,
    lastWrongTapAt: 0,           // ms, for the 1000 ms penalty cooldown
    huntElapsedMs: 0,
    huntRemainingMs: 180000,     // null in relaxed
    speedBonus: 0,
    timeBonus: 0,
    totalBonus: 0,
    purchasedTier: null,         // 0..3, 0 = free generic, 3 = premium
    complete: false
  } ],

  prepElapsedMs: 0,
  prepParMs: 120000,
  toolbar: [ /* 11 */ { id: "", label: "", placed: false } ],
  appliances: [ /* x5 */ {
    id: "",                      // pot | fryer | tawa | ricecooker | saucepan
    loadedIds: [],
    cooking: false,
    doneness: 0,                 // 0..100, rises 100 per 18000 ms while cooking
    pulledAt: null,
    pulledBand: null             // "raw" | "amber" | "green" | "burnt"
  } ],

  ingredientPoints: 0,           // 0..12
  cookingPoints: 0,              // 0..10
  timePoints: 0,                 // 0..3
  totalPoints: 0,                // 0..25
  stars: 0                       // 1..5
}
```

---

## Interaction rules

**Navigation**
- Title PLAY → mode choice → quest welcome → map.
- Title OPTIONS → options dialog. Clear Saved Game → confirm dialog. Done → title.
- Title Help → 6 paged help dialog. Dots navigate. Close → title.
- Title QUIT → dead end, show the logo lockup card.
- Map: tap an `unlocked` tile → restaurant welcome → course hub. `locked` and `comingSoon`
  tiles shake and do nothing.
- Course hub: tap any incomplete course tile → that course's hunt scene. Order is free.
- All 4 courses complete → auto-advance to prep intro → prep station → final dish → rating.
- Rating OK → map, with `restaurantsUnlocked` incremented if this was a first completion.

**Mode**
- If `mode === "timed"`: hunt countdown runs from 180 s, Speed Bonus live, Time Bonus live,
  prep round is clocked.
- If `mode === "relaxed"`: no hunt countdown, Speed Bonus live, Time Bonus always $0, prep
  round unclocked, `timePoints` awarded a flat 2.

**Hunt scene**
- If the player taps a correct hotspot: strike the sidebar row, `foundCount++`, and if that
  item was not the target of a hint then `unhintedFinds++`.
- If the player taps a correct hotspot for a **key item**: open the found-item popup (T2) with
  that item's flavour text. Pause all timers while the popup is open.
- If the player taps a wrong area **and** `now - lastWrongTapAt >= 1000`: `budget -= 2`,
  `wrongTaps++`, `lastWrongTapAt = now`, play the negative cue, flash the budget chip red.
- If the player taps a wrong area **within** 1000 ms of the last charged tap: play the cue,
  charge nothing.
- If the player presses Hint and `budget >= 20`: `budget -= 20`, `hintsUsed++`, sparkle one
  remaining item for 2 s, and mark that item as hinted so it will not count toward
  `unhintedFinds`.
- If the player presses Hint and `budget < 20`: refuse, shake the budget chip, charge nothing.
- If `huntRemainingMs` reaches 0 in Timed mode: the hunt continues, but `timeBonus` locks to
  $0. **There is no fail state.**
- If `foundCount === 15`: open the bonus popup.

**Bonus popup**
- `speedBonus = min(unhintedFinds, 15)`
- `timeBonus = mode === "relaxed" ? 0 : min(floor(huntRemainingMs / 10000), 18)`
- `totalBonus = speedBonus + timeBonus`, `budget += totalBonus`.
- Display three lines: `Speed Bonus: $X`, `Time Bonus: $Y`, `Total Bonus: $Z`.
- OK → shopping list.

**Shopping list**
- If the player taps a tier row: highlight it red, then open the purchase confirmation.
- On confirm: `budget -= tierPrice` (clamped at 0), `purchasedTier = tierIndex`,
  `complete = true`, return to the course hub with that tile at 15/15.
- Tier 1 always costs $0. A tier the player cannot afford is greyed out and not tappable.

**Prep station**
- If the player drags a chip onto an appliance: add to `loadedIds`. When an appliance's full
  bundle is loaded, `cooking = true` and `doneness` starts rising at 100 per 18000 ms.
- At `doneness === 55`: blink the gauge, play the cue.
- If the player drags a cooked dish off an appliance: `pulledAt = doneness`, `cooking = false`,
  and set `pulledBand` from the zone (raw 0 to 44, amber 45 to 59, green 60 to 79, amber 80 to
  89, burnt 90 to 100).
- If `doneness` reaches 100 unattended: hold at 100, band = burnt.
- All 5 appliances pulled → final dish → rating.

**Rating**
- `ingredientPoints = sum of the four purchasedTier values` (0 to 12).
- `cookingPoints = sum over 5 appliances of` green→2, amber→1, raw→0, burnt→0 (0 to 10).
- `timePoints`: Timed, prep finish at or under 120 s → 3; 121 to 160 s → 2; 161 to 200 s → 1;
  over 200 s → 0. Relaxed → flat 2.
- `totalPoints = ingredientPoints + cookingPoints + timePoints`.
- Stars: 23 to 25 → 5, 18 to 22 → 4, 12 to 17 → 3, 6 to 11 → 2, 0 to 5 → 1.
- Show the matching review from the review table.
- OK → map. Unlock the next restaurant if this was a first completion. Only overwrite a stored
  star count if the new one is higher.

---
---

# DATA

Everything below is content, not build instruction. Restaurant 1 is recovered from the 2016
sources. Restaurants 2 to 6 are new content in the same spirit.

## Verbatim copy

**Course hub sidebar:** "Select a course to search for the required ingredients. Clear all four
courses to advance to the meal preparation round."

**Shopping list sidebar:** "Every chef knows the best ingredients are the key to a successful
meal. Choose the item you would like to purchase. Spend your money wisely, you may need it
later."

**Bonus popup:** "CONGRATULATIONS" / "You found all of the hidden objects in this location."

**Prep station sidebar:** "Drag items from the toolbar to the meal preparation area."

**Prep intro sidebar:** "Keep an eye on the clock. You have a limited time to prepare the meal.
Good luck!"

**Help page 4, the economy:** "In each restaurant, you are given a starting budget of $100. Be
frugal with your hints though as each one will cost you $20. You can lose money from your
budget by using hints or by tapping the wrong items. You can earn more money by quickly finding
consecutive items and by clearing the level in a short amount of time. The ingredients you
purchase will ultimately affect the quality of your meal and your overall rating from the
judges."

**Help page 5, the rating:** "This rating will take into account the quality of your
ingredients, your performance in preparing the meal, and the amount of time required to
finish."

**Found-item popup template:** "You've found the {item}. With {this/these} {descriptor}, you can
{use}. Enjoy!"

**Purchase confirmation template:** "You've purchased {tier name}. This will {result} and should
please even the most sophisticated tastes."

## Map slots

| Slot | Restaurant | Cuisine | Status |
|---|---|---|---|
| 1 | TajMahal | Mughlai, North Indian | playable, unlocked at start |
| 2 | Chettinad Kitchen | Chettinad, Tamil Nadu | playable, unlocks after 1 |
| 3 | Bengal Ghat | Bengali, Kolkata | playable, unlocks after 2 |
| 4 | Gujarat Thal | Gujarati | playable, unlocks after 3 |
| 5 | Goa Beach Shack | Goan coastal | playable, unlocks after 4 |
| 6 | Kashmir Wazwan House | Kashmiri | playable, unlocks after 5 |
| 7 | Hyderabad House | Hyderabadi | Coming soon, never unlocks |
| 8 | Malabar Coast | Keralan | Coming soon, never unlocks |
| 9 | Rajasthan Haveli | Rajasthani | Coming soon, never unlocks |

## Courses, dishes, scenes

Scene archetype letter in brackets. A = shop interior, B = open-air stall, C = working table,
D = display case.

| R | Beverage | Appetizer | Entree | Dessert |
|---|---|---|---|---|
| 1 TajMahal | Chai Tea, grocery aisle [A] | Pakoda, fruit stand [B] | Thaali, dinner table [C] | Gulab Jamun, bakery case [D] |
| 2 Chettinad | Filter Coffee, roaster's shopfront [A] | Medu Vada, temple-street cart [B] | Chettinad Pepper Curry with Dosa, spice merchant's counter [C] | Semiya Payasam, sweet stall [D] |
| 3 Bengal Ghat | Gondhoraj Ghol, riverside dairy stall [A] | Beguni, street-fry stall [B] | Shorshe Ilish with rice, dawn fish market [C] | Mishti Doi, potter's yard sweet shop [D] |
| 4 Gujarat Thal | Masala Chaas, dairy churn yard [A] | Khaman Dhokla, farsan shop [B] | Undhiyu with Rotli, winter vegetable market [C] | Shrikhand, hung-curd kitchen [D] |
| 5 Goa Shack | Solkadhi, beachfront coconut stall [A] | Rechado Fried Mackerel, fishing jetty [B] | Xacuti with Sannas, spice drying yard [C] | Bebinca, tiled bakery kitchen [D] |
| 6 Kashmir | Noon Chai, samovar bazaar [A] | Nadru Monje, floating vegetable market [B] | Rogan Josh with rice, copper-pot kitchen [C] | Phirni, dry-fruit stall [D] |

## Price ladders

Tier 1 is always free. Brand names verbatim, no substitutions.

| R / Course | Key ingredient | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---|---|---|---|---|
| 1 Beverage | Tea | Lipton, Free | TATA, $10 | Taj Mahal, $20 | Red Label Marigold, $45 |
| 1 Appetizer | Gram flour | Generic, Free | MTR, $19 | Swad, $22 | Fresh Ground, $35 |
| 1 Entree | Rice and wheat | Generic, Free | Great Value, $25 | Tilda, $40 | Dawat, $65 |
| 1 Dessert | Semolina | Generic, Free | Uncut, $6 | Semi Roasted, $12 | Roasted fine, $22 |
| 2 Beverage | Coffee and chicory | Generic, Free | Bru, $12 | Narasu's, $24 | Cothas Peaberry, $48 |
| 2 Appetizer | Urad dal | Generic, Free | Swad, $14 | Deep, $21 | 24 Mantra Organic, $38 |
| 2 Entree | Chettinad masala | Generic, Free | Aachi, $18 | Sakthi, $30 | Everest, $55 |
| 2 Dessert | Vermicelli and jaggery | Generic, Free | MTR, $8 | Nirav, $15 | Organic Tattva, $26 |
| 3 Beverage | Yogurt | Generic, Free | Amul, $11 | Mother Dairy, $19 | Milkymist Greek, $34 |
| 3 Appetizer | Mustard oil | Generic, Free | Fortune Kachi Ghani, $13 | Dhara, $22 | Patanjali Cold Pressed, $36 |
| 3 Entree | Mustard paste | Generic, Free | Catch, $12 | MDH, $25 | Everest, $46 |
| 3 Dessert | Date palm jaggery | Generic, Free | Swad, $9 | Nirav, $17 | 24 Mantra Organic, $30 |
| 4 Beverage | Buttermilk | Generic, Free | Verka, $10 | Nandini, $18 | Amul Masti, $33 |
| 4 Appetizer | Dhokla flour blend | Generic, Free | Gits, $9 | MTR, $16 | Aashirvaad, $28 |
| 4 Entree | Ghee | Generic, Free | Amul, $20 | Gowardhan, $35 | Nandini Cow Ghee, $58 |
| 4 Dessert | Saffron | Generic, Free | Baby Brand, $14 | Lion Saffron, $26 | Kashmiri Mongra, $48 |
| 5 Beverage | Coconut milk | Generic, Free | Dabur Hommade, $12 | Patanjali, $20 | Fresh Pressed First Extract, $36 |
| 5 Appetizer | Rechado masala | Generic, Free | Nilon's, $15 | Mother's Recipe, $27 | Priya, $46 |
| 5 Entree | Xacuti masala | Generic, Free | Badshah, $16 | Shan, $29 | Everest, $52 |
| 5 Dessert | Nutmeg | Generic, Free | Keya, $7 | Catch, $13 | Whole Kerala Nutmeg, $25 |
| 6 Beverage | Green tea leaf | Generic, Free | Wagh Bakri, $10 | Society, $18 | Kashmiri Green Leaf, $40 |
| 6 Appetizer | Lotus stem | Generic, Free | Deep, $12 | Swad, $20 | Dal Lake Fresh-Cut, $34 |
| 6 Entree | Kashmiri chilli | Generic, Free | Rajah, $18 | MDH, $30 | Kashmiri Degi Mirch Whole, $55 |
| 6 Dessert | Walnut and pistachio | Generic, Free | Nutraj, $12 | Happilo, $22 | Kashmiri Walnut Kernels, $38 |

## Item lists

15 per course. The **first two, bolded** are key items and trigger a found-item popup. The
other 13 are scene props and strike through silently. Junk objects are intentional, they are a
convention of the genre and were in the 2016 wireframe.

**R1 TajMahal**
- Beverage: **Milk**, **Sugar**, Tea leaves, Ashtray, Trowel, Bee, Hotdog, Handsaw, TV, Trash can, Ball and chain, Cardamom pods, Ginger root, Steel strainer, Wall clock
- Appetizer: **Cooking Oil**, **Bell Peppers**, Onion, Green chilli, Potato, Coriander bunch, Weighing scale, Straw basket, Paper cone, Bicycle bell, Umbrella, Cat, Watering can, Padlock, Postcard
- Entree: **Spices**, **Vegetables**, Ghee tin, Rolling pin, Copper tumbler, Naan basket, Brass lamp, Candle, Napkin ring, Salt cellar, Marigold garland, Playing card, Pocket watch, Spectacles, Wooden spoon
- Dessert: **Rose Water**, **Milk powder**, Sugar syrup jug, Cardamom pod, Piping bag, Silver leaf sheet, Cooling rack, Cake tester, Oven mitt, Ribbon spool, Price tag, Feather duster, Doorbell, Sparrow, Toy train

**R2 Chettinad Kitchen**
- Beverage: **Chicory blend**, **Boiled milk pot**, Brass filter, Davara tumbler, Jaggery lump, Gunny sack, Roasting drum, Weighing hook, Ledger book, Wall calendar, Table fan, Cricket ball, Umbrella, Sleeping dog, Spirit lamp
- Appetizer: **Urad dal**, **Curry leaves**, Banana leaf, Coconut chutney bowl, Slotted ladle, Kerosene stove, Steel tiffin box, Temple bell, Rope coil, Bicycle pump, Kite, Chalk slate, Rubber sandal, Crow, Hand mirror
- Entree: **Black peppercorns**, **Star anise**, Stone mortar, Dosa tawa, Palm-leaf fan, Copper measure, Twine ball, Jute sack, Oil lamp, Abacus, Tin funnel, Pocket knife, Spool of thread, Lizard, Broken padlock
- Dessert: **Vermicelli**, **Cashews**, Ghee tin, Raisin jar, Saffron vial, Brass ladle, Serving pot, Paper doily, Glass dome, Fly swatter, Cash box, Wall hook, Butterfly, Toy top, Sugar tongs

**R3 Bengal Ghat**
- Beverage: **Yogurt pot**, **Gondhoraj lime**, Clay cup, Wooden churn, Ice block, Muslin cloth, Cane stool, Boat oar, Fishing float, Enamel mug, Newspaper, Hand pump, Stray goat, Bell jar, Rope knot
- Appetizer: **Mustard oil**, **Aubergine**, Iron kadai, Wire skimmer, Sal-leaf plate, Coal brazier, Tin sign, Tram ticket, Kerosene can, Stack of newsprint, Hurricane lamp, Sparrow, Steel tongs, Cricket stump, Wall poster
- Entree: **Mustard paste**, **Green chillies**, Cane basket, Ice shovel, Weighing pan, Banana leaf wrap, Brass scale weight, Hand cart, Wet newspaper, Bamboo pole, Rubber boot, Wall calendar, Alley cat, Tin whistle, Hook and line
- Dessert: **Date palm jaggery**, **Thickened milk**, Clay pot, Kiln paddle, Straw bundle, Wooden stamp, Glass jar, String bundle, Ledger, Coin tray, Paper cone, Chisel, Butterfly, Broken bangle, Ceiling fan

**R4 Gujarat Thal**
- Beverage: **Buttermilk**, **Roasted cumin**, Wooden churn staff, Copper pot, Rock salt block, Mint sprig, Clay cooler, Charpoy, Brass tumbler, Milk can, Rope pulley, Peacock feather, Straw hat, Hand fan, Cowbell
- Appetizer: **Besan batter**, **Mustard seeds**, Steamer tray, Sev press, Steel plate stack, Sugar syrup bottle, Coriander bunch, Coconut grater, Glass display case, Cash drawer, Paper bag roll, Wall clock, Ceiling hook, Beetle, Order pad
- Entree: **Ghee**, **Green garlic**, Earthen pot, Rolling pin, Purple yam, Muthiya dumpling, Bamboo tray, Weighing stone, Jute sack, Handcart wheel, Straw broom, Tin measure, Wooden crate, Ladybird, Chalk board
- Dessert: **Saffron**, **Hung curd**, Muslin bag, Sugar sifter, Pistachio bowl, Nutmeg grater, Ceramic bowl, Silver tray, Ice bucket, Recipe card, Brass weight, Glass cloche, Feather, Wall tile, Serving spoon

**R5 Goa Beach Shack**
- Beverage: **Coconut milk**, **Kokum**, Machete, Coconut husk, Straw, Ice chest, Bamboo pole, Fishing net, Beach umbrella, Flip flop, Seashell, Transistor radio, Deck chair, Crab, Rope coil
- Appetizer: **Rechado masala**, **Mackerel**, Wooden crate, Ice shovel, Weighing hook, Lime wedge basket, Frying pan, Kerosene stove, Oar, Life ring, Gull, Coil of twine, Tin lamp, Boat cleat, Chalk price board
- Entree: **Xacuti masala**, **Toddy**, Grinding stone, Drying mat, Cinnamon bark, Nutmeg pile, Cane basket, Wooden ladle, Clay pot, Rain hat, Hammock, Monkey, Tin roof sheet, Coconut scraper, Hand cart
- Dessert: **Nutmeg**, **Egg yolks**, Copper baking tin, Ghee brush, Sugar sack, Layer cake slice, Azulejo tile, Oven paddle, Cooling rack, Rolling pin, Church candle, Enamel jug, Wall cross, Moth, Timer bell

**R6 Kashmir Wazwan House**
- Beverage: **Green tea leaf**, **Rock salt**, Copper samovar, Charcoal scoop, Baking-soda tin, Walnut shell, Pashmina shawl, Brass tray, Kangri firepot, Papier-mache box, Wool carpet, Snow boot, Wall lantern, Pigeon, Tea strainer
- Appetizer: **Lotus stem**, **Rice flour**, Shikara paddle, Woven basket, Water lily, Weighing hook, Frying pot, Wooden crate, Coil of rope, Wool cap, Duck, Oil can, Copper bowl, Tin sign, Bundle of reeds
- Entree: **Kashmiri chilli**, **Fennel powder**, Copper degh, Long ladle, Wood fire log, Yogurt pot, Bay leaf, Brass platter, Serving cloth, Charcoal tong, Water jug, Cook's cap, Wall hook, Cricket, Spice box
- Dessert: **Walnut kernels**, **Pistachios**, Clay bowl, Rose petal, Silver leaf, Milk pan, Almond sack, Weighing scale, Paper twist, Wooden scoop, Glass jar, Shop shutter, Chalk sign, Moth, Cash tin

## Prep bundles

Five appliances per restaurant. Load the listed chips onto the station to start it cooking.

| R | Pot | Fryer | Tawa | Rice cooker | Saucepan |
|---|---|---|---|---|---|
| 1 | milk + sugar + chai tea → chai | gram flour + bell pepper + oil → pakoda | kneaded flour → rotis | rice → steamed rice | gram flour + rose water + semolina → gulab jamun |
| 2 | milk + coffee + chicory → filter coffee | urad dal + curry leaves → medu vada | dosa batter → dosa | rice | vermicelli + jaggery + cashews → payasam |
| 3 | milk + jaggery → mishti doi | aubergine + besan + mustard oil → beguni | ilish + mustard paste | rice | yogurt + lime + water → ghol |
| 4 | buttermilk + cumin + salt → chaas | undhiyu vegetables + ghee | rotli dough → rotli | besan batter steamed → dhokla | hung curd + saffron + sugar → shrikhand |
| 5 | coconut milk + kokum → solkadhi | mackerel + rechado masala | sannas batter → sannas | rice | bebinca layers + nutmeg + ghee |
| 6 | green tea + rock salt + soda → noon chai | lotus stem + rice flour → monje | rogan josh in the pan | rice | milk + rice flour + nuts → phirni |

## Reviews

One per star band, used for every restaurant.

**5 stars.** This meal was a masterpiece! It was exactly what you want from a great Indian
restaurant. Right from the start, I could tell this meal was prepared with the finest and
freshest ingredients available. Everything was cooked to perfection, and the chai tea
especially was prepared beautifully. The service was impeccable, and our food was delivered
promptly and professionally. What a wonderful culinary experience. This chef has a bright
future ahead, both for this contest and beyond! Jump into the next adventure and explore more
skills. Good luck!

**4 stars.** This was a very good meal, and I left happy. The kitchen clearly knows what it is
doing. The seasoning was confident, and most of the plate arrived exactly as it should. A few
things were held a moment too long on the heat, and one or two ingredients felt like a small
economy rather than a choice. Nothing here was wrong. It simply was not yet perfect. Tighten
the timing, spend where it shows, and this becomes a five star kitchen. I would happily book
the table again.

**3 stars.** A solid, honest meal. Nothing on this table embarrassed itself, and nothing on it
surprised me either. The cooking was competent but uneven, some of it right on the mark and
some of it a little past it, and the shopping showed: several ingredients were the safe, cheap
version of themselves. There is a real cook back there, I can taste it. Spend a little more on
what goes into the pan, watch the heat more closely, and this kitchen has somewhere to go. I
would like to see the next attempt.

**2 stars.** I wanted to like this more than I did. The idea of the meal was right, but the
execution kept getting in its own way. Dishes arrived either underdone or pushed well past
their moment, and the ingredients had clearly been chosen for the price tag rather than for the
plate. There were flashes, a moment in the entree where you could see exactly what was
intended. Those flashes are the reason to come back. Slow down, buy better, cook to the middle
of the gauge, and the next visit could be to a different restaurant entirely.

**1 star.** I will be blunt, because the chef deserves honesty. This meal was not ready to be
served. The ingredients were the cheapest on the shelf and tasted like it, and almost nothing
left the heat at the right moment. The kitchen was rushing, and the plate carried every second
of that rush. I am not writing this to be cruel. Every chef I admire has cooked a meal like
this one, once, and learned more from it than from any success. Go back, take your time, and
buy the good tea. I will be waiting for the second attempt.

## Reference art

Faithful reskin targets, in `cookinquest/prepped/`: `title-screen.jpg`, `map-restaurant-row.jpg`,
`course-hub-start.jpg`, `course-hub-progress.jpg`, `hunt-grocery.jpg`, `hunt-table.jpg`,
`hunt-bakery.jpg`, `found-milk.jpg`, `bonus-congrats.jpg`, `shop-tea.jpg`,
`shop-tea-chosen.jpg`, `shop-rice.jpg`, `prep-intro.jpg`, `prep-station.jpg`,
`prep-loaded.jpg`, `prep-cooking.jpg`, `gauge-row.jpg`, `final-dish.jpg`,
`rating-five-star.jpg`, `mode-choice.jpg`, `quest-welcome.jpg`, `help-economy.jpg`,
`logo-lockup.jpg`, `app-icon.jpg`.
