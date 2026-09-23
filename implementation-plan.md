# CookInQuest Option 1 Onboarding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the approved Option 1 onboarding as one continuous landscape scene and transition cleanly into the approved Option 2 chef-kit screen.

**Architecture:** Keep the existing vanilla HTML state machine, but make `INVITATION_FOUND` a real transition state. Option 1 remains mounted throughout search, reveal, and player entry; live semantic hotspots and state text sit over the approved art. A small timing module owns the 900 ms reveal contract, and a separate chef-kit view owns the transition into Option 2.

**Tech Stack:** HTML, CSS, vanilla JavaScript modules, Node test runner, Sharp for image optimization, Astro static build, in-app browser for visual QA.

---

## File Map

- Modify `public/work/cookinquest/game/index.html` — keep one Option 1 scene and add the Option 2 chef-kit scene.
- Modify `public/work/cookinquest/game/styles.css` — add the invitation reveal and screen-to-screen motion.
- Modify `public/work/cookinquest/game/js/constants.mjs` — add `CHEF_KIT` mode and stage actions.
- Modify `public/work/cookinquest/game/js/onboarding-state.mjs` — make transitions strict and add the Stage 2 handoff.
- Modify `public/work/cookinquest/game/js/onboarding-view.mjs` — render busy, inert, disabled, and active states.
- Modify `public/work/cookinquest/game/js/main.mjs` — coordinate the 900 ms reveal and selected-stamp handoff.
- Create `public/work/cookinquest/game/js/onboarding-timing.mjs` — single source for reveal and reduced-motion timing.
- Create `public/work/cookinquest/game/assets/chef-kit-screen.webp` — optimized approved Option 2 reference.
- Modify tests under `tests/cookinquest/` — reducer, timing, view, shell, asset, and integration contracts.
- Update `design-qa.md` and `docs/qa/` — same-state reference comparisons and flow evidence.

### Task 1: Lock the state and timing contracts

**Files:**
- Create: `public/work/cookinquest/game/js/onboarding-timing.mjs`
- Modify: `public/work/cookinquest/game/js/constants.mjs`
- Modify: `public/work/cookinquest/game/js/onboarding-state.mjs`
- Create: `tests/cookinquest/onboarding-timing.test.mjs`
- Modify: `tests/cookinquest/onboarding-state.test.mjs`

- [ ] **Step 1: Write the failing timing test**

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  REVEAL_TIMING,
  getRevealDelay,
} from '../../public/work/cookinquest/game/js/onboarding-timing.mjs';

test('invitation reveal uses one 900ms contract with an immediate reduced-motion path', () => {
  assert.deepEqual(REVEAL_TIMING, {
    press: 80,
    objective: 180,
    invitation: 420,
    stampsStart: 560,
    stampsEnd: 820,
    complete: 900,
  });
  assert.equal(getRevealDelay({ reducedMotion: false }), 900);
  assert.equal(getRevealDelay({ reducedMotion: true }), 0);
});
```

- [ ] **Step 2: Extend reducer tests before changing production code**

Add table-driven assertions that `SEARCHING` and `INVITATION_FOUND` return the identical state object for `OPEN_RETURNING`, `OPEN_NEW`, `COMPLETE`, and `ENTER_CHEF_KIT`. Add the valid edge:

```text
IDENTITY + ENTER_CHEF_KIT -> CHEF_KIT
```

- [ ] **Step 3: Run the focused tests and confirm RED**

Run:

```bash
node --test tests/cookinquest/onboarding-timing.test.mjs tests/cookinquest/onboarding-state.test.mjs
```

Expected: missing timing module, missing `CHEF_KIT`, and invalid transition assertions fail.

- [ ] **Step 4: Add the minimal timing module and strict transitions**

```js
export const REVEAL_TIMING = Object.freeze({
  press: 80,
  objective: 180,
  invitation: 420,
  stampsStart: 560,
  stampsEnd: 820,
  complete: 900,
});

export function getRevealDelay({ reducedMotion }) {
  return reducedMotion ? 0 : REVEAL_TIMING.complete;
}
```

Add `CHEF_KIT: 'chefKit'` and `ENTER_CHEF_KIT: 'ENTER_CHEF_KIT'`. Only Identity or successful profile completion may enter Chef Kit.

- [ ] **Step 5: Run tests and commit**

```bash
npm run test:game
git add public/work/cookinquest/game/js tests/cookinquest
git commit -m "feat: define CookInQuest reveal timing"
```

Expected: all game tests pass.

### Task 2: Make Option 1 one continuous interactive scene

**Files:**
- Modify: `public/work/cookinquest/game/index.html`
- Modify: `public/work/cookinquest/game/js/onboarding-view.mjs`
- Modify: `tests/cookinquest/entry-shell.test.mjs`
- Modify: `tests/cookinquest/onboarding-view.test.mjs`

- [ ] **Step 1: Write failing view tests**

Require these view results:

```js
assert.deepEqual(getOnboardingView(foundState), {
  objective: '1/1',
  objectiveLabel: 'Invitation found',
  showInvitation: true,
  showEntryChoices: true,
  entryInteractive: false,
  busy: true,
  announcement: 'Invitation found.',
});

assert.deepEqual(getOnboardingView(identityState), {
  objective: '1/1',
  objectiveLabel: 'Choose your way in',
  showInvitation: true,
  showEntryChoices: true,
  entryInteractive: true,
  busy: false,
  announcement: 'Invitation opened. Choose how to enter the challenge.',
});
```

Also assert that FOUND makes the entry group inert, `aria-hidden="true"`, and disables all three stamps; IDENTITY removes those locks.

- [ ] **Step 2: Write the failing shell contract**

Require one always-mounted `data-option1-scene`, one sealed invitation hotspot, one live objective overlay, and three semantic stamp buttons. Reject duplicate legacy invitation/open-envelope image layers.

- [ ] **Step 3: Run focused tests and confirm RED**

```bash
node --test tests/cookinquest/entry-shell.test.mjs tests/cookinquest/onboarding-view.test.mjs
```

Expected: missing view fields, missing Option 1 scene markers, and incorrect interactivity fail.

- [ ] **Step 4: Simplify the HTML**

Use this structure:

```html
<section data-option1-scene aria-labelledby="option1-objective">
  <img src="./assets/option1-entry-screen.webp" alt="" decoding="async">
  <button data-invitation-target aria-label="Open the Chef's Challenge invitation"></button>
  <p data-live-objective><span data-objective-label>Find your invitation</span> <strong data-objective-count>0/1</strong></p>
  <div data-entry-choices aria-label="Choose your way in" inert aria-hidden="true">
    <button data-action="guest" disabled><span>Play as Guest</span></button>
    <button data-action="returning" disabled><span>Returning Chef</span></button>
    <button data-action="new" disabled><span>New Chef</span></button>
  </div>
</section>
```

The approved composite stays visible from the first frame. Live overlays change state without replacing the scene.

- [ ] **Step 5: Implement renderer locks and announcements**

Set `root.ariaBusy`, invitation disabled state, entry group inert/aria-hidden, button disabled states, and objective copy exclusively from `getOnboardingView`.

- [ ] **Step 6: Run tests and commit**

```bash
npm run test:game
git add public/work/cookinquest/game/index.html public/work/cookinquest/game/js/onboarding-view.mjs tests/cookinquest
git commit -m "refactor: keep Option 1 onboarding in one scene"
```

Expected: all game tests pass.

### Task 3: Animate the invitation reveal without a screen swap

**Files:**
- Modify: `public/work/cookinquest/game/styles.css`
- Modify: `public/work/cookinquest/game/js/main.mjs`
- Modify: `tests/cookinquest/entry-shell.test.mjs`
- Modify: `tests/cookinquest/onboarding-state.test.mjs`

- [ ] **Step 1: Write failing motion-source tests**

Require CSS keyframes named `invitation-touch`, `invitation-lift`, and `stamp-rise`; require delays at 560 ms, 620 ms, and 680 ms; reject `display:none` on the Option 1 scene during FOUND. Require `main.mjs` to use `getRevealDelay` and guard the callback with `state.mode === MODES.INVITATION_FOUND`.

- [ ] **Step 2: Run focused tests and confirm RED**

```bash
node --test tests/cookinquest/entry-shell.test.mjs tests/cookinquest/onboarding-state.test.mjs
```

Expected: missing keyframes, delays, timing helper use, and stale-timer guard fail.

- [ ] **Step 3: Implement the 900 ms motion sequence**

Use CSS custom properties so timing remains readable:

```css
.game-stage {
  --reveal-total: 900ms;
  --stamp-one: 560ms;
  --stamp-two: 620ms;
  --stamp-three: 680ms;
}

.game-stage[data-state="invitationFound"] [data-invitation-target] {
  animation: invitation-touch 80ms ease-out, invitation-lift 340ms 80ms cubic-bezier(.2,.8,.2,1) both;
}

.game-stage[data-state="invitationFound"] [data-entry-choices] button {
  animation: stamp-rise 260ms var(--stamp-delay) cubic-bezier(.2,1.25,.4,1) both;
}
```

During FOUND, retain the same background and object positions. Animate only the invitation, the objective overlay, mascot reaction, and live stamp overlays.

- [ ] **Step 4: Coordinate the transition in JavaScript**

On invitation activation:

1. Dispatch `FIND_INVITATION`.
2. Resolve reduced motion through `matchMedia('(prefers-reduced-motion: reduce)')`.
3. Wait `getRevealDelay`.
4. Re-check that the mode is still `INVITATION_FOUND`.
5. Dispatch `REVEAL_CHOICES`.
6. Focus Play as Guest without scrolling.

- [ ] **Step 5: Run tests and commit**

```bash
npm run test:game
git add public/work/cookinquest/game/styles.css public/work/cookinquest/game/js/main.mjs tests/cookinquest
git commit -m "feat: animate the Hidden Invitation reveal"
```

Expected: all game tests pass.

### Task 4: Add the approved Option 2 handoff

**Files:**
- Create: `public/work/cookinquest/game/assets/chef-kit-screen.webp`
- Modify: `public/work/cookinquest/game/index.html`
- Modify: `public/work/cookinquest/game/styles.css`
- Modify: `public/work/cookinquest/game/js/onboarding-view.mjs`
- Modify: `public/work/cookinquest/game/js/main.mjs`
- Modify: `tests/cookinquest/asset-manifest.test.mjs`
- Modify: `tests/cookinquest/entry-shell.test.mjs`

- [ ] **Step 1: Write failing asset and shell tests**

Require `chef-kit-screen.webp` to be opaque WebP, 1210 × 834, over 10 KB, and under 500 KB. Require a deferred `data-chef-kit-scene` with semantic buttons for Guest Apron, Recipe Book, and Chef Hat.

- [ ] **Step 2: Run tests and confirm RED**

```bash
node --test tests/cookinquest/asset-manifest.test.mjs tests/cookinquest/entry-shell.test.mjs
```

Expected: missing asset and chef-kit scene fail.

- [ ] **Step 3: Optimize the exact approved Option 2 image**

Source:

```text
/var/folders/ym/hv8p7pys27x0p25gjf85wp6m0000gn/T/codex-clipboard-66a73e39-9736-4395-bf53-0819850c02ff.png
```

Resize proportionally to 1210 × 834 and encode WebP at quality 90. Do not redraw or restyle it.

- [ ] **Step 4: Add the Stage 2 scene and transition**

On completed Guest, Returning Chef, or New Chef entry, set a selected-entry data attribute, animate the chosen stamp toward center for 220 ms, crossfade the market into the kitchen for 480 ms, then render `CHEF_KIT`. The chef-kit choices become interactive only after the crossfade finishes.

Reduced motion skips travel and uses a 120 ms opacity change.

- [ ] **Step 5: Run tests and commit**

```bash
npm run test:game
npm run build
git add public/work/cookinquest/game tests/cookinquest
git commit -m "feat: transition into the chef-kit screen"
```

Expected: all game tests pass and Astro builds successfully.

### Task 5: Browser QA and handoff

**Files:**
- Modify: `design-qa.md`
- Create or update: `docs/qa/cookinquest-option1-search.jpg`
- Create or update: `docs/qa/cookinquest-option1-found.jpg`
- Create or update: `docs/qa/cookinquest-option1-choices.jpg`
- Create or update: `docs/qa/cookinquest-option2-chef-kit.jpg`
- Create or update: `docs/qa/cookinquest-onboarding-flow-comparison.png`

- [ ] **Step 1: Verify the full flow in the in-app browser**

At 1210 × 834:

1. Capture Option 1 search.
2. Tap the sealed invitation.
3. Capture the 1/1 found state during motion.
4. Capture the interactive stamp state.
5. Test Guest, Returning Chef, and New Chef.
6. Capture the Option 2 chef-kit screen.
7. Confirm console logs contain no warnings or errors.

- [ ] **Step 2: Verify compact landscape**

Repeat the main path at 700 × 834. Confirm no rotation message, cropping, unreachable touch target, or text below 14 px.

- [ ] **Step 3: Compare against both approved references**

Build one side-by-side image containing the Option 1 source, implemented Option 1 state, Option 2 source, and implemented Option 2 state. Fix all P0, P1, and P2 differences before passing QA.

- [ ] **Step 4: Run final verification**

```bash
npm run test:game
npm run build
git diff --check
```

Expected: all tests pass, build succeeds, and diff check produces no output.

- [ ] **Step 5: Commit QA evidence**

```bash
git add design-qa.md docs/qa
git commit -m "test: verify CookInQuest onboarding flow"
```

Set `final result: passed` in `design-qa.md` only after the source/implementation comparison and interaction checks pass.
