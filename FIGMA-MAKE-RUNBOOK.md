# CookInQuest Figma Make Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete, untimed Taj Mahal Phase 0–6 interactive game mockup in Figma Make with the least practical AI-credit spend.

**Architecture:** One local-only React/TypeScript prototype uses a deterministic state machine, a transaction ledger, 14 reusable templates, and data arrays for the 60 targets. Six bounded Make passes add the journey incrementally, with preview verification and repair inside each prompt.

**Tech Stack:** Figma Make, React, TypeScript, CSS, browser localStorage, uploaded Markdown/PDF/PNG context.

---

Use this sequence to build the complete interactive mockup while minimizing Figma AI credits and avoiding rework.

## Files to provide once

Upload these four files with the first prompt only:

1. `FIGMA-MAKE-SPEC-2026.md` — behavior and content source of truth.
2. `share/guidelines.md` — standing rules that should be placed in the Make project's `guidelines.md` file.
3. `share/CookInQuest_Figma_Reference.pdf` — 20 selected source screens, approximately 1.9 MB. Use this instead of the 41 MB original because Figma Make's PDF attachment limit is 5 MB.
4. `drop/Logo_icon.png` — exact embedded logo asset.

Do not attach `CookInQuest_Untimed_User_Journey.html` or the full original PDF to the initial prompt. They duplicate information already present and increase context cost. Keep the HTML open beside Figma as a human review reference.

Figma Make currently accepts up to 10 attachments per prompt. Text files may be up to 1 MB; PDFs may be up to 5 MB. Attachments add context cost, so upload the four files once and reference them by filename in later prompts.

## Step 1 — Create the Make file

- [ ] Complete the Make-file setup and attach the four source files once.

1. Open Figma's file browser and go to Drafts.
2. Select **Make** in the upper-right corner.
3. Name the file `CookInQuest — Taj Mahal Interactive Mockup`.
4. Open the main menu and check **AI balance** before starting.
5. Add the four files above using **Add context → Add images and files**.
6. If Plan mode is available, enable it for the first prompt.

## Step 2 — Plan once, without building

- [ ] Run Prompt 1 in Plan mode and approve its structure before code begins.

Paste this as Prompt 1:

```text
Read the four attached CookInQuest files. Use FIGMA-MAKE-SPEC-2026.md as the behavior and content source of truth. Use the PDF only for visual lineage; ignore every legacy mechanic visible in it. Embed Logo_icon.png exactly. Put the attached guidelines.md content into the project guidelines file so it remains active.

Do not write code yet. Produce a compact implementation plan for one local-only React/TypeScript functional prototype with reusable components and a deterministic state machine. Divide delivery into the six passes listed below. Confirm exactly: Phase 0–6, 14 templates, 60 named targets, no timer or mode choice, four hunt/shop loops, five scored cooking stations with a three-batch fryer, six plate components, 22-point judgment, exact save/replay/unlock behavior, and regular/compact iPad layouts.

Return only the plan, proposed file map, state shape, and pass-by-pass acceptance checks. Do not redesign or summarize the source documents.
```

Review the returned plan. If any confirmation is missing, correct it before code begins. Do not spend a build prompt on a structurally wrong plan.

## Step 3 — Build Pass 1: foundation and Phases 0–2

- [ ] Run Prompt 2 and verify the Phase 0–2 foundation.

Paste this as Prompt 2:

```text
Execute Pass 1 only from the approved plan: project foundation, design tokens, shared shell, deterministic state store, transaction ledger, save adapter, 14 reusable template/component shells, Phase 0 title, Phase 1 inline challenge story, and Phase 2 Restaurant Row plus Taj Mahal course hub. Use Logo_icon.png exactly. Story ribbons are embedded and nonblocking. Implement regular and compact shell layouts now. Do not build hunt, shopping, cooking, judgment, or later restaurant content yet. Run the preview, repair errors in this response, then return only changed file names and the Pass 1 acceptance checklist.
```

Verify in Preview:

- Play reaches Restaurant Row without a tutorial or mode screen.
- Taj Mahal opens the four-course hub with a fresh $100 ledger.
- Six sequential restaurant slots and three Coming Soon slots are visible.
- Continue is hidden until a save exists.

## Step 4 — Build Pass 2: all four hunts

- [ ] Run Prompt 3 and verify exactly 60 data-driven targets.

Paste this as Prompt 3:

```text
Execute Pass 2 only: implement the single data-driven HuntScene for all four courses and all 60 stable target IDs from section 10.2. Add named checklists, found sets, correct/miss feedback, $0-clamped Miss −$2, Hint −$20 affordability, assisted targets, provisional Find Bonus, 20 nonblocking fact strips plus persistent Facts log, exact resume state, and course completion. Use four distinct full-bleed scenes derived from the PDF's playful visual language, but do not reproduce legacy timer or modal UI. Do not build shops or cooking yet. Run all four courses in preview, repair errors now, and return only changed files plus counts proving 15 targets per course and 60 total.
```

Verify:

- Every course begins at `0/15` and can reach `15/15`.
- Repeated ingredients have separate course-scoped IDs.
- A hinted object is assisted and does not earn its $1 Find Bonus.
- Educational facts never block the next find.
- Dessert ends with Khoya and Lemon, not Dough Balls or Finished Gulab Jamun.

## Step 5 — Build Pass 3: economy and four shops

- [ ] Run Prompt 4 and verify every transaction and purchase path.

Paste this as Prompt 4:

```text
Execute Pass 3 only: implement level-complete reconciliation, post each course's $0–$15 Find Bonus once, four data-driven shop ladders, affordability, resulting-balance preview, explicit Buy, purchase confirmation, completed-course review, and return to hub. Use the exact brands and prices in section 10.1. Implement the golden-path ledger from section 6 and prevent repeated bonus or purchase posting. Do not build cooking yet. Run economy scenarios for free, affordable, unaffordable, hint, miss, and golden-path purchases; repair errors in this response and return only the ledger results and changed files.
```

Expected golden path:

`$100 → +15 −45 = 70 → +15 −35 = 50 → +15 −40 = 25 → +15 −22 = 18`

## Step 6 — Build Pass 4: complete cooking and plating

- [ ] Run Prompt 5 and verify every station dependency and plate component.

Use the most exact model available for this pass because it contains the densest interaction logic. Paste as Prompt 5:

```text
Execute Pass 4 only from sections 5 and 10.4: build the complete prep station, not a shortcut. Use named ingredient bundles, drag and tap-select/tap-place parity, invalid-placement snapback, explicit Start and Finish, labelled doneness ranges, five scored station responsibilities, the fryer queue Pakoda → Vegetables → Gulab Jamun, the visible Roti ingredients → dough → maker → pan sequence, dependencies between fried balls and saucepan, and all six plate slots. No global timer. Active gauges pause for Help, Pause, accessibility reading, and app interruption. Present Dish is enabled only after all six components are placed. Run every station and all three fryer batches, repair errors now, and return only outcome scores, dependency checks, and changed files.
```

Verify:

- Cooking cannot start before four hunts and four purchases complete.
- Five station scores total at most 10.
- Fryer batches retain three outcomes but produce one rounded station score.
- Thaali combines vegetables, rotis, and rice.
- The finished gulab jamun appears only after frying and syrup finishing.

## Step 7 — Build Pass 5: judgment, saving, replay and progress

- [ ] Run Prompt 6 and verify high-score, low-score, replay and unlock paths.

Paste this as Prompt 6:

```text
Execute Pass 5 only: implement dish reveal, Ingredient Quality /12, Cooking /10, total /22, exact star bands, critic response, expandable score detail, See Restaurant Row, Replay Taj Mahal, and Continue Later. Save before leaving judgment. On map, show Taj Mahal Completed with stars and 4/4, unlock slot 2 without auto-launch, and give a future restaurant a fresh $100 rather than adding to Taj Mahal's balance. Replay resets only the Taj Mahal run and preserves best stars plus campaign unlocks. Run 1-star and 5-star scenarios, repair errors now, and return only score arithmetic, persistence results, and changed files.
```

## Step 8 — Build Pass 6: responsive, accessibility and edge-state audit

- [ ] Run Prompt 7 and close every failed acceptance check before continuing.

Paste this as Prompt 7:

```text
Execute Pass 6 only: finish regular 1210×834 and compact 700×834 layouts, the below-480 hunt width override, 44×44 minimum controls, keyboard/controller mappings, VoiceOver spatial search cursor, contrast control, Dynamic Type-safe panels, Reduced Motion, Reduced Transparency, no color-only meaning, and select-then-place alternatives. Audit no funds, active hint, wrong-tap cooldown, invalid placement, burned cooking, exact resume, replay, and unlocked-map states. Do not redesign completed screens. Run the full Phase 0–6 golden path and a low-score path, repair errors in this response, then return a concise pass/fail matrix and remaining defects only.
```

## Step 9 — Make small corrections without expensive broad prompts

- [ ] Use targeted editing or the focused correction template for remaining defects.

- Use the Edit tool or annotations to point at one visible element for spacing, color,
  radius or typography changes.
- For a small logic or copy fix, open Code, search for the exact component or string,
  and edit it directly when comfortable.
- Do not resend the specification, PDF or logo with correction prompts.
- Avoid vague whole-project correction requests; name the component, state, current
  behavior and expected behavior.
- Use a lighter model for targeted styling changes. Reserve a high-reasoning model
  for state-machine, cooking dependency or accessibility failures.

Focused correction template:

```text
In [component and state], [current behavior] is wrong. Change only this behavior to [expected result from specification section X]. Preserve all other screens, state and styling. Run the affected path and return the observed before/after result only.
```

## Step 10 — Preserve a clean, low-credit baseline

- [ ] Duplicate the verified Make file and preserve it as the clean baseline.

1. When Pass 6 is verified, duplicate the Make file. Duplicating preserves the build
   without spending credits and gives experiments a clean prompt history.
2. Name the stable copy `CookInQuest — Verified Taj Mahal Baseline`.
3. Explore visual alternatives only in duplicates.
4. If prompt history becomes long or simple edits become expensive, duplicate the
   latest verified file or clear chat context. Keep `guidelines.md` and the production
   spec as the permanent source of truth.
5. Use full-screen Preview to test. When ready, share the Make preview link; publishing
   to the public web is optional.

## Official Figma references

- Explore Figma Make: https://help.figma.com/hc/en-us/articles/31304412302231-Explore-Figma-Make
- Attach files: https://help.figma.com/hc/en-us/articles/31304529835671-Attach-files-to-a-prompt-in-the-Figma-agent-and-Figma-Make
- Optimize AI credits: https://help.figma.com/hc/en-us/articles/40097793879191-Best-practices-for-optimizing-AI-credits-in-Figma-Make
