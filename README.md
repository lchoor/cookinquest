# CookInQuest

Standalone home for the CookInQuest game prototype, artwork, and design documents.

## Run locally

From this directory, run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/prototype/ in your browser.

## Build the offline prototype

Requires Node.js 18 or newer:

```sh
node prototype/build.mjs
```

The generated file is `prototype/dist/cookinquest-2026.html`.

## Project contents

- `prototype/`: playable HTML, CSS, JavaScript, and artwork.
- Root Markdown and HTML files: game rules, design specifications, and plans.
- `drop/`, `prepped/`, `prepped-wf/`, `render/`, `share/`, and `wix-tiles/`: source assets, references, and exports.
- `docs/`: additional design notes and original source-material notes.

## Migration

Imported from the local `cookinquest/` folder in `lchoor/lochana-portfolio-redesign`. Most files were untracked in that repository, so this repository begins with a snapshot of the current project. Existing portfolio worktrees and local tool caches are excluded. The original folder is retained for portfolio references and existing worktrees.
