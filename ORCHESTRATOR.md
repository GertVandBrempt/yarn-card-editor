# Yarn — Orchestrator State

This file is read and written by scheduled agents. Do not edit manually during an active agent run.

## System Control

```
blocked_for_weekly_review: false
weekly_review_due: 2026-05-30T08:00:00Z
last_orchestrator_run: 2026-05-27T06:13:53Z
last_status_notification: 2026-05-27T06:13:53Z
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

---

### Game Design
- **Mode**: interactive (orchestrator surfaces topics; user drives sessions in Claude Code)
- **Source**: DESIGN.md open issues and unresolved questions
- **Status**: active — 7 discussion items tracked; no new items found in scan of 2026-05-27T06:13:53Z; > 48h since last notify — notification sent
- **Pending discussion items** *(top 7 by card-design impact)*:
  1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
  2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
  3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
  4. Action track visual design (§4.4) — 6 track types defined; activation-tracks-v02 in-card mockup created — **ready for user review**
  5. Location connections visual design (§3.3) — solid vs hollow arrows for face-down/face-up state; intent stated in DESIGN.md but not yet in VISUAL.md
  6. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
  7. **Inline sym+modifier rendering (§6.1) — NEW** — effect text with `[icon][modifier]` groups; final inline layout/sizing rules not yet in VISUAL.md; effects-v03 demonstrates it
- **Last notified**: 2026-05-27T06:13:53Z
- **Blocked on**: —

---

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: on hold — all 9 tracks complete; remaining tasks (AND/OR compound tracks, effects-v04) on hold pending user acceptance of primitives; no card work this run; no new acceptances detected

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
4. ~~**activation-track-multiuse-v01-a/b/c**~~ — ✅ Complete (2026-05-25T18:10:29Z)
5. ~~**activation-track-use-v01-a/b/c**~~ — ✅ Complete (2026-05-26T00:05:22Z) — outer square with inner square; options vary in size (36/44/32px outer), inner scale (50%/70%/62%), pip treatment, and corner-bracket accents
6. **Hold:** AND/OR compound tracks — only after all 4 primitives accepted

**Track 2 — Die Symbols** *(3 options for the full set of 3 die icons)*
- ~~**die-symbols-v01-a/b/c**~~ — ✅ Complete (2026-05-26T06:22:00Z) — option A: flat square + pip-count; option B: die body shape distinguishes type (rounded-sq/diamond/hex); option C: thematic amber symbol inside dark body (ring/bolt/branching arrow)

**Track 3 — Subtitle** *(3 options)*
- ~~**subtitle-v01-a/b/c**~~ — ✅ Complete (2026-05-26T13:03:32Z) — A: below title, Cinzel italic amber; B: between band+title, Crimson Text italic cream+diamonds; C: embedded in type band as second row, band expands 35→52px

**Track 4 — Flavour Text** *(3 options)*
- ~~**flavour-text-v01-a/b/c**~~ — ✅ Complete (2026-05-26T13:19:45Z) — A: amber hairline rule + dark tinted panel, centred 12.5px italic; B: ornamental SVG divider (amber diamond+lines), left-aligned 13.5px italic; C: fully integrated borderless sec-flavour row inside mechanics frame, 14px italic

**Track 5 — Set Symbol** *(3 options)*
- ~~**set-symbol-v01-a/b/c**~~ — ✅ Complete (2026-05-26T18:16:00Z) — option A: bottom-right circular container (r=8.5) with diamond glyph + amber ring, 18px; option B: bottom-left rounded-square with monogram "Y" placeholder (Cinzel 700), 20px; option C: frameless embossed trefoil knot in frame border zone, 16px

**Track 6 — Trigger Symbols** *(3 options)*
- ~~**trigger-symbols-v03-a/b/c**~~ — ✅ Complete (2026-05-26T12:14:09Z) — option A: geometric/angular (star starburst, triangle+chevron, arrow polygon, octagon clock, diamond checkmark, double-chevron+pip); option B: rounded/organic (ray burst, arch+teardrop, pill arrow, circle clock, rounded square, horizontal pill); option C: pictographic/silhouette (eye, doorway, boot, person figure, scroll, track rails); all follow §7 dark body #1a0e04 + amber detail #d4b87a

**Hold:** effects-v04 — create only after trigger symbols + activation tracks both accepted

- **Blocked on**: —
- **Last notified**: 2026-05-26T18:16:00Z

---

### App Design
- **Mode**: autonomous
- **Source**: APP.md
- **Status**: on hold — no new accepted baselines in card-index.md since last sync; all design elements awaiting user acceptance; checked 2026-05-27T06:13:53Z
- **Next task**: Auto-sync when Card Design accepts a baseline (card-index.md updated → re-sync SVGs + baselines → rebuild → deploy)
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
  10. ✅ **Deployment fix** — Root cause: `--output-path` CLI flag overrides only `base`, silently dropping `"browser": ""` config; fix: let `angular.json` control output path, workflow passes only `--base-href`; rebuilt flat to `docs/editor/index.html`; `.github/workflows/deploy.yml` updated
- **Auto-sync rule**: After any Card Design stream action that updates `card-index.md` **or** creates a new trigger symbol / activation track variant, the App Design stream must re-run steps 5–9 automatically (sync SVGs + baselines → build → deploy). No user trigger needed.
- **Blocked on**: —
- **Last notified**: 2026-05-25T15:07:31Z

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
| 2026-05-25T15:07:31Z | Orchestrator | A: Scan DESIGN.md | 1 new item found: Location connections visual design (§3.3) — solid/hollow arrows not yet in VISUAL.md; user notified (6 items total) |
| 2026-05-25T15:07:31Z | Orchestrator | B: Card Design | Created activation-track-multiturn-v02-a/b/c (corrected shapes: diamond+inner-diamond, hollow cooldown diamonds, cooldown trigger in option b, no return arrow); CHANGES.md updated |
| 2026-05-25T15:07:31Z | Orchestrator | C: App Design | Deployment fix complete — flattened docs/editor/browser/ to docs/editor/; fixed angular.json outputPath; updated deploy.yml to not pass --output-path; rebuilt; user notified |
| 2026-05-25T18:10:29Z | Orchestrator | A: Game Design | No new items; last notified 3h ago (< 48h) — no notification |
| 2026-05-25T18:10:29Z | Orchestrator | B: Card Design | activation-track-multiuse-v01-a/b/c complete; review/index.html updated |
| 2026-05-25T18:10:29Z | Orchestrator | C: App Design | Synced multiturn-v02 SVG defs → rebuilt app bundle; removed spurious docs/editor/design/ |
| 2026-05-26T00:05:22Z | Orchestrator | A: Game Design | 1 new item found: inline sym+modifier rendering §6.1; last notified 9h ago (< 48h) — no notification; 7 items total |
| 2026-05-26T00:05:22Z | Orchestrator | B: Card Design | activation-track-use-v01-a/b/c complete; square+inner-square marker variants; review/index.html updated; CHANGES.md updated; user notified |
| 2026-05-26T00:05:22Z | Orchestrator | C: App Design | Synced use-v01 square-marker SVG defs into preview.service.ts; rebuilt app bundle; removed spurious docs/editor/design/ |
| 2026-05-26T06:22:00Z | Orchestrator | A: Game Design | No new items beyond 7 tracked; last notified ~15h ago (< 48h) — no notification |
| 2026-05-26T06:22:00Z | Orchestrator | B: Card Design | die-symbols-v01-a/b/c complete (3 options: pip-count / shape-based / thematic-symbol); CHANGES.md updated; review/index.html updated |
| 2026-05-26T06:22:00Z | Orchestrator | C: App Design | Verified multiuse-v01 SVG defs already synced in preview.service.ts — no action needed; on hold awaiting baseline acceptance |
| 2026-05-26T12:14:09Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~21h ago (< 48h) — no notification |
| 2026-05-26T12:14:09Z | Orchestrator | B: Card Design | trigger-symbols-v03-a/b/c complete (A=geometric/angular, B=rounded/organic, C=pictographic/silhouette); CHANGES.md updated; review/index.html updated; user notified |
| 2026-05-26T12:14:09Z | Orchestrator | C: App Design | Auto-sync: trigger-symbols-v03-a SVG defs synced into preview.service.ts; app rebuilt; docs/editor/ redeployed |
| 2026-05-26T13:03:32Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~22h ago (< 48h) — no notification |
| 2026-05-26T13:03:32Z | Orchestrator | B: Card Design | subtitle-v01-a/b/c complete (A=below title Cinzel italic amber; B=between band+title Crimson Text italic cream+diamonds; C=embedded in type band second row 35→52px); CHANGES.md updated; review/index.html updated; user notified |
| 2026-05-26T13:03:32Z | Orchestrator | C: App Design | On hold — no new baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-26T13:19:45Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~22h ago (< 48h) — no notification |
| 2026-05-26T13:19:45Z | Orchestrator | B: Card Design | flavour-text-v01-a/b/c complete (A=amber hairline rule centred; B=ornamental SVG divider left-aligned; C=integrated borderless sec-flavour row); CHANGES.md updated; review/index.html updated; user notified |
| 2026-05-26T13:19:45Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-26T18:16:00Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~27h ago (< 48h) — no notification |
| 2026-05-26T18:16:00Z | Orchestrator | B: Card Design | set-symbol-v01-a/b/c complete (A=bottom-right circular container diamond glyph 18px; B=bottom-left rounded-square monogram "Y" 20px; C=frameless embossed trefoil in frame border 16px); CHANGES.md updated; review/index.html updated; user notified |
| 2026-05-26T18:16:00Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-27T00:14:44Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~33h ago (< 48h) — no notification |
| 2026-05-27T00:14:44Z | Orchestrator | B: Card Design | On hold — all 9 tracks complete; AND/OR + effects-v04 awaiting primitive acceptance |
| 2026-05-27T00:14:44Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-27T06:13:53Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~55h ago (> 48h threshold) — notification sent |
| 2026-05-27T06:13:53Z | Orchestrator | B: Card Design | On hold — all 9 tracks complete; no new acceptances in card-index.md; AND/OR + effects-v04 awaiting primitive acceptance |
| 2026-05-27T06:13:53Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |

---

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
