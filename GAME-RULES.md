# CookInQuest / CookIndia Quest — Game Rules Extraction

Sources:
- **Research deck** = `drop/GameDesign_HOG_Lochana.pdf` (45 pages), cited as "Research p.N"
- **Wireframe deck** = `drop/WireFrame_GameDesign_HOG_CQ.pptx.pdf` (53 pages), cited as "Wireframe p.N"
- **Prototype** = `drop/Final prototype - LochC_iPadMini_HOG_CookIndiaQuest.pdf` (95 pages), cited as "Prototype p.N"

All three were read in full. Where a wireframe page number could not be cross-checked against
`prepped-wf/WF-ASSETS.md`'s slide references, it is marked "approx."

---

## 1. Core game loop

Per restaurant (a "level"), the loop runs in this order:

1. **Mode choice** — before/at the start of a restaurant visit, the game asks: *"do you want
   to play timed or relaxed game?"* with two buttons, **relaxed** / **timed** (Prototype p.22,
   shown over the KhannaTown map with TajMahal unlocked). The wireframe stage already had this
   as an explicit either/or choice (Wireframe p.7 approx., "Timed" / "Untimed" crossed out,
   annotated "either" / "or").
2. **Restaurant menu** — entering a restaurant shows four courses: **Beverage, Appetizer,
   Entree, Dessert**. Each course is a preview of one of the four dishes in the final meal, and
   also represents one hidden-object location. A counter under each course shows found-items
   progress, e.g. `0/15` (Wireframe p.20 approx.; Prototype p.13/31, `course-hub-start.jpg`).
   Courses can be visited in any order and the player can skip between them if stuck
   (Prototype p.13, Help — "menu").
3. **Hidden-object hunt** — at each location, find all 15 listed items in any order; must find
   all to advance (Prototype p.14, Help — "finding items"). Tapping an item taps it off the
   list. Special/"important" items trigger a flavour-text popup.
4. **Hint (optional)** — tapping the hint button flashes/sparkles one remaining item; costs $20
   (Prototype p.16, Help — "finding items" continued).
5. **Clear bonus** — on finding all items in a location, a "CONGRATULATIONS" popup awards a
   **Speed Bonus** and a **Time Bonus**, summed into a **Total Bonus** added to the budget
   (Prototype p.55, Wireframe p.29/34 approx.).
6. **Shopping list / ingredient purchase** — after clearing a location's hunt, the player is
   taken to a "new screen where you must purchase an important element of your meal," choosing
   among four price tiers for that course's key ingredient (Prototype p.16, Help — "finding
   items"; e.g. `shop-tea.jpg`).
7. Repeat steps 3–6 for all four courses.
8. **Meal preparation round** — once all locations are cleared and all special ingredients
   bought, the game auto-advances to meal prep. Found/purchased items appear in a toolbar;
   items are dragged onto other items (to combine), onto appliances (to cook), or onto a dish
   on the table (to plate) (Prototype p.17–18, Help — "meal preparation").
9. **Cooking** — dropping an item on an appliance starts a doneness meter (blue→green→red);
   a blinking light + sound signal near-completion; the player must drag the item off while the
   meter is in the green zone (Prototype p.19).
10. **Plating** — assembled items are placed onto a thali-style plate divided into wedges (rice,
    roti, pakoras, Gulab Jamun) plus drink cups (Wireframe p.51 area, `wf-plating.jpg`).
11. **Rating** — the judges deliver a 1–5 star rating with a written, restaurant-critic-style
    review (Prototype p.93, `rating-five-star.jpg`).
12. **Progression** — clearing a restaurant unlocks the next one on the map; the whole loop
    repeats with a fresh $100 budget and a new cuisine (Prototype p.10, Help — "map"; Wireframe
    p.52 approx., "repeat for other restaurants… New restaurant unlocked").

---

## 2. Economy

### Currency and starting amount
- One currency: **dollars ($)**.
- **Starting budget per restaurant: $100** (Prototype p.16, Help screen, verbatim: *"In each
  restaurant, you are given a starting budget of $100."*). This matches the wireframe stage
  (Wireframe p.20 area, `BUDGET $100` sidebar chip).

### What it is spent on
- **Hints: $20 each** (Prototype p.16, verbatim: *"Be frugal with your hints though as each one
  will cost you $20."*).
- **Ingredients** — after each hunt, one "important element" of the meal is purchased from a
  4-tier price list (see §3).
- Wrong taps also cost money: *"You can lose money from your budget by using hints or by
  tapping the wrong items"* (Prototype p.16) — but no exact wrong-tap penalty amount is stated
  anywhere in the three sources (see Gaps).

### How money is earned
- *"You can earn more money by quickly finding consecutive items and by clearing the level in a
  short amount of time"* (Prototype p.16).
- Mechanically this pays out as a **Speed Bonus + Time Bonus = Total Bonus** on completing a
  location's hunt (Prototype p.55, e.g. one instance shows Speed Bonus $10 + Time Bonus $10 =
  Total Bonus $20). The BUILD-SPEC's traced playthrough of TajMahal shows the bonus totals
  varying per hunt: $31, $20, $23, $21 across the four courses — so the bonus is **not a fixed
  amount**; it scales with the player's actual speed/timing (exact formula not stated anywhere
  — see Gaps).

### Budget floor / negative balance
- No source states what happens if budget would go negative, or whether a hint can be bought
  with insufficient funds. The BUILD-SPEC's traced playthrough ends the game entering the
  cooking round with $16 and notes this leaves "a hint she can no longer afford" — implying
  hints are refused below $20, but this is inferred, not stated as a rule anywhere.

---

## 3. Ingredient quality / price tradeoff

Each course has one special ingredient with **four price tiers**: a free/generic bottom tier
up to a premium top tier. Real brand names are used and kept verbatim per the approved
BUILD-SPEC. Tables below are the **final prototype** values (Prototype p.43–44, `shop-tea.jpg`,
`shop-tea-chosen.jpg`, `shop-rice.jpg`; corroborated by Wireframe pp.32–48 approx.):

| Ingredient | Tier 1 (Free) | Tier 2 | Tier 3 | Tier 4 (Best) |
|---|---|---|---|---|
| Tea | Lipton — Free | TATA — $10 | Taj Mahal — $20 | Red Label Marigold — $45 |
| Gram flour | Generic — Free | MTR — $19 | Swad — $22 | Fresh Ground — $35 |
| Rice & wheat | Generic — Free | Great Value — $25 | Tilda — $40 | Dawat — $65 |
| Semolina | Generic — Free | Uncut — $6 | Semi Roasted — $12 | Roasted fine — $22 |

**The tradeoff, stated directly:** *"The ingredients you purchase will ultimately affect the
quality of your meal and your overall rating from the judges"* (Prototype p.16). The game
never explicitly tells the player that pricier = better; it is inferred entirely from the
ladder framing (cheapest always labelled generic/free; priciest always a named premium brand)
and from the final rating text praising "the finest and freshest ingredients" (Prototype p.93).

**Wireframe-stage evolution (not a contradiction, a design change):** at the wireframe stage,
the top tier for tea reads roughly $25 and rice's top tier was "Organic Basmati — $60"
(Wireframe pp.23, 30 approx.) — both were later renamed and re-priced by the time of the final
prototype (Red Label Marigold $45; Dawat $65). Brand names also shifted (e.g. rice top tier
went from "Organic Basmati" to "Dawat").

---

## 4. Scoring / rating

- Stated verbatim in the prototype's own Help copy (Prototype p.19, "meal preparation"):
  > "This rating will take into account **the quality of your ingredients, your performance in
  > preparing the meal, and the amount of time required to finish**."
- So three inputs feed the rating:
  1. Ingredient quality (which price tier was bought per course)
  2. Cooking performance (how close to the green zone on the doneness gauge each item was
     pulled)
  3. Total time taken in the prep round
- **Output:** a 1–5 star rating plus a written review in the voice of a restaurant critic, not
  a numeric score screen (Prototype p.93).
- **Only the 5-star review text exists in the sources** (verbatim, Prototype p.93, "prepapred"
  typo corrected per BUILD-SPEC convention):
  > "This meal was a masterpiece! It was exactly what you want from a great Indian restaurant.
  > Right from the start, I could tell this meal was prepared with the finest and freshest
  > ingredients available. Everything was cooked to perfection, and the chai tea especially was
  > prepared beautifully. The service was impeccable, and our food was delivered promptly and
  > professionally. What a wonderful culinary experience. This chef has a bright future ahead..
  > both for this contest and beyond! Jump into the next adventure and explore more skills.
  > Good luck!"
- **No 1-star through 4-star review text, and no numeric star-band thresholds, appear anywhere
  in any of the three sources.** (See Gaps — this is a significant hole.)
- **Replay is free and unlimited:** *"You can go back and replay that restaurant at any time to
  try for a better rating"* (Prototype p.10, Help — "map"; also Prototype p.22 sidebar, "You
  can replay a restaurant level to try for a better review from the critics").

---

## 5. Timers, lives, hints/help, penalties, bonuses

- **Timed vs. Relaxed** is an explicit upfront choice (Prototype p.22; Wireframe p.7 approx.).
  Its exact mechanical effect (does "relaxed" remove the countdown entirely? does it still
  allow speed/time bonuses?) is **not stated** anywhere in the sources.
- **A clock/timer also appears during the meal-preparation round**, independent of the earlier
  timed/relaxed choice: the prep-round intro sidebar reads verbatim (Prototype p.90,
  `prep-intro.jpg` sidebar): *"Keep an eye on the clock. You have a limited time to prepare the
  meal. Good luck!"* This implies the cooking round is always timed regardless of the
  hunt-phase mode choice — but this is inferred, not confirmed (see Gaps).
- **Hints:** $20 each, unlimited in number as far as the sources state; a hint flashes/sparkles
  one remaining item (Prototype p.16).
- **Penalties:** hint use (−$20) and "tapping the wrong items" (amount unstated) both reduce
  budget (Prototype p.16).
- **Bonuses:** Speed Bonus + Time Bonus on clearing every location's hunt (see §2).
- **No lives, no fail/game-over state, and no explicit "you ran out of time/money" screen
  appear in any source.**

---

## 6. Level / course / progression structure

- **Setting:** a town — **KhanaTown** in the wireframe deck, **KhannaTown** in the prototype —
  with a "Restaurant Row" (Wireframe p.19; Prototype p.24, welcome text).
- **Map:** a 3×3 grid of 9 restaurant slots. One restaurant is unlocked at the very start (the
  wireframe calls it **G'raj Mahal**; the shipped prototype renamed it **TajMahal**); the other
  eight are shown padlocked (Wireframe p.19, `wf-restaurant-row.jpg`; Prototype p.26,
  `map-restaurant-row.jpg`).
- **Unlock rule:** *"When you begin the game, there is only one restaurant available. Once you
  complete each restaurant, a new one will open up"* (Prototype p.10, Help — "map"). Strictly
  sequential — no branching or free choice of which restaurant to tackle next is described.
- **Per restaurant:** 4 courses (Beverage, Appetizer, Entree, Dessert), each needing **15 hidden
  items found** — 60 items total per restaurant (Prototype p.13; Wireframe p.20 approx.).
- **Cuisine framing:** the prototype's own menu/pause sidebar states, verbatim (Prototype p.22):
  > "Create meals of **six different cuisines** at several different restaurants."
  This is in tension with the 9-slot map (1 unlocked + 8 padlocked) — see Gaps.
- **Fresh economy each restaurant:** every new restaurant resets to a fresh $100 budget
  (implied by the "starting budget of $100" Help text applying "in each restaurant," Prototype
  p.16, plus the rating screen's "New restaurant unlocked" routing note, Wireframe p.52 approx.).

---

## 7. Win and lose conditions

- **No lose condition is documented anywhere in the three sources.** There is no stated fail
  state for running out of time, running out of money, or failing a rating threshold. The
  economy is built so the cheapest ingredient tier is always free and hints (while costly)
  are not shown as capped — the design appears to let a player always finish, just with a worse
  rating.
- **"Win" per restaurant** = complete all four courses' hunts, buy the four ingredients, cook
  and plate the meal, and receive a star rating (any count of stars ends that restaurant's
  round; a poor rating is not a fail, since replay is explicitly offered "at any time").
- **"Win" overall** = unlock and clear every restaurant on Restaurant Row (exact count is
  ambiguous between 6 cuisines and 9 map slots — see Gaps). No ending/credits screen content
  is present in the extracted material beyond the "Jump into the next adventure" line in the
  5-star review.

---

## 8. Player research findings, personas, target audience

From the **Research deck**, a 129-person survey ("Explanatory Research," Research p.25):

| # | Question | Result |
|---|---|---|
| 1 | Ever played a hidden object game? | Yes 80.95% / No 19.05% (Research p.26) |
| 2 | HOGs played per month | 0: 40.48%, 1–4: 47.62%, 5–9: 5%, more: 6.90% (Research p.27) |
| 3 | Favourite thing about HOGs | HO puzzles 47.5%, follow the story 35%, artwork 30%, lots of fun 27.5%, other puzzles 20%, can put it down 17.5%, music 12.5% (Research p.28) |
| 4 | Importance of art (1–5) | 1: 4.88%, 2: 7.32%, 3: 31.71%, 4: 24.39%, 5: 31.21% (Research p.29) |
| 5 | What entices a purchase (ranked) | "Played this company's games before and liked them" ranked most enticing (#1), "not very expensive" #2, "story looks good" #3, "like the art style" #4 (Research p.30) |
| 6 | Age group | 8–18: 16.67%, 19–28: 40.48%, 29–38: 23.81%, 39–48: 7.14%, 49+: 11.9% (Research p.31) |
| 7 | Would you play a HOG that taught you to cook? | Yes 71.79% / No 28.21% (Research p.32) |
| 8 | Thoughts on a HOG exploring Indian cuisine | Word cloud, positive-leaning: "Good," "Innovative," "Explore Spices," "Intriguing," "Interesting," "Unique," "Sounds Great!," "Educative," "Super Cool," "New," vs. negative: "Not Keen," "Nothing great," "Not exciting," "Never played," "I don't know" (Research p.33) |
| 9 | Iconic image / colours for Indian cooking | Icons: Variety of curry, Indian Thaali, Indian Spices, Turmeric, Dosa, Indian Cook, Traditional Dress, Desert(sic, dessert). Colours by weight: Yellow (largest), Red, Orange, Brown, Green (smallest) (Research p.34) |
| 10 | Feelings about HOGs generally | "Like them, but don't have time" 41.46% (largest segment), "Wish someone would come up with a new spin" 31.71%, "Devour them, will keep playing for years" 21.95%, "Boring" 4.88% (Research p.35) |

**Competitor teardown** (five games, Research pp.37–41): Perfect Pizza Hidden Objects, Cooking
Room HOG, Go Go Gourmet: Chef of the Year, Mystery Cookbook HOG, and **Cooking Quest** by Big
Fish Games — explicitly labelled *"(idea came from here)"* (Research p.41).

**Empathy map** (Research p.43), Think & Feel / Hear / See / Say & Do quadrants plus Pain/Gain
rows. Pains: "Time consuming," "Not enough hints," "Lots of searching," "Objects sometimes look
the same," "Time limit." Gains: "Learn something new," "Educative," "Relax," "Break from life,"
"Have fun," "More aware," "Be more focused."

**No named persona document exists.** There is no "Meet Sarah, 28" style artifact anywhere in
the sources — the closest thing to a target-audience statement is the raw survey demographics
above (19–28 is the largest age bracket at 40.48%) plus the empathy map. Treat any persona used
in the case study as synthesized from these, not sourced verbatim.

---

## 9. Design rationale worth quoting

**Why a hidden-object game** (Research p.5, verbatim):
> "After playing the Big Fish game 'Cooking Quest' in 2008 (which was big back then), I always
> waited for them to come up with a sequel like their Mystery Case and Nancy Drew collection.
> Today, for my capstone project I have decided the best idea would be to make the sequel
> instead of waiting for years of more disappointment that the next part has not been created."

Also on p.5: she describes falling "totally and inevitably in love" with hidden object games
during her undergrad days and being drawn to "search[ing] every room for items in order to
progress to another room" — this is the personal, biographical justification for the genre
choice, not a market one.

**Why Indian cooking specifically** is never stated as a single direct rationale sentence in
the research deck. It is inferable only from: (a) the survey directly asking Indian-cuisine-
specific questions (Q7–Q9) and getting majority-positive results, and (b) the icon rationale
below. There is no quote of the form "I chose Indian food because…" anywhere in the sources.

**Icon design rationale** (Wireframe p.3, verbatim bullets):
> "Name of App — CookIndia Quest. Icon significance — Reuse original 'Cooking Quest' icon into
> an Indian theme. Use Of Colors — Blue gives a subtle feeling; Brown and Orange to match with
> spices; Middle of plate = Indian flag. Design — Based on rule of thirds in a balanced
> proportion."

**Why the budget mechanic** — no direct designer quote exists ("I added a budget because…").
The closest available rationale is functional, from the Help copy: the budget mechanic is
justified purely mechanically (buy hints, buy ingredients, affects rating), never tied back to
a stated design goal or research finding in the designer's own words. The BUILD-SPEC's framing
("the game never tells you that better ingredients make better food… the lesson is in the
ledger") is an *interpretation* built for the case study, not a quote from either deck.

---

## 10. Gaps and ambiguities

These need a design decision before building the interactive prototype — the sources do not
resolve them:

1. **Star-band thresholds and 1–4 star review text are entirely absent.** Only the 5-star
   review exists (Prototype p.93). No source states what ingredient-quality / performance /
   time combination produces 1, 2, 3, or 4 stars, nor is there any review copy for those bands.
   A rebuild must invent this banding and copy from scratch.

2. **Exact bonus formula is not stated.** "Speed Bonus" and "Time Bonus" clearly scale with
   player performance (observed values of $10/$10, and the BUILD-SPEC's traced playthrough
   shows $15/$16, $10/$10, $11/$12, $10/$11 across different hunts) but no formula, curve, or
   cap is given anywhere. Needs to be invented.

3. **Wrong-tap penalty amount is unstated.** The Help text says tapping wrong items costs
   money ("You can lose money from your budget by using hints or by tapping the wrong items,"
   Prototype p.16) but never gives a dollar figure, unlike the $20 hint cost.

4. **6 cuisines vs. 9 map slots is unresolved.** The prototype's own sidebar text says "Create
   meals of six different cuisines at several different restaurants" (Prototype p.22), but the
   map shows a 3×3 grid of 9 restaurant slots (1 unlocked + 8 padlocked, Prototype p.26). It is
   unclear whether only 6 of the 9 slots were ever meant to be playable, whether some
   restaurants share a cuisine, or whether this is simply a stale line of placeholder copy.

5. **Timed/Relaxed mode's actual mechanical effect is undefined**, and its interaction with the
   separately-timed meal-prep round is unclear. The mode choice is presented once, upfront, as
   a binary (Prototype p.22), but the meal-prep round's own Help/intro copy states a countdown
   applies regardless ("Keep an eye on the clock. You have a limited time to prepare the meal,"
   Prototype p.90) — it's not stated whether choosing "relaxed" removes the hunt-phase timer
   only, removes bonuses, or has no mechanical effect at all beyond flavour.

6. **No lose/fail condition exists.** There is no game-over state, no minimum rating to pass,
   and no stated consequence for a negative or near-zero budget (beyond the practical inference
   that a hint can't be bought below its $20 cost). Whether the original design intended one
   is unknown.

7. **No formal target-audience/persona document exists** — only raw survey cross-tabs and an
   empathy map. Any persona narrative built for a rebuild is a synthesis, not a citation.

8. **No stated rationale, in the designer's own words, for choosing Indian cuisine specifically**
   or for the budget/ingredient-tradeoff mechanic as a designed decision (see §9) — both must be
   framed as inferences from the research, not quotes.
