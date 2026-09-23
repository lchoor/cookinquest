# CookInQuest, iPadOS 26 remake, Figma Make production spec

This is the 2026 remake specification. It is a separate document from
`FIGMA-MAKE-BRIEF.md`, which is the faithful 2016 rebuild brief. Both must coexist.
Everything below has already been decided by the project owner. This document
assembles and formats those decisions. It does not redesign the game, invent new
mechanics, add screens, or change any number.

---

## 1. DO NOT

- Do not redesign the visual style.
- Do not substitute or rename brands. Lipton, TATA, Taj Mahal, Red Label Marigold,
  MTR, Swad, Great Value, Tilda, Dawat are kept verbatim.
- Do not invent hidden items. The 60 items are fixed and listed in the DATA section.
- Do not create a screen for any transition not listed in the transition table.
- Do not build 60 separate find frames. Use components and variables. See section 3.
- Do not use Liquid Glass or any translucent material over a hunt scene. Scene
  legibility outranks material fashion.
- Do not add a timer, a countdown, an energy system or a mode choice screen. This
  build is untimed by design.

---

## 2. Premise and frames

The player is chosen for Restaurant Row's Chef's Challenge in KhannaTown. Find what
each dish needs, protect the money, buy the quality affordable, cook with care, earn
the critic's verdict. Four courses, 60 items, one shared budget, one star rating.

Frames to build, iPadOS 26, landscape primary:

- Regular width: 1210 x 834 pt, iPad 11 inch landscape.
- Compact width: 700 x 834 pt, narrow window, Split View half. At this width the
  course checklist collapses into a bottom drawer with a pull handle. The hunt scene
  stays full bleed and never shrinks below 60 percent of frame width.
- Minimum supported: 480 x 640 pt. Below this the hunt scene is unplayable, so show
  a "widen the window to play" panel. This panel is a responsive override, not a
  navigable screen. It is triggered purely by frame size, layers over whichever
  screen is active (in practice this only matters on hunt-scene, the one screen a
  narrow frame makes unplayable), and it is not listed as a node in the section 9
  transition table because no user action produces it.

All controls minimum 44 x 44 pt.

---

## 3. TEMPLATES, the cost model

Build 14 templates once, then instance them with variables. Do not author instances
by hand.

| Template | Instances | Varies by |
|---|---|---|
| title | 1 | none |
| story-ribbon | 2 | inline copy embedded in map and course hub, never a blocking screen |
| map | 1 | which restaurants unlocked |
| course-hub | 1 | four course card states |
| hunt-scene | 4 | background art, 15 item names, which items are "fact" items |
| find-feedback | 60 | item name, standard inline or educational fact-strip state |
| level-complete | 4 | unaided finds, bonus earned, transaction ledger, new balance |
| shop-ladder | 4 | ingredient name, 4 tier rows, affordability per row |
| purchase-confirm | 4 | tier bought, flavour copy, new balance |
| prep-station | 1 | five station responsibilities, fryer queue, roti substage |
| plating | 1 | six plate components, present-dish state |
| verdict | 1 | star count, score breakdown, review text |
| help-sheet | 1 | six paginated topics |
| pause-sheet | 1 | Resume, Help, Leave restaurant |

That is 14 templates and 86 instances. Authoring these as 86 unique frames instead of
14 reusable templates is the single largest avoidable cost in this build.

Count correction, NEW: earlier drafts said 90 frames, then 85 instances and 13
templates. The final table includes the previously omitted pause-sheet and the
approved plating step. Its instance column sums to 86 across 14 templates.

**How find-feedback works without interrupting play.** Every one of the 60 items uses
one find-feedback component. The 20 designated fact items, 5 per course, use its
educational fact-strip state; the other 40 use its compact inline state. Neither is a
modal or separate screen. A fact strip may collapse visually, but its copy remains in
the persistent Facts log. With VoiceOver, Larger Text or explicit focus it stays open
until dismissed.

**Component reuse.** title, level-complete, purchase-confirm and help-sheet share one
opaque panel shell. Story ribbons are inline components, not dialogs. map, course-hub,
hunt-scene, shop-ladder, prep-station, plating and verdict are each their own layout.
find-feedback uses the two nonblocking render states above. BudgetChip,
TransactionLedger, IngredientBundle, ApplianceStation, DonenessGauge, FryerQueue,
PlateSlot, ScoreCategory and SaveStatus are reusable nested components.

---

## 4. STATE MODEL

```
budget int = 100
transactions[] = ordered records {type, amount, courseId, label, balanceAfter}
route enum = title, map, courseHub, hunt, levelComplete, shop, purchaseConfirm, prep, plating, verdict
pauseReturnRoute route|null = null
course int = 0, one of 0 beverage, 1 appetizer, 2 entree, 3 dessert
foundItemIds[4] set<string> = empty, max 15 unique IDs each
assistedItemIds[4] set<string> = empty
factsUnlocked set<string> = empty
tierBought[4] int = -1 unbought, else 0 to 3
shopPreviewTier int = -1 none, else 0 to 3
findBonus[4] int = 0, max 15 each, posted once at level complete
hintsUsed int = 0
misses int = 0
activeHintItemId string|null = null
stationState[5] enum = empty, partial, readyToCook, heating, ready, overcooking, resolved
stationLoadedBundleIds[5] set<string> = empty
doneness[5] float = 0.0, range 0 to 100
stationOutcome[5] int = -1 unresolved, else 0 to 2
fryerBatchIndex int = 0, one of 0 pakoda, 1 vegetables, 2 gulab jamun
fryerBatchOutcome[3] int = -1 unresolved, else 0 to 2
rotiStage enum = ingredients, dough, rotiMaker, pan, resolved
plateComponents set<string> = empty, max 6
currentStars int = 0
bestStars int = 0
restaurantsUnlocked int = 1, max 6
hasSave bool = false
```

Derived values, never stored independently: found count is the size of
foundItemIds[course]; course complete means that size is 15 and its tierBought value
is not -1; restaurant ready to cook means all four courses are complete; cook score
comes from stationOutcome; total and stars come from the scoring bands in section 5.
This prevents visible counts, budgets and completion states from drifting apart.
Persist every value in the block except pauseReturnRoute and shopPreviewTier. Resume
restores route, course, exact found IDs, ledger, active hint, station progress, fryer
queue, roti substage, plating and judgment state; an active cooking gauge resumes
paused until the player explicitly selects Resume.

**Note on `doneness[5]` and scoring.** An explicitly started station advances from 0
to 100. Finish at 1 to 39, Heating, for 1 point; 40 to 69, Ready, for 2; 70 to 89,
Overcooking, for 1; and 90 to 100, Burned, for 0. A station not completed also scores
0. The gauge uses words, icons, position and patterns as well as colour. Help, Pause,
accessibility reading and an operating-system interruption freeze active gauges.

**Note on `restaurantsUnlocked`, max 6.** The DATA section below specifies exactly 60
items, one restaurant's worth of content: 4 courses, 15 items each. `restaurantsUnlocked`
carries a ceiling of 6 because the wider CookInQuest world (see `JOURNEY.md`) is a
6 restaurant progression, and the map template needs a data model that will not need
reshaping later. This build ships restaurant 1 only. The 3 by 3 map shows six
sequential playable slots and three Coming Soon slots. Taj Mahal starts unlocked;
the verdict unlocks slot 2. Content for slots 2 through 6 is out of scope. Do not
invent their names, courses or items.

---

## 5. RULES

Terse if/then only. Every rule is tagged RECOVERED, from the 2016 sources, or NEW,
designed for 2026.

- Correct tap: add the stable target ID to foundItemIds[course], check its named row,
  update the derived count, and show a provisional `+$1 Find Bonus` only when that ID
  is not in assistedItemIds. A standard item uses compact inline feedback; one of the
  one of the 20 designated educational items uses the nonblocking fact strip and adds
  its ID to factsUnlocked. RECOVERED trigger; NEW feedback replacing 60 blocking
  modals.
- Wrong tap: budget = max(0, budget − 2), append the transaction, misses +1, show the
  error ring and lock scene input for 1 second. NEW. The balance never becomes debt.
- Hint, available only when budget is at least 20 and activeHintItemId is null:
  budget −= 20, append the transaction, select one remaining target, add its ID to
  assistedItemIds and set activeHintItemId. Shimmer it until found. When budget is
  below 20 the disabled label reads `Need $20`. RECOVERED cost; NEW affordability and
  assisted-find bookkeeping.
- foundItemIds[course] reaches 15: findBonus[course] = 15 minus the number of unique
  assisted IDs in that course; append that bonus to the ledger exactly once, clear
  activeHintItemId, and go to level-complete. The range is $0 to $15. RECOVERED
  15-item completion; NEW untimed Find Bonus.
- level-complete continues to shop-ladder for that course's key ingredient.
  RECOVERED sequence.
- Tier row is selectable only if tier price is less than or equal to budget.
  Unaffordable rows render disabled with the shortfall shown. NEW gate. In 2016
  every row was tappable regardless of budget.
- Buy tier n: budget −= price, tierBought[course] = n, go to purchase-confirm, then
  course-hub. RECOVERED purchase flow.
- All four foundItemIds sets contain 15 IDs and all four tierBought values are not −1:
  enable Prepare Meal and go to prep-station only when the player selects it.
  RECOVERED trigger.
- prep-station: use the ingredient bundles in section 10.4. Place by drag OR
  tap-select then tap-place. Invalid placement snaps back with a station label and no
  money penalty. When a station has its required bundle the player explicitly starts
  it, watches the labelled gauge, and explicitly finishes it. NEW input parity;
  RECOVERED gauge and pull interaction.
- Fryer: resolve three batches in order, pakoda, thaali vegetables, then gulab jamun
  balls. Preserve all three outcomes and average them, rounded to the nearest integer,
  for the fryer's one 0-to-2 station score. The next batch cannot load until the
  previous one resolves.
- Roti station: ingredients to dough to roti maker to pan to resolved. Each substage
  is visible; do not collapse it into one automatic animation.
- All five station responsibilities resolved: go to plating, not directly to verdict.
- Plating: place chai, pakoda, vegetables, rotis, rice and gulab jamun into six named
  slots by drag or tap-select then tap-place. Vegetables, rotis and rice combine as
  the one thaali entree. Enable Present Dish after all six are placed. Present Dish
  saves the run, reveals the finished plate, then goes to verdict.
- Verdict scoring: ingredientScore = sum of tierBought[0..3], max 12. cookScore = sum
  over 5 appliances of 2 if pulled in ready, 1 if heating or overcooking, 0 if raw or
  burnt, max 10. total = ingredientScore + cookScore, max 22. NEW rubric, arithmetic
  designed for 2026. RECOVERED inputs: the 2016 Help copy names ingredient quality
  and cooking performance as two of its three judged inputs. The third input, time,
  is dropped here because this build is untimed by design, so the 22 point ceiling
  and the two-input rubric are both NEW.
- Star bands, NEW: 20 to 22 = 5 stars. 16 to 19 = 4. 11 to 15 = 3. 6 to 10 = 2. 0 to
  5 = 1.
- Verdict action See Restaurant Row: persist current and best stars, set
  restaurantsUnlocked to min(6, value + 1), return to the map, and show Taj Mahal as
  Completed plus slot 2 as New/Unlocked. A new restaurant receives a fresh $100; do
  not add it to Taj Mahal's remaining balance. RECOVERED progression.
- Verdict action Replay Taj Mahal: preserve bestStars and campaign unlocks, reset only
  the Taj Mahal run state, and return to its course hub with $100. NEW explicit replay
  semantics.
- Verdict action Continue Later: save exact state and return to title, where Continue
  resumes it. NEW explicit save semantics.

---

## 6. ECONOMY CHECK

| Measure | Arithmetic | Value |
|---|---|---|
| Starting budget | fixed | 100 |
| Find Bonus ceiling | 4 x 15 unaided finds | 60 |
| Gross funds ceiling | 100 + 60 | 160 |
| Cost of every top tier | 45 + 35 + 65 + 22 | 167 |

The consequence is intentional: even a perfect unaided hunt produces $160 before
spending, $7 less than all four premium tiers. The player must make at least one
quality tradeoff. The Figma golden path uses Red Label Marigold $45, Fresh Ground
$35, Tilda $40 and Roasted Fine $22. With four $15 bonuses its visible ledger is:

`$100 → +15 −45 = 70 → +15 −35 = 50 → +15 −40 = 25 → +15 −22 = 18`

That path earns ingredientScore 11. Perfect cooking adds 10 for 21 total, a 5-star
result. Hints and wrong taps can reduce available money further, but the free tier in
every ladder prevents a purchase dead end. Every balance shown in Figma must derive
from transactions, never from manually typed totals.

---

## 7. ZERO-TUTORIAL EXPERIENCE

There are no tutorial screens, coach marks, pulsing answers, forced practice rounds,
first-run captions or tutorial-only state. The normal interface explains every rule
every time it matters, so play starts immediately and returning players lose nothing.

- Title: Play is primary on a new save. Continue, when a save exists, includes the
  exact location, for example `Taj Mahal · Beverage 6/15`. Help is always optional.
- Map: the Chef's Challenge story is a concise inline mascot ribbon. It does not
  block restaurant selection and has no Continue button.
- Course hub: reads `Choose a course`, shows four cards with `0/15` to `15/15`, keeps
  `Restaurant budget $100` visible, and states `Finish 4 courses to cook the meal`.
  Beverage occupies the first reading position, but all unfinished courses are open.
- Hunt: always shows the 15 real names, found count, Budget, `Hint −$20`, and
  `Miss −$2`. The first scene contains an attainable object but never outlines or
  pre-reveals it.
- Find feedback: object ring, checkmark, count, sound/haptic if enabled, and
  provisional `+$1 Find Bonus`. Educational facts use the nonblocking strip and Facts
  log; nothing requires an OK tap before the next find.
- Shop: every tier always shows quality, cost and resulting balance. Unaffordable
  rows remain visible and disabled. Selection previews the result; Buy confirms it.
- Cooking: bundles and stations are named, empty slots communicate matching, gauge
  zones are labelled Heating, Ready, Overcooking and Burned, and Start/Finish are
  explicit. No instruction overlay is needed.
- Judgment: ingredient and cooking points are visible before the player chooses the
  next action.

Help remains six optional topics and returns to the exact state that opened it.

---

## 8. iPadOS 26 LAYER

- Content first. Full bleed hunt scenes stay dominant.
- Liquid Glass on pause, help and compact status controls only. Lists, prices, story
  cards and gauges stay opaque. Never over a hunt scene.
- Input parity: touch, Apple Pencil, pointer, keyboard, VoiceOver and Switch Control
  can each complete the entire journey. Dragging is never required anywhere.
- No colour only meaning. Every gauge zone carries a text label. Progress is stated
  as text as well as visually.
- Accessibility for the core genre problem: pinch to zoom, adjustable scene
  contrast, and an accessible spatial search cursor with named scenery regions.
  Moving the cursor announces what is under focus; Select tests that location.
  Checklist rows are references only and never jump to, reveal or complete a target.
  A paid Hint may add directional and focus guidance. This preserves the search
  mechanic instead of turning VoiceOver into a free answer list.
- Keyboard: arrows or WASD move focus, Space or Return selects, 1 through 5 focus
  cooking stations, Escape pauses or goes back. Controller uses directional focus,
  primary select and secondary back.
- Reduced Motion replaces sparkles, coin travel, critic reveal and map unlock motion
  with static state changes. Reduced Transparency replaces glass with opaque chrome.

---

## 9. TRANSITION TABLE

One row per edge.

| From | Trigger | To |
|---|---|---|
| title | tap Play, hasSave false | map with inline chef-challenge story ribbon |
| title | tap Continue, hasSave true | map |
| title | tap Help | help-sheet |
| help-sheet | tap Close | the screen that opened it |
| map | tap Taj Mahal | course-hub with inline restaurant-welcome ribbon, initialize $100 ledger, sets hasSave true |
| map | tap Help | help-sheet |
| course-hub | tap an incomplete course card | hunt-scene |
| course-hub | tap a completed course card | course review state, facts, purchase and ledger only; do not replay within run |
| course-hub | tap Help | help-sheet |
| hunt-scene | correct tap on a fact item | hunt-scene with nonblocking fact-strip state, no screen change |
| hunt-scene | correct tap on a non-fact item | hunt-scene with compact inline confirmation, no screen change |
| hunt-scene | wrong tap outside the 1 second cooldown | hunt-scene, inline penalty, no screen change |
| hunt-scene | tap Hint with budget at least $20 and no active hint | hunt-scene with one assisted target shimmering, no screen change |
| hunt-scene | foundItemIds[course] reaches 15 | level-complete, post Find Bonus once |
| level-complete | continue | shop-ladder |
| shop-ladder | tap an affordable tier row | purchase-confirm |
| purchase-confirm | continue | course-hub |
| course-hub | tap Prepare Meal after all four courses complete | prep-station |
| prep-station | all five station responsibilities resolved | plating |
| plating | place a component | plating with that slot complete, no screen change |
| plating | tap Present Dish after all six slots complete | verdict, save run before reveal |
| verdict | tap View score detail | verdict expanded score state, no screen change |
| verdict | tap See Restaurant Row | map, save best stars, unlock slot 2, next restaurant gets fresh $100 |
| verdict | tap Replay Taj Mahal | course-hub, reset Taj Mahal run only, preserve best stars and unlocks |
| verdict | tap Continue Later | title, exact state saved |
| any gameplay screen | tap Pause | pause-sheet |
| pause-sheet | tap Resume | the screen that opened it |
| pause-sheet | tap Help | help-sheet |
| pause-sheet | tap Leave restaurant | map, progress kept |

Any edge not in this table does not exist, do not invent a screen for it.

Scope boundary, read this before building the map. This specification builds
restaurant 1, Taj Mahal, in full: 4 courses, 60 items, 4 ladders, one verdict. The
verdict edge above increments restaurantsUnlocked and returns to the map, and the map
shows 6 restaurants unlocking in sequence with 3 slots reading Coming Soon. Content
for restaurants 2 to 6 is NOT in this document. It lives in JOURNEY.md. Build
restaurant 2's slot as visibly unlocked on the map and stop there. Do not invent
courses, items or ladders for restaurants 2 to 6.

---

## 10. DATA

### 10.1 Ingredient ladders

RECOVERED verbatim.

| Course | Key ingredient | Tier 1, free | Tier 2 | Tier 3 | Tier 4, premium |
|---|---|---|---|---|---|
| Beverage | Tea | Lipton, Free | TATA, $10 | Taj Mahal, $20 | Red Label Marigold, $45 |
| Appetizer | Gram flour | Generic, Free | MTR, $19 | Swad, $22 | Fresh Ground, $35 |
| Entree | Rice and wheat | Generic, Free | Great Value, $25 | Tilda, $40 | Dawat, $65 |
| Dessert | Semolina | Generic, Free | Uncut, $6 | Semi Roasted, $12 | Roasted fine, $22 |

Total cost of all four premium tiers: $45 + $35 + $65 + $22 = $167.

### 10.2 The 60 items

15 per level, 4 levels, 60 total. Five per level are marked as educational fact items
in bold. They use the nonblocking fact-strip state. The other ten use compact inline
confirmation. All 60 remain real interactive finds.

**LEVEL 1, Grocery, Beverage, Chai tea.** **Milk**, Sugar, **Black Tea Leaves**,
**Fresh Ginger**, **Green Cardamom Pods**, Cinnamon Sticks, Whole Cloves, Black
Peppercorns, Fennel Seeds, Star Anise, Nutmeg, **Tulsi Leaves**, Saffron Threads,
Honey Jar, Tea Strainer.

**LEVEL 2, Produce Market, Appetizer, Pakoda.** Cooking Oil, **Bell Peppers**,
**Gram Flour (Besan)**, Potato, Red Onion, Spinach, Eggplant, Cauliflower, Green
**Chilies**, **Fresh Coriander**, Ginger, Garlic, **Turmeric Tin**, Cumin Seeds, Salt
Shaker.

**LEVEL 3, Dinner Table, Entree, Thaali.** **Spices (Spice Box)**, **Vegetables
(Basket)**, **Basmati Rice**, **Wheat Flour**, **Lentils**, Chickpeas, Potato, Tomato,
Onion, Spinach, Cauliflower, Carrot, Green Peas, Yogurt Bowl, Ghee Jar.

**LEVEL 4, Bakery, Dessert, Gulab Jamun.** **Rose Water**, **Semolina**, **Milk Powder**,
All-Purpose Flour, Baking Powder, Sugar, Ghee, Green Cardamom Pods,
**Saffron Threads**, Pistachios, Almonds, Dried Rose Petals, Sugar Syrup Jug,
**Khoya (Milk Solids)**, Lemon.

Note: several items repeat across levels, for example Potato, Spinach, Cauliflower,
Sugar, Saffron Threads and Green Cardamom Pods. This is an asset reuse opportunity
in Figma, one component per ingredient reused across scenes.

Note, NEW, resolved change to the Level 4 list: the working list for Level 4
previously carried "Dough Balls" and "Finished Gulab Jamun" as items 14 and 15,
which meant the player found the finished dessert before cooking it, a logic break.
Both are now replaced. "Dough Balls" becomes **Khoya (Milk Solids)**, and "Finished
Gulab Jamun" becomes **Lemon**. Both replacements are raw ingredients that genuinely
belong in a bakery scene and are genuinely used in gulab jamun: khoya, milk reduced
to its solids, is the base the dough is kneaded from, and its absence from the
original list was a real gap, not a stylistic omission. Lemon is added to the sugar
syrup to stop it crystallising. The player no longer finds the finished dish before
making it. This resolves what would otherwise have been an open question for the
owner, it is recorded here as a decided NEW change, not a flag.

### 10.3 Fact item copy

Fact text for the 20 designated items, five per level. Copy is intentionally short
enough for the nonblocking strip and persistent Facts log.

**Level 1, Chai**

- Milk: Simmered with tea, sugar and spices, milk gives this house chai its body and
  softens the tea's bitterness.
- Black Tea Leaves: Strong black tea holds its flavour after milk and spices are
  added, which is why it anchors this chai.
- Fresh Ginger: Sliced or crushed ginger releases bright aroma and warming heat as
  it simmers.
- Green Cardamom Pods: Whole pods are lightly crushed, simmered, then strained out
  before serving.
- Tulsi Leaves: Tulsi, also called holy basil, adds a fresh herbal note to this
  restaurant's house chai.

**Level 2, Pakoda**

- Bell Peppers: Their sweetness and colour balance the chilli and spices in this
  restaurant's mixed-vegetable pakoda.
- Gram Flour (Besan): Milled from chickpeas, besan binds the vegetables and fries
  into the pakoda's crisp coating.
- Green Chilies: A small amount adds fresh heat; the quantity can change to suit the
  cook and the diner.
- Fresh Coriander: Chopped leaves add a bright herbal finish to the batter and the
  plated pakoda.
- Turmeric Tin: A pinch seasons the batter and adds its warm golden colour.

**Level 3, Thaali**

- Spices (Spice Box): A masala dabba keeps frequently used spices together in small
  inner containers beside the stove.
- Vegetables (Basket): A thaali is a meal format, so its vegetable dishes vary by
  region, season and household.
- Basmati Rice: Its long grains and aroma make it a distinct rice choice for the
  meal, not a generic side.
- Wheat Flour: Whole-wheat atta becomes the dough for the thaali's rotis.
- Lentils: Cooked lentils become dal, one of the components that makes a thaali feel
  complete and sustaining.

**Level 4, Gulab Jamun**

- Rose Water: A few drops perfume the sugar syrup, so the floral note is absorbed
  after frying.
- Semolina: This Taj Mahal house recipe uses semolina in the dough; gulab jamun
  recipes vary and do not all use it.
- Milk Powder: It enriches the milk-solid base and helps the house dough stay soft.
- Saffron Threads: Here the same spice from the chai course perfumes and colours the
  dessert syrup.
- Khoya (Milk Solids): Milk is slowly reduced to concentrated solids, forming the
  traditional base of many gulab jamun doughs.

### 10.4 Cooking bundles, dependencies and outputs

All 60 finds enter the restaurant collection. Cooking groups them into named bundles
instead of asking for 60 individual placements. Opening any bundle lists its source
finds, so the hunt-to-cook connection remains visible.

| Station | Load and dependency | Output |
|---|---|---|
| Boiler | Milk + Sugar + purchased Tea + Chai Spice Bundle; finish with Tea Strainer | Chai |
| Fryer, batch 1 | Pakoda Batter + Pakoda Vegetables + Cooking Oil | Pakoda |
| Fryer, batch 2 | Thaali Vegetable Base | Cooked vegetables |
| Fryer, batch 3 | Gulab Jamun Dough formed into balls | Fried gulab jamun balls |
| Roti maker + pan | Purchased Wheat allocation + Ghee; dough → maker → pan | Rotis |
| Steamer / rice cooker | Purchased Rice allocation + selected spices | Rice |
| Saucepan | Fried balls from fryer + Gulab Jamun Syrup; station slotted spoon transfers them | Gulab jamun |

Bundles:

- Chai Spice Bundle: Fresh Ginger, Green Cardamom Pods, Cinnamon Sticks, Whole
  Cloves, Black Peppercorns, Fennel Seeds, Star Anise, Nutmeg, Tulsi Leaves and
  Saffron Threads. Honey Jar belongs to the Chai liquid group.
- Pakoda Batter: purchased Gram Flour tier, Turmeric, Cumin, Salt, Ginger and Garlic.
  Pakoda Vegetables: Bell Peppers, Potato, Red Onion, Spinach, Eggplant, Cauliflower,
  Green Chilies and Fresh Coriander.
- Thaali Vegetable Base: Spices, Vegetables, Lentils, Chickpeas, Potato, Tomato,
  Onion, Spinach, Cauliflower, Carrot, Green Peas, Yogurt and Ghee.
- Purchased Rice and Wheat tier splits into one rice allocation and one wheat
  allocation; it is paid for once.
- Gulab Jamun Dough: Khoya, purchased Semolina, saved Gram Flour allocation, Milk
  Powder, All-Purpose Flour, Baking Powder, Sugar, Ghee and Green Cardamom. The player
  creates the dough balls here; they are never pre-found objects.
- Gulab Jamun Syrup: Rose Water, Sugar Syrup Jug, Saffron, Dried Rose Petals and
  Lemon. Pistachios and Almonds are plating garnish.

The five station responsibilities score 0 to 2 each. The fryer's three batch outcomes
are averaged and rounded for its one station score. The six plate components are
chai, pakoda, vegetables, rotis, rice and gulab jamun; vegetables, rotis and rice
combine as the single thaali entree.

### 10.5 The five critic reviews

RECOVERED from `JOURNEY.md`. The 5 star text is the recovered 2016 copy with its
typos corrected. The 4, 3, 2 and 1 star reviews are NEW, written in the same voice.

**5 stars.** This meal was a masterpiece! It was exactly what you want from a great
Indian restaurant. Right from the start, I could tell this meal was prepared with the
finest and freshest ingredients available. Everything was cooked to perfection, and
the chai tea especially was prepared beautifully. The presentation was polished and
professional. What a wonderful culinary experience.
This chef has a bright future ahead, both for this contest and beyond! Jump into the
next adventure and explore more skills. Good luck!

**4 stars.** This was a very good meal, and I left happy. The kitchen clearly knows
what it is doing. The seasoning was confident, and most of the plate arrived exactly
as it should. A few things were held a moment too long on the heat, and one or two
ingredients felt like a small economy rather than a choice. Nothing here was wrong.
It simply was not yet perfect. Tighten the heat control, spend where it shows, and this
becomes a five star kitchen. I would happily book the table again.

**3 stars.** A solid, honest meal. Nothing on this table embarrassed itself, and
nothing on it surprised me either. The cooking was competent but uneven, some of it
right on the mark and some of it a little past it, and the shopping showed: several
ingredients were the safe, cheap version of themselves. There is a real cook back
there, I can taste it. Spend a little more on what goes into the pan, watch the heat
more closely, and this kitchen has somewhere to go. I would like to see the next
attempt.

**2 stars.** I wanted to like this more than I did. The idea of the meal was right,
but the execution kept getting in its own way. Dishes arrived either underdone or
pushed well past their moment, and the ingredients had clearly been chosen for the
price tag rather than for the plate. There were flashes, a moment in the entree
where you could see exactly what was intended. Those flashes are the reason to come
back. Slow down, buy better, cook to the middle of the gauge, and the next visit
could be to a different restaurant entirely.

**1 star.** I will be blunt, because the chef deserves honesty. This meal was not
ready to be served. The ingredients were the cheapest on the shelf and tasted like
it, and almost nothing left the heat at the right moment. The kitchen lost control
of the gauges, and the plate showed it. I am not writing this to be cruel.
Every chef I admire has cooked a meal like this one, once, and learned more from it
than from any success. Go back, take your time, and buy the good tea. I will be
waiting for the second attempt.

### 10.6 Help sheet topics

Six paginated topics, NEW organisation of RECOVERED rules, matching section 8's
accessibility requirements on the sixth page.

1. The Challenge. Restaurant Row's Chef's Challenge, KhannaTown, the goal.
2. Finding items. How taps, misses and hints work.
3. The budget. One shared $100 pool across all four courses.
4. Choosing ingredients. The four tier ladder, and why the best of everything is
   not always affordable.
5. Cooking. Bundles, station dependencies, labelled doneness ranges, Start and Finish.
6. Accessibility. Pinch to zoom, scene contrast, VoiceOver spatial search, and full
   input parity across touch, Apple Pencil, pointer, keyboard, controller, VoiceOver
   and Switch Control.

---

## 11. FIGMA MAKE DELIVERY AND ACCEPTANCE

Use `FIGMA-MAKE-RUNBOOK.md` for the exact low-credit sequence and copy-ready prompts.
The first Make prompt receives only this specification, `share/guidelines.md`,
`share/CookInQuest_Figma_Reference.pdf`, and `drop/Logo_icon.png`. The PDF is visual
reference only and contains legacy screens whose mechanics must not override this
document. Do not attach the 41 MB original PDF; Figma Make limits PDFs to 5 MB.

The build is acceptable only when all statements below pass in Preview:

- Phase 0 through Phase 6 is navigable without a tutorial, timer or mode choice.
- Four data-driven hunts expose exactly 15 named targets each, 60 unique course-scoped
  IDs total, with 20 nonblocking educational fact strips.
- Every hint, miss, Find Bonus and purchase produces one ledger transaction, and the
  displayed budget always equals the final `balanceAfter` value.
- Four shops use the exact brands and prices, with visible affordability and free
  fallback tiers.
- Cooking includes five scored station responsibilities, all three fryer batches,
  the full roti substage, six plate components and Present Dish.
- Judgment calculates Ingredient Quality /12 plus Cooking /10, assigns the specified
  1-to-5-star band, and contains no hidden time score.
- See Restaurant Row, Replay Taj Mahal and Continue Later preserve and reset exactly
  the state defined in sections 4 and 5.
- Regular and compact layouts, minimum-width override, 44-point controls, keyboard,
  controller, VoiceOver, Reduced Motion and Reduced Transparency all work.
- The implementation contains 14 reusable templates and state/data instances rather
  than 60 separately coded hunt screens.
