# CookInQuest Living Design System — 2026

This file is the shared visual and interaction vocabulary for the horizontal iPad game. It is intentionally living: add a token, asset, widget, or state here when it becomes approved and reusable.

## Status Labels

- **Current** — already implemented in the local HTML prototype.
- **Approved** — visible in one of the three approved reference screens.
- **Planned** — defined for the next build section but not implemented yet.

## Art Direction

**Approved**

- Playful Indian food-market adventure.
- Painterly environments with crisp illustrated character and object cutouts.
- Physical, diegetic UI: invitations, wax seals, paper strips, postage stamps, recipe books, shop signs, and restaurant façades.
- Bold charcoal sticker outlines with small imperfect rotations.
- Warm food colors balanced by cool Khanna Town blue and teal.
- Controls should feel like objects the player can touch, not generic app cards.
- Do not use glassmorphism, neon sci-fi styling, gradients as generic UI decoration, emoji, or unrelated icon libraries.

## Color Tokens

### Current Core Palette

| Token | Value | Role |
| --- | --- | --- |
| `--sky` | `#159FD0` | Khanna Town sky and blue emphasis |
| `--sky-deep` | `#087CAE` | Outer stage and deep blue surfaces |
| `--mango` | `#FFB642` | Dialog and warm panel surface |
| `--turmeric` | `#FFD34F` | Highlights, labels, and selected controls |
| `--paprika` | `#ED542E` | Primary accent and active outline |
| `--chilli` | `#A92222` | Strong red emphasis and counters |
| `--ink` | `#252228` | Text, outlines, and hard shadows |
| `--cream` | `#FFF7DF` | Paper, readable text surfaces, and light focus contrast |
| `--paper` | `#F4DFAA` | Aged invitation and parchment surface |
| `--focus` | `#FFFFFF` | Keyboard focus halo |

### Entry Stamp Colors

| Entry | Color role | Meaning |
| --- | --- | --- |
| Play as Guest | Khanna Town blue | Fastest, primary path |
| Returning Chef | Deep market green | Existing local identity |
| New Chef | Paprika red-orange | Create a new identity |

Color never communicates meaning alone. Each entry also has a unique label, position, and chef-hat badge.

## Typography

### Current Font Stacks

| Role | Stack | Usage |
| --- | --- | --- |
| Game UI | `"Avenir Next", Avenir, system-ui, sans-serif` | Forms, dialogs, buttons, supporting copy |
| Hand-painted display | `"Chalkboard SE", "Marker Felt", "Bradley Hand", cursive` | Objectives, headers, playful labels |
| Artwork lettering | Baked into approved image assets | Logo, scene titles, signs, stamp labels |
| Technical/code | `"SFMono-Regular", Consolas, monospace` | Design documentation only |

### Type Rules

- Use no more than the two game UI stacks in live HTML.
- Preserve lettering that belongs to an illustrated object inside its asset.
- Live text must remain selectable and semantic when it changes with game state.
- Minimum live body text: 14 px at the compact landscape size.
- Critical objectives should read at a glance and use a cream or paper backing with dark outline.
- Use sentence case for instructions and uppercase only when the approved object art uses it.

## Icon and Artwork System

### Current Brand and Scene Assets

| Asset | Role | Status |
| --- | --- | --- |
| `logo-icon.png` | Exact CookInQuest logo | Current |
| `market-tabletop.webp` | Hidden Invitation market world | Current |
| `option1-entry-screen.webp` | Approved Option 1 composition | Current |
| `hidden-invitation-title.png` | Hidden Invitation title lockup | Current |
| `chef-mascot.png` | Welcoming/searching chef | Current |
| `chef-mascot-found.png` | Celebration chef | Current |
| `invitation-closed.png` | Search target and challenge object | Current |
| `invitation-open.png` | RSVP envelope | Current |

### Current Entry and Chef-Kit Assets

| Asset | Role | Status |
| --- | --- | --- |
| `entry-guest-stamp.png` | Guest entry control | Current |
| `entry-returning-stamp.png` | Returning Chef control | Current |
| `entry-new-stamp.png` | New Chef control | Current |
| `guest-apron.png` | Chef-kit apron choice | Current |
| `recipe-book.png` | Chef-kit recipe book choice | Current |
| `chef-hat.png` | Chef-kit hat choice | Current |
| `chef-kit-screen.webp` | Approved Option 2 kitchen composition | Planned |
| Restaurant Row screen asset | Approved Option 3 hub composition | Planned |

### Asset Rules

- Use the exact approved CookInQuest logo; never redraw it.
- Character and object cutouts use transparent PNG with fully transparent corners.
- Full-stage scenes use opaque WebP at the 1210 × 834 reference size.
- Keep a consistent charcoal outer line and cream/white sticker edge on cutouts.
- Avoid fake text, watermarks, gibberish signage, and visible chroma-key fringe.
- Generate new artwork only when a required reusable asset is missing.
- Add every approved asset to the manifest test with format, size, alpha, and transfer limits.

## Layout Tokens

| Token or rule | Value | Purpose |
| --- | --- | --- |
| Primary stage | `1210 × 834` | Approved iPad landscape canvas |
| Stage ratio | `1210 / 834` | Prevent distortion |
| Compact landscape | `700 × 834` | Narrow landscape validation target |
| Minimum touch target | `44 × 44 pt` | Touch and Pencil reliability |
| Static text safe area | Inner 90% | Prevent edge clipping |
| Interactive safe area | Inner 93% | Keep controls reachable |
| Artwork fit | `object-fit: cover` for scenes | Full-bleed environment |
| Cutout fit | `object-fit: contain` | Preserve complete silhouettes |

The game starts in landscape. Do not add a rotate-device screen or orientation instruction.

## Widget Library

### Game Stage

**Current**

- Owns the 1210:834 responsive canvas.
- Stores the active mode in `data-state`.
- Clips full-bleed artwork and keeps game UI inside safe areas.
- States: searching, invitation found, identity choice, returning chef, new chef, complete.

### Objective Strip

**Current, being refined**

- Torn or aged cream paper surface.
- Contains an instruction plus progress value.
- States:
  - Search: `Find your invitation · 0/1`.
  - Found: `Invitation found · 1/1`.
  - Choice: `Choose your way in`.
- Live text must match the announced state even when the background artwork contains lettering.

### Invitation Hotspot

**Current**

- Semantic button over the sealed Chef’s Challenge invitation.
- States: idle, focus, press, found, disabled.
- Press compresses the object; found lifts it and begins the RSVP reveal.
- It becomes disabled immediately after activation to prevent double input.

### Entry Stamp Button

**Current**

- Three variants: Guest, Returning Chef, New Chef.
- Semantic buttons with hidden accessible labels when lettering is baked into artwork.
- States: inactive, reveal, idle, hover/pointer, keyboard focus, pressed, selected, departing.
- Guest is the first focus target after the reveal.

### Chef Mascot

**Current**

- Two reusable poses: welcoming/searching and celebrating/found.
- Never blocks the primary target or objective.
- Motion is brief feedback, not a looping distraction.
- Decorative poses use empty alternative text; instructional poses use concise alternative text.

### Dialog Sheet

**Current**

- Used for Returning Chef and New Chef.
- Mango surface, charcoal border, paprika outer accent, strong offset shadow.
- Native modal dialog behavior with a clear Back action.
- States: closed, opening, active, validation error, recovery, closing.

### Saved Chef Row

**Current**

- Avatar, display name, and current route.
- Entire row is one button.
- States: idle, focus, hover, pressed, selected, unavailable.
- Saved avatars hydrate only after the Returning Chef dialog opens.

### New Chef Form

**Current**

- Display name field with a 24-character limit.
- Three avatar choices: apron, recipe book, chef hat.
- States: empty, editing, avatar selected, invalid, saving, complete.
- Validation errors use text and role alert, never color alone.

### Chef-Kit Choice

**Approved, planned**

- Three large physical choices on the kitchen table: Guest Apron, Recipe Book, Chef Hat.
- Each object is a semantic button with a larger invisible hit area.
- States: idle, focus, pressed, selected, confirmed.
- Selecting a kit does not depend on which entry stamp the player used.

### Restaurant Tile

**Approved, planned**

- Restaurant façade functions as the selection control.
- States: available, highlighted objective, locked, coming soon, completed.
- Taj Mahal begins highlighted; other restaurants remain visibly locked.

### Save Progress Prompt

**Approved, planned**

- Compact optional prompt in Restaurant Row.
- Actions: Log In and Create Account.
- Never interrupts onboarding or blocks guest play.

## Motion Tokens

| Motion | Duration | Use |
| --- | --- | --- |
| Touch compression | 80 ms | Immediate object response |
| Objective update | By 180 ms | Confirm the invitation was found |
| Invitation lift | 160–420 ms | Preserve object continuity |
| Stamp reveal | 560–820 ms | Stagger Guest, Returning, New |
| Entry ready | 900 ms | Enable choices and focus Guest |
| Stage transition | 700–900 ms | Option 1 into Option 2 |
| Reduced-motion reveal | 0–120 ms | Opacity only |

Preferred easing for playful object settlement: `cubic-bezier(.2, 1.2, .4, 1)`.

Motion rules:

- Animate cause and effect, not decoration.
- Keep the selected object visible during stage transitions.
- Never replace the complete stage in a single frame.
- Honor `prefers-reduced-motion` with no zoom, rotation, parallax, or stagger.

## Interaction and Accessibility Contracts

- Touch first, with Apple Pencil, pointer, and keyboard parity.
- Native semantic buttons for every visible action.
- Minimum 44 × 44 pt hit areas.
- Visible keyboard focus that works over detailed artwork.
- No hover-only content or instructions.
- No timer, penalty, offer, or rating prompt during onboarding.
- Use labels, icons, and shapes together; never color alone.
- Use `aria-live="polite"` for objective and transition announcements.
- Use `inert`, `aria-hidden`, and disabled states while controls are visually present but unavailable.
- Avoid eager loading of hidden profile and chef-kit assets.

## Component Addition Checklist

When a new reusable element is approved, add:

1. Component name and purpose.
2. Visual reference or asset path.
3. Tokens it uses.
4. Required states.
5. Touch, keyboard, and accessibility behavior.
6. Motion and reduced-motion behavior.
7. Asset and DOM tests.
8. Browser QA evidence at primary and compact landscape sizes.
