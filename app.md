# Yarn Card Editor — App Documentation

## Overview
Angular 17+ single-page application for editing and previewing yarn cards.
Source lives in `yarn-card-editor/` and builds to `docs/editor/`.

## Live URL
https://gertvandbrempt.github.io/yarn-card-editor/editor/

## Build

```bash
cd yarn-card-editor
npm install
npx ng build --base-href /yarn-card-editor/editor/
```

Output lands in `docs/editor/` (flat, no `browser/` subdirectory).

### Why no --output-path flag
`angular.json` defines `"outputPath": { "base": "../docs/editor", "browser": "" }`.
The `"browser": ""` collapses the Angular 17+ default `browser/` subdirectory so
`index.html` lands directly at `docs/editor/index.html`.

Passing `--output-path` on the CLI **overrides only the base** and drops the
`browser: ""` setting, causing Angular to re-create the `browser/` subdir.
Always let the `angular.json` config control the output path.

## GitHub Actions Deployment

Workflow: `.github/workflows/deploy.yml`

Triggers on push to `master` when any of these paths change:
- `yarn-card-editor/**`
- `design/card-index.md`

Steps:
1. Checkout
2. `npm install`
3. `npx ng build --base-href /yarn-card-editor/editor/`
4. Commit `docs/editor/` with `[skip ci] Deploy editor` and push to master

## Deployment Fix — 2026-05-25

**Problem:** Editor was unreachable at `/editor/` because Angular 17+'s default
`browser/` output subdirectory was placing `index.html` at
`docs/editor/browser/index.html` instead of `docs/editor/index.html`.

**Fix:** Set `"outputPath": { "base": "../docs/editor", "browser": "" }` in
`angular.json` to flatten the output. Verified build produces flat layout.
Rebuilt and committed `docs/editor/` with correct flat structure.
Workflow updated to avoid `--output-path` CLI flag which would defeat the fix.

## Project Structure

```
yarn-card-editor/          ← Angular app source
  src/
  angular.json
  package.json
docs/
  editor/                  ← Built output (served by GitHub Pages)
    index.html
    assets/
    *.js / *.css
design/                    ← Card design assets consumed by the editor
.github/workflows/
  deploy.yml               ← CI/CD pipeline
```
