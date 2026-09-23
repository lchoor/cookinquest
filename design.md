# CookInQuest iPad Game Redesign — 2026

Living UI foundation: [design-system.md](design-system.md). Add approved icons, colors, typography, widgets, states, and motion there as each game section is built.

## Goal

Build a polished, playful CookInQuest onboarding experience as a simple local HTML game for iPadOS in horizontal orientation.

The experience moves through three approved visual stages:

1. The Hidden Invitation — onboarding and player entry.
2. Choose Your Chef Kit — player identity selection.
3. Restaurant Row — the game hub and first quest.

For now, implementation focuses only on Stage 1 and its transition into Stage 2.

## Platform

- Format: HTML, CSS, and vanilla JavaScript.
- Primary canvas: 1210 × 834 landscape.
- Secondary landscape support: 700 × 834 compact layout.
- Input: touch first, with Apple Pencil, pointer, and keyboard support.
- Orientation: horizontal by default.
- Do not show a “rotate your iPad” screen or message.
- No timer during onboarding.
- No account gate before the player can interact.

## Visual Source of Truth

### Stage 1 — The Hidden Invitation

Reference:
`/var/folders/ym/hv8p7pys27x0p25gjf85wp6m0000gn/T/codex-clipboard-58a91688-578c-44b7-b200-67016c211169.png`

Required visual elements:

- Khanna Town market scene.
- CookInQuest logo.
- “The Hidden Invitation” title.
- Chef mascot pointing toward the challenge.
- Sealed Chef’s Challenge invitation.
- Torn-paper objective strip.
- Open RSVP envelope with three postage-stamp choices:
  - Play as Guest.
  - Returning Chef.
  - New Chef.

This screen establishes the final art direction: colorful Indian market, hand-painted paper, bold sticker outlines, playful chef character, and diegetic controls built into physical objects.

### Stage 2 — Choose Your Chef Kit

Reference:
`/var/folders/ym/hv8p7pys27x0p25gjf85wp6m0000gn/T/codex-clipboard-66a73e39-9736-4395-bf53-0819850c02ff.png`

Player choices:

- Guest Apron.
- Recipe Book.
- Chef Hat.

This stage is the identity-selection step. It should feel like the invitation has brought the player inside the kitchen rather than loading an unrelated menu.

### Stage 3 — Restaurant Row

Reference:
`/var/folders/ym/hv8p7pys27x0p25gjf85wp6m0000gn/T/codex-clipboard-d2c0d60f-0439-45a9-b129-a14c88b5a47c.png`

Purpose:

- Show the player’s chosen identity.
- Introduce the Restaurant Row hub.
- Highlight Taj Mahal as the first available restaurant.
- Keep other restaurants visibly locked.
- Offer login or account creation only as an optional way to save progress.

Stage 3 is documented now but will be implemented after Stage 1 and Stage 2 are approved.

## Stage 1 Onboarding Flow

### 1. Search

- Show the complete Option 1 market composition.
- Objective reads “Find your invitation · 0/1.”
- The sealed Chef’s Challenge invitation is the only required interaction.
- Guest, Returning Chef, and New Chef stamps are visible but inactive until the invitation is found.

### 2. Invitation Found

- The tapped envelope compresses briefly, lifts, and settles.
- Objective updates to “1/1.”
- The chef celebrates without blocking the player.
- The same invitation remains visible throughout the transition.
- Do not replace the entire scene in one frame.

### 3. RSVP Reveal

- The wax seal reacts and the already-visible RSVP envelope lifts slightly.
- The three inactive stamps rise from their existing positions with a short stagger:
  1. Play as Guest.
  2. Returning Chef.
  3. New Chef.
- The first stamp becomes focused after the reveal.
- The objective changes to “Choose your way in.”

### 4. Player Entry

- Play as Guest continues immediately to Stage 2.
- Returning Chef opens the saved local chef list.
- New Chef opens a simple local profile form.
- Account creation is optional and never blocks guest play.

## Transition Timing

The complete invitation interaction should take about 900 ms:

- 0–80 ms: touch compression.
- 80–180 ms: objective changes to 1/1 and mascot reacts.
- 160–420 ms: invitation lifts and settles.
- 340–640 ms: RSVP envelope opens.
- 560–820 ms: three stamps rise with a 60 ms stagger.
- 820–900 ms: controls become active and focus moves to Play as Guest.

Reduced motion uses a short opacity transition with no zoom, rotation, parallax, or stagger.

## Transition to Stage 2

The selected stamp is the visual bridge:

- Play as Guest continues directly to the chef-kit screen.
- Returning Chef chooses a saved local profile, then continues to the chef-kit screen.
- New Chef creates a local profile, then continues to the chef-kit screen.
- The selected entry stamp travels into the kitchen transition, but the player still chooses independently between Guest Apron, Recipe Book, and Chef Hat.
- The market scene softens while the kitchen scene appears underneath.
- The selected object stays visible during the transition so the player understands cause and effect.
- Target duration: 700–900 ms.

## Transition to Stage 3

After the chef kit is selected:

- The chosen kit receives a short confirmation animation.
- The kitchen pulls back into the Khanna Town map.
- Restaurant Row appears with Taj Mahal highlighted.
- The chef points toward the first available table.
- Optional login and account creation appear only as progress-saving actions.

## Interaction Rules

- All important touch targets are at least 44 × 44 points.
- Every visible control has a semantic HTML button.
- Touch, pointer, keyboard, and Apple Pencil use the same actions.
- Controls have visible press, focus, selected, disabled, and success states.
- Motion communicates state changes; it is not decorative.
- No hover-only instructions.
- No penalties, timers, offers, or rating prompts during onboarding.
- Audio and haptics are optional enhancements and must respect mute and reduced-motion preferences.

## Technical Structure

Use one state-driven HTML experience rather than separate disconnected pages.

Suggested states:

```text
SEARCHING
INVITATION_FOUND
IDENTITY_CHOICE
RETURNING_CHEF
NEW_CHEF
CHEF_KIT
RESTAURANT_ROW
```

Stage 1 uses the same DOM scene during Search, Invitation Found, and Identity Choice. Elements animate between states; they are not replaced with an abrupt full-screen swap.

Core files:

```text
index.html
styles.css
js/main.mjs
js/onboarding-state.mjs
js/onboarding-view.mjs
assets/
```

## Stage 1 Acceptance Criteria

- Opens directly in landscape onboarding with no rotation message.
- Matches the approved Option 1 composition.
- The invitation is clearly discoverable and tappable.
- Tapping the invitation creates one continuous 900 ms reveal.
- No abrupt full-screen replacement occurs.
- The objective progresses from 0/1 to 1/1, then to “Choose your way in.”
- Guest, Returning Chef, and New Chef become active only after the reveal.
- All three entry paths work.
- Reduced motion works.
- No browser console errors.
- Verified at 1210 × 834 and compact landscape size.

## Build Order

1. Rebuild Stage 1 as one continuous Option 1 scene.
2. Verify interaction, motion, accessibility, and landscape layouts.
3. Build the transition into Stage 2.
4. Build Stage 2 chef-kit selection.
5. Build the transition into Stage 3.
6. Build Restaurant Row and the first Taj Mahal quest.
