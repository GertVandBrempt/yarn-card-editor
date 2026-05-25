# Yarn — Orchestrator State

This file is read and written by scheduled agents. Do not edit manually during an active agent run.

## System Control

```
blocked_for_weekly_review: false
weekly_review_due: 2026-05-30T08:00:00Z
last_orchestrator_run: 2026-05-25T12:04:48Z
last_status_notification: 2026-05-25T12:04:48Z
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

---

### Game Design
- **Mode**: interactive (orchestrator surfaces topics; user drives sessions in Claude Code)
- **Source**: DESIGN.md open issues and unresolved questions
- **Status**: active — 5 discussion items tracked; no new items found in scan of 2026-05-25T12:04:48Z (< 48h since last notification)
- **Pending discussion items** *(top 5 by card-design impact)*:
  1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
  2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
  3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
  4. Action track visual design (§4.4) — 6 track types defined; activation-tracks-v02 in-card mockup created — **ready for user review**
  5. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
- **Last notified**: 2026-05-24T08:53:53Z
- **Blocked on**: —

---

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: active — activation-track-basic-v01 complete (a/b/c); activation-track-multiturn-v01 complete (a/b/c); review page restructured to 2-section format

#### Global rules (apply to all Card Design work)

- **Three options per design item**: every new visual element produces exactly 3 variants — option a, b, c — each a single card; named `<element>-v<N>-a.html`, `<element>-v<N>-b.html`, `<element>-v<N>-c.html`; design ID label visible on review page below each card
- **Independence**: each design item is independent — holding or blocking one item does not affect any other
- **Review page structure**: after any card design action, regenerate `review/index.html` with two sections: **Under Review** (grouped by design element, 3 options side by side per group) and **Accepted** (one entry per accepted item); see VISUAL.md §10 for full spec

#### Independent design tracks (each runs independently)

**Track 1 — Activation Tracks** *(3 options each)*
1. ~~**activation-track-basic-v01-a/b/c**~~ — ✅ Complete (2026-05-25T12:04:48Z)
2. ~~**activation-track-multiturn-v01-a/b/c**~~ — ❌ Needs revision (return arrow must be removed; trigger marker shape corrected — see v02 below)
3. **activation-track-multiturn-v02-a/b/c** — Corrected multi-turn track per VISUAL.md §8 locked shapes:
   - **Activation marker**: diamond with inner diamond — player places token here
   - **Cooldown slots**: hollow/empty diamond — passive wait; connected to previous marker by a small directional arrow
   - **Cooldown trigger** (optional — show in at least one option): diamond with inner arrow — same outer diamond silhouette as other markers, inner arrow instead of inner diamond; sits in any cooldown position; fires its own effect row; connected by directional arrow from previous marker like any other slot
   - **No return arrow** — do not draw an arrow looping back from the last slot to the activation marker; that is the only arrow that must be omitted
   - All other sequential connecting arrows between markers are present and correct
   - Vary: presence/absence of cooldown trigger, slot count, and spacing across a/b/c
4. **activation-track-multiuse-v01-a/b/c** — Multi-use track: **multiple filled diamonds in a row** (one per activation slot, user-confirmed shape); vary layout/spacing/count across a/b/c; shapes locked — do not experiment with other shapes
5. **activation-track-use-v01-a/b/c** — Use (one-time) track: **one square with inner square** — activation marker design rotated 45° (diamond → square); same inner/outer relationship as the activation marker; consumed permanently; vary sizing, proportions, and inner square scale across a/b/c; do not use a plain rectangle
6. **Hold:** AND/OR compound tracks — only after all 4 primitives accepted

**Track 2 — Die Symbols** *(3 options for the full set of 3 die icons)*
- **die-symbols-v01-a/b/c** — Design 3 die icons (Constitution, Zeal, Path) per VISUAL.md §7; each option shows all 3 die icons on a single card in an effect row context; options must be visually distinct from each other

**Track 3 — Subtitle** *(3 options)*
- **subtitle-v01-a/b/c** — Header subtitle design per VISUAL.md §9.1; each option shows a card with subtitle present and one without

**Track 4 — Flavour Text** *(3 options)*
- **flavour-text-v01-a/b/c** — Flavour text zone design per VISUAL.md §9.2; italic lore text, visual separator from mechanics, absent on cards without it

**Track 5 — Set Symbol** *(3 options)*
- **set-symbol-v01-a/b/c** — Set symbol position/size/treatment per VISUAL.md §9.3; small glyph in corner; consistent across all card types

**Track 6 — Trigger Symbols** *(3 options)*
- **trigger-symbols-v03-a/b/c** — 6 trigger symbols (On Reveal, On Enter, On Leave, Character Phase, On Complete, On Flow Marker) per VISUAL.md §7 style rules; prior versions (v01, v02) were single-variant — this is the first 3-option round; all 6 symbols shown in use on a single card per option; dark body + lighter detail; options must be visually distinct from each other

**Hold:** effects-v04 — create only after trigger symbols + activation tracks both accepted

- **Blocked on**: —
- **Last notified**: 2026-05-24T18:02:35Z

---

### App Design
- **Mode**: autonomous
- **Source**: APP.md
- **Status**: active — all 9 implementation tasks complete; clean build deployed 2026-05-25T12:04:48Z
- **Next task**: Fix GitHub Pages deployment (URGENT — editor currently unreachable at /editor/):
  1. **Fix `angular.json` `outputPath`** — in `yarn-card-editor/angular.json`, find the `"outputPath"` string `"../docs/editor"` in the build configuration and replace it with:
     ```json
     "outputPath": { "base": "../docs/editor", "browser": "" }
     ```
     This flattens the Angular 17+ `browser/` subdirectory so `index.html` lands directly at `docs/editor/index.html`.
  2. **Fix existing deployment** — move all files from `docs/editor/browser/` up to `docs/editor/` and delete the now-empty `docs/editor/browser/` directory. Preserve the `docs/editor/browser/assets/` → `docs/editor/assets/` copy.
  3. **Create `.github/workflows/deploy.yml`** — GitHub Actions workflow per APP.md §Deployment; triggers on push to master when `yarn-card-editor/**` or `design/card-index.md` changes; builds, commits `docs/editor/`, pushes with `[skip ci]`
  4. **Rebuild** — `cd yarn-card-editor && npm install && npx ng build --base-href /yarn-card-editor/editor/ --output-path ../docs/editor` — verify output lands at `docs/editor/index.html` (not `docs/editor/browser/index.html`)
  5. **Commit and push** — commit `angular.json`, `docs/editor/`, `.github/workflows/deploy.yml`; push to master
  6. **Notify** — PushNotification with editor URL once confirmed live
- **Completed tasks**:
  1. ✅ `SymbolReferenceModalComponent` — wired to `EffectEditorComponent` with `?` button, Escape close, mobile full-screen
  2. ✅ Responsive layout — 3 breakpoints, mobile drawer nav, hamburger button, `transform:scale()` card preview
  3. ✅ Empty-container rule — `PreviewService.injectFields()` hides empty title/subtitle/flavour-text via `style="display:none"`
  4. ✅ Track-specific sub-fields — Multi-turn (cooldown turns), Multi-use (activation slots), Use (charges), AND/OR (sub-track list with own type dropdowns + sub-fields), Basic (no extra fields)
  5. ✅ Live preview design sync — SVG defs extracted from trigger-symbols-v02 (6 symbols) and activation-track-basic-v01-a; icon-scout/gain-action fall back to filled-circle placeholder
  6. ✅ `PreviewService` wired to `assets/templates/<type>-baseline.html`; 7 baseline files created in assets
  7. ✅ Build — zero TypeScript errors; output at `docs/editor/browser/index.html`
  8. ✅ TypeScript errors resolved
  9. ✅ Build output verified
- **Auto-sync rule**: After any Card Design stream action that updates `card-index.md` **or** creates a new trigger symbol / activation track variant, the App Design stream must re-run steps 5–9 automatically (sync SVGs + baselines → build → deploy). No user trigger needed.
- **Blocked on**: —
- **Last notified**: 2026-05-25T12:04:48Z

---

## Active Sub-Agents

_(none)_

---

## Work Log

| Timestamp (UTC) | Agent | Action | Outcome |
|---|---|---|---|
| — | — | System initialized | — |
| 2026-05-24T08:46:29Z | Orchestrator | A: Scan DESIGN.md | 4 discussion items surfaced (first run); user notified |
| 2026-05-24T08:46:29Z | Orchestrator | B: Create script-v01.html | Script card v1 — turn schedule layout, purple placeholder colour |
| 2026-05-24T08:46:29Z | Orchestrator | B: Blocker | Script card colour not in VISUAL.md; user notified |
| 2026-05-24T08:46:29Z | Orchestrator | C: Draft app.md | Initial app.md drafted — all 7 card types modelled |
| 2026-05-24T08:46:29Z | Orchestrator | Gallery: regenerate | review/index.html updated |
| 2026-05-24T08:53:53Z | Orchestrator | A: Scan DESIGN.md | 5 discussion items surfaced (second run, broader scan); notified |
| 2026-05-24T08:53:53Z | Orchestrator | B: Create effects-v02.html | Section labels + text labels + 2 action rows; mech-frame 200px |
| 2026-05-24T08:53:53Z | Orchestrator | B: Update | CHANGES.md updated; review/index.html regenerated with 22 variants |
| 2026-05-24T08:53:53Z | Orchestrator | C: Draft app.md | Detailed app.md from DESIGN.md — full typed data model with §references |
| 2026-05-24T12:05:49Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified 3h ago (< 48h threshold) — no notification |
| 2026-05-24T12:05:49Z | Orchestrator | B: Check blocker | Script card colour still unresolved; already notified — skipped |
| 2026-05-24T12:05:49Z | Orchestrator | C: Check blocker | app.md review still pending; already notified — skipped |
| 2026-05-24T13:00:00Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified 4h ago (< 48h) — no notification |
| 2026-05-24T13:00:00Z | Orchestrator | B: Create effects-v03.html | §6.1 display model: no labels, non-italic, 4 sections, placeholder leading symbols |
| 2026-05-24T13:00:00Z | Orchestrator | B: Create trigger-symbols-v01.html | 6 trigger symbol SVG designs per §7 style rules |
| 2026-05-24T13:00:00Z | Orchestrator | B: Create activation-tracks-v01.html | 6 activation track type diagrams per §8 spec |
| 2026-05-24T13:00:00Z | Orchestrator | Gallery: regenerate | review/index.html updated — 25 card-variant entries |
| 2026-05-24T13:00:00Z | Orchestrator | C: Build v1 Angular editor | Built + deployed to editor/; all 8 types with live preview via iframe; localStorage |
| 2026-05-24T13:00:00Z | Orchestrator | C: Update VISUAL.md §9 | Added 4 app design gap tasks for trigger symbols, tracks, sym+modifier, dual-mode |
| 2026-05-24T18:02:35Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified < 48h ago — no notification |
| 2026-05-24T18:02:35Z | Orchestrator | B: Create trigger-symbols-v02.html | 6 trigger symbols redesigned per §7: dark body + lighter detail, shown in card context |
| 2026-05-24T18:02:35Z | Orchestrator | B: Create activation-tracks-v02.html | 6 activation track types redesigned per §8: vertical layout, shown in card context |
| 2026-05-24T18:02:35Z | Orchestrator | Gallery: regenerate | review/index.html updated — 39 card-variant entries |
| 2026-05-24T18:02:35Z | Orchestrator | C: Fix v1 editor | All 6 priority fixes: form fields wired, image upload base64, preview rendering, Triggers/Actions sections, inline icon parsing; built and deployed |
| 2026-05-25T00:08:00Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified ~15h ago (< 48h threshold) — no notification |
| 2026-05-25T00:08:00Z | Orchestrator | B: Check hold | trigger-symbols-v02 and activation-tracks-v02 still unaccepted (not in card-index.md) — stream on hold |
| 2026-05-25T00:08:00Z | Orchestrator | C: Check hold | No queued tasks; awaiting user feedback on v1 editor — stream on hold |
| 2026-05-25T06:02:30Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified ~21h ago (< 48h threshold) — no notification |
| 2026-05-25T06:02:30Z | Orchestrator | B: Check hold | trigger-symbols-v02 and activation-tracks-v02 still unaccepted — stream on hold |
| 2026-05-25T06:02:30Z | Orchestrator | C: Check hold | No new app direction; awaiting user feedback on v1 editor — stream on hold |
| 2026-05-25T07:12:59Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified ~22h ago (< 48h threshold) — no notification |
| 2026-05-25T07:12:59Z | Orchestrator | B: Check hold | trigger-symbols-v02 and activation-tracks-v02 still not in card-index.md — stream on hold |
| 2026-05-25T07:12:59Z | Orchestrator | C: Refactor steps 1–9 complete | All 17 components + 3 services scaffolded: routing, models, services, CardEditor, CardForm, CardPreview, CardList, CardFilter, Layout, SetSelector, all 7 type forms (location/char/item/event/quest/persona/script), EffectEditor, ImageUpload, TriggersEditor, ActionsEditor; app.ts replaced with lean router-outlet shell |
| 2026-05-25T12:04:48Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified ~27h ago (< 48h threshold) — no notification |
| 2026-05-25T12:04:48Z | Orchestrator | B: Card Design | Created activation-track-basic-v01-b/c and activation-track-multiturn-v01-a/b/c (5 new variant files); review/index.html restructured to 2-section format |
| 2026-05-25T12:04:48Z | Orchestrator | C: App Design | All 9 tasks complete: SymbolReferenceModal wired, responsive layout, empty-container rule, track sub-fields, live SVG sync, assets/templates baseline, built + deployed; user notified |

---

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
