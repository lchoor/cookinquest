# CookInQuest Figma Make Guidelines

## Source priority

1. `FIGMA-MAKE-SPEC-2026.md` controls behavior, content, state, numbers and scope.
2. `CookInQuest_Figma_Reference.pdf` controls visual lineage only. Ignore legacy rules shown inside it, including Timed/Relaxed, timers, old bonuses, modal-heavy feedback and old item names.
3. `Logo_icon.png` is an exact embedded asset. Do not redraw, recolor, distort or replace it.

## Standing rules

- Build the complete Taj Mahal Phase 0–6 vertical slice: four 15-item hunts, four rewards, four shops, four confirmations, full cooking, six-component plating, judgment and map unlock.
- The game is untimed. Do not add a timer, mode selector, energy, lives, monetization, login, backend or network dependency.
- Use 14 reusable templates and data/state variations. Never create 60 separate hunt implementations.
- All 60 named targets must be real interactive objects with stable IDs. Khoya (Milk Solids) and Lemon are the final two dessert targets.
- Story ribbons and educational facts are nonblocking. There are no tutorial screens or coach marks.
- Budget, progress and score displays must derive from state. Never hardcode a visible total that can drift from the transaction ledger.
- Cooking has five scored station responsibilities, a three-batch fryer queue, a visible roti substage, six plate components and an explicit Present Dish action.
- Judgment totals 22 points: Ingredient Quality 12 plus Cooking 10. There is no time category.
- Support 1210 × 834 regular, 700 × 834 compact and the specified minimum-width override. Core controls are at least 44 × 44 points.
- No drag-only actions, color-only meaning or translucent material over critical game content.
- Use the original playful hand-made Indian cooking-game character while applying the iPadOS 26 layout and accessibility rules from the specification.

## Build discipline

- Execute only the requested pass. Do not prebuild later passes.
- Reuse existing data, components and state before creating anything new.
- After each pass, run the preview, repair errors in the same response and return only a compact verification checklist plus changed file names.
- Do not repeat or summarize the uploaded specification unless explicitly asked.
