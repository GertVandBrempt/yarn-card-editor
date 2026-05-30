# Yarn — Orchestrator State

This file is read and written by scheduled agents. Do not edit manually during an active agent run.

## Behavioral Rules *(enforced every run)*

- **No mid-run notifications** — send only one PushNotification per run, at the very end, after the review streams complete
- **Review streams** — after all three work streams (A, B, C) finish and changes are committed, dispatch a review sub-agent for Card Design (B) and App Design (C) in parallel; see §Review Stream Rules below
- **Conditional final notification** — only send the final notification after review is complete; content depends on review outcome (see §Review Stream Rules)

## System Control

```
blocked_for_weekly_review: false
weekly_review_due: 2026-05-30T08:00:00Z
last_orchestrator_run: 2026-05-30T12:12:45Z
last_status_notification: 2026-05-29T00:11:07Z
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

---

### Game Design
- **Mode**: interactive (orchestrator surfaces topics; user drives sessions in Claude Code)
- **Source**: DESIGN.md open issues and unresolved questions
- **Status**: active — 7 discussion items tracked; no new items found in scan of 2026-05-29T18:12:54Z; last notified ~18h ago (< 48h) — no notification
- **Pending discussion items** *(top 7 by card-design impact)*:
  1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
  2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
  3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
  4. Action track visual design (§4.4) — 6 track types defined; activation-tracks-v02 in-card mockup created — **ready for user review**
  5. Location connections visual design (§3.3) — solid vs hollow arrows for face-down/face-up state; intent stated in DESIGN.md but not yet in VISUAL.md
  6. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
  7. **Inline sym+modifier rendering (§6.1) — NEW** — effect text with `[icon][modifier]` groups; final inline layout/sizing rules not yet in VISUAL.md; effects-v03 demonstrates it
- **Last notified**: 2026-05-29T00:11:07Z
- **Blocked on**: —

---

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: on hold — 4 design elements accepted; marker shapes accepted; cooldown trigger marker v01-a/b/c awaiting acceptance; all remaining tasks blocked on acceptance

#### Accepted design elements (2026-05-28)
- ✅ **effects-container-v04** — gradient-fade section borders (opacity 0.7), 0.15 translucent fill; see VISUAL.md §6
- ✅ **set-symbol-v01-a** — bottom-right circular container, diamond glyph, amber ring, 18px; see VISUAL.md §9.3
- ✅ **flavour-text-v01-c** — borderless inset at bottom of mechanics frame, gradient-fade top only, Crimson Text 14px italic; see VISUAL.md §9.2
- ✅ **subtitle-v01-a** — below title, Cinzel 400 italic amber, centre rule separator; see VISUAL.md §9.1

#### Accepted marker shapes (2026-05-28)
- ✅ **Activation marker** — inlayed diamond (reference: `activation-track-basic-v01-b`)
- ✅ **Flow marker (cooldown slot)** — hollow diamond, no inner element (reference: `activation-track-multiturn-v02-a`)
- ✅ **Use marker** — square with inner square (reference: `activation-track-use-v01-a`)
- ⚠️ **Cooldown trigger marker** — NOT YET DESIGNED; spec in VISUAL.md §8: hollow diamond + small rightward arrow/wedge on right vertex; must be created before track rework can be completed

#### Next tasks (in order)

**Task 1 — Design cooldown trigger marker (PRIORITY — blocks Task 2)**
Create `design/variants/cooldown-trigger-marker-v01-a/b/c` — three options for the cooldown trigger marker visual. Each option must show the marker at card scale in context (inside an action row on a card). Follow the spec in VISUAL.md §8: hollow diamond outer silhouette with a small rightward-pointing indicator on the right vertex. Options vary the indicator style (wedge / arrowhead / notch). Do NOT vary the outer diamond shape — that is locked.

**Task 2 — Baseline propagation (blocked until Task 1 and cooldown trigger marker accepted)**
Update all card type baseline files in `design/variants/` (per card-index.md) to incorporate the four accepted design elements (effects-container-v04, set-symbol-v01-a, flavour-text-v01-c, subtitle-v01-a).

**Task 3 — Activation track rework (blocked until cooldown trigger marker accepted)**
Create new activation track variants for all four primitive track types using the accepted marker shapes. Previous track variants (`activation-track-basic-v01`, `activation-track-multiturn-v01/v02`, `activation-track-multiuse-v01`, `activation-track-use-v01`) are superseded — do NOT show them on the review page. New variants must:
- Show cards with the correct 4-container layout (VISUAL.md §6): Permanent (blue) / Entry (yellow) / Action (red) / Exit (yellow)
- Use accepted marker shapes per VISUAL.md §8
- Show each track type in the Action container with realistic effect rows
- Three options (a/b/c) per track type — vary spacing, proportions, and layout density, NOT the marker shapes
- Track types to cover: Basic, Multi-turn (with flow markers and cooldown trigger), Multi-use, Use

#### Still awaiting acceptance
- cooldown-trigger-marker-v01 (a/b/c)
- die-symbols-v01 (a/b/c)
- trigger-symbols-v03 (a/b/c)

#### Global rules (apply to all Card Design work)

- **Three options per design item**: every new visual element produces exactly 3 variants — option a, b, c — each a single card; named `<element>-v<N>-a.html`, `<element>-v<N>-b.html`, `<element>-v<N>-c.html`; design ID label visible on review page below each card
- **Independence**: each design item is independent — holding or blocking one item does not affect any other
- **Review page structure**: after any card design action, regenerate `docs/review/index.html` with two sections: **Under Review** (grouped by design element, 3 options side by side per group) and **Accepted** (one entry per accepted item); see VISUAL.md §10 for full spec. The file lives at `docs/review/index.html` — never at `review/index.html` (root-level path is not served by GitHub Pages)
- **Superseded versions rule**: when a design round receives feedback and a new round (v<N+1>) is created, **only show the current round on the review page** — remove all previous round options from Under Review; superseded versions are never accepted and must not appear; HTML files stay on disk but are not linked from the review page; applies immediately: `activation-track-multiturn-v01-a/b/c` must be removed from the review page (superseded by v02)

#### Independent design tracks (each runs independently)

**Track 1 — Activation Tracks** *(3 options each)*
1. ~~**activation-track-basic-v01-a/b/c**~~ — ✅ Complete (2026-05-25T12:04:48Z)
2. ~~**activation-track-multiturn-v01-a/b/c**~~ — ❌ Needs revision (return arrow must be removed; trigger marker shape corrected — see v02 below)
3. **activation-track-multiturn-v02-a/b/c** — Corrected multi-turn track per VISUAL.md §8 locked shapes:
   - **Activation marker**: diamond with inner diamond — player places token here
   - **Cooldown slots**: hollow/empty diamond — passive wait; connected to previous marker by a small directional arrow
   - **Cooldown trigger** (optional — show in at least one option): diamond with inner **right-pointing arrow (→)** — same outer diamond silhouette as other markers; inner arrow points RIGHT toward the effect it triggers, not down; sits in any cooldown position; fires its own effect row; connected by directional arrow from previous marker like any other slot
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
- **Status**: on hold — all 4 known issues resolved; awaiting baseline acceptance to trigger auto-sync

#### Known issues (all resolved 2026-05-28)
1. ~~**Site not on GitHub Pages**~~ — ✅ deploy.yml deleted (redundant); orchestrator owns build+deploy cycle
2. ~~**Live preview not updating**~~ — ✅ Fixed: all 7 baseline templates had hardcoded "Card Title" with no `{{title}}` placeholder; PreviewService.injectFields() replacements were silently no-ops; replaced with `{{title}}` in all templates
3. ~~**Viewport too small**~~ — ✅ Fixed: iframe sized 100%/100% but card HTML is fixed 375x525; changed iframe to fixed 375x525 with transform:scale() on both mobile and desktop, desktop scale fills available wrapper dimensions

#### Next tasks (in order)

No pending tasks. Awaiting baseline acceptance to trigger auto-sync.

#### Auto-sync rule (unchanged)
After Card Design propagates accepted baselines → re-sync updated baseline HTMLs into `yarn-card-editor/src/assets/templates/`; rebuild; redeploy.
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
  11. ✅ **Review gallery migration** — Migrated `review/index.html` from repo root to `docs/review/index.html`; created `docs/.nojekyll`; updated deploy.yml; all 82 variant paths corrected to `../../design/variants/`
  12. ✅ **Delete deploy.yml** — Removed `.github/workflows/deploy.yml` (redundant with orchestrator build pipeline)
  13. ✅ **Fix live preview** — All 7 baseline templates had hardcoded title text; replaced with `{{title}}` placeholder so `PreviewService.injectFields()` can substitute form values
  14. ✅ **Fix card preview scale** — Changed iframe to fixed 375x525 with `transform:scale()` computed to fill desktop wrapper dimensions; mobile uses constrained scale
- **Auto-sync rule**: After any Card Design stream action that updates `card-index.md` **or** creates a new trigger symbol / activation track variant, the App Design stream must re-run steps 5–9 automatically (sync SVGs + baselines → build → deploy). No user trigger needed.
- **Pages layout rule**: GitHub Pages serves from `docs/` folder on master branch. All output files must live under `docs/`:
  - Editor: `docs/editor/` ✅
  - Review gallery: `docs/review/` ✅ (migrated 2026-05-28T00:17:35Z)
  - `.nojekyll`: `docs/.nojekyll` ✅ (created 2026-05-28T00:17:35Z)
- **Blocked on**: —
- **Last notified**: 2026-05-25T15:07:31Z

---

## Review Stream Rules

These rules govern the review sub-agents dispatched after each orchestrator run where B or C did work.

### When to dispatch
After STEP 7 (commit and push): dispatch review sub-agents for any stream that returned `status: done` this run. B-Review and C-Review run in parallel.

### Card Design reviewer (B-Review) — prompt
```
You are a critical card design reviewer for the Yarn project. Be sceptical and precise.

Read: design/VISUAL.md, design/card-index.md, design/variants/CHANGES.md, and every variant HTML file created or modified this run (listed in CHANGES.md).

Check ALL of the following and flag any failure:
1. Do variant files contain only a single card — no page chrome, no body background, no extra text?
2. Do created variants use the accepted marker shapes from VISUAL.md §8 (correct activation, flow, use, cooldown trigger markers)?
3. Do effect containers follow the 4-container model from VISUAL.md §6 (Permanent/Entry/Action/Exit, correct colors, no section labels, correct row formats per container)?
4. Do card dimensions match VISUAL.md §1 (375×525px, 12.5px radius)?
5. Does the review page (docs/review/index.html) show only the CURRENT round for each design element — no superseded versions?
6. Do accepted items appear in the Accepted section, not Under Review?
7. Are all container heights content-driven — no overflow, no clipping, no fixed heights with overflowing content?

Return exactly:
REVIEW_RESULT
verdict: ACCEPT or REJECT
findings:
- [numbered list of specific failures, or "none" if ACCEPT]
END_RESULT
```

### App Design reviewer (C-Review) — prompt
```
You are a critical app design reviewer for the Yarn project. Be sceptical and precise.

Check ALL of the following:
1. HTTP status of https://gertvandbrempt.github.io/yarn-card-editor/editor/ — run: curl -s -o /dev/null -w "%{http_code}" <url>; must be 200
2. HTTP status of https://gertvandbrempt.github.io/yarn-card-editor/review/ — must be 200
3. Read docs/editor/index.html — base href must be "/yarn-card-editor/editor/"; JS and CSS must be referenced without a "browser/" subfolder
4. Read docs/.nojekyll — must exist (even if empty)
5. Read yarn-card-editor/src/index.html — viewport meta must be "width=device-width, initial-scale=1"
6. Read yarn-card-editor/src/app/services/preview.service.ts — verify injectFields() is called on form value changes; flag if there are missing subscriptions or change-detection gaps
7. Read .github/workflows/deploy.yml — verify git push is authenticated; verify git add includes docs/editor/, docs/review/, and docs/.nojekyll; verify build command does NOT pass --output-path flag
8. Read yarn-card-editor/angular.json — verify outputPath is {"base": "../docs/editor", "browser": ""}

Return exactly:
REVIEW_RESULT
verdict: ACCEPT or REJECT
findings:
- [numbered list of specific failures, or "none" if ACCEPT]
END_RESULT
```

### One-shot retry
If a reviewer returns REJECT: the orchestrator sends one response addressing the findings (additional context, corrections, or acknowledgement that findings are valid and tasks have been added). The reviewer makes a final ACCEPT or REJECT based on that response.

### Final notification
- **All accepted**: send ONE PushNotification — summary of what changed this run only; no stream status, no file lists
- **Any rejected**: add each rejected finding as a numbered task in the relevant stream's Next tasks in ORCHESTRATOR.md; commit; send ONE PushNotification — "🔴 Review failed" + reviewer findings + tasks added; no other content

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
| 2026-05-27T12:20:20Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~6h ago (< 48h) — no notification |
| 2026-05-27T12:20:20Z | Orchestrator | B: Card Design | On hold — all 9 tracks complete; no new acceptances in card-index.md; AND/OR + effects-v04 awaiting primitive acceptance |
| 2026-05-27T12:20:20Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-27T18:11:31Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~12h ago (< 48h) — no notification |
| 2026-05-27T18:11:31Z | Orchestrator | B: Card Design | On hold — all 9 tracks complete; no new acceptances in card-index.md; AND/OR + effects-v04 awaiting primitive acceptance |
| 2026-05-27T18:11:31Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-27T (user) | Diagnosis | C: Pages layout | Root cause identified: review/index.html was written to repo root, not docs/; GitHub Pages serves from docs/ only — review gallery has never been served by Pages; fix queued as priority App Design task |
| 2026-05-28T00:17:35Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~18h ago (< 48h) — no notification |
| 2026-05-28T00:17:35Z | Orchestrator | B: Card Design | On hold — all 9 tracks complete; no new acceptances in card-index.md; AND/OR + effects-v04 awaiting primitive acceptance |
| 2026-05-28T00:17:35Z | Orchestrator | C: App Design | Review gallery migrated to docs/review/index.html; docs/.nojekyll created; deploy.yml updated; 82 paths corrected |
| 2026-05-28T06:15:43Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~24h ago (< 48h) — no notification |
| 2026-05-28T06:15:43Z | Orchestrator | B: Card Design | On hold — all 9 tracks complete; no new acceptances in card-index.md; AND/OR + effects-v04 awaiting primitive acceptance |
| 2026-05-28T06:15:43Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-28T12:16:46Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~30h ago (< 48h) — no notification |
| 2026-05-28T12:16:46Z | Orchestrator | B: Card Design | On hold — all 9 tracks complete; no new acceptances in card-index.md; AND/OR + effects-v04 awaiting primitive acceptance |
| 2026-05-28T12:16:46Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-28T13:50:00Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~32h ago (< 48h) — no notification |
| 2026-05-28T13:50:00Z | Orchestrator | B: Card Design | cooldown-trigger-marker-v01-a/b/c created (wedge/arrowhead/notch indicator styles); CHANGES.md updated; review page regenerated |
| 2026-05-28T13:50:00Z | Orchestrator | C: App Design | Tasks 0–3 complete: deploy.yml deleted; live preview fixed ({{title}} placeholders in 7 templates); card preview scale fixed (375x525 iframe + transform:scale); app rebuilt + redeployed |
| 2026-05-28T13:50:00Z | Orchestrator | Gallery: regenerate | docs/review/index.html updated — cooldown-trigger-marker added to Under Review; accepted elements moved to Accepted section; legacy/superseded items removed |
| 2026-05-28T18:13:31Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~36h ago (< 48h) — no notification |
| 2026-05-28T18:13:31Z | Orchestrator | B: Card Design | On hold — all design tracks complete or awaiting acceptance; Task 2 (baseline propagation) and Task 3 (track rework) blocked on cooldown-trigger-marker-v01 acceptance |
| 2026-05-28T18:13:31Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting Card Design baseline propagation to trigger auto-sync |
| 2026-05-29T00:11:07Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~66h ago (> 48h threshold) — notification sent |
| 2026-05-29T00:11:07Z | Orchestrator | B: Card Design | On hold — cooldown-trigger-marker-v01 awaiting acceptance; Task 2 and Task 3 blocked on acceptance |
| 2026-05-29T00:11:07Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting Card Design baseline propagation to trigger auto-sync |
| 2026-05-29T06:12:18Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~6h ago (< 48h) — no notification |
| 2026-05-29T06:12:18Z | Orchestrator | B: Card Design | On hold — cooldown-trigger-marker-v01 awaiting acceptance; Task 2 and Task 3 blocked on acceptance |
| 2026-05-29T06:12:18Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting Card Design baseline propagation to trigger auto-sync |
| 2026-05-29T13:29:33Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~13h ago (< 48h) — no notification |
| 2026-05-29T13:29:33Z | Orchestrator | B: Card Design | On hold — cooldown-trigger-marker-v01 awaiting acceptance; Task 2 and Task 3 blocked on acceptance |
| 2026-05-29T13:29:33Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting Card Design baseline propagation to trigger auto-sync |
| 2026-05-29T18:12:54Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~18h ago (< 48h) — no notification |
| 2026-05-29T18:12:54Z | Orchestrator | B: Card Design | On hold — cooldown-trigger-marker-v01 awaiting acceptance; Task 2 and Task 3 blocked on acceptance |
| 2026-05-29T18:12:54Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting Card Design baseline propagation to trigger auto-sync |
| 2026-05-30T12:12:45Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~36h ago (< 48h) — no notification |
| 2026-05-30T12:12:45Z | Orchestrator | B: Card Design | On hold — cooldown-trigger-marker-v01 awaiting acceptance; Task 2 and Task 3 blocked on acceptance |
| 2026-05-30T12:12:45Z | Orchestrator | C: App Design | On hold — no new accepted baselines in card-index.md; awaiting Card Design baseline propagation to trigger auto-sync |

---

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
