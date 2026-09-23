# CookInQuest — case study build spec

Target: `src/pages/work/cookinquest.astro`, served at `/work/cookinquest`.
Pattern: bespoke page in the mould of `src/pages/work/wetree.astro` and
`src/pages/work/mastercard.astro`. Shared components
(`CaseSection`, `Lead`, `Figure`, `Metrics`) over a page-local theme layer.

**Approved by Lochana:** title is **CookInQuest**; real brand names kept verbatim;
"the tell" section included; **no year anywhere in the page**; prototype rough
edges quietly avoided (never shown large, never quoted).

---

## 1. Source of truth for every fact

All copy below is drawn from three 2016 source documents, now in `cookinquest/drop/`:

| Short name | File | What it is |
|---|---|---|
| **Research deck** | `GameDesign_HOG_Lochana.pdf` | 45-slide capstone "Explanatory Research" deck: genre history, industry stats, a 129-person survey, competitor teardown, empathy map |
| **Wireframe deck** | `WireFrame_GameDesign_HOG_CQ.pptx.pdf` | 53-slide wireframe/design deck: hand sketches, box wireframes, recipe logic, plating |
| **Prototype** | `Final prototype - LochC_iPadMini_HOG_CookIndiaQuest.pdf` | 95-page hi-fi iPad prototype, every screen and state |

**Do not invent facts.** Every number, quote and mechanic below is verbatim or
directly derived from those decks. If something is needed that is not here, leave
it out rather than filling the gap.

### Naming
- The project's own name is **CookIndia Quest**. The portfolio title is **CookInQuest**.
  Use *CookInQuest* everywhere in headings and body copy. *CookIndia Quest* may
  appear once, in passing, as the name it shipped under.
- Town: wireframes say **KhanaTown**, prototype says **KhannaTown**. Use **KhanaTown**
  when discussing the wireframes, **KhannaTown** when discussing the prototype.
- First restaurant: wireframes say **G'raj Mahal**, prototype says **TajMahal**.
  This rename is a small, charming detail — worth one sentence, not a section.

### Never do
- Never state a year, a date, or a course name.
- Never quote the prototype's typos ("bell beppers", "thiese", "prepapred", "Desert"
  for dessert). Where a screen is shown that contains one, keep it small.
- Never show the placeholder hunt-list text (`Item 3`…`Item 15`) at large size, and
  never mention it.
- Never show the Spanish/European market photo (`hunt-market`, prototype p-49/p-52).
  Use the grocery, dinner-table and bakery scenes instead.
- **Never alter, redraw, recolour or retouch the logo or the app icon.** Crop only.

---

## 2. Meta block (hero)

| Field | Value |
|---|---|
| Role | Game &amp; UX Designer |
| Team | Solo |
| Platform | iPad |

**No Year field.** Omit it entirely — do not render an empty row.

Skill chips: `Game design`, `User research`, `Survey design`, `Competitive analysis`,
`Empathy mapping`, `Wireframing`, `Game economy`, `Visual design`, `Logo & icon design`,
`iOS UI kit`, `iPad prototyping`.

---

## 3. Theme layer

CookInQuest sits in the warm end of LAGOON. The game's own 16-swatch iOS kit is a
turmeric-to-maroon warm ramp plus a cool blue counter-ramp — map it onto tokens:

```css
--cq-turmeric:   #F4B333;  /* primary accent, the game's marigold */
--cq-saffron:    #EE9C34;  /* mid warm */
--cq-paprika:    #D2691E;  /* burnt orange, the Wix divider colour */
--cq-chilli:     #C1442F;  /* spice red, borders on the orange cards */
--cq-maroon:     #8E1B22;  /* deepest warm, headings on light */
--cq-indigo:     #2D7DC4;  /* the in-game sidebar blue, cool counterpoint */
--cq-teal:       #1FA0B3;  /* second cool, for the gauge cold end */
--cq-char:       #322A25;  /* warm charcoal ink — NOT pure LAGOON --ink */
--cq-cream:      #FBF3E4;  /* warm paper for tinted sections */
--cq-cream-deep: #F3E5CC;
```

Rules:
- Scope every one of these to the page's own root elements, exactly as
  `wetree.astro` scopes its `--wt-*` variables. Do not touch `global.css`.
- Body text stays LAGOON `--ink` / `--ink-soft`. `--cq-char` is for dark section
  backgrounds and display headings only.
- **Type scale: the five LAGOON sizes only.** No sixth size, no ad-hoc `font-size`.
- **Fonts: DM Sans + Inter only.** The game used Juice ITC; do not load it, do not
  approximate it with a third webfont. Reference it in the design-system section as
  a fact, set in the page's own type.
- Section tints must alternate. Suggested rhythm: paper → cream → paper → dark →
  paper → cream → dark → paper.

### Signature motifs (build these, they carry the page)
1. **The doneness gauge.** The game's blue→green→red gradient bar with a travelling
   marker. Rebuild in CSS as a thin section rule between major sections, and at full
   size in the cooking section. Respect `prefers-reduced-motion` — no travel animation
   when reduced.
2. **The course counter.** The `15/15` fraction device from the menu screen, used as
   a small progress chip.
3. **The budget ledger.** See §5 — the centrepiece.

---

## 4. Page structure and copy

Hero is bespoke (like `wt-hero`). Everything after sits in `<article class="case-body">`
using `CaseSection` / `Lead` / `Figure` / `Metrics`.

### HERO
- Eyebrow: `Game design`
- Title: **CookInQuest**
- Subtitle: **The sequel that never came**
- Description: *An iPad hidden-object game that teaches you Indian cooking by making
  you shop for it. Hunt the ingredients, earn your budget, then decide whether the
  good tea is worth what it costs you.*
- Hero image: `title-screen.jpg`
- Meta + skill chips per §2.

### 1 — `The itch` / **Eight years waiting for part two**
The origin. Verbatim from the research deck (slide 5), quotable:

> "After playing the Big Fish game 'Cooking Quest' in 2008 … I always waited for them
> to come up with a sequel."

and the decision:

> "the best idea would be to make the sequel instead of waiting for years of more
> disappointment that the next part has not been created."

Frame: a sequel that never came, so she built it — and set it somewhere the genre
had not been: an Indian kitchen. Also from slide 5, she was new to games and fell for
hidden-object games during undergrad. Keep this short and warm.

Image: `research-competitor.jpg` (the Cooking Quest slide, captioned as the game that
started it).

### 2 — `Research` / **129 people, ten questions**
The survey. Use a `Metrics` band or bespoke stat row for the four headline numbers:

| Value | Label |
|---|---|
| 81% | had played a hidden-object game |
| 72% | would play one that taught them to cook |
| 41% | like them, but have no time for them |
| 32% | want someone to find a new spin |

(Exact source figures: 80.95% / 71.79% / 41.46% / 31.71%. Round in the display,
that is fine, but do not inflate.)

Supporting facts available: five competing cooking hidden-object games were pulled
apart (Perfect Pizza, Cooking Room, Go Go Gourmet, Mystery Cookbook, Cooking Quest);
an empathy map recorded pains and gains. Pains include **"Time consuming"**,
**"Not enough hints"**, **"Time limit"**, **"Objects sometimes look the same"**.
Gains include **"Learn something new"**, **"Educative"**, **"Relax"**, **"Break from life"**.

Images: `research-empathy-map.jpg`, `research-word-cloud.jpg`.

### 3 — `From finding to deciding` / **Three answers, three decisions**
The spine of the case study. Build as a three-card row, each card: the finding →
the decision. Do not overclaim; these three links are all evidenced.

1. **"Like them, but don't have time."** → The game asks, before anything else,
   *timed or relaxed*. It is the first choice you make.
   Image: `mode-choice.jpg`, with `wf-mode-choice.jpg` as the wireframe beside it —
   the choice existed at wireframe stage, annotated "either / or".
2. **"Wish someone would come up with a new spin."** → A budget. Finding the
   ingredient is only half of it; you then have to afford the good version.
3. **"Would you play one that taught you how to cook?" — 72% yes.** → Every ingredient
   explains itself the moment you find it, in the voice of a cook rather than a
   tutorial. Quotable, verbatim from the prototype:
   > "You've found the milk. With organic milk, you can make creamy Chai tea and have
   > a flavored experience."

   The wireframe annotation shows this was deliberate: *"pop up for instructions that
   this is an important ingredient for later use."*
   Images: `found-milk.jpg`, `wf-found-item.jpg`.

### 4 — `Colour` / **She asked 129 people what colour Indian cooking is**
Question 9 of the survey: *"What iconic image and what colors come to mind when you
think of Indian cooking?"*

Answers — colours, in order of weight: **Yellow, Red, Orange, Brown, Green**.
Icons named: variety of curry, Indian thali, Indian spices, turmeric, dosa, Indian
cook, traditional dress, dessert.

The point: the palette was not a mood board, it was an answer. Show the shipped iOS
kit swatches beside it. The warm ramp *is* the survey's answer, in order.

Images: `research-colour-words.jpg`, `color-palette.jpg`.

Also state here, as fact: display type was Juice ITC, body was Helvetica Neue Light.
(Set in DM Sans/Inter on this page — do not load Juice ITC.)

### 5 — `Identity` / **A chef's hat, a flag, and the rule of thirds**
The icon in three stages, as a horizontal progression:
1. The stated rationale, verbatim from the wireframe deck slide 3:
   - *"Reuse original 'Cooking Quest' icon into an Indian theme"*
   - *"Blue gives a subtle feeling"*
   - *"Brown and Orange to match with spices"*
   - *"Middle of plate = Indian flag"*
   - *"Based on rule of thirds in a balanced proportion"*
2. The marker sketch — `sketch-app-icon.jpg`
3. The shipped icon — `app-icon.jpg`, and the logo lockup `logo-lockup.jpg`

**Crop only. Never modify the mark.**

### 6 — `Structure` / **A town, a row of restaurants, one door open**
KhanaTown. Restaurant Row. Nine slots on the map, eight padlocked; clear one and the
next opens. Inside a restaurant, four courses — Beverage, Appetizer, Entree, Dessert —
each needing fifteen ingredients found.

The prototype's welcome copy sets the fiction, verbatim:
> "KhannaTown is holding its annual Restaurant Row Chef's Challenge, and you've been
> awarded a coveted entry into the contest!"

One sentence on the rename: in the wireframes the first restaurant was **G'raj Mahal**;
it opened as **TajMahal**.

Images: `wf-khanatown.jpg` (hand-drawn street), `wf-restaurant-row.jpg` (the gating
sketch, "this is the only restaurant selectable to explore"), `map-restaurant-row.jpg`
(the built map), `course-hub-start.jpg`.

### 7 — `The tell` / **The slide where it stopped being a reskin**
**Approved for inclusion. Confident framing, not apologetic.**

The first hidden-object checklist in the wireframe deck reads: Milk, Sugar — and then
**Ashtray, Trowel, Bee, Hotdog, Handsaw, TV, Trash can, Ball and chain.** Genre filler,
inherited from every hidden-object game ever made, where the objects are hidden *in* a
scene but have nothing to do with it.

Every list after that one is milk, sugar, cooking oil, bell peppers, spices, vegetables,
rose water, semolina. Ingredients. Things that go into the dish you are about to cook.

That is the moment the game stops being a hidden-object game with an Indian skin on it
and becomes a game about food — where finding a thing and needing a thing are the same
act. It is visible, on one slide, mid-deck.

Image: `wf-hunt-list.jpg`, shown large enough that the filler item names read.
(This is the one place a rough edge is deliberately on display, because it is the point.)

### 8 — `The economy` / **The hint costs exactly what the good tea costs**
The rules, in her own words from the prototype's Help screens:
> "Be frugal with your hints though as each one will cost you $20. In each restaurant,
> you are given a starting budget of $100."
> "You can lose money from your budget by using hints or by tapping the wrong items.
> You can earn more money by quickly finding consecutive items and by clearing the
> level in a short amount of time."

Then the ingredient ladders — four tiers, cheapest free, best expensive. Real brands,
kept verbatim:

| Ingredient | Free | | | Best |
|---|---|---|---|---|
| Tea | Lipton — Free | TATA — $10 | Taj Mahal — $20 | Red Label Marigold — $45 |
| Gram flour | Generic — Free | MTR — $19 | Swad — $22 | Fresh Ground — $35 |
| Rice &amp; wheat | Generic — Free | Great Value — $25 | Tilda — $40 | Dawat — $65 |
| Semolina | Generic — Free | Uncut — $6 | Semi Roasted — $12 | Roasted fine — $22 |

**The argument to land:** the game never tells you that better ingredients make better
food. It charges you for them, and then judges the result. The lesson is in the ledger.

Images: `shop-tea.jpg`, `shop-tea-chosen.jpg`, `help-economy.jpg` (small), `bonus-congrats.jpg`.

### 9 — **THE BUDGET LEDGER** (bespoke graphic — the centrepiece)
Build natively in HTML/CSS/SVG. Not an image. One real playthrough of TajMahal,
traced from the prototype page by page:

| Step | Event | Change | Balance |
|---|---|---|---|
| 1 | Starting budget | — | **$100** |
| 2 | Cleared the grocery store — speed $15, time $16 | +$31 | $119* |
| 3 | Bought Red Label Marigold tea, the best tier | −$45 | $74 |
| 4 | Cleared the second hunt — speed $10, time $10 | +$20 | $94 |
| 5 | Bought Fresh Ground gram flour, the best tier | −$35 | $59 |
| 6 | Cleared the dinner table — speed $11, time $12 | +$23 | $82 |
| 7 | Bought Dawat rice and wheat, the best tier | −$65 | $17 |
| 8 | Cleared the bakery — speed $10, time $11 | +$21 | $38 |
| 9 | Bought Roasted fine semolina, the best tier | −$22 | **$16** |

\* The prototype shows $119 here rather than $131. Do not draw attention to it and do
not "fix" it silently in a way that changes other numbers — simply render the balances
the prototype shows. The shape of the line is the point.

**The payoff line, which must appear directly under the graphic:**
> She walks into the cooking round with $16 — and a hint she can no longer afford.

Design: a horizontal step chart or ledger rail. Warm bars for spending, cool for
earning. The `$16` end state emphasised. Must be readable on mobile — if a chart
cannot work at 380px, fall back to a stacked ledger list at that breakpoint.
Respect `prefers-reduced-motion`.

### 10 — `Cooking` / **Five bundles, five stations, five dishes**
The crafting spec, from wireframe slide 50, verbatim:

- milk + sugar + chai tea ⇒ **Boiler** → chai tea
- gram flour + bell pepper + oil ⇒ **Fryer** → pakoda
- spices + vegetables ⇒ **Fryer**
- rice ⇒ **Steamer**
- kneaded flour ⇒ **Roti maker** → **Pan** → rotis
- gram flour + rose water + semolina ⇒ **Fryer** → **Syrup** → gulab jamun

Then the doneness gauge: each appliance carries a blue→green→red meter that travels
while it cooks, and you have to stop it in the green. Undercooked, Well Done,
Overcooked. Build the gauge in CSS at full size here.

Then plating — the wireframe's thali composition diagram — and the finished plate.

Images: `wf-recipe-logic.jpg` (large, it must be readable), `wf-meal-prep.jpg`,
`prep-station.jpg`, `prep-cooking.jpg`, `wf-plating.jpg`, `final-dish.jpg`.

### 11 — `The verdict` / **Judged on what you bought, how you cooked, and how long you took**
Three criteria, stated in the prototype's own Help copy. Five stars. The review is
written as a restaurant critic, not a score screen — quotable, verbatim:

> "Right from the start, I could tell this meal was prepared with the finest and
> freshest ingredients available."

*(Note: the prototype misspells "prepared". Quote it corrected as above — do not
reproduce the typo and do not add [sic].)*

Close the loop: a new restaurant unlocks, and the whole thing runs again with a
different cuisine and a fresh $100.

Images: `rating-five-star.jpg`, `wf-rating.jpg`.

### 12 — `Looking back` / closing reflection
Short, honest, forward-looking. Ground it in what the research actually said and what
the build actually was. Legitimate points to draw on:
- The survey found people who liked the genre but had no time for it; timed/relaxed was
  the answer, but the deeper answer — sessions that fit a commute — was never designed.
- Ingredient flavour text taught one fact at a time. It never checked whether anything
  stuck.
- It was a prototype, handed in as a capstone. It was never playtested with the 129
  people who asked for it.

Do not overstate this into failure. It should read as a designer who knows exactly what
the next version would do.

### NEXT PROJECT + CTA + FOOTER
Match the existing pages' pattern exactly.

---

## 5. Assets

Assets are being cut into three staging folders. Promote the chosen files into
`public/work/cookinquest/` with the **final filenames used above**.

| Staging folder | Contents |
|---|---|
| `public/work/cookinquest/` | crops from the flattened Wix composite (icons, palette, components grid) |
| `cookinquest/prepped/` | full-res prototype screens — **the best source, prefer these** |
| `cookinquest/prepped-wf/` | wireframe and research slides |
| `cookinquest/prepped/sketch-app-icon.jpg` | the hand-drawn marker icon |

**Filenames are permanent** — `public/work/*` is cached immutably for a year, so a
re-crop needs a new filename, never a re-upload under the same one.

Every `<img>` needs a real `alt`. Describe what is in the picture, not "screenshot".

---

## 6. Wiring

1. Create `src/pages/work/cookinquest.astro`.
2. Remove `'cookinquest'` from `REDIRECTED_WORK_SLUGS` in `src/lib/work-redirects.ts`.
3. Remove the two `/work/cookinquest` rules from `public/_redirects`.
4. `src/content/work/cookinquest.mdx` already has `href: /work/cookinquest` — update
   its `description` to match the new hero copy, and add `summary`, `role`, `team`,
   `platform` if the collection schema supports them. **Do not add `year`.**
5. Confirm the next-project link resolves and that the card on `/#work` opens in the
   same tab, matching the other built case studies.

## 7. Definition of done

- [ ] `/work/cookinquest` renders locally with no console errors.
- [ ] `npm run build` passes.
- [ ] Only the five LAGOON type sizes; only DM Sans + Inter.
- [ ] No hard-coded colour outside the scoped `--cq-*` block and existing tokens.
- [ ] No year anywhere on the page.
- [ ] The logo and app icon are cropped, never altered.
- [ ] Placeholder hunt-list text, the Spanish market photo, and the typos are absent
      (except the deliberate `wf-hunt-list.jpg` in §7).
- [ ] The budget ledger is native HTML/CSS/SVG and readable at 380px.
- [ ] Every animation degrades under `prefers-reduced-motion`.
- [ ] Responsive at 380 / 768 / 1280.

---

## Appendix A — the shipped iOS kit, sampled

Exact hex values sampled from the game's own 16-swatch iOS kit. Prefer rendering
these as native CSS swatches over using `color-palette.jpg` (the source crop is only
530px wide and is flat colour, so CSS is sharper).

**Warm ramp** (the survey's answer, in order)
`#E9D167` `#FAF036` `#F6AC4B` `#F18F2E` `#E48312` `#BD582C` `#E45141` `#8E000E`

**Cool + neutral ramp**
`#34AFD1` `#2A88D2` `#3B3DAC` `#000000` `#353535` `#AAABAF` `#D4D4D4` `#FFFFFF`

Accuracy note: the survey named **yellow, red, orange, brown and green**. The kit
shipped the first four. Green never made it in. Do not claim the palette matched the
survey exactly — say the warm ramp is the survey's answer, which is true and enough.

## Appendix B — the refined app icon

`app-icon.png` (and `app-icon.jpg`) is a **new, refined icon supplied by Lochana**,
not the 2016 shipped icon. It shows a chef's toque above crossed rolling pin and
spatula with an India-flag disc at the centre, on a blue rounded square. Prefer the
`.png` — it is flat vector art and JPEG rings on those edges.

It matches the marker sketch (`sketch-app-icon.jpg`) and the written rationale
closely, so the identity section reads: rationale → sketch → refined icon.
**Crop only. Never alter it.**
