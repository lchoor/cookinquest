# CookIndia Quest — Journey, State Model and Content Spec

The canonical plan for rebuilding the 2016 iPad Mini hidden-object game as a playable
prototype. Everything below is either **RECOVERED** (traceable to the 2016 research deck,
wireframe deck, or final prototype) or **NEW** (designed in 2026 to fill a documented gap).
Every rule and every content row carries one of those two labels. The portfolio case study
must be able to point at this file and say honestly which half was original.

Sources for all RECOVERED material: `FLOW-MAP.md`, `GAME-RULES.md`, `BUILD-SPEC.md`,
`prepped/PROTO-ASSETS.md`, `prepped-wf/WF-ASSETS.md`.

Fixed constraints set by the project owner, not up for revision here:

1. Full game scope. Multiple courses **and** multiple restaurants.
2. Faithful to the 2016 art. Reuse `prepped/` and `prepped-wf/`. Do not modernise.
3. Real brand names kept verbatim. No fictional substitutes.

Device frame throughout: **iPad Mini, landscape, 1024 x 768**.

---

## 1. The player journey

Nine phases. For each: what the player sees, what they decide, what it costs, what they
feel, and what the game is teaching. The teaching column is the spine of the design. The
game never states its lesson out loud, it prices things and then judges the result.

### Phase 0 — Cold launch (RECOVERED)

**Sees.** The app icon: a chef's toque on a blue rounded square, a tricolour turban band
across it, the plate centre reading as the Indian flag. Tapping it opens the logo lockup
card (orange and red gradient, hand-lettered "CookIndia Quest"), then the title screen: the
chef mascot, the logo, and a torn-paper menu reading PLAY, OPTIONS, QUIT, Help.

**Decides.** Four doors. Only PLAY continues the loop. Help is six paginated pages: the map,
the menu of four courses, finding items, the hint and budget economy, and two pages of meal
preparation. OPTIONS holds two volume sliders, Clear Saved Game, Support, Done.

**Costs.** Nothing.

**Feels.** Warm, hand-made, a little homespun. The torn paper and the hand lettering promise
something crafted rather than slick. This is deliberate and must survive the rebuild.

**Teaches.** Nothing yet, but the Help modal is where every economic rule in the game is
actually stated. A player who skips Help walks into phase 3 not knowing a hint costs $20.
That is a real onboarding weakness in the original and the rebuild should preserve it rather
than paper over it, because the case study argues that the lesson is in the ledger.

### Phase 1 — Mode choice (RECOVERED screen, NEW mechanics)

**Sees.** A popup over the KhannaTown map asking whether to play Timed or Relaxed, with the
pause sidebar behind it summarising the goal: create meals of six different cuisines at
several different restaurants, and replay any restaurant to try for a better review.

**Decides.** The single most consequential decision in the game, and in 2016 it had no
defined mechanical effect at all. Now it does:

| Mode | Hunt countdown | Speed Bonus | Time Bonus | Prep round clock | Time points in rating |
|---|---|---|---|---|---|
| **Timed** | Yes, 180 s per hunt | Live | Live | Clocked, 120 s par | Earned, 0 to 3 |
| **Relaxed** | None | Live | **Off** | Unclocked | Flat 2 of 3 awarded |

**Costs.** Relaxed forfeits up to $18 per hunt, so up to $72 across a restaurant, and caps
its rating ceiling at 24 of 25 points rather than 25.

**Feels.** At the moment of choosing it feels like a comfort setting. It is a wager.

**Teaches.** That comfort is priced. A Relaxed player will reach the first shopping list with
less money and will notice the premium tea is now out of reach. The lesson arrives as a
number, not as a warning.

### Phase 2 — Arrival (RECOVERED)

**Sees.** The quest welcome popup introduces KhannaTown and the Restaurant Row Chef's
Challenge. Dismissing it reveals the map: a 3 x 3 grid of nine restaurant slots. One is
unlocked, eight are padlocked.

**Decides.** Nothing. There is exactly one tappable restaurant. This is intentional.

**Feels.** Anticipation, and a faint frustration at the eight locks. The frustration is the
progression hook.

**Teaches.** The shape of the whole game in one screen. Nine slots, one open, therefore
eight more evenings of this.

### Phase 3 — The restaurant menu (RECOVERED)

**Sees.** The restaurant card art and four course tiles: Beverage, Appetizer, Entree,
Dessert. Each tile names its dish and carries an X/15 found-items counter, all starting at
0/15. A budget chip reads **$100**. Sidebar copy, verbatim: *"Select a course to search for
the required ingredients. Clear all four courses to advance to the meal preparation round."*

**Decides.** Which course to hunt first. The order is free. Nothing in the UI enforces a
sequence, and the Help copy explicitly permits skipping between courses when stuck.

**Costs.** Nothing yet, but this is where the $100 is first seen and where it is seen again
between every course, shrinking.

**Feels.** In control. Four tasks, a visible budget, a clear finish line.

**Teaches.** That the budget is a single shared pool across all four courses. Every hint
bought in the Beverage hunt is tea the player cannot afford later.

> Note on the original: the tile reads **"Desert"** throughout the 2016 build, not
> "Dessert". The rebuild corrects it and documents the typo, matching the convention already
> used for the 5-star review text. The original spelling is preserved in the case study
> screenshots.

### Phase 4 — The hunt (RECOVERED screen, NEW penalty and timing)

**Sees.** A full-bleed photographic scene: an Indian grocery aisle, a market stand, a laid
dinner table, a bakery case. A sidebar lists the 15 items to find, strikes each through in
red as it is found, and carries a **Hint $20** button, the budget chip, and in Timed mode a
countdown from 180 seconds.

**Decides.** Search, or pay. Every time the player stalls, the $20 hint button is right
there. In 2016 the hint cost exactly what mid-tier Taj Mahal tea cost, and that coincidence
is the whole argument of the case study.

**Costs.**
- Hint: **−$20**, RECOVERED. Refused if budget is under $20.
- Wrong tap: **−$2**, NEW, with a **1 second cooldown** so that rapid tapping cannot drain
  the budget faster than about $2 per second, and so that a mis-tap during a genuine search
  is cheap while spray-tapping is not a viable strategy.

**Feels.** The good HOG feeling: absorbed, slightly squinting, occasionally triumphant. Then
the specific CookIndia Quest feeling, which is the small wince at pressing Hint.

**Teaches.** Patience is literally worth money. The survey behind the original game found
that "not enough hints" was a top pain and "time limit" close behind. The design answer was
not to give more hints, it was to give unlimited hints at a price the player can feel.

### Phase 5 — The clear bonus (RECOVERED screen, NEW formula)

**Sees.** A CONGRATULATIONS popup: *"You found all of the hidden objects in this location."*
Then three lines: Speed Bonus, Time Bonus, Total Bonus. The budget chip ticks up.

**Decides.** Nothing. This is a reward beat, and its job is to make the next screen hurt.

**Costs.** Nothing. It pays.

**Feels.** Relief and a small flush of wealth. Followed, five seconds later, by the shopping
list, which is where the wealth evaporates.

**Teaches.** That money is earnable, which is what makes spending it a real choice rather
than a countdown. See section 5 for the formula and its sanity check.

### Phase 6 — The shopping list (RECOVERED)

**Sees.** The ingredient photo, a four-tier price ladder, and the sidebar copy, verbatim:
*"Every chef knows the best ingredients are the key to a successful meal. Choose the item you
would like to purchase. Spend your money wisely, you may need it later."*

**Decides.** The central decision of the entire game. Free generic, or one of three named
brands at rising prices. Tapping a tier highlights it red, then a purchase confirmation
screen states what was bought and deducts the money.

**Costs.** $0 to $65 depending on tier and course.

**Feels.** Genuinely uncomfortable the first time. "Spend your money wisely, you may need it
later" is the only warning the game gives, and it does not say what for.

**Teaches.** The thesis. The game never tells the player that better ingredients make better
food. It charges for them and then judges the result. A player who buys all four premium
tiers at TajMahal spends $167 of a $100 budget plus roughly $95 of bonus income and walks
into the cooking round with about $16 and no affordable hint left. That is not a bug in the
economy, that is the economy.

### Phase 7 — Meal preparation (RECOVERED screen, NEW scoring)

**Sees.** An 11-chip ingredient toolbar and five appliances, each with a doneness gauge that
travels blue for raw, through green, into red for burnt. Sidebar instruction, verbatim from
the original including its typo: *"Drag items from the foolbar to the meal preparation
area."* The rebuild corrects this to "toolbar" and documents the original.

**Decides.** When to pull each of the five dishes off the heat. The gauge blinks and sounds
as it approaches green. Green is a window, not a point.

**Costs.** No money. This phase spends attention instead, and it is the only phase where
money cannot buy a way out. A player who overspent still has to cook.

**Feels.** The tension flips. Phases 3 to 6 were slow and deliberate. This is five timers at
once, and it is where a careful shopper can still lose their rating.

**Teaches.** That the three inputs the game promised to judge are genuinely independent. The
Help copy states them verbatim: *"This rating will take into account the quality of your
ingredients, your performance in preparing the meal, and the amount of time required to
finish."* Money buys one of the three. It cannot buy the other two.

### Phase 8 — The verdict (RECOVERED screen, NEW rubric and 4 of 5 reviews)

**Sees.** The assembled dish, chai cup and thali plate, framed. Then the rating screen: a
1 to 5 star result and a written review in the voice of a restaurant critic.

**Decides.** Whether to accept the rating or replay. Replay is free and unlimited, stated
twice in the original: *"You can go back and replay that restaurant at any time to try for a
better rating."*

**Costs.** Nothing. There is no fail state anywhere in this game, by design. The cheapest
tier is always free, hints are never capped, and no rating is a loss. The only punishment is
a worse review.

**Feels.** Judged, warmly. The critic voice is candid but never cruel, and every band ends
with a forward-looking line.

**Teaches.** The retroactive lesson. A 3-star review that says the shopping showed sends the
player back to the shopping list with new eyes. This is the loop the whole design exists to
create, and it only works because the review names the cause.

### Phase 9 — Progression and the long arc (RECOVERED rule, NEW structure)

**Sees.** Back to the map, with the next restaurant unlocked. Fresh $100 budget, new cuisine,
same nine-slot grid. Unlock rule, verbatim: *"When you begin the game, there is only one
restaurant available. Once you complete each restaurant, a new one will open up."*

**Decides.** Push forward, or go back and beat a 3-star restaurant into a 5.

**Feels.** By restaurant 3 the player has internalised the economy and starts playing it
rather than reacting to it: skipping hints deliberately to bank a premium tier, choosing
Timed for the income even though it is harder.

**Teaches.** Everything the first restaurant taught, now applied under a tighter budget of
attention. The arc across six restaurants is: **learn the rules, feel their cost, then play
them on purpose.**

**Resolution of the 6-versus-9 contradiction (NEW).** The original sidebar says "six
different cuisines" while the map shows nine slots. The rebuild ships **9 map slots, 6
playable restaurants unlocking strictly in sequence, and 3 slots permanently labelled
"Coming soon"**. Both original artefacts survive intact and neither has to be called wrong.

---

## 2. The state model

Everything the prototype must track. Names are the implementation names. Figma Make and the
later HTML build should implement this list exactly.

### 2.1 Session state

| Name | Type | Initial | Mutated by |
|---|---|---|---|
| `mode` | `"timed" \| "relaxed"` | `null` | Phase 1 mode choice. Set once per session, persists across restaurants. |
| `musicVolume` | int 0 to 100 | `70` | Options slider. |
| `soundVolume` | int 0 to 100 | `70` | Options slider. |
| `saveExists` | bool | `false` | Set true on first restaurant entry. Set false by Clear Saved Game. |
| `helpPage` | int 0 to 5 | `0` | Help modal dot navigation. |

### 2.2 Progression state

| Name | Type | Initial | Mutated by |
|---|---|---|---|
| `restaurantsUnlocked` | int 1 to 6 | `1` | Incremented on first completion of restaurant N, capped at 6. |
| `currentRestaurant` | int 1 to 6 | `null` | Map tap. |
| `restaurantResults` | array[6] of `{ completed: bool, stars: int, budgetLeft: int, mode: string }` | 6 x `{false, 0, 0, null}` | Written on the rating screen. Overwritten on replay only if `stars` improves. |
| `comingSoonSlots` | int[] | `[7, 8, 9]` | Never mutates. Rendered padlocked with a "Coming soon" ribbon. |

### 2.3 Per-restaurant run state

Reset in full every time a restaurant is entered, including on replay.

| Name | Type | Initial | Mutated by |
|---|---|---|---|
| `budget` | int, dollars | `100` | `+totalBonus` on hunt clear. `-20` per hint. `-2` per wrong tap. `-tierPrice` on purchase. Floor at `0`, never negative. |
| `currentCourse` | int 0 to 3 | `null` | Course hub tap. |
| `courses` | array[4] of the course object below | see below | See below. |
| `runStartedAt` | timestamp | set on restaurant entry | Restaurant entry. |

**Course object**, one per course, index 0 = Beverage, 1 = Appetizer, 2 = Entree, 3 = Dessert:

| Field | Type | Initial | Mutated by |
|---|---|---|---|
| `foundItems` | bool[15] | 15 x `false` | Correct tap on a scene hotspot. |
| `foundCount` | int 0 to 15 | `0` | Derived from `foundItems`. Drives the X/15 tile counter. |
| `hintsUsed` | int | `0` | Hint button press, only if `budget >= 20`. |
| `unhintedFinds` | int 0 to 15 | `0` | Incremented on a correct tap **only when that item was not the target of a hint**. Drives Speed Bonus. |
| `wrongTaps` | int | `0` | Incorrect tap, only when the cooldown has elapsed. |
| `lastWrongTapAt` | timestamp | `0` | Set on a charged wrong tap. A wrong tap within 1000 ms of this is registered visually but costs $0. |
| `huntElapsedMs` | int | `0` | Ticks while the hunt scene is open. Paused by popups and the pause menu. |
| `huntRemainingMs` | int | `180000` in Timed, `null` in Relaxed | Counts down in Timed only. At zero the hunt continues with Time Bonus locked to $0. There is no fail state. |
| `speedBonus` | int, dollars | `0` | Computed on hunt clear. |
| `timeBonus` | int, dollars | `0` | Computed on hunt clear. `0` in Relaxed. |
| `totalBonus` | int, dollars | `0` | `speedBonus + timeBonus`. |
| `purchasedTier` | int 0 to 3, or `null` | `null` | Shopping list selection. 0 = free generic, 3 = premium. |
| `complete` | bool | `false` | True when `foundCount === 15 && purchasedTier !== null`. Turns the tile 15/15. |

### 2.4 Prep round state

| Name | Type | Initial | Mutated by |
|---|---|---|---|
| `prepStartedAt` | timestamp | set on entering prep station | Prep intro dismissal. |
| `prepElapsedMs` | int | `0` | Ticks while the prep station is open. |
| `prepParMs` | int | `120000` | Constant. |
| `toolbar` | array[11] of `{ id, label, placed: bool }` | 11 chips, all `placed: false` | Drag onto an appliance. |
| `appliances` | array[5] of the appliance object below | see below | See below. |
| `prepComplete` | bool | `false` | True when all 5 appliances have `pulledBand !== null`. |

**Appliance object**, one per station, index 0 = Pot, 1 = Fryer, 2 = Tawa, 3 = Rice cooker,
4 = Saucepan:

| Field | Type | Initial | Mutated by |
|---|---|---|---|
| `loadedIds` | string[] | `[]` | Ingredient chip dropped on it. |
| `cooking` | bool | `false` | True once its required bundle is fully loaded. |
| `doneness` | float 0 to 100 | `0` | Rises at 100 / 18000 ms while `cooking`, so a full sweep takes 18 s. |
| `pulledAt` | float or `null` | `null` | Set to the `doneness` value at the moment the player drags the dish off. |
| `pulledBand` | `"raw" \| "green" \| "amber" \| "burnt" \| null` | `null` | Derived from `pulledAt`. Bands: raw 0 to 44, amber 45 to 59, green 60 to 79, amber 80 to 89, burnt 90 to 100. |

The gauge blinks and plays a cue when `doneness` crosses 55, giving the player a five point
warning before the green band opens. RECOVERED behaviour: *"a blinking light and sound signal
near-completion; the player must drag the item off while the meter is in the green zone."*

### 2.5 Rating state

| Name | Type | Initial | Mutated by |
|---|---|---|---|
| `ingredientPoints` | int 0 to 12 | `0` | Computed at rating time. |
| `cookingPoints` | int 0 to 10 | `0` | Computed at rating time. |
| `timePoints` | int 0 to 3 | `0` | Computed at rating time. Flat `2` in Relaxed. |
| `totalPoints` | int 0 to 25 | `0` | Sum of the three. |
| `stars` | int 1 to 5 | `0` | Banded from `totalPoints`. |
| `reviewText` | string | `""` | Looked up by `stars`. |

---

## 3. The screen list

All 21 templates from `FLOW-MAP.md`. **UNIQUE** means build it once and it never varies by
data. **TEMPLATE** means build the layout once and instantiate it N times from the data
tables in section 6. The instantiation counts are the whole reason this build is affordable:
21 templates carry roughly 250 screen states across six restaurants.

| # | Screen | Kind | Instances at full scope | Notes |
|---|---|---|---|---|
| 1 | `title-screen` | UNIQUE | 1 | Torn-paper menu. Mascot. RECOVERED art: `title-screen.jpg`. |
| 2 | `options-modal` | UNIQUE | 1 | Two sliders, Clear Saved Game, Support, Done. |
| 3 | `clear-save-confirm` | UNIQUE | 1 | Yes / No. |
| 4 | `help-modal` | TEMPLATE | 6 pages | One modal shell, 6 content states, 6 dots. RECOVERED page 4 art: `help-economy.jpg`. |
| 5 | `mode-choice` | UNIQUE | 1 | Timed / Relaxed. RECOVERED art: `mode-choice.jpg`. |
| 6 | `quest-welcome` | UNIQUE | 1 | RECOVERED art: `quest-welcome.jpg`. |
| 7 | `map-restaurant-row` | UNIQUE layout, 7 data states | 7 | One per unlock level 1 to 6, plus all-complete. RECOVERED art: `map-restaurant-row.jpg`. |
| 8 | `restaurant-welcome` | TEMPLATE | 6 | Name, cuisine line, card art per restaurant. |
| 9 | `course-hub` | TEMPLATE | 6 restaurants x 16 progress states | Four tiles, four counters, budget chip. RECOVERED art: `course-hub-start.jpg`, `course-hub-progress.jpg`. |
| 10 | `hunt-grocery` | TEMPLATE, archetype A | 6 | Grocery / shop-interior archetype. RECOVERED art: `hunt-grocery.jpg`. |
| 11 | `hunt-fruitstand` | TEMPLATE, archetype B | 6 | Open-air market / stall archetype. |
| 12 | `hunt-table` | TEMPLATE, archetype C | 6 | Laid table / working counter archetype. RECOVERED art: `hunt-table.jpg`. |
| 13 | `hunt-bakery` | TEMPLATE, archetype D | 6 | Sweet case / display archetype. RECOVERED art: `hunt-bakery.jpg`. |
| 14 | `found-item-popup` | TEMPLATE | 48 | 2 key items per course x 4 courses x 6 restaurants. RECOVERED art: `found-milk.jpg`. |
| 15 | `congratulations-bonus` | TEMPLATE | 24 | Pure data, no art variation. RECOVERED art: `bonus-congrats.jpg`. |
| 16 | `shopping-list` | TEMPLATE | 24 | Ingredient photo plus four price rows. RECOVERED art: `shop-tea.jpg`, `shop-tea-chosen.jpg`, `shop-rice.jpg`. |
| 17 | `purchase-confirmation` | TEMPLATE | 24 | Photo plus generated flavour text. |
| 18 | `prep-intro` | TEMPLATE | 6 | RECOVERED art: `prep-intro.jpg`. |
| 19 | `prep-station` | TEMPLATE | 6, each with 3+ live states | RECOVERED art: `prep-station.jpg`, `prep-loaded.jpg`, `prep-cooking.jpg`, `gauge-row.jpg`. |
| 20 | `final-dish` | TEMPLATE | 6 | RECOVERED art: `final-dish.jpg`. |
| 21 | `rating-screen` | TEMPLATE | 30 | 6 restaurants x 5 star bands. RECOVERED art: `rating-five-star.jpg`. |

**The affordability lever.** Screens 10 to 13 are **four scene archetypes, not 24 unique
photographs.** Restaurants 2 to 6 reuse the four RECOVERED scene images with a per-restaurant
colour grade and swapped hotspot maps. The sidebar item list, the item hotspots and the
course copy are what change. Building 24 original photographic scenes is the one thing in
this spec that would blow the budget, and it buys almost nothing the item list does not
already deliver.

**Component reuse across the 21.** Screens 2, 3, 4, 5, 6, 8, 14, 15, 17, 18 are all the same
torn-paper dialog shell with different content. In practice that is **12 things to build**,
which is how the Figma Make brief is structured. See `FIGMA-MAKE-BRIEF.md`.

---

## 4. The rating rubric

**RECOVERED**: the three inputs, stated verbatim in the original Help copy. *"This rating
will take into account the quality of your ingredients, your performance in preparing the
meal, and the amount of time required to finish."*

**RECOVERED**: the output is a 1 to 5 star rating with a written restaurant-critic review,
not a numeric score screen.

**NEW**: everything about how the three inputs become a number. No source states any
threshold, weight, or band. The entire rubric below is designed in 2026.

### 4.1 The 25-point rubric (NEW)

**Ingredient quality, 0 to 12 points.** Sum the purchased tier index across the four
courses. Free generic = 0, tier 2 = 1, tier 3 = 2, tier 4 premium = 3. Four premium
purchases = 12.

**Cooking performance, 0 to 10 points.** Per appliance, scored on `pulledBand`:

| Band | `doneness` at pull | Points |
|---|---|---|
| Green | 60 to 79 | **2** |
| Amber | 45 to 59, or 80 to 89 | **1** |
| Raw | 0 to 44 | **0** |
| Burnt | 90 to 100 | **0** |

Five appliances x 2 = 10.

**Time, 0 to 3 points.**

| Prep round finish | Points |
|---|---|
| At or under 120 s, the par | **3** |
| 121 s to 160 s, near par | **2** |
| 161 s to 200 s, over par | **1** |
| Over 200 s | **0** |

In Relaxed mode the prep round is unclocked and `timePoints` is awarded a flat **2**.

### 4.2 Star bands (NEW)

| Total points | Stars |
|---|---|
| 23 to 25 | 5 |
| 18 to 22 | 4 |
| 12 to 17 | 3 |
| 6 to 11 | 2 |
| 0 to 5 | 1 |

### 4.3 Why these numbers (NEW, design rationale for the case study)

The bands are set so that **money alone cannot buy five stars**. A player who buys all four
premium tiers but cooks badly and slowly scores 12 + 0 + 0 = 12, which is 3 stars. A player
who buys nothing but cooks perfectly and fast scores 0 + 10 + 3 = 13, also 3 stars. The two
opposite strategies land in the same band on purpose. Five stars requires both: at minimum
23 points, which means the player cannot skip more than one premium tier even with a flawless
prep round. That is the design thesis expressed as arithmetic.

One star is genuinely reachable, which matters. All free ingredients, all five dishes pulled
raw or burnt, prep round over 200 seconds: 0 + 0 + 0 = 0. A player who ignores the gauges
entirely gets told so.

### 4.4 The five reviews

**5 stars, RECOVERED, verbatim from the 2016 prototype with its typos corrected.** The
original reads "prepapred" for "prepared" and "ahead.. both" for "ahead, both".

> This meal was a masterpiece! It was exactly what you want from a great Indian restaurant.
> Right from the start, I could tell this meal was prepared with the finest and freshest
> ingredients available. Everything was cooked to perfection, and the chai tea especially was
> prepared beautifully. The service was impeccable, and our food was delivered promptly and
> professionally. What a wonderful culinary experience. This chef has a bright future ahead,
> both for this contest and beyond! Jump into the next adventure and explore more skills.
> Good luck!

**4 stars, NEW.**

> This was a very good meal, and I left happy. The kitchen clearly knows what it is doing.
> The seasoning was confident, and most of the plate arrived exactly as it should. A few
> things were held a moment too long on the heat, and one or two ingredients felt like a
> small economy rather than a choice. Nothing here was wrong. It simply was not yet perfect.
> Tighten the timing, spend where it shows, and this becomes a five star kitchen. I would
> happily book the table again.

**3 stars, NEW.**

> A solid, honest meal. Nothing on this table embarrassed itself, and nothing on it surprised
> me either. The cooking was competent but uneven, some of it right on the mark and some of
> it a little past it, and the shopping showed: several ingredients were the safe, cheap
> version of themselves. There is a real cook back there, I can taste it. Spend a little more
> on what goes into the pan, watch the heat more closely, and this kitchen has somewhere to
> go. I would like to see the next attempt.

**2 stars, NEW.**

> I wanted to like this more than I did. The idea of the meal was right, but the execution
> kept getting in its own way. Dishes arrived either underdone or pushed well past their
> moment, and the ingredients had clearly been chosen for the price tag rather than for the
> plate. There were flashes, a moment in the entree where you could see exactly what was
> intended. Those flashes are the reason to come back. Slow down, buy better, cook to the
> middle of the gauge, and the next visit could be to a different restaurant entirely.

**1 star, NEW.**

> I will be blunt, because the chef deserves honesty. This meal was not ready to be served.
> The ingredients were the cheapest on the shelf and tasted like it, and almost nothing left
> the heat at the right moment. The kitchen was rushing, and the plate carried every second
> of that rush. I am not writing this to be cruel. Every chef I admire has cooked a meal like
> this one, once, and learned more from it than from any success. Go back, take your time,
> and buy the good tea. I will be waiting for the second attempt.

---

## 5. The economy

### 5.1 RECOVERED rules

| Rule | Value | Source |
|---|---|---|
| Starting budget per restaurant | **$100** | Prototype Help, verbatim: *"In each restaurant, you are given a starting budget of $100."* |
| Hint cost | **$20** | Prototype Help, verbatim: *"Be frugal with your hints though as each one will cost you $20."* |
| Wrong taps cost money | amount unstated | Prototype Help: *"You can lose money from your budget by using hints or by tapping the wrong items."* |
| Money is earned by speed | Speed Bonus + Time Bonus = Total Bonus | Prototype Help: *"You can earn more money by quickly finding consecutive items and by clearing the level in a short amount of time."* |
| Hints are unlimited in number | no cap stated | Prototype Help |
| Cheapest tier is always free | yes | Every shopping list |
| No fail state | none documented | All three sources |

### 5.2 NEW rules

**Wrong-tap penalty: −$2 per wrong tap, with a 1 second cooldown.** A wrong tap inside the
cooldown window still animates and still plays the negative cue, but costs $0. This caps the
maximum drain from tapping at roughly $2 per second and makes spray-tapping strictly worse
than searching, without making an honest mis-tap feel punitive. $2 is deliberately one tenth
of a hint: ten careless taps equal one hint, which is a legible exchange rate.

**Budget floor.** Budget clamps at $0 and never goes negative. A hint is refused, with a
shake on the budget chip, when `budget < 20`.

**Speed Bonus: $1 per item found without using a hint, capped at $15.**
`speedBonus = min(unhintedFinds, 15)`.

**Time Bonus: $1 per full 10 seconds remaining against a 180 second par, capped at $18.**
`timeBonus = min(floor(huntRemainingMs / 10000), 18)`, and `0` in Relaxed mode.

**Maximum income per restaurant.** Timed: 4 x ($15 + $18) = $132. Relaxed: 4 x $15 = $60.
Against a maximum spend of $167 for four premium tiers at TajMahal, a Timed player who never
buys a hint finishes with $100 + $132 − $167 = $65. A Relaxed player attempting the same
finishes at $100 + $60 − $167 = −$7, which the floor makes impossible: the fourth premium
tier is simply unaffordable. **Relaxed mode cannot buy a full premium meal.** That is the
consequence the owner asked for, and it falls out of the numbers rather than being bolted on.

### 5.3 Sanity check against the observed prototype values

The 2016 prototype shows four bonus pairs, traced page by page in `BUILD-SPEC.md`:

| Hunt | Speed | Time | Total | Balance after |
|---|---|---|---|---|
| Grocery store | $15 | $16 | $31 | $119 |
| Fruit stand | $10 | $10 | $20 | $94 |
| Dinner table | $11 | $12 | $23 | $82 |
| Bakery | $10 | $11 | $21 | $38 |

**Verdict: the formula reproduces the range but not every individual value.** Stated plainly,
because the case study has to be honest about this.

**Time Bonus reproduces 3 of the 4 observed values plausibly.** The cap of $18 sits just above
the highest observed value of $16, which is the right shape for a cap. $10 implies 100 s
remaining, so a 80 s clear. $11 implies a 70 s clear. $12 implies a 60 s clear. All three are
realistic times for a 15-item hunt. The outlier is **$16**, which under this formula requires
160 s remaining, so a **20 second clear of a 15-item scene**. That is not a human time. Either
the prototype's par was shorter than 180 s, or that particular number was hand-set for the
demo. Given that the same page shows a balance of $119 where the arithmetic gives $131, the
prototype's numbers on that screen are demonstrably not computed, so the second explanation is
the likely one.

**Speed Bonus reproduces only the $15 case.** $15 is exactly the cap and exactly "found all
15 without a hint", which is a clean match and strongly suggests the original cap really was
the item count. But $10 would require 5 hints and $11 would require 4 hints, and the traced
ledger shows **no hint purchases at all** across the entire playthrough. The budget moves
only by bonuses and by the four premium purchases. So the observed $10 and $11 cannot be
produced by this formula from the observed play.

**Where the discrepancy comes from.** The original Help copy says money is earned by
*"quickly finding consecutive items"*, not by avoiding hints. That is a streak mechanic, not
a hint-avoidance mechanic. A formula of "$1 per item found within 5 seconds of the previous
find, capped at $15" reproduces $10, $11 and $15 without contradicting the ledger, and is a
closer reading of the surviving copy.

**Recommendation, flagged for the owner in section 7.** Ship the owner's hint-avoidance
formula as specified, because it is simpler to implement, it is legible to the player, and it
reinforces the hint-versus-ingredient tension that the case study is built on. But record in
the case study that the original copy points at a streak mechanic, and that the recovered
numbers fit a streak better than they fit hint-avoidance. That is a more interesting finding
than a clean match would have been.

---

## 6. Content data tables

### 6.0 The restaurant lineup

Nine map slots. Six playable, unlocking strictly in sequence. Three permanently "Coming
soon". Restaurant 1 is RECOVERED. Restaurants 2 to 6 and all three coming-soon slots are NEW.

| Slot | Restaurant | Cuisine / region | Status | Origin |
|---|---|---|---|---|
| 1 | **TajMahal** | Mughlai, North Indian, Delhi | Unlocked at start | RECOVERED |
| 2 | **Chettinad Kitchen** | Chettinad, Tamil Nadu | Unlocks after 1 | [NEW] |
| 3 | **Bengal Ghat** | Bengali, Kolkata | Unlocks after 2 | [NEW] |
| 4 | **Gujarat Thal** | Gujarati | Unlocks after 3 | [NEW] |
| 5 | **Goa Beach Shack** | Goan coastal | Unlocks after 4 | [NEW] |
| 6 | **Kashmir Wazwan House** | Kashmiri | Unlocks after 5 | [NEW] |
| 7 | Hyderabad House | Hyderabadi | Coming soon | [NEW] |
| 8 | Malabar Coast | Keralan | Coming soon | [NEW] |
| 9 | Rajasthan Haveli | Rajasthani | Coming soon | [NEW] |

The wireframe deck's original name for restaurant 1 was **G'raj Mahal**, renamed to
**TajMahal** by the final prototype. Keep TajMahal. The wireframe name is a good case-study
detail, not a shipping name.

**Scene archetypes.** Every restaurant uses the same four, in the same course order:

| Archetype | Course | RECOVERED base art |
|---|---|---|
| A: shop interior | Beverage | `hunt-grocery.jpg` |
| B: open-air stall | Appetizer | (fruit stand, in the prototype but not in `prepped/`) |
| C: working table | Entree | `hunt-table.jpg` |
| D: display case | Dessert | `hunt-bakery.jpg` |

**Item list convention.** Every course has exactly 15 items. The first **2** are the key
ingredients and trigger a `found-item-popup` with flavour text. The remaining 13 are scene
props, deliberately including a few absurd non-food objects. That convention is RECOVERED:
the 2016 wireframe's own item list reads Milk, Sugar, Tea leaves, Ashtray, Trowel, Bee,
Hotdog, Handsaw, TV, Trash can, Ball and chain. Junk items in a kitchen are not a bug in this
genre, they are the genre.

**Found-item flavour text template (NEW, generalised from RECOVERED examples).**

> You've found the {item}. With {this/these} {descriptor}, you can {use} and {benefit}. Enjoy!

RECOVERED examples, typos preserved here for the record and corrected in the build:
Cooking Oil: *"You've found the Cooking oil. With this sunflower oil, you can make pakoda and
cook your dishes. Enjoy!"* Bell Peppers: *"You've found the organic bell beppers…"* (sic).
Spices: *"With thiese spices…"* (sic).

**Purchase confirmation template (NEW, generalised from RECOVERED examples).**

> You've purchased {the tier name}. This will {result} and should please {audience}.

RECOVERED example, Dawat: *"You've purchased the best rice and wheat flour. This will make
fluffy rotis to go with entree and great rice and should please even the most sophisticated
tastes."*

---

### 6.1 Restaurant 1: TajMahal — Mughlai, North Indian — RECOVERED

| Course | Dish | Scene | Key ingredient |
|---|---|---|---|
| Beverage | Chai Tea | Indian grocery store aisle (A) | Tea |
| Appetizer | Pakoda | Fruit and vegetable stand (B) | Gram flour |
| Entree | Thaali | Indian dinner table (C) | Rice and wheat |
| Dessert | Gulab Jamun | Bakery pastry case (D) | Semolina |

**Price ladders, all RECOVERED verbatim:**

| Course | Tier 1, free | Tier 2 | Tier 3 | Tier 4, premium |
|---|---|---|---|---|
| Beverage / Tea | Lipton, Free | TATA, $10 | Taj Mahal, $20 | Red Label Marigold, $45 |
| Appetizer / Gram flour | Generic, Free | MTR, $19 | Swad, $22 | Fresh Ground, $35 |
| Entree / Rice and wheat | Generic, Free | Great Value, $25 | Tilda, $40 | Dawat, $65 |
| Dessert / Semolina | Generic, Free | Uncut, $6 | Semi Roasted, $12 | Roasted fine, $22 |

Total cost of all four premium tiers: **$167**.

**Item lists.** Key items in bold trigger the found-item popup.

| Course | The 15 items | Origin |
|---|---|---|
| Beverage | **Milk**, **Sugar**, Tea leaves, Ashtray, Trowel, Bee, Hotdog, Handsaw, TV, Trash can, Ball and chain, Cardamom pods, Ginger root, Steel strainer, Wall clock | items 1 to 11 RECOVERED from `wf-hunt-list.jpg`, items 12 to 15 [NEW] |
| Appetizer | **Cooking Oil**, **Bell Peppers**, Onion, Green chilli, Potato, Coriander bunch, Weighing scale, Straw basket, Paper cone, Bicycle bell, Umbrella, Cat, Watering can, Padlock, Postcard | items 1 to 2 RECOVERED, 3 to 15 [NEW] |
| Entree | **Spices**, **Vegetables**, Ghee tin, Rolling pin, Copper tumbler, Naan basket, Brass lamp, Candle, Napkin ring, Salt cellar, Marigold garland, Playing card, Pocket watch, Spectacles, Wooden spoon | items 1 to 2 RECOVERED, 3 to 15 [NEW] |
| Dessert | **Rose Water**, **Milk powder**, Sugar syrup jug, Cardamom pod, Piping bag, Silver leaf sheet, Cooling rack, Cake tester, Oven mitt, Ribbon spool, Price tag, Feather duster, Doorbell, Sparrow, Toy train | item 1 RECOVERED, 2 to 15 [NEW] |

The original bakery hunt named only **one** item, Rose Water, then fell through to
placeholders "Item 2" to "Item 15". A second key item is added for consistency with the other
three courses and is marked NEW.

**Prep round bundles.** RECOVERED verbatim from wireframe slide 50, mapped onto the five
appliances the final prototype actually shipped:

| Appliance | Bundle | Produces |
|---|---|---|
| Pot (Boiler) | milk + sugar + chai tea | Chai tea |
| Fryer | gram flour + bell pepper + oil | Pakoda |
| Tawa / Pan | kneaded flour, via Roti maker | Rotis |
| Rice cooker (Steamer) | rice | Steamed rice |
| Saucepan (Syrup) | gram flour + rose water + semolina | Gulab Jamun |

The wireframe lists a sixth bundle, spices + vegetables into the Fryer. The shipped prototype
has only five stations, so the rebuild folds that bundle into the Entree curry plated
alongside the rice. Flagged in section 7.

---

### 6.2 Restaurant 2: Chettinad Kitchen — Tamil Nadu — [NEW]

| Course | Dish | Scene | Key ingredient |
|---|---|---|---|
| Beverage | Filter Coffee | Coffee roaster's shopfront (A) | Coffee and chicory |
| Appetizer | Medu Vada | Temple-street snack cart (B) | Urad dal |
| Entree | Chettinad Pepper Curry with Dosa | Spice merchant's counter (C) | Chettinad masala |
| Dessert | Semiya Payasam | Sweet stall (D) | Vermicelli and jaggery |

| Course | Tier 1, free | Tier 2 | Tier 3 | Tier 4, premium |
|---|---|---|---|---|
| Beverage | Generic, Free | Bru, $12 | Narasu's, $24 | Cothas Peaberry, $48 |
| Appetizer | Generic, Free | Swad, $14 | Deep, $21 | 24 Mantra Organic, $38 |
| Entree | Generic, Free | Aachi, $18 | Sakthi, $30 | Everest, $55 |
| Dessert | Generic, Free | MTR, $8 | Nirav, $15 | Organic Tattva, $26 |

Total premium spend: **$167**, matched to TajMahal on purpose so the economy is identical
across restaurants and only the flavour changes.

| Course | The 15 items |
|---|---|
| Beverage | **Chicory blend**, **Boiled milk pot**, Brass filter, Davara tumbler, Jaggery lump, Gunny sack, Roasting drum, Weighing hook, Ledger book, Wall calendar, Table fan, Cricket ball, Umbrella, Sleeping dog, Spirit lamp |
| Appetizer | **Urad dal**, **Curry leaves**, Banana leaf, Coconut chutney bowl, Slotted ladle, Kerosene stove, Steel tiffin box, Temple bell, Rope coil, Bicycle pump, Kite, Chalk slate, Rubber sandal, Crow, Hand mirror |
| Entree | **Black peppercorns**, **Star anise**, Stone mortar, Dosa tawa, Palm-leaf fan, Copper measure, Twine ball, Jute sack, Oil lamp, Abacus, Tin funnel, Pocket knife, Spool of thread, Lizard, Broken padlock |
| Dessert | **Vermicelli**, **Cashews**, Ghee tin, Raisin jar, Saffron vial, Brass ladle, Serving pot, Paper doily, Glass dome, Fly swatter, Cash box, Wall hook, Butterfly, Toy top, Sugar tongs |

Prep bundles: Pot = milk + coffee + chicory into filter coffee. Fryer = urad dal batter +
curry leaves into medu vada. Tawa = dosa batter into dosa. Rice cooker = rice. Saucepan =
vermicelli + jaggery + cashews into payasam.

---

### 6.3 Restaurant 3: Bengal Ghat — Bengali, Kolkata — [NEW]

| Course | Dish | Scene | Key ingredient |
|---|---|---|---|
| Beverage | Gondhoraj Ghol | Riverside dairy stall (A) | Yogurt |
| Appetizer | Beguni | Kolkata street-fry stall (B) | Mustard oil |
| Entree | Shorshe Ilish with rice | Dawn fish market (C) | Mustard paste |
| Dessert | Mishti Doi | Potter's yard sweet shop (D) | Date palm jaggery |

| Course | Tier 1, free | Tier 2 | Tier 3 | Tier 4, premium |
|---|---|---|---|---|
| Beverage | Generic, Free | Amul, $11 | Mother Dairy, $19 | Milkymist Greek, $34 |
| Appetizer | Generic, Free | Fortune Kachi Ghani, $13 | Dhara, $22 | Patanjali Cold Pressed, $36 |
| Entree | Generic, Free | Catch, $12 | MDH, $25 | Everest, $46 |
| Dessert | Generic, Free | Swad, $9 | Nirav, $17 | 24 Mantra Organic, $30 |

Total premium spend: **$146**.

| Course | The 15 items |
|---|---|
| Beverage | **Yogurt pot**, **Gondhoraj lime**, Clay cup, Wooden churn, Ice block, Muslin cloth, Cane stool, Boat oar, Fishing float, Enamel mug, Newspaper, Hand pump, Stray goat, Bell jar, Rope knot |
| Appetizer | **Mustard oil**, **Aubergine**, Iron kadai, Wire skimmer, Sal-leaf plate, Coal brazier, Tin sign, Tram ticket, Kerosene can, Stack of newsprint, Hurricane lamp, Sparrow, Steel tongs, Cricket stump, Wall poster |
| Entree | **Mustard paste**, **Green chillies**, Cane basket, Ice shovel, Weighing pan, Banana leaf wrap, Brass scale weight, Hand cart, Wet newspaper, Bamboo pole, Rubber boot, Wall calendar, Alley cat, Tin whistle, Hook and line |
| Dessert | **Date palm jaggery**, **Thickened milk**, Clay pot, Kiln paddle, Straw bundle, Wooden stamp, Glass jar, String bundle, Ledger, Coin tray, Paper cone, Chisel, Butterfly, Broken bangle, Ceiling fan |

Prep bundles: Pot = milk + jaggery reduced for mishti doi. Fryer = aubergine + besan + mustard
oil into beguni. Tawa = fish + mustard paste. Rice cooker = rice. Saucepan = yogurt + lime +
water into ghol.

---

### 6.4 Restaurant 4: Gujarat Thal — Gujarati — [NEW]

| Course | Dish | Scene | Key ingredient |
|---|---|---|---|
| Beverage | Masala Chaas | Dairy churn yard (A) | Buttermilk |
| Appetizer | Khaman Dhokla | Morning farsan shop (B) | Dhokla flour blend |
| Entree | Undhiyu with Rotli | Winter vegetable market (C) | Ghee |
| Dessert | Shrikhand | Hung-curd kitchen (D) | Saffron |

| Course | Tier 1, free | Tier 2 | Tier 3 | Tier 4, premium |
|---|---|---|---|---|
| Beverage | Generic, Free | Verka, $10 | Nandini, $18 | Amul Masti, $33 |
| Appetizer | Generic, Free | Gits, $9 | MTR, $16 | Aashirvaad, $28 |
| Entree | Generic, Free | Amul, $20 | Gowardhan, $35 | Nandini Cow Ghee, $58 |
| Dessert | Generic, Free | Baby Brand, $14 | Lion Saffron, $26 | Kashmiri Mongra, $48 |

Total premium spend: **$167**.

| Course | The 15 items |
|---|---|
| Beverage | **Buttermilk**, **Roasted cumin**, Wooden churn staff, Copper pot, Rock salt block, Mint sprig, Clay cooler, Charpoy, Brass tumbler, Milk can, Rope pulley, Peacock feather, Straw hat, Hand fan, Cowbell |
| Appetizer | **Besan batter**, **Mustard seeds**, Steamer tray, Sev press, Steel plate stack, Sugar syrup bottle, Coriander bunch, Coconut grater, Glass display case, Cash drawer, Paper bag roll, Wall clock, Ceiling hook, Beetle, Order pad |
| Entree | **Ghee**, **Green garlic**, Earthen pot, Rolling pin, Purple yam, Muthiya dumpling, Bamboo tray, Weighing stone, Jute sack, Handcart wheel, Straw broom, Tin measure, Wooden crate, Ladybird, Chalk board |
| Dessert | **Saffron**, **Hung curd**, Muslin bag, Sugar sifter, Pistachio bowl, Nutmeg grater, Ceramic bowl, Silver tray, Ice bucket, Recipe card, Brass weight, Glass cloche, Feather, Wall tile, Serving spoon |

Prep bundles: Pot = buttermilk + cumin + salt into chaas. Fryer = undhiyu vegetables + ghee.
Tawa = rotli dough. Rice cooker = besan batter steamed into dhokla. Saucepan = hung curd +
saffron + sugar into shrikhand.

---

### 6.5 Restaurant 5: Goa Beach Shack — Goan coastal — [NEW]

| Course | Dish | Scene | Key ingredient |
|---|---|---|---|
| Beverage | Solkadhi | Beachfront coconut stall (A) | Coconut milk |
| Appetizer | Rechado Fried Mackerel | Fishing jetty market (B) | Rechado masala |
| Entree | Xacuti with Sannas | Spice plantation drying yard (C) | Xacuti masala |
| Dessert | Bebinca | Tiled bakery kitchen (D) | Nutmeg |

| Course | Tier 1, free | Tier 2 | Tier 3 | Tier 4, premium |
|---|---|---|---|---|
| Beverage | Generic, Free | Dabur Hommade, $12 | Patanjali, $20 | Fresh Pressed First Extract, $36 |
| Appetizer | Generic, Free | Nilon's, $15 | Mother's Recipe, $27 | Priya, $46 |
| Entree | Generic, Free | Badshah, $16 | Shan, $29 | Everest, $52 |
| Dessert | Generic, Free | Keya, $7 | Catch, $13 | Whole Kerala Nutmeg, $25 |

Total premium spend: **$159**.

| Course | The 15 items |
|---|---|
| Beverage | **Coconut milk**, **Kokum**, Machete, Coconut husk, Straw, Ice chest, Bamboo pole, Fishing net, Beach umbrella, Flip flop, Seashell, Transistor radio, Deck chair, Crab, Rope coil |
| Appetizer | **Rechado masala**, **Mackerel**, Wooden crate, Ice shovel, Weighing hook, Lime wedge basket, Frying pan, Kerosene stove, Oar, Life ring, Gull, Coil of twine, Tin lamp, Boat cleat, Chalk price board |
| Entree | **Xacuti masala**, **Toddy**, Grinding stone, Drying mat, Cinnamon bark, Nutmeg pile, Cane basket, Wooden ladle, Clay pot, Rain hat, Hammock, Monkey, Tin roof sheet, Coconut scraper, Hand cart |
| Dessert | **Nutmeg**, **Egg yolks**, Copper baking tin, Ghee brush, Sugar sack, Layer cake slice, Azulejo tile, Oven paddle, Cooling rack, Rolling pin, Church candle, Enamel jug, Wall cross, Moth, Timer bell |

Prep bundles: Pot = coconut milk + kokum into solkadhi. Fryer = mackerel + rechado masala.
Tawa = sannas batter. Rice cooker = rice for xacuti. Saucepan = bebinca layers with nutmeg
and ghee.

---

### 6.6 Restaurant 6: Kashmir Wazwan House — Kashmiri — [NEW]

| Course | Dish | Scene | Key ingredient |
|---|---|---|---|
| Beverage | Noon Chai | Samovar and copperware bazaar (A) | Green tea leaf |
| Appetizer | Nadru Monje | Dal Lake floating vegetable market (B) | Lotus stem |
| Entree | Rogan Josh with rice | Wazwan copper-pot kitchen (C) | Kashmiri chilli |
| Dessert | Phirni | Dry-fruit stall (D) | Walnut and pistachio |

| Course | Tier 1, free | Tier 2 | Tier 3 | Tier 4, premium |
|---|---|---|---|---|
| Beverage | Generic, Free | Wagh Bakri, $10 | Society, $18 | Kashmiri Green Leaf, $40 |
| Appetizer | Generic, Free | Deep, $12 | Swad, $20 | Dal Lake Fresh-Cut, $34 |
| Entree | Generic, Free | Rajah, $18 | MDH, $30 | Kashmiri Degi Mirch Whole, $55 |
| Dessert | Generic, Free | Nutraj, $12 | Happilo, $22 | Kashmiri Walnut Kernels, $38 |

Total premium spend: **$167**. Restaurant 6 is deliberately back at the TajMahal number, so
the final restaurant is the hardest full-premium run in the game.

| Course | The 15 items |
|---|---|
| Beverage | **Green tea leaf**, **Rock salt**, Copper samovar, Charcoal scoop, Baking-soda tin, Walnut shell, Pashmina shawl, Brass tray, Kangri firepot, Papier-mache box, Wool carpet, Snow boot, Wall lantern, Pigeon, Tea strainer |
| Appetizer | **Lotus stem**, **Rice flour**, Shikara paddle, Woven basket, Water lily, Weighing hook, Frying pot, Wooden crate, Coil of rope, Wool cap, Duck, Oil can, Copper bowl, Tin sign, Bundle of reeds |
| Entree | **Kashmiri chilli**, **Fennel powder**, Copper degh, Long ladle, Wood fire log, Yogurt pot, Bay leaf, Brass platter, Serving cloth, Charcoal tong, Water jug, Cook's cap, Wall hook, Cricket, Spice box |
| Dessert | **Walnut kernels**, **Pistachios**, Clay bowl, Rose petal, Silver leaf, Milk pan, Almond sack, Weighing scale, Paper twist, Wooden scoop, Glass jar, Shop shutter, Chalk sign, Moth, Cash tin |

Prep bundles: Pot = green tea + rock salt + soda into noon chai. Fryer = lotus stem + rice
flour into monje. Tawa = rogan josh in the pan. Rice cooker = rice. Saucepan = milk + rice
flour + nuts into phirni.

---

## 7. Open questions

Genuinely open. Each one needs the owner's call before the HTML build, though none of them
blocks the Figma Make mockup.

1. **Speed Bonus: hint-avoidance or streak?** Section 5.3 shows that the recovered numbers fit
   a streak formula better than they fit hint-avoidance, and that the original Help copy says
   "quickly finding consecutive items". The spec ships hint-avoidance as decided. Confirm that
   the case study should present the streak reading as a finding rather than switching the
   mechanic to it.

2. **Does Relaxed mode cap the rating?** The spec awards a flat 2 of 3 time points in Relaxed,
   keeping 5 stars reachable but only with near-perfect ingredients and cooking. The
   alternative reading of "judged on doneness only" is to score out of 22 and cap Relaxed at 4
   stars. That is harsher and arguably a better teaching device. Owner's call.

3. **Do the "Coming soon" slots ever open?** The spec says permanently locked. If the portfolio
   piece would rather imply an unshipped roadmap, they could instead read "In development" with
   a cuisine name and no lock icon, which is a softer and more honest framing of an unfinished
   2016 student project.

4. **The sixth prep bundle.** The wireframe specifies six recipe bundles but the shipped
   prototype has five appliances. The spec folds "spices + vegetables into the Fryer" into the
   Entree plate. The alternative is to ship six stations and diverge from the prototype art.
   Recommend keeping five.

5. **The "Desert" typo and the "foolbar" typo.** The spec corrects both in the playable build
   and documents them. Confirm the case study wants the corrected build plus a documented
   typo, rather than shipping the typos as a deliberate period detail.

6. **The grocery scene's real business signage.** `hunt-grocery.jpg` contains a legible banner
   reading a real shop URL and phone number, flagged in `PROTO-ASSETS.md`. It is not client
   work and not under NDA, but it is a real identifiable business in a stock photograph. Blur
   it, crop it out, or leave it. Owner's call.

7. **The $119 arithmetic error.** The prototype shows $100 + $31 = $119. `BUILD-SPEC.md`
   already rules that the ledger graphic renders the balances the prototype shows without
   drawing attention to it. Confirm the same rule applies to the playable prototype, which
   will necessarily compute $131 and therefore diverge from the case-study graphic by $12.

8. **Restaurant 1 replay and the unlock counter.** Replay is free and unlimited. The spec only
   overwrites `restaurantResults[n].stars` when the new result is better. Confirm that a
   replay should not be able to lower a recorded rating, and that budget carried out of a
   restaurant is discarded rather than banked.
