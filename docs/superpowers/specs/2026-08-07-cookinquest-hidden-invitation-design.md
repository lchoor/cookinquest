# CookInQuest Hidden Invitation Design

## Decision

Build **The Hidden Invitation** as the primary structure for the 2026 iPad HTML prototype, then incorporate the strongest interaction ideas from **Choose Your Chef Kit** and **Restaurant Row First**. The result is one coherent onboarding direction rather than three separate account screens.

The first meaningful input must be play, not account administration. The player enters a lively KhannaTown market tabletop with Restaurant Row visible beyond it and finds one Chef's Challenge invitation. Opening it reveals three identity choices as chef-kit objects: **Play as Guest** on an apron patch, **Returning Chef** on a recipe book, and **New Chef** on a chef hat.

## Goals

- Communicate “hidden-object cooking adventure” within the first five seconds.
- Preserve the supplied PDF's playful cyan, mango, turmeric, paprika, chilli-red, hand-lettered, collage-driven visual character.
- Let a player begin immediately as a guest.
- Support lightweight local profiles without implying real authentication or cloud sync.
- Blend the three approved concepts without showing three competing layouts or repeating the account choice.
- Work at 1210 × 834 pt, 700 × 834 pt, and the existing below-480-width fallback.

## Scope of this section

This implementation pass contains only the player-entry section and its transition into the existing showcase-loop route:

1. Hidden Invitation cold open.
2. One safe invitation find.
3. Invitation opening and identity choices.
4. Guest entry.
5. Returning local-profile selection.
6. New local-profile creation.
7. Continue to the showcase loop's next route.

The map, 15-item hunt, shop, cooking, plating, and verdict remain later sections. On completion, onboarding emits a `navigate` event with route `map` and the active session. During this section-only pass, the preview harness records that handoff and presents a non-product test status outside the 1210 × 834 game frame; it does not invent an in-game transition screen or prebuild later gameplay.

## Experience flow

### 1. Cold open

The screen is a full-bleed KhannaTown market tabletop. A sealed Chef's Challenge invitation sits among spices, chai, patterned fabric, and small ambient food-market details. An archway or open market lane reveals Restaurant Row and the highlighted Taj Mahal destination in the middle distance. The chef mascot is an active character in the composition rather than a decorative app icon.

A compact objective strip reads `Find your invitation · 0/1`. There is no login card, tutorial carousel, lore modal, timer, or penalty.

The invitation is discoverable without pulsing its exact outline. Nearby steam, cloth movement, and mascot eye-line make the scene feel alive without revealing the answer.

### 2. Find feedback

Touch, Apple Pencil, pointer click, keyboard focus plus Enter/Space, and assistive selection can activate the invitation. Success produces:

- A tactile press response.
- A short celebratory ring around the invitation.
- Objective progress changing to `1/1`.
- Optional sound and haptic cues when enabled.
- The invitation opening in place.

Reduced Motion replaces the opening flourish with a direct state change. The first exploratory find never incurs a miss penalty.

### 3. Identity reveal

The opened invitation presents three large stamp-like actions, each paired with a tactile chef-kit object:

- `PLAY AS GUEST` on a guest apron patch - primary.
- `RETURNING CHEF` on a recipe book - secondary.
- `NEW CHEF` on a chef hat - secondary.

The objects are visually distinct but remain explicit buttons, not a second hidden-object puzzle. The actions belong visually to the invitation rather than a generic authentication modal. Each has a visible pressed state, focus outline, text label, and at least a 44 × 44 pt hit area.

### 4. Guest

Guest creates a session in `sessionStorage` and continues immediately. Guest progress survives navigation and reloads within that browser tab but is not restored after the tab is closed. Downstream game screens show a compact `GUEST · SAVE PROGRESS` player chip that can convert the run into a local profile without resetting progress; it never blocks play.

### 5. Returning Chef

Returning Chef opens an opaque paper sheet listing profiles already stored on this device. Each row includes avatar, display name, and last known game location. Selecting a row resumes that profile.

This is not security authentication. There is no email, password, PIN, network call, or cross-device claim. If no local profiles exist, the sheet explains that briefly and offers `Create a chef profile`.

### 6. New Chef

New Chef opens an opaque paper sheet with:

- Display name.
- One avatar selected from a small cooking-themed set.
- `Create chef` primary action.
- `Back to invitation` secondary action.

Names are trimmed, limited to 24 characters, and must not be empty. Duplicate names are allowed because profiles use generated internal IDs.

## Visual system

The source of truth is `share/CookInQuest_Figma_Reference.pdf`, modernized for iPad legibility rather than replaced.

The selected generated concept controls composition and interaction hierarchy, not final brand geometry. Embed `drop/Logo_icon.png` exactly; do not redraw, recolor, distort, or replace it. New scene artwork may be generated from the PDF references, but it must not reproduce the reference screens' placeholder item labels, typos, timers, or blocked modal flow.

Preserve:

- Vivid cyan world framing and ribbons.
- Mango-orange surfaces with concentric paprika, chilli, and charcoal outlines.
- Hand-lettered display copy paired with a highly legible body face.
- Sticker-like chef mascot treatment.
- Indian patterned trim and textile texture.
- Slight rotations, overlaps, cut-paper edges, and food-photo/illustration collage.
- Blurred environmental depth behind foreground interaction states.
- A visible Restaurant Row destination beyond the tabletop, with Taj Mahal readable as the first goal.
- Chef-kit silhouettes that make identity choices feel like game objects rather than account rows.

Improve:

- Reduce large passive sidebars and centered modal dominance.
- Let the world occupy at least 70% of the frame.
- Use one clear primary action at a time.
- Keep body copy short and readable.
- Reserve irregular lettering for headings and labels, not paragraphs.
- Keep critical UI within a 5% title-safe inset.

Do not show the finished thali during onboarding; it is an earned payoff later.

## Motion and playfulness

Motion communicates state:

- Market details use low-amplitude ambient loops.
- Invitation press compresses and releases.
- Success ring and opening motion occur once.
- Stamp choices arrive with a short stagger after the envelope opens.
- Mascot expression changes on the successful find.
- The selected chef-kit object stamps the invitation, which then folds down to reveal Restaurant Row before the `map` navigation handoff.

No constant bouncing call-to-action, decorative particle storm, camera shake, or motion that obscures text. Reduced Motion uses static substitutions.

## Architecture

Use accessible DOM-first HTML, CSS, and JavaScript for onboarding. This keeps profile controls, keyboard navigation, responsive layout, and assistive technology reliable. Later hunt scenes can add canvas-driven effects without moving essential controls or state out of the DOM.

Bounded modules:

- `profileStore`: reads, validates, writes, and deletes local profiles.
- `sessionStore`: owns guest state in `sessionStorage` and the selected local-profile session.
- `onboardingState`: `searching`, `invitationFound`, `identityChoice`, `returningChef`, `newChef`, `complete`.
- `onboardingView`: renders the current state and announces transitions.
- `inputController`: normalizes touch, pointer, keyboard, and assistive activation.
- `routeController`: hands the completed entry state to the next showcase-loop route.

Use event-driven transitions. Visual totals and labels derive from state; do not duplicate values in markup.

## Local data

Persist versioned JSON under one `localStorage` namespace:

```text
cookinquest.v1.profiles
```

Each profile contains:

```text
id, displayName, avatarId, createdAt, updatedAt, progress
```

Malformed or unsupported data falls back safely to an empty profile list and offers a non-destructive reset. Storage failure never blocks guest play.

## Accessibility

- All primary targets are at least 44 × 44 pt.
- The invitation has an accessible name and can be reached without spatial guessing.
- A screen-reader player hears the objective but not the invitation's exact visual position.
- Focus order follows objective, scene interaction, then revealed identity actions.
- Focus remains visible on patterned or photographic backgrounds.
- Text and icon/shape redundantly encode states; color is never the only signal.
- Larger Text can expand sheets without covering the primary action.
- Reduced Motion and Reduced Transparency are respected.
- The complete section works without dragging.

## Failure and recovery

- Unsupported storage: explain that profiles cannot be saved, keep Guest available.
- Corrupt profile data: ignore invalid records, preserve valid ones, offer reset only when necessary.
- Empty Returning Chef list: direct to New Chef without a dead end.
- Interrupted animation: resolve to the destination state, never trap input.
- Very narrow viewport: use the existing widen-window override rather than compressing the scene into an unusable layout.

## Verification

- Verify the full flow with touch/pointer and keyboard only.
- Verify guest play with storage disabled.
- Verify create, reload, return, and select for a local profile.
- Verify empty, corrupt, and duplicate-name profile cases.
- Verify 1210 × 834 and 700 × 834 layouts.
- Verify the below-480-width fallback.
- Verify visible focus, accessible names, Reduced Motion, and Larger Text behavior.
- Compare the built entry screen against the selected concept and PDF reference at the same viewport.

## Concept blend boundaries

- The Hidden Invitation remains the only opening objective and the only required search interaction.
- Choose Your Chef Kit contributes the apron, recipe book, and chef hat as identity-button artwork; it does not add a second search step.
- Restaurant Row First contributes the visible destination, highlighted Taj Mahal goal, and downstream `GUEST · SAVE PROGRESS` chip; it does not bypass the invitation.
- All three ideas share `profileStore`, `sessionStore`, `inputController`, and downstream route state.
