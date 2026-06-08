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
last_orchestrator_run: 2026-06-08T12:14:14Z
last_status_notification: 2026-05-31T12:00:00Z
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

---

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: blocked — trigger-symbols-v05-a/b/c awaiting user acceptance; all other tasks complete or on hold; effects-v04 on hold

#### Accepted design elements (2026-05-28)
- ✅ **effects-container-v04** — gradient-fade section borders (opacity 0.7), 0.15 translucent fill; see VISUAL.md §6
- ✅ **set-symbol-v01-a** — bottom-right circular container, diamond glyph, amber ring, 18px; see VISUAL.md §9.3
- ✅ **flavour-text-v01-c** — borderless inset at bottom of mechanics frame, gradient-fade top only, Crimson Text 14px italic; see VISUAL.md §9.2
- ✅ **subtitle-v01-a** — below title, Cinzel 400 italic amber, centre rule separator; see VISUAL.md §9.1

#### Accepted marker shapes
- ✅ **Activation marker** — inlayed diamond (reference: `activation-track-basic-v01-b`)
- ✅ **Flow marker (cooldown slot)** — hollow diamond, no inner element (reference: `activation-track-multiturn-v02-a`)
- ✅ **Use marker** — square with inner square (reference: `activation-track-use-v01-a`)
- ✅ **Cooldown trigger marker** — hollow diamond with right vertex cut open; medium inset diamond (amber fill + amber stroke) fills the cutout (reference: `cooldown-trigger-marker-v02-b`, accepted 2026-06-05)

#### Next tasks (in order)

~~**Task 1 — Redesign cooldown trigger marker v02 (PRIORITY — blocks Task 2)**~~ — ✅ Complete (2026-06-05): cooldown-trigger-marker-v02-b accepted; see Accepted marker shapes

~~**Task 2 — Baseline propagation (unblocked)**~~ — ✅ Complete (2026-06-05T18:10:50Z): all 11 baselines updated with subtitle-v01-a, flavour-text-v01-c, set-symbol-v01-a (effects-container-v04 already present)

~~**Task 5 — Baseline propagation cleanup (review findings 2026-06-05T18:10:50Z)**~~ — ✅ Complete (2026-06-06T00:10:28Z): BASELINE.html reverted; min-height removed from basic-v02-a/b/c and multiturn-v03-a/b/c

~~**Task 3 — Activation track rework (unblocked 2026-06-05)**~~ — ✅ Complete (2026-06-06T00:10:28Z): all 4 track types created with accepted markers at ~29px — basic-v02-a/b/c (existing, cleaned), multiturn-v03-a/b/c (existing, cleaned), multiuse-v02-a/b/c (new), use-v02-a/b/c (new); 4-container layout, content-driven heights, spacing/density variations across a/b/c

~~**Task 4 — Fix trigger-symbols-v04 container placement and heights (review findings)**~~ — ✅ Fixed (2026-06-01T12:18:47Z): Character Phase moved to Entry, On Flow Marker moved to Action, all fixed heights removed — content-driven sizing applied

#### Still awaiting acceptance
- trigger-symbols-v05 (a/b/c) — v04-a direction kept, icons to be simplified and scaled to ~29px; v04 superseded

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
- ~~**die-symbols-v02-a/b/c**~~ — ✅ **v02-b accepted (2026-06-05)** — heavy-weight 5-point star, wide arms, thicker color border accent; see VISUAL.md §7 for locked spec

**Track 3 — Subtitle** *(3 options)*
- ~~**subtitle-v01-a/b/c**~~ — ✅ Complete (2026-05-26T13:03:32Z) — A: below title, Cinzel italic amber; B: between band+title, Crimson Text italic cream+diamonds; C: embedded in type band as second row, band expands 35→52px

**Track 4 — Flavour Text** *(3 options)*
- ~~**flavour-text-v01-a/b/c**~~ — ✅ Complete (2026-05-26T13:19:45Z) — A: amber hairline rule + dark tinted panel, centred 12.5px italic; B: ornamental SVG divider (amber diamond+lines), left-aligned 13.5px italic; C: fully integrated borderless sec-flavour row inside mechanics frame, 14px italic

**Track 5 — Set Symbol** *(3 options)*
- ~~**set-symbol-v01-a/b/c**~~ — ✅ Complete (2026-05-26T18:16:00Z) — option A: bottom-right circular container (r=8.5) with diamond glyph + amber ring, 18px; option B: bottom-left rounded-square with monogram "Y" placeholder (Cinzel 700), 20px; option C: frameless embossed trefoil knot in frame border zone, 16px

**Track 6 — Trigger Symbols** *(3 options)*
- ~~**trigger-symbols-v03-a/b/c**~~ — ❌ Rejected (2026-05-31) — colouring approach kept; symbols too abstract, not intuitively linked to trigger concepts; size too small (20px); see v04
- ~~**trigger-symbols-v04-a**~~ — closest direction (2026-06-05); icons too fat/overdesigned — simplify and scale down; see v05
- ~~**trigger-symbols-v04-b/c**~~ — not the chosen direction; disregard
- **trigger-symbols-v05-a/b/c** — Iterate from v04-a per updated spec in VISUAL.md §7:
  - **Scope: 5 triggers only** — On Reveal, On Enter, Character Phase, On Leave, On Complete; **do NOT include On Flow Marker** — that is represented by the accepted cooldown trigger marker shape (v02-b) in the Action container and requires no separate trigger symbol
  - **Starting point:** v04-a iconographic direction — keep the same conceptual shapes per trigger; strip away all decoration and internal detail
  - **Shape rule:** basic silhouettes only — max two distinct shape elements per icon; no internal lines, no layering, no decorative fills; if you can remove an element and still read the icon, remove it
  - **Color:** exactly two tones — dark body + one lighter tone (off-white or amber); no additional colors or gradients
  - **Size:** render at ~29px (scaled down ~2/5ths from v04); viewbox 0 0 48 48 (design at full res); confirm legibility at 29px render size before finalising
  - **Row format:** show each symbol in context with the trigger name label on a real card mockup
  - a/b/c vary the degree of simplification and exact silhouette treatment — not the trigger concepts or palette

**Hold:** effects-v04 — create only after trigger symbols + activation tracks both accepted

- **Blocked on**: trigger-symbols-v05 acceptance (activation tracks complete — only trigger symbols remain before effects-v04)
- **Last notified**: 2026-06-08T12:14:14Z

---

### App Design
- **Mode**: autonomous
- **Source**: APP.md
- **Status**: active — Task 22 (living task) re-verified (2026-06-08T12:14:14Z); no newly accepted features to enable; review gallery synced; build current

#### Known issues (all resolved 2026-05-28)
1. ~~**Site not on GitHub Pages**~~ — ✅ deploy.yml deleted (redundant); orchestrator owns build+deploy cycle
2. ~~**Live preview not updating**~~ — ✅ Fixed: all 7 baseline templates had hardcoded "Card Title" with no `{{title}}` placeholder; PreviewService.injectFields() replacements were silently no-ops; replaced with `{{title}}` in all templates
3. ~~**Viewport too small**~~ — ✅ Fixed: iframe sized 100%/100% but card HTML is fixed 375x525; changed iframe to fixed 375x525 with transform:scale() on both mobile and desktop, desktop scale fills available wrapper dimensions

#### Next tasks (in order)

~~**Task 6 — CRITICAL: Restore card editor source code (review finding 2026-06-04)**~~ — ❌ Previous resolution was incorrect (2026-06-05 review confirmed): only 3 default scaffold files exist in src/app/ (app.ts, app.config.ts, app.spec.ts); the 38 TS files with components/services/models are missing

~~**Task 7 — Fix angular.json outputPath (review finding 2026-06-04)**~~ — ❌ Previous resolution was incorrect (2026-06-05 review confirmed): outputPath key is entirely absent from angular.json; build outputs to dist/ instead of ../docs/editor

~~**Task 8 — Verify live preview after restoration (review finding 2026-06-04)**~~ — ❌ Cannot verify — source code is missing

~~**Task 9 — CRITICAL: Restore card editor source code to src/app/ (review finding 2026-06-05)**~~ — ✅ Verified intact (2026-06-05T06:10:23Z): 78 files in src/app/ with all components, services, and models

~~**Task 10 — Restore angular.json outputPath (review finding 2026-06-05)**~~ — ✅ Verified correct (2026-06-05T06:10:23Z): outputPath has `{"base": "../docs/editor", "browser": ""}`

~~**Task 11 — Rebuild app from restored source and verify (review finding 2026-06-05)**~~ — ✅ Complete (2026-06-05T06:10:23Z): `ng build --base-href /yarn-card-editor/editor/` produced flat output at docs/editor/index.html

~~**Task 12 — Verify live preview pipeline after restoration (review finding 2026-06-05)**~~ — ❌ False positive (2026-06-05T06:10:23Z): agent claimed verification but src/app/ still has only scaffold code

~~**Task 13 — Recover card editor source (2026-06-05)**~~ — ✅ Resolved (2026-06-05, user-confirmed): source never missing; agents were checking `src/app/` (repo root scaffold) instead of `yarn-card-editor/src/app/` (full Angular app with all components, services, models). Path confusion only.

~~**Task 14 — Add outputPath to angular.json (2026-06-05)**~~ — ✅ Resolved (2026-06-05, user-confirmed): `yarn-card-editor/angular.json` already contains correct `outputPath: {"base": "../docs/editor", "browser": ""}`. Reviewer was inspecting wrong angular.json or none at all.

~~**Task 15 — Rebuild from real source and verify**~~ — ✅ Complete (2026-06-05T12:19:03Z): `ng build --base-href /yarn-card-editor/editor/` successful; `docs/editor/index.html` verified flat; angular.json outputPath correct

~~**Task 23 — Integrate die symbol SVGs (die-symbols-v02-b) into PreviewService**~~ — ✅ Complete (2026-06-05T12:19:03Z): 3 die SVG symbols (Constitution=Red, Zeal=Blue, Path=Green) added to preview.service.ts SVG_DEFS; icon names registered; app rebuilt

~~**Task 16 — Fix set overview page readability (black on black)**~~ — ✅ Complete (2026-06-05T18:10:50Z): SetSelectorComponent restyled with dark parchment background (#1a1510), amber accents (#d4a843), proper text contrast, hover states, responsive layout

~~**Task 17 — Fix trigger limit bug: only one trigger can be added per card**~~ — ✅ Complete (2026-06-06T00:10:28Z): root cause was form components decomposing triggers array into non-existent named fields (onReveal, onEnter, etc.) then overwriting on change detection; PreviewService had same issue; CardService factory missing triggers array for character type. Fixed in 6 files: LocationFormComponent, CharacterFormComponent, EventFormComponent, QuestFormComponent, CardService, PreviewService

~~**Task 18 — Introduce Row/Container domain model and fix activation track rendering**~~ — ✅ Complete (2026-06-07T06:13:58Z): Parts A+B (container-utils.ts, PreviewService refactor) and Part C (Forms — cooldown slot sub-form, use-track improvements) all done; app rebuilt

This is a domain model refactor. Read it fully before touching any code.

**The model**

The fundamental rendering unit is a `Row`:
```ts
interface Row {
  symbol?: ContainerSymbol;  // absent in passive rows
  effect?: Effect;           // absent in symbol-only rows
}
```

A `Container` is a flat ordered list of rows with a declared type:
```ts
interface Container {
  type: ContainerType;   // Permanent | Entry | Action | Exit
  rows: Row[];
}
```

Each `ContainerType` constrains which `ContainerSymbol` values are valid for its rows:
- **Permanent / passive containers** — no symbol; rows have effect only
- **Entry (trigger) container** — symbol is one of the trigger type enum values (On Reveal, On Enter, Character Phase, On Leave, On Complete, On Flow Marker)
- **Action container** — symbol is one of the activation marker type enum values (Activation, FlowMarker, CooldownTrigger, UseMarker)
- **Exit container** — same as trigger container

`Action` remains an **editor-level grouping only** — it bundles related rows (e.g. an activation row + its cooldown rows) under one editable entry so the user can manage them together. It does not exist at render time: `PreviewService` flattens each action's rows into the container's row list and renders them in order.

**Part A — Domain model (models/)**
- Add `Row`, `Container`, `ContainerType`, `ContainerSymbol` (and per-container symbol enums) to `yarn-card-editor/src/app/models/`
- Refactor `Action` and `Trigger` to compose into `Row[]` for rendering; keep `Action` as an editor grouping
- Update all card type models to use `Container[]` instead of separate effects/actions/triggers arrays
- Export everything from `models/index.ts`

**Part B — Preview (PreviewService)**
- Render card as containers → flatten rows → `symbol? + effect?` per row
- A use-track action with N uses renders as one row with N use markers before the effect text
- A cooldown-track action renders as: one activation-marker row, then one row per cooldown slot (FlowMarker or CooldownTrigger symbol, with effect if CooldownTrigger)

**Part C — Forms**
- Update `ActionsEditorComponent` and `TriggersEditorComponent` to edit `Row[]` within an action/trigger grouping
- Multi-turn action sub-form: list of cooldown slot rows, each togglable between FlowMarker and CooldownTrigger; CooldownTrigger rows show an inline effect editor
- Use-track action sub-form: a use-count spinner that drives the marker count on the single effect row
- All changes must be live-preview-wired

Rebuild and redeploy after all three parts are complete.

~~**Task 19 — Card type locked at creation; immediate save; autosave on every edit**~~ — ✅ Verified already implemented (2026-06-07T12:24:53Z): type selection up-front via per-type sidebar buttons; type read-only after creation; immediate save on creation; autosave with 500ms debounce; no manual Save button

~~**Task 21 — Card list grouped by type, with counts, colour coding, and collapsible groups**~~ — ✅ Complete (2026-06-07T12:24:53Z): CardListComponent refactored with TYPE_ORDER, TYPE_COLORS, CardGroup interface; groupedCards computed signal groups by type, hides empty groups; totalCount header; collapsible groups with chevron toggle (session-only state); per-type colour on group headers + card left borders + type badges; mobile responsive

**Task 22 — Gray out undesigned feature fields consistently (living task)**

⚠️ This is a **living task** — it must be revisited and updated each time the Card Design stream accepts a new visual feature. When a card design feature is accepted and propagated to baselines, the corresponding form fields must be re-enabled in the same App Design run.

**Goal**
Form fields that correspond to features not yet visually designed must be rendered in a grayed-out / disabled state. They must still be present in the form (so data model slots are already wired), but clearly indicated as "coming soon" — not yet functional in the card preview. Do not hide them; do not remove them from the model.

**Consistent treatment**
- Disabled fields use a uniform visual style: muted label colour, grayed input, a tooltip or inline label reading "Not yet designed"
- The same CSS class / Angular directive is used for all disabled-feature fields — not ad-hoc per field
- When a feature is enabled, removing that class/directive is the only change needed

**Fields currently undesigned (initial list — update as features are accepted)**
- **Health / Life Point Slots** — rendered on card frame but visual design not yet finalised
- **Location adjacency / connection arrows** — §3.3 of DESIGN.md; solid/hollow arrow directions between locations; not yet in VISUAL.md
- Add further fields here as they are identified during implementation

**Process rule**
When the Card Design stream accepts a new visual element that corresponds to a grayed-out field, the App Design agent must:
1. Enable the field (remove disabled treatment)
2. Wire its value into `PreviewService` rendering
3. Remove it from the "currently undesigned" list above in this task description
4. Update ORCHESTRATOR.md accordingly

Rebuild and redeploy after the initial implementation of this task.

~~**Task 20 — Export to JSON and import from JSON**~~ — ✅ Complete (2026-06-07T18:11:39Z): ImportExportService created with export/download/validate/import methods; Export+Import buttons in sidebar (Set Actions section) and set selector page; CardSetExport format with formatVersion, validation, error display; forward-compatible (unknown fields ignored); app rebuilt

**Export**
Add an "Export" action (button in the set overview or editor toolbar) that serialises the current card set to JSON and triggers a browser file download. The filename should default to `<set-name>.json`. The JSON must be the canonical serialisation of the `CardSet` model — no UI-only fields, no internal IDs that have no meaning outside the app. All card types and their full data must round-trip cleanly.

**Import**
Add an "Import" action that accepts a `.json` file via a file picker. On import: validate that the file is a valid `CardSet` JSON (correct structure and card types); if valid, load it as a new card set (or offer to replace the current one if a set is already open); if invalid, show a clear error message. Do not silently swallow malformed files.

**Robustness**
- The export format is the source of truth — import must accept any file exported by the same app version
- Unknown fields in the imported JSON should be ignored (forward-compatibility), not rejected
- Any import validation error must surface to the user with enough detail to understand what is wrong

Rebuild and redeploy after completing this task.

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
  19. ✅ **Fix trigger limit bug** — Form components (Location/Character/Event/Quest) + PreviewService + CardService fixed to read/write `triggers: Trigger[]` array instead of non-existent named fields; multiple triggers now work on all card types; app rebuilt; gallery synced (90 variants)
  20. ✅ **Task 18 Parts A+B — Container/Row domain model + PreviewService refactor** — container-utils.ts created; PreviewService refactored to use Container/Row model with renderRow/getRowSymbolHtml/ACTIVATION_SYMBOL_MAP; review gallery regenerated with all trigger-symbols-v05 and multiuse-v02 variants; app rebuilt
  21. ✅ **Task 18 Part C — Forms** — ActionsEditorComponent updated with cooldown slot sub-form (CooldownSlot interface, per-slot FlowMarker/CooldownTrigger toggle, inline effect editor for triggers); use-track sub-form improved with marker count hint; all live-preview-wired; app rebuilt
  22. ✅ **Task 19 verified already implemented** — type selection up-front, type read-only after creation, immediate save on creation, autosave with 500ms debounce
  23. ✅ **Task 21 — Card list grouped by type** — CardListComponent refactored: TYPE_ORDER, TYPE_COLORS, CardGroup interface, groupedCards computed signal, collapsible groups with chevron toggle, per-type colour coding on headers + card items, totalCount header, mobile responsive; app rebuilt
  24. ✅ **Task 22 — Gray out undesigned fields** — feature-undesigned CSS class with uniform styling (opacity 0.45, pointer-events none, muted colors, undesigned-badge); applied to Location connections and Persona life point slots
  25. ✅ **Task 20 — Export/Import JSON** — ImportExportService with CardSetExport format (formatVersion, validation, forward-compatible); Export+Import buttons in sidebar Set Actions section and set selector page; error banners for validation failures; app rebuilt
- **Auto-sync rule**: After any Card Design stream action that updates `card-index.md` **or** creates a new trigger symbol / activation track variant, the App Design stream must re-run steps 5–9 automatically (sync SVGs + baselines → build → deploy). No user trigger needed.
- **Pages layout rule**: GitHub Pages serves from `docs/` folder on master branch. All output files must live under `docs/`:
  - Editor: `docs/editor/` ✅
  - Review gallery: `docs/review/` ✅ (migrated 2026-05-28T00:17:35Z)
  - `.nojekyll`: `docs/.nojekyll` ✅ (created 2026-05-28T00:17:35Z)
- **Blocked on**: —
- **Last notified**: 2026-06-08T12:14:14Z

> ⚠️ **Path note (2026-06-05, permanent):** `src/app/` at repo root is the default Angular scaffold — ignore it. All App Design work uses `yarn-card-editor/src/app/`. Agents that check `src/app/` and report missing source are looking in the wrong place.

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
| 2026-06-04T18:15:00Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-04T18:15:00Z | Orchestrator | C: App Design | Maintenance run — variant sync verified (82 files), review gallery timestamp updated, editor build confirmed flat with correct base href |
| 2026-06-05T00:16:46Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-05T00:16:46Z | Orchestrator | C: App Design | Maintenance run — gallery timestamp updated; variant mirroring verified (82 files in sync); all queued tasks resolved; awaiting new design element acceptances |
| 2026-06-05T00:22:00Z | Orchestrator | Review: App Design | REJECT — (1) angular.json missing outputPath, build outputs to dist/ not docs/editor/; (2) src/app/ contains only default Angular scaffold (3 files), card editor source code (~38 TS files) is missing; (3) live view cannot be verified without source; (4) runtime hazards cannot be audited; (5) review gallery PASS. Tasks 9–12 added. |
| 2026-06-05T06:10:23Z | Orchestrator | B: Card Design | On hold — all design items (cooldown-trigger-marker-v02, die-symbols-v02, trigger-symbols-v04) awaiting user acceptance; Tasks 2–3 blocked on cooldown trigger marker acceptance |
| 2026-06-05T06:10:23Z | Orchestrator | C: App Design | Tasks 9–12 FALSE POSITIVE — agent claimed verification but reviewer confirmed src/app/ still has only 5 scaffold files, angular.json still missing outputPath; this is 3rd consecutive false positive |
| 2026-06-05T06:10:23Z | Orchestrator | Review: App Design | REJECT — (1) angular.json missing outputPath; (2) src/app/ is default scaffold (5 files), card editor source never committed; (3) docs/editor/ is orphaned compiled artifact with no reproducible build path. Tasks 13–15 added with stronger verification requirements. |
| 2026-06-05 (user) | Diagnosis | App Design path confusion | Root cause: agents were checking `src/app/` (repo root scaffold, 5 files) instead of `yarn-card-editor/src/app/` (full app). Source was always present. angular.json outputPath was always correct. Tasks 13–14 resolved. Task 15 (rebuild + verify) is next. |
| 2026-06-05T12:19:03Z | Orchestrator | B: Card Design | Task 2 FAILED — agent wrote to wrong filenames (`*-baseline.html` instead of actual baselines per card-index.md); no baselines modified; also created activation-track-basic-v02-a/b/c (partial Task 3 work) |
| 2026-06-05T12:19:03Z | Orchestrator | C: App Design | Tasks 15 + 23 complete — rebuild from real source verified; die symbol SVGs (die-symbols-v02-b) integrated into PreviewService (Constitution=Red, Zeal=Blue, Path=Green); review gallery regenerated (85 variants); app rebuilt with die symbols |
| 2026-06-05T18:10:50Z | Orchestrator | B: Card Design | Task 2 complete — all 11 baselines updated with subtitle-v01-a, flavour-text-v01-c, set-symbol-v01-a (effects-container-v04 already present); review cleanup: BASELINE.html boundary violation + min-height; Task 5 added |
| 2026-06-05T18:10:50Z | Orchestrator | C: App Design | Task 16 complete — SetSelectorComponent restyled with dark parchment background, amber accents, proper contrast; review gallery regenerated (88 variants mirrored); app rebuilt and redeployed |
| 2026-06-05T18:10:50Z | Orchestrator | Review: Card Design | REJECT → ACCEPT (one-shot retry): finding — CHANGES.md missing entries for baseline propagation; BASELINE.html modified outside domain; Task 5 added for remediation |
| 2026-06-05T18:10:50Z | Orchestrator | Review: App Design | ACCEPT — build zero errors; output flat at docs/editor/index.html; live view pipeline confirmed; no runtime hazards; gallery links correct; 88 variants mirrored |
| 2026-06-06T00:10:28Z | Orchestrator | B: Card Design | Task 5 complete — BASELINE.html reverted, min-height removed from 6 variant files; Task 3 complete — multiuse-v02-a/b/c + use-v02-a/b/c created (6 new files); all 4 activation track types done |
| 2026-06-06T00:10:28Z | Orchestrator | C: App Design | Task 17 complete — trigger limit bug fixed in 6 files (4 form components + CardService + PreviewService); form components now use triggers array directly; review gallery regenerated (90 variants); app rebuilt |
| 2026-06-06T12:13:19Z | Orchestrator | B: Card Design | trigger-symbols-v05-a/b/c all created (a: maximum reduction, b: moderate simplification, c: richer silhouettes; 5 triggers at 29px each); CHANGES.md not yet updated |
| 2026-06-06T12:13:19Z | Orchestrator | C: App Design | Task 18 Part A started — Container/Row/ContainerType/ContainerSymbol/ActivationSymbol/TriggerSymbol model types created in container.model.ts; exported from index.ts; review gallery regenerated (94 variants mirrored incl. trigger-symbols-v05-a); card models not yet refactored; PreviewService + Forms pending |
| 2026-06-07T00:23:26Z | Orchestrator | B: Card Design | Verified trigger-symbols-v05-a/b/c — all spec-compliant (5 triggers, 29px, viewBox 48x48, two-tone, max 2 shape elements); CHANGES.md entry confirmed present; awaiting user acceptance |
| 2026-06-07T00:23:26Z | Orchestrator | C: App Design | Task 18 Parts A+B complete — container-utils.ts created (triggerToRow, actionToRows, passiveToRow, cardToContainers); PreviewService refactored to Container/Row model (renderRow, getRowSymbolHtml, ACTIVATION_SYMBOL_MAP); review gallery fixed (trigger-symbols-v05 + multiuse-v02 all 3 options); app rebuilt; Part C (Forms) next |
| 2026-06-07T06:13:58Z | Orchestrator | B: Card Design | Blocked — trigger-symbols-v05-a/b/c awaiting user acceptance; all other tasks complete or on hold; effects-v04 blocked on trigger symbols acceptance |
| 2026-06-07T06:13:58Z | Orchestrator | C: App Design | Task 18 Part C complete — ActionsEditorComponent updated with cooldown slot sub-form (CooldownSlot interface, FlowMarker/CooldownTrigger toggle per slot, inline effect editor for triggers); use-track sub-form improved (marker count hint); all live-preview-wired; app rebuilt; Task 19 next |
| 2026-06-07T12:24:53Z | Orchestrator | B: Card Design | Blocked — trigger-symbols-v05-a/b/c awaiting user acceptance; all other tasks complete or on hold; effects-v04 blocked on trigger symbols acceptance |
| 2026-06-07T12:24:53Z | Orchestrator | C: App Design | Task 19 verified already implemented (type selection, read-only type, immediate save, autosave); Task 21 complete — card list grouped by type with TYPE_ORDER, TYPE_COLORS, collapsible groups, per-type colour coding; review gallery synced (97 variants); app rebuilt |
| 2026-06-07T18:11:39Z | Orchestrator | B: Card Design | Blocked — trigger-symbols-v05-a/b/c awaiting user acceptance; all other tasks complete or on hold; effects-v04 blocked on trigger symbols acceptance |
| 2026-06-07T18:11:39Z | Orchestrator | C: App Design | Task 22 verified already implemented; Task 20 complete — ImportExportService created (export/import/validate/download); Export+Import buttons in sidebar and set selector; CardSetExport format with forward-compatible validation; error banners; gallery synced (93 variants); app rebuilt |
| 2026-06-07T18:11:39Z | Orchestrator | Review: App Design | ACCEPT — build zero errors; output flat at docs/editor/index.html; live view pipeline confirmed (signal chain form→card→preview→iframe); no runtime hazards; gallery correct (97 variants, ../design/variants/ paths); .nojekyll present |
| 2026-06-08T00:15:00Z | Orchestrator | B: Card Design | Blocked — trigger-symbols-v05-a/b/c awaiting user acceptance; all other tasks complete or on hold; effects-v04 blocked on trigger symbols acceptance |
| 2026-06-08T00:15:00Z | Orchestrator | C: App Design | Task 22 (living task) re-verified — feature-undesigned treatment confirmed on Location connections and Persona Life Point Slots; no newly accepted features to enable; review gallery synced and timestamp updated; app rebuilt |
| 2026-06-08T06:24:19Z | Orchestrator | B: Card Design | Blocked — trigger-symbols-v05-a/b/c awaiting user acceptance; effects-v04 blocked on trigger symbols acceptance |
| 2026-06-08T06:24:19Z | Orchestrator | C: App Design | Maintenance pass — variant mirror verified (93 files in sync), review gallery current, .nojekyll present, asset templates current, build output current; Task 22 living task re-verified with no newly accepted features to enable |
| 2026-06-08T12:14:14Z | Orchestrator | B: Card Design | Blocked — trigger-symbols-v05-a/b/c awaiting user acceptance; effects-v04 on hold |
| 2026-06-08T12:14:14Z | Orchestrator | C: App Design | Task 22 (living task) re-verified — no newly accepted features to enable; review gallery synced (97 variants); build current |

---

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
