# Yarn — Orchestrator State

This file is read and written by scheduled agents. Do not edit manually during an active agent run.

## Behavioral Rules *(enforced every run)*

- **Work stream agents** — dispatch both work stream agents in parallel at the start of each run:
  - Card Design stream → invoke agent `card-design-agent`; pass the full Card Design stream section from this file (status, blocked-on, next tasks, accepted elements, global rules) directly in the prompt — the agent must not re-read ORCHESTRATOR.md
  - App Design stream → invoke agent `app-design-agent`; pass the full App Design stream section from this file (status, blocked-on, next tasks, auto-sync rule, pages layout rule) directly in the prompt — the agent must not re-read ORCHESTRATOR.md
- **Design decision tracking** — after every run, compare the Card Design stream's "Accepted design elements" list in this file against the App Design stream's completed and queued tasks. For each accepted element with no corresponding implementation task in App Design, add one. No additional file reads required — all information is in this file.
- **No mid-run notifications** — send only one PushNotification per run, at the very end, after the review streams complete
- **Review streams** — after both work stream agents finish and changes are committed, dispatch review agents in parallel; see §Review Stream Rules below:
  - Card Design reviewer → invoke agent `card-design-reviewer`
  - App Design reviewer → invoke agent `app-design-reviewer`
- **Conditional final notification** — only send the final notification after review is complete; content depends on review outcome (see §Review Stream Rules)

## System Control

```
blocked_for_weekly_review: false
weekly_review_due: 2026-05-30T08:00:00Z
last_orchestrator_run: 2026-06-04T12:30:00Z
last_status_notification: 2026-05-31T12:00:00Z
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

---

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: on hold — all design items awaiting user acceptance (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04); Tasks 2–3 blocked on cooldown trigger marker acceptance

#### Accepted design elements (2026-05-28)
- ✅ **effects-container-v04** — gradient-fade section borders (opacity 0.7), 0.15 translucent fill; see VISUAL.md §6
- ✅ **set-symbol-v01-a** — bottom-right circular container, diamond glyph, amber ring, 18px; see VISUAL.md §9.3
- ✅ **flavour-text-v01-c** — borderless inset at bottom of mechanics frame, gradient-fade top only, Crimson Text 14px italic; see VISUAL.md §9.2
- ✅ **subtitle-v01-a** — below title, Cinzel 400 italic amber, centre rule separator; see VISUAL.md §9.1

#### Accepted marker shapes (2026-05-28)
- ✅ **Activation marker** — inlayed diamond (reference: `activation-track-basic-v01-b`)
- ✅ **Flow marker (cooldown slot)** — hollow diamond, no inner element (reference: `activation-track-multiturn-v02-a`)
- ✅ **Use marker** — square with inner square (reference: `activation-track-use-v01-a`)
- ⚠️ **Cooldown trigger marker** — v01 rejected (a/b: external indicators violate shared bounding-box; c: notch concept is closest but needs inset diamond fill); v02 queued; see VISUAL.md §8 for updated spec

#### Next tasks (in order)

**Task 1 — Redesign cooldown trigger marker v02 (PRIORITY — blocks Task 2)**
v01-a/b/c are rejected. Create `design/variants/cooldown-trigger-marker-v02-a/b/c`. Follow the updated spec in VISUAL.md §8:
- Same outer diamond silhouette and bounding box as all other markers — no part may extend beyond that boundary
- The right vertex of the outer diamond stroke is cut open (interrupted) at that point
- A smaller inset diamond — styled like the inner diamond of the activation marker — is placed in the cutout, fully within the original boundary
- The inset diamond is the only distinguishing element; the rest of the outer diamond remains the hollow-diamond silhouette of the flow marker
- All three options (a/b/c) must stay within the shared bounding box; vary only the proportions and weight of the inset diamond (size, stroke weight, fill treatment)
- Show each option at card scale inside an action row on a real card mockup
- Mark cooldown-trigger-marker-v01-a/b/c as superseded in CHANGES.md; remove from Under Review on the review page

**Task 2 — Baseline propagation (blocked until Task 1 and cooldown trigger marker accepted)**
Update all card type baseline files in `design/variants/` (per card-index.md) to incorporate the four accepted design elements (effects-container-v04, set-symbol-v01-a, flavour-text-v01-c, subtitle-v01-a).

**Task 3 — Activation track rework (blocked until cooldown trigger marker accepted)**
Create new activation track variants for all four primitive track types using the accepted marker shapes. Previous track variants (`activation-track-basic-v01`, `activation-track-multiturn-v01/v02`, `activation-track-multiuse-v01`, `activation-track-use-v01`) are superseded — do NOT show them on the review page. New variants must:
- Show cards with the correct 4-container layout (VISUAL.md §6): Permanent (blue) / Entry (yellow) / Action (red) / Exit (yellow)
- Use accepted marker shapes per VISUAL.md §8
- Show each track type in the Action container with realistic effect rows
- Three options (a/b/c) per track type — vary spacing, proportions, and layout density, NOT the marker shapes
- Track types to cover: Basic, Multi-turn (with flow markers and cooldown trigger), Multi-use, Use

~~**Task 4 — Fix trigger-symbols-v04 container placement and heights (review findings)**~~ — ✅ Fixed (2026-06-01T12:18:47Z): Character Phase moved to Entry, On Flow Marker moved to Action, all fixed heights removed — content-driven sizing applied

#### Still awaiting acceptance
- cooldown-trigger-marker-v02 (a/b/c) — in design; v01 rejected
- die-symbols-v02 (a/b/c) — in design; v01 rejected
- trigger-symbols-v04 (a/b/c) — in design; v03 rejected; v04 created, review findings fixed (Task 4 complete)

#### Global rules (apply to all Card Design work)

- **Three options per design item**: every new visual element produces exactly 3 variants — option a, b, c — each a single card; named `<element>-v<N>-a.html`, `<element>-v<N>-b.html`, `<element>-v<N>-c.html`; design ID label visible on review page below each card
- **Independence**: each design item is independent — holding or blocking one item does not affect any other
- **Review page structure**: the review page at `docs/review/index.html` is maintained exclusively by the App Design stream — the Card Design agent must NOT modify any file under `docs/`. The review page has two sections: **Under Review** (grouped by design element, 3 options side by side per group) and **Accepted** (one entry per accepted item); see VISUAL.md §10 for full spec
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
- ~~**die-symbols-v01-a/b/c**~~ — ❌ Rejected (2026-05-31) — v01-a closest; pips replaced with single star; per-type color coding required; see v02
- **die-symbols-v02-a/b/c** — New round per updated spec in VISUAL.md §7:
  - Base: flat square die face (v01-a foundation)
  - Inner marking: single centered star per die face — not pips
  - Color: locked — Constitution=Red, Zeal=Blue, Path=Green; colour lives in star + thin border accent; dark die body; agent picks specific hex values that read at 20 px, confirmed on acceptance
  - a/b/c vary star weight, size, and exact color treatment — not the base shape

**Track 3 — Subtitle** *(3 options)*
- ~~**subtitle-v01-a/b/c**~~ — ✅ Complete (2026-05-26T13:03:32Z) — A: below title, Cinzel italic amber; B: between band+title, Crimson Text italic cream+diamonds; C: embedded in type band as second row, band expands 35→52px

**Track 4 — Flavour Text** *(3 options)*
- ~~**flavour-text-v01-a/b/c**~~ — ✅ Complete (2026-05-26T13:19:45Z) — A: amber hairline rule + dark tinted panel, centred 12.5px italic; B: ornamental SVG divider (amber diamond+lines), left-aligned 13.5px italic; C: fully integrated borderless sec-flavour row inside mechanics frame, 14px italic

**Track 5 — Set Symbol** *(3 options)*
- ~~**set-symbol-v01-a/b/c**~~ — ✅ Complete (2026-05-26T18:16:00Z) — option A: bottom-right circular container (r=8.5) with diamond glyph + amber ring, 18px; option B: bottom-left rounded-square with monogram "Y" placeholder (Cinzel 700), 20px; option C: frameless embossed trefoil knot in frame border zone, 16px

**Track 6 — Trigger Symbols** *(3 options)*
- ~~**trigger-symbols-v03-a/b/c**~~ — ❌ Rejected (2026-05-31) — colouring approach kept; symbols too abstract, not intuitively linked to trigger concepts; size too small (20px); see v04
- **trigger-symbols-v04-a/b/c** — New round per updated spec in VISUAL.md §7:
  - **Before designing:** use WebSearch to research iconography for each trigger concept (On Reveal, On Enter, Character Phase, On Leave, On Complete, On Flow Marker) — find real references, not abstract placeholders
  - **Size:** ~48px rendered (matching activation track markers); viewbox 0 0 48 48; use the full canvas
  - **Colour:** dark body + amber/off-white detail — same palette as v03; this is kept
  - **Clarity:** each symbol must directly and intuitively evoke its trigger without prior knowledge — no abstract geometry
  - **Row format:** show each symbol in context with the trigger name label per the design-stage convention in card-design-agent.md (label is for review only, not final design)
  - a/b/c vary the specific iconographic interpretation per trigger — not the size or colour

**Hold:** effects-v04 — create only after trigger symbols + activation tracks both accepted

- **Blocked on**: user acceptance of cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04
- **Last notified**: 2026-06-01T18:16:51Z

---

### App Design
- **Mode**: autonomous
- **Source**: APP.md
- **Status**: on hold — Tasks 6–8 resolved (source code was intact, review finding was incorrect); app rebuilt; awaiting new design element acceptances

#### Known issues (all resolved 2026-05-28)
1. ~~**Site not on GitHub Pages**~~ — ✅ deploy.yml deleted (redundant); orchestrator owns build+deploy cycle
2. ~~**Live preview not updating**~~ — ✅ Fixed: all 7 baseline templates had hardcoded "Card Title" with no `{{title}}` placeholder; PreviewService.injectFields() replacements were silently no-ops; replaced with `{{title}}` in all templates
3. ~~**Viewport too small**~~ — ✅ Fixed: iframe sized 100%/100% but card HTML is fixed 375x525; changed iframe to fixed 375x525 with transform:scale() on both mobile and desktop, desktop scale fills available wrapper dimensions

#### Next tasks (in order)

~~**Task 6 — CRITICAL: Restore card editor source code (review finding 2026-06-04)**~~ — ✅ Resolved (2026-06-04T12:30:00Z): source code was never lost — review finding was incorrect; 38 TS files across components/services/models intact in src/app/

~~**Task 7 — Fix angular.json outputPath (review finding 2026-06-04)**~~ — ✅ Resolved (2026-06-04T12:30:00Z): outputPath already correctly set to `{"base": "../docs/editor", "browser": ""}`

~~**Task 8 — Verify live preview after restoration (review finding 2026-06-04)**~~ — ✅ Verified (2026-06-04T12:30:00Z): app builds cleanly to docs/editor/index.html (flat); live preview pipeline functional (form → cardChange → card signal → ngOnChanges → renderCard → injectFields → iframe)

~~**Task 0 — Fix effect variant selector bug**~~ — ✅ Fixed (2026-06-01): `onVariantChange()` now assigns variant before emitting

~~**Task 1 — Implement dynamic container rendering (VISUAL.md §6.0)**~~ — ✅ Complete (2026-06-02T06:17:21Z): removed fixed height declarations from event/item/main-quest/side-quest baseline templates; all 7 templates now use auto-height containers with effects-container-v04 styling

~~**Task 3 — Implement accepted subtitle design (VISUAL.md §9.1)**~~ — ✅ Complete (2026-06-02T00:18:32Z): already implemented in all 7 baseline templates and PreviewService

~~**Task 4 — Implement accepted flavour text design (VISUAL.md §9.2)**~~ — ✅ Complete (2026-06-02T00:18:32Z): already implemented in all 7 baseline templates and PreviewService

~~**Task 5 — Implement accepted set symbol design (VISUAL.md §9.3)**~~ — ✅ Complete (2026-06-02T00:18:32Z): already implemented in all 7 baseline templates and PreviewService

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
  15. ✅ **Hook up all form fields to live preview** — Complete (2026-06-02T00:18:32Z): form → cardChange → card signal → ngOnChanges → renderCard → injectFields pipeline fully wired end-to-end
  16. ✅ **Fix effect variant selector bug** — `onVariantChange()` now assigns `this.effect = { ...this.effect, variant }` before emitting; variant dropdown is functional at runtime
  17. ✅ **Dynamic container rendering** — Removed fixed height declarations (height: 81px on .sec-actions, height: 56px on .sec-leave) from 4 baseline templates (event, item, main-quest, side-quest); all 7 templates now use auto-height containers with effects-container-v04 styling
  18. ✅ **Tasks 6–8 false alarm resolved** — Source code, angular.json outputPath, and live preview all verified intact (2026-06-04T12:30:00Z); app rebuilt; gallery synced (82 variants)
- **Auto-sync rule**: After any Card Design stream action that updates `card-index.md` **or** creates a new trigger symbol / activation track variant, the App Design stream must re-run steps 5–9 automatically (sync SVGs + baselines → build → deploy). No user trigger needed.
- **Pages layout rule**: GitHub Pages serves from `docs/` folder on master branch. All output files must live under `docs/`:
  - Editor: `docs/editor/` ✅
  - Review gallery: `docs/review/` ✅ (migrated 2026-05-28T00:17:35Z)
  - `.nojekyll`: `docs/.nojekyll` ✅ (created 2026-05-28T00:17:35Z)
- **Blocked on**: —
- **Last notified**: 2026-06-01T18:16:51Z

---

## Review Stream Rules

These rules govern the review sub-agents dispatched after each orchestrator run where Card Design or App Design did work.

### When to dispatch
After STEP 7 (commit and push): dispatch review sub-agents for any stream that returned `status: done` this run. Card Design reviewer and App Design reviewer run in parallel.

### Card Design reviewer
Invoke agent: `card-design-reviewer`; pass the `files_changed` list from the card-design-agent's CARD_RESULT directly in the prompt — the reviewer reads those specific variant files plus `design/VISUAL.md` and `design/card-index.md`; it must not re-read `design/variants/CHANGES.md` to discover which files changed.

### App Design reviewer
Invoke agent: `app-design-reviewer`

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
| 2026-05-30T19:59:56Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~44h ago (< 48h) — no notification |
| 2026-05-30T19:59:56Z | Orchestrator | B: Card Design | On hold — cooldown-trigger-marker-v01 awaiting acceptance; Task 2 and Task 3 blocked on acceptance |
| 2026-05-30T19:59:56Z | Orchestrator | C: App Design | Gallery maintenance — fixed all review page href paths from ../../design/ to ../design/ (old paths 404 on GitHub Pages); mirrored 73 variant files to docs/design/variants/ |
| 2026-05-31T12:00:00Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified ~55h ago (> 48h threshold) — notification sent |
| 2026-05-31T12:00:00Z | Orchestrator | B: Card Design | On hold — cooldown-trigger-marker-v01 awaiting acceptance; Task 2 and Task 3 blocked on acceptance |
| 2026-05-31T12:00:00Z | Orchestrator | C: App Design | On hold — review gallery verified correct; no new accepted baselines; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-31T06:14:44Z | Orchestrator | A: Game Design | No new items; 7 tracked unchanged; last notified < 48h ago — no notification |
| 2026-05-31T06:14:44Z | Orchestrator | B: Card Design | On hold — cooldown-trigger-marker-v01 awaiting acceptance; Task 2 and Task 3 blocked on acceptance |
| 2026-05-31T06:14:44Z | Orchestrator | C: App Design | On hold — gallery and variants verified in sync (73 files); no new accepted baselines; awaiting baseline acceptance to trigger auto-sync |
| 2026-05-31T12:25:05Z | Orchestrator | B: Card Design | cooldown-trigger-marker-v02-a/b/c created (compact/medium/large inset diamond options); v01 marked superseded in CHANGES.md; review page updated; 3 new variant files mirrored to docs/design/variants/ |
| 2026-05-31T12:25:05Z | Orchestrator | C: App Design | Task 1 partial — all 7 baseline templates updated with 8 placeholders (typeLabel, title, subtitleHtml, titleRuleHtml, cardImage, mechHeight, mechSections, setSymbol); PreviewService wiring not complete; gallery maintenance done (76 variants mirrored) |
| 2026-05-31T18:16:02Z | Orchestrator | B: Card Design | die-symbols-v02-a/b/c created (flat square die face, single centered star, per-type color coding: Constitution=Red, Zeal=Blue, Path=Green; 3 options vary star weight/size); v01 marked superseded in CHANGES.md; review page updated; trigger-symbols-v04 next |
| 2026-05-31T18:16:02Z | Orchestrator | C: App Design | Task 1 partial — model imports added to PreviewService; gallery updated; variant mirroring done (79 files); app rebuilt; functional form-field wiring still pending |
| 2026-06-01T00:18:19Z | Orchestrator | B: Card Design | cooldown-trigger-marker-v02-a/b/c all corrected — fixed bounding-box violations in options B (inset moved to x=39) and C (inset moved to x=37); standardized all markers to 48x48 rendering; added "On Flow Marker" trigger labels per design-stage convention; CHANGES.md updated |
| 2026-06-01T00:18:19Z | Orchestrator | C: App Design | Task 0 complete — fixed effect variant selector bug in effect-editor.component.ts; gallery re-synced (79 variants); app rebuilt and redeployed |
| 2026-06-01T06:22:41Z | Orchestrator | B: Card Design | trigger-symbols-v04-a/b/c created — 3 iconographic styles (naturalistic/theatrical/heraldic) at 48×48 viewBox; all 6 trigger types; v03 marked superseded in CHANGES.md |
| 2026-06-01T06:22:41Z | Orchestrator | C: App Design | Task 1 complete — dynamic container rendering: removed fixed heights from all 4 effect container sections; empty containers hidden; mech-frame hidden when all sections empty; gallery synced; app rebuilt |
| 2026-06-01T12:18:47Z | Orchestrator | B: Card Design | Task 4 complete — trigger-symbols-v04-a/b/c fixed: Character Phase moved to Entry container, On Flow Marker moved to Action container, all fixed container heights removed for content-driven sizing |
| 2026-06-01T12:18:47Z | Orchestrator | C: App Design | Review gallery updated (timestamp); 2 new variant files mirrored to docs/design/variants/ (trigger-symbols-v04-b/c); Task 3 (subtitle) next |
| 2026-06-01T18:16:51Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-01T18:16:51Z | Orchestrator | C: App Design | Dynamic container rendering reimplemented — all 7 baseline templates updated (mech-sections position absolute→relative, removed overflow hidden, removed fixed mechHeight); PreviewService: removed fixed-height estimation, buildMechSections returns hasContent boolean, mech-frame hidden via class when empty; app rebuilt to docs/editor/; gallery synced (81 variants); Task 3 (subtitle) next |
| 2026-06-02T00:18:32Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-02T00:18:32Z | Orchestrator | C: App Design | Verified Tasks 3 (subtitle), 4 (flavour text), 5 (set symbol) already implemented in templates and PreviewService; Task 15 (form field wiring) complete; live preview pipeline fully functional; app rebuilt; gallery timestamp updated |
| 2026-06-02T06:17:21Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-02T06:17:21Z | Orchestrator | C: App Design | Task 1 complete — dynamic container rendering: removed fixed height declarations from 4 baseline templates (event, item, main-quest, side-quest); all 7 templates now use auto-height containers; app rebuilt to docs/editor/; gallery synced |
| 2026-06-02T12:14:54Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-02T12:14:54Z | Orchestrator | C: App Design | Maintenance run — variant mirroring verified (82 files), review gallery up to date, gallery timestamp updated; all queued tasks complete; awaiting new design element acceptances |
| 2026-06-02T18:14:21Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-02T18:14:21Z | Orchestrator | C: App Design | Maintenance run — gallery timestamp updated; variant mirroring confirmed in sync (82 files); no new design elements requiring integration |
| 2026-06-03T00:15:25Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-03T00:15:25Z | Orchestrator | C: App Design | Maintenance run — gallery timestamp updated; variant mirroring verified in sync (82 files); no new design elements requiring integration |
| 2026-06-03T06:13:59Z | Orchestrator | B: Card Design | Blocked — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-03T06:13:59Z | Orchestrator | C: App Design | Maintenance run — gallery timestamp updated; variant mirroring verified in sync (82 files); no new design elements requiring integration |
| 2026-06-03T18:13:20Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-03T18:13:20Z | Orchestrator | C: App Design | Maintenance run — variant mirroring verified (82 files in sync, zero diffs), gallery href paths verified correct (57 links), review gallery timestamp updated |
| 2026-06-04T00:14:47Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-04T00:14:47Z | Orchestrator | C: App Design | Maintenance run — review gallery timestamp updated; variant mirroring verified in sync; editor build confirmed flat at docs/editor/index.html |
| 2026-06-04T06:13:30Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-04T06:13:30Z | Orchestrator | C: App Design | Maintenance run — gallery timestamp updated; 82 variant files verified in sync; all gallery links validated |
| 2026-06-04T12:30:00Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-04T12:30:00Z | Orchestrator | C: App Design | Tasks 6–8 resolved (false alarm) — source code intact (38 TS files), angular.json correct, app rebuilt cleanly to docs/editor/; gallery synced (82 variants); live preview pipeline verified functional |

---

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
