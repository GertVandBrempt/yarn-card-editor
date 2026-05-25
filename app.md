# Yarn Card Editor — App Design

> Scope: editor only. Game-runtime concepts (turn order, play areas, life tracking, dice resolution) belong in DESIGN.md, not here.
>
> Durable design decisions only. Mark superseded decisions rather than deleting them.

**Status: v1 deployed and live at https://gertvandbrempt.github.io/yarn-card-editor/editor/ — deployment fix applied 2026-05-25**

---

## Core Loop

1. User opens the editor and selects a **Card Set** (or creates a new one).
2. User browses, creates, and edits individual **Cards** within the set.
3. Each card has a **type** (Location, Character, Item, Event, Quest, Persona, Script) that determines its fields and visual template.
4. User fills in card content via a structured form panel; a live preview renders the card using the visual template.
5. User exports the set (JSON + rendered HTML/PDF) when ready for print or sharing.

---

## Card Data Model

Each card is a typed record. All types share a common base; type-specific fields extend it.

### Base (all types)
| Field | Type | Notes |
|---|---|---|
| id | string (UUID) | Stable identifier |
| type | CardType enum | See card types below |
| title | string | Card name (required per §2 DESIGN.md) |
| subtitle | string? | Secondary classification label |
| flavourText | string? | Italic lore text, no mechanical effect |
| imageUrl | string? | URL or data URI for card art |
| setId | string (UUID) | Parent card set |
| createdAt | ISO timestamp | |
| updatedAt | ISO timestamp | |

---

### Persona *(§3.1–3.2 DESIGN.md)*
| Field | Type | Notes |
|---|---|---|
| role | Constitution \| Zeal \| Path | Persona Card role |
| trait | string? | Secondary thematic tag (e.g. "Skill", "Instinct") — designer-defined |
| isCore | boolean | Core Persona Cards carry persona slots |
| passiveEffects | PassiveEffect[] | Always-on effects |
| actions | Action[] | Player-initiated triggers with action tracks |
| personaSlots | SlotDefinition[]? | Core Persona only — slot count + allowed role/trait combos |
| lifePointSlotCount | number | Number of life point slots on this card |
| lifePointSlotElements | SlotCoverage[] | Which damageable elements each slot covers (v1: by reference, not spatial layout) |

---

### Location *(§3.3 DESIGN.md)*
| Field | Type | Notes |
|---|---|---|
| tier | Generic \| Setpiece | Determines initial area placement |
| connections | Connection[] | Up to 4, one per cardinal direction |
| onReveal | Trigger? | |
| onEnter | Trigger? | |
| onLeave | Trigger? | |
| actions | Action[] | |

**Connection:**
| Field | Type | Notes |
|---|---|---|
| direction | N \| E \| S \| W | |
| target | "abstract" \| cardId | "abstract" = draw from deck; cardId = hard-coded within set |
| entryState | FaceDown \| FaceUp | Face-up immediately fires the placed location's On Reveal |

---

### Character *(§3.4 DESIGN.md)*
| Field | Type | Notes |
|---|---|---|
| tier | Generic \| Main | |
| alignment | Ally \| Neutral \| Enemy | |
| initiative | number | Order in Character Phase |
| onReveal | Trigger? | |
| characterPhase | Trigger? | |
| actions | Action[] | Available while in Game Area |
| allyMode | AllyModeFields? | Present only if this character can be recruited to Tableau |

**AllyModeFields** *(dual-mode — same card, separate mechanic set)*:
| Field | Type | Notes |
|---|---|---|
| passiveEffects | PassiveEffect[] | Always-on while in Tableau |
| actions | Action[] | Available while in Tableau |

---

### Item *(§3.5 DESIGN.md)*
| Field | Type | Notes |
|---|---|---|
| tier | Generic \| Key | |
| passiveEffects | PassiveEffect[] | Always-on while in Tableau |
| actions | Action[] | |

---

### Event *(§3.6 DESIGN.md)*
| Field | Type | Notes |
|---|---|---|
| tier | Generic \| Fated | |
| onReveal | Trigger | Required — fires immediately when drawn/placed. Events are always discarded after resolution. |

---

### Main Quest *(§3.7 DESIGN.md)*
| Field | Type | Notes |
|---|---|---|
| act | number | Which act this governs (ordered within the Quest Set) |
| objectives | Objective[] | Ordered list; all completed = act complete |

**Objective:**
| Field | Type | Notes |
|---|---|---|
| title | string | Short label (e.g. "Reach the Hermit's Tower") |
| description | string | Completion conditions |
| onComplete | Trigger? | Fires when this objective is met |

---

### Side Quest *(§3.8 DESIGN.md)*
| Field | Type | Notes |
|---|---|---|
| tier | Side \| Key | Side = pooled random; Key = retrieved by ID |
| objectives | Objective[] | Same structure as Main Quest |
| mandatory | boolean | If true, must complete before act's Main Quest can be completed |

---

### Script *(§3.9 DESIGN.md)*
| Field | Type | Notes |
|---|---|---|
| mode | Timed \| Infinite | Timed = finite sequence, losing at end; Infinite = finite + repeating tail |
| turns | TurnEntry[] | Ordered sequence of turns |
| loopFromTurn | number? | Infinite mode only: 1-indexed turn the repeating tail begins from |

**TurnEntry:**
| Field | Type | Notes |
|---|---|---|
| genericEventCount | number | Generic Event Cards drawn this turn |
| fatedEvent | "none" \| "random" \| cardId | How a Fated Event enters this turn (cardId = within-set hard-coded) |

---

### Shared Types

**Effect variants (§4.1 DESIGN.md):**
| Field | Type | Notes |
|---|---|---|
| variant | Passive \| Fixed \| Rolled \| Complex | |
| trigger | TriggerType? | Required for Fixed / Rolled / Complex |
| text | string | Effect description or tier list for Rolled |
| tiers | Tier[]? | Rolled effects only — maps success count → outcome |

**TriggerType:** Action \| OnReveal \| OnEnter \| OnLeave \| CharacterPhase \| OnComplete \| OnFlowMarker

**Action (§4.4 DESIGN.md):**
| Field | Type | Notes |
|---|---|---|
| label | string | Short name shown on card |
| trackType | Basic \| MultiTurn \| MultiUse \| AND \| OR \| Use | |
| effects | Effect[] | The triggered effects for this action |
| flowMarkers | FlowMarker[]? | Multi-turn tracks only — each entry is a cooldown slot; if `triggersEffect: true`, renders as a cooldown trigger marker (diamond with inner arrow) with its own effect row; passive slots render as hollow diamonds with no effect row |
| linkedActionIds | string[]? | AND/OR tracks only — IDs of co-linked actions on this card |
| chargeCount | number? | Use tracks only — initial charge count (printed slot count) |
| slotCount | number? | Multi-use tracks only — number of independent activation slots |

---

## Card Set Management

- A **Card Set** is a named collection of cards (e.g. "Base Set", "Expansion 1").
- Sets are stored locally in **IndexedDB** and exportable as JSON.
- Multiple sets can coexist; user switches via a set selector UI.
- Cards belong to exactly one set; cross-set card ID references are out of scope for v1.
- Set type (Quest Set, Location Set, Side Quest Set) is tracked as metadata but not enforced in v1.

---

## Import / Export

| Format | Direction | Notes |
|---|---|---|
| JSON | Export | Full card set with all typed fields |
| JSON | Import | Load a previously exported set |
| HTML (per card) | Export | Rendered card using visual template; for print / preview |
| PDF | Export | v2 — deferred |

---

## Responsive Layout (Mobile-Friendly)

The editor must be fully usable on a mobile phone (portrait, ~390px wide) through to a desktop (1440px+). There is no separate mobile app — the same Angular app adapts.

### Breakpoints

| Width | Layout |
|---|---|
| < 768px (mobile) | Single-column; form stacked above preview; preview collapsed by default with a toggle to expand |
| 768px – 1199px (tablet) | Two-column side-by-side; form ≈ 50%, preview ≈ 50% |
| ≥ 1200px (desktop) | Two-column side-by-side; form ≈ 40%, preview ≈ 60% |

### Mobile-specific rules

- **No horizontal overflow** — nothing bleeds outside the viewport; all fixed-width elements (card preview, tables) scale down or scroll within their container
- **Touch targets** — all interactive controls (buttons, dropdowns, list items, file picker) at minimum 44×44px touch area
- **Sidebar nav** — collapses to a hamburger/drawer on mobile; the `LayoutComponent` manages open/closed state
- **Card preview on mobile** — the live card preview renders at a scaled-down size to fit the viewport; aspect ratio is preserved; no content is clipped
- **Form fields** — full-width inputs on mobile; no side-by-side field pairs below 768px
- **Modals** (e.g. symbol reference popup) — full-screen on mobile, centred overlay on tablet/desktop

### Implementation

- Use CSS custom properties + `@media` queries (no external responsive grid library required)
- `LayoutComponent` owns the sidebar-collapse state and exposes a `isMobile` signal/observable other components can use
- `CardPreviewComponent` scales the preview card using a CSS `transform: scale()` approach so the card HTML template itself does not need mobile-specific overrides

---

## Visual Editor

- Each card type has a canonical visual template (defined in `design/card-index.md`; style rules in `design/VISUAL.md`).
- The editor shows a **live preview** rendered from the template + current field values.
- Users edit via a structured form panel; preview updates in real time.
- Art upload: local file picker only (no URLs in v1); image stored as base64 data URI in the card record; drag-and-drop welcome but file picker is minimum.
- **Template selection** is fixed per type in v1 — one canonical template per type.

### Dynamic containers — live preview rule

The mechanics frame in the live preview must reflect the actual card content at all times:

- **Only render a section container (Passive, Trigger — entry, Actions, Trigger — exit) if it contains at least one row**
- **Container height auto-adjusts** to its content — no fixed heights, no empty sections taking up space
- As the user adds or removes effects/triggers/actions in the form, the preview updates immediately — containers appear and disappear accordingly
- This applies to **all containers across the whole card** — not just the mechanics frame. Any header field, subtitle, flavour text, image area, or type-specific section that has no content must be hidden entirely (CSS `display:none` or `*ngIf`), not left as an empty box.
- This gives the designer an accurate feel of the real card layout at all times

This must be implemented in `CardPreviewComponent` and `PreviewService`. It is not optional — an empty container should never be visible in the preview.

**Implementation note for the build agent:** This rule must be verified during the build step. After scaffold compilation, spot-check each card type with an empty form — zero containers should be visible other than the card frame itself.

### v1 Build — Known Issues (from first review)

| Issue | Fix required |
|---|---|
| All fields except title non-functional | Wire all form fields to live preview |
| Image upload broken | Local file → base64 data URI; no URL input |
| Triggers section missing | Add Triggers section (see below) |
| Actions section missing | Add Actions section (see below) |
| Live preview rendering janky | Fix card rendering — clean iframe injection or direct DOM approach |

### Triggers section

Each card type that supports triggers (Location, Character, Event, Item, Quest) must have a **Triggers** section in the form with an add/remove list. Each trigger entry:

1. **Trigger type dropdown** — values: On Reveal, On Enter, On Leave, Character Phase, On Complete, On Flow Marker
2. **Effect editor** (see Effect Editor below)

**Live preview trigger symbols:** use the SVG `<symbol>` definitions from the **latest trigger symbol variant** in `design/variants/` (currently `trigger-symbols-v02.html`). Do not wait for formal acceptance — always reflect the current design direction. The orchestrator updates the app's embedded SVG definitions whenever a new trigger symbol variant is created. If no variant exists at all, fall back to a `?` text placeholder.

### Actions section

Each card type that supports actions (Location, Character, Item, Persona) must have an **Actions** section in the form with an add/remove list. Each action entry:

1. **Activation track type dropdown** — values: Basic, Multi-turn, Multi-use, AND, OR, Use
2. **Track-specific sub-fields** — shown immediately below the type dropdown; fields change when the type changes (see table below)
3. **Effect editor** (see Effect Editor below)

#### Track-specific sub-fields

When the user selects a track type, the following additional fields must appear beneath the dropdown. Fields not listed for a type must not be rendered (no empty rows).

| Track type | Additional fields |
|---|---|
| Basic | *(none)* |
| Multi-turn | **Turn count** — `number`, label "Cooldown (turns)", minimum 1; how many turns the token spends in the cooldown slot before returning to the activation marker |
| Multi-use | **Slot count** — `number`, label "Activation slots", minimum 2; how many independent activation markers exist on this track |
| Use | **Charge count** — `number`, label "Charges", minimum 1; how many one-time uses are printed on the card (each charge is consumed permanently) |
| AND | **Sub-tracks** — add/remove list of sub-tracks; each sub-track has its own type dropdown (primitives only: Basic / Multi-turn / Multi-use / Use) and its own track-specific sub-fields as above |
| OR | Same as AND — each sub-track is independently configured |

All track parameter values (turn count, slot count, charge count, sub-track configuration) must be reflected in the live preview immediately when changed:
- **Multi-turn**: preview shows the correct number of cooldown slots in the track diagram
- **Multi-use**: preview shows the correct number of activation markers
- **Use**: preview shows the correct number of charge slots (e.g. printed pips or slots)
- **AND/OR**: preview shows each sub-track's markers and gate element

These values map to the `Action` data model fields: `flowMarkers` (multi-turn), `slotCount` (multi-use), `chargeCount` (use), `linkedActionIds` / sub-track configuration (AND/OR).

**Live preview activation markers:** use the SVG marker shapes from the **latest activation track variant** for each track type in `design/variants/` (e.g. `activation-track-basic-v01-a.html` once created). Do not wait for formal acceptance — always reflect the current design direction. The orchestrator updates the app's embedded SVG definitions whenever a new activation track variant is created. If no variant exists for a given track type, render a filled circle at the leading position of the action row.

### Effect editor

The effect editor is a rich text input that parses inline syntax and renders icons in real time in the preview.

**Inline syntax:**

| Syntax | Renders as |
|---|---|
| `<damage>` | damage icon (`icon-damage`) |
| `<shield>` | shield icon (`icon-shield`) |
| `<heal>` | heal icon (`icon-heal`) |
| `<scout>` | scout icon (`icon-scout`) |
| `<gain-action>` | gain-action icon (`icon-gain-action`) |
| `<reveal-character>` | reveal-character icon |
| `<reveal-item>` | reveal-item icon |
| `[N]` after an icon | modifier — rendered as number badge inline with preceding icon |
| `[label]` after an icon | modifier — rendered as text label inline with preceding icon |

Example: `Deal <damage>[2] to each enemy` renders as: "Deal **⬡2** to each enemy" (with the damage icon + 2 badge inline).

The editor stores the raw syntax string; the preview renders the parsed version. Both the form input and the live preview update in real time.

#### Symbol reference popup

Every `EffectEditorComponent` instance must include a **symbol reference button** (e.g. `?` or `⌖`) adjacent to the text input. Clicking it opens a modal panel listing every available inline symbol with:

- The exact syntax string to type (e.g. `<damage>`)
- A short description (e.g. "Deal damage to a target")
- A rendered preview of the icon itself

The popup is read-only (reference only — it does not insert text). It must be keyboard-accessible (close on Escape). One shared `SymbolReferenceModalComponent` used across all `EffectEditorComponent` instances.

The canonical symbol list for the modal is defined in `EffectEditorComponent` (or a shared constant) and must match the inline syntax table above. When new symbols are added to the syntax table, the modal list must be updated in the same change.

### Known editor complexity points

| Challenge | v1 Plan |
|---|---|
| Action track types (6 types, §4.4) | Type-specific sub-form per track type; user selects track type first, then sees relevant fields |
| Character dual-mode (§3.4) | Tabbed form: Character Mode tab + Ally Mode tab on same editor panel |
| Script Card turn sequences (§3.9) | Reorderable list editor for TurnEntry rows |
| Life point slots (§3.1) | v1: slot count + element reference list; no spatial drag-and-drop layout (v2) |
| Location connections (§3.3) | Compass-rose direction picker; each direction toggles a Connection sub-form |
| Quest objectives (§3.7–3.8) | Reorderable list editor for Objective rows |

---

## Open Questions

1. **Action track visual editor**: dedicated widget per track type, or a shared flexible track builder?
2. **Character dual-mode editing**: tabbed panel (Character / Ally) or side-by-side split panel?
3. **Set-type enforcement**: should the editor restrict which card types can appear in a Quest Set vs. Location Set? Or free collections in v1?
4. **Within-set card ID references** (hard-coded connections, fated events, narrative clusters): how does the editor surface and validate these in v1?
5. **Print layout**: fixed A4/Letter at fixed card density, or configurable?

---

## Component Architecture

The v1 monolithic `app.ts` must be replaced with a proper Angular component structure. All logic must be split into focused, reusable components.

### Component tree

```
AppComponent                        — root; routing only
└── LayoutComponent                 — shell: sidebar nav + main content area
    ├── CardListComponent           — browse all cards in the active set
    │   └── CardFilterComponent     — filter chips (by type) + search input
    └── CardEditorComponent         — split view: form + preview
        ├── CardFormComponent       — delegates to type-specific sub-form
        │   ├── LocationFormComponent
        │   ├── CharacterFormComponent
        │   ├── ItemFormComponent
        │   ├── EventFormComponent
        │   ├── QuestFormComponent  — shared for Main + Side Quest
        │   ├── PersonaFormComponent
        │   └── ScriptFormComponent
        └── CardPreviewComponent    — live card preview; re-renders on form changes
```

### Shared form sub-components (used by multiple type forms)

| Component | Purpose |
|---|---|
| `TriggersEditorComponent` | Add/remove trigger list; trigger type dropdown + EffectEditorComponent per entry |
| `ActionsEditorComponent` | Add/remove action list; activation track type dropdown + EffectEditorComponent per entry |
| `EffectEditorComponent` | Single effect text input; parses `<icon>[modifier]` syntax; emits parsed + raw value; includes symbol reference button |
| `ImageUploadComponent` | File picker → base64 data URI; drag-and-drop; preview thumbnail |
| `SymbolReferenceModalComponent` | Read-only modal listing all inline symbol syntax + descriptions + rendered icons; shared singleton opened by EffectEditorComponent |

### Per-type trigger and action availability

Each type-specific form must only expose the triggers and actions that are valid for that type:

| Card Type | Triggers available | Actions |
|---|---|---|
| Location | On Reveal, On Enter, On Leave | ✅ |
| Character (game area) | On Reveal, Character Phase | ✅ |
| Character (ally mode tab) | — | ✅ (separate Actions list) |
| Item | — | ✅ |
| Event | On Reveal (required, not removable) | ❌ |
| Main Quest | On Complete (per objective) | ❌ |
| Side Quest | On Complete (per objective) | ❌ |
| Persona | — | ✅ |
| Script | — | ❌ (turn schedule only) |

### Services

| Service | Responsibility |
|---|---|
| `CardSetService` | Active set CRUD; IndexedDB persistence |
| `CardService` | Card CRUD within a set; typed card factory |
| `PreviewService` | Loads baseline HTML template per card type; injects field values; returns rendered HTML string |

### Routing

```
/                     → redirect to /sets
/sets                 → set selector (create / open)
/sets/:setId          → CardListComponent
/sets/:setId/cards/new?type=X  → CardEditorComponent (new card)
/sets/:setId/cards/:cardId     → CardEditorComponent (edit card)
```

---

## Auto Visual Sync — Baseline Change Detection

When a card baseline changes in `design/card-index.md` (i.e. a variant is accepted), the Angular app's preview templates must be updated and the app redeployed **automatically without user input**.

### How it works

1. The orchestrator's App Design stream runs after every Card Design stream action that modifies `card-index.md`.
2. It reads `card-index.md`, extracts the current baseline HTML path for each card type, and copies those files into `yarn-card-editor/src/assets/templates/` (one file per type, e.g. `location-baseline.html`).
3. `PreviewService` loads templates from `assets/templates/` — it does not hard-code HTML inline.
4. The orchestrator then triggers a full rebuild + deploy (same steps as the regular build task).
5. No user input is required at any point. The orchestrator self-triggers this flow.

### Rules

- The `assets/templates/` directory is **generated, not hand-edited**. The source of truth is always `card-index.md`.
- If a card type has no accepted baseline yet, `PreviewService` falls back to showing the `⏳ Design pending` placeholder for that type.
- The orchestrator logs each auto-sync in ORCHESTRATOR.md work log with the card type(s) updated and the new baseline file(s) used.

---

## Tech Stack — v1

| Concern | Decision |
|---|---|
| Framework | Angular — project root is `yarn-card-editor/` subfolder |
| Build | `ng build --base-href /yarn-card-editor/editor/ --output-path ../docs/editor` (with `angular.json` `outputPath.browser: ""` to flatten output) |
| Deployment | Build output to `docs/editor/` (flat, no `browser/` subdir); committed to master; GitHub Pages serves `docs/` folder from master branch; also auto-deployed via `.github/workflows/deploy.yml` on push |
| Live URL | `https://gertvandbrempt.github.io/yarn-card-editor/editor/` |
| Storage | IndexedDB (browser-local) |
| Live preview | `PreviewService` loads baseline HTML from `assets/templates/<type>-baseline.html`; reactive form binding injects field values; updates in real time |
| Undesigned elements | Form fields built; preview shows `⏳ Design pending` placeholder |
| Script card preview | Unavailable until script baseline accepted into card-index.md |
| Template source | `yarn-card-editor/src/assets/templates/` — auto-synced from `card-index.md` by orchestrator on every baseline change |

**⚠ Repo prerequisite**: `yarn-card-editor/` was previously added to `.gitignore` to fix a submodule conflict. The inner `.git` directory in `yarn-card-editor/` must be deleted and the folder committed to the outer repo as a normal subdirectory before the app agent can build. If this is not done, the app agent will notify the user via PushNotification and wait.

---

## Deployment

### Known issue — Angular 17+ `browser/` subdirectory

Angular 17+ places build output in a `browser/` subdirectory inside `--output-path`. This means a build to `../docs/editor` actually produces `docs/editor/browser/index.html`, not `docs/editor/index.html`. GitHub Pages cannot serve the app from the `/editor/` endpoint when files live one level deeper.

**Fix (must be applied once by the orchestrator):**

1. In `yarn-card-editor/angular.json`, replace the `outputPath` string with an object that sets `browser` to `""` (empty), so Angular writes browser files directly into the base output directory:
   ```json
   "outputPath": {
     "base": "../docs/editor",
     "browser": ""
   }
   ```
2. Move any files already built under `docs/editor/browser/` up to `docs/editor/` and delete the now-empty `browser/` folder.
3. Rebuild and redeploy so the corrected structure is committed.

After this fix the build command remains `ng build --base-href /yarn-card-editor/editor/ --output-path ../docs/editor` and all output lands directly at `docs/editor/index.html` etc.

### GitHub Actions — continuous deployment

A workflow at `.github/workflows/deploy.yml` auto-builds the app on every push to master. This runs in addition to (and as a safety net for) orchestrator-triggered builds.

```yaml
name: Deploy editor to GitHub Pages

on:
  push:
    branches: [master]
    paths:
      - 'yarn-card-editor/**'
      - 'design/card-index.md'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: yarn-card-editor/package-lock.json
      - name: Install
        run: cd yarn-card-editor && npm install
      - name: Build
        run: cd yarn-card-editor && npx ng build --base-href /yarn-card-editor/editor/ --output-path ../docs/editor
      - name: Commit build output
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add docs/editor
          git diff --cached --quiet || git commit -m "Deploy: update editor build [skip ci]"
          git push
```

`[skip ci]` prevents the commit from re-triggering the workflow. The `paths` filter means the workflow only fires when app source or card baselines change, not on every commit.

### Deployment summary

| Step | Who | What |
|---|---|---|
| Push app source changes | Developer / orchestrator | Triggers GitHub Actions workflow |
| GitHub Actions runs | CI | `npm install` → `ng build` → commit `docs/editor/` → push |
| GitHub Pages serves | GitHub | Reads `docs/` folder on master; app live at `/yarn-card-editor/editor/` |
| Orchestrator manual deploy | Orchestrator | Same `ng build` + commit + push — used when card baselines change or manual trigger |

- GitHub Pages must be configured to serve from the **`docs/` folder on the `master` branch** (Settings → Pages → Source).
- After each orchestrator-triggered deploy, a PushNotification is sent with the live URL.
- **Auto-deploy on baseline change**: orchestrator runs the build+deploy pipeline automatically whenever a card baseline is updated in `card-index.md` (see Auto Visual Sync above).

---

## Design Gap Protocol

When the live preview requires a visual element that is not yet designed:

1. App agent adds a task to `design/VISUAL.md §9` (App-Agent Design Task Queue)
2. App agent adds a row to the Known Design Gaps table below
3. Form field for that element is built and functional
4. Live preview shows a styled `⏳ Design pending` placeholder for that element
5. App agent does NOT design the element — Card Design stream picks it up from VISUAL.md §9

App agents never do visual design work in any capacity.

---

## Known Design Gaps

Elements needed by the live preview that are not yet designed. Card Design stream resolves these via VISUAL.md §9.

| Element | Used in preview for | VISUAL.md §9 task added | Resolved |
|---|---|---|---|
| Trigger symbols (On Reveal, On Enter, etc.) | Effect rows with trigger leading symbol | ✓ 2026-05-24 | — |
| Activation track visuals | Action rows in effects panel | ✓ 2026-05-24 | — |
| Inline sym+modifier rendering | Effect text with icon+number groups | ✓ 2026-05-24 | — |
| Script card baseline | Script card live preview | n/a — queued in Card Design stream | — |
| Character dual-mode layout | Character card Ally Mode preview | ✓ 2026-05-24 | — |

---

## Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-24 | Scope = editor only, not game runner | Game runtime is a separate concern; keep editor focused |
| 2026-05-24 | Card types: Location, Character, Item, Event, Quest (Main + Side), Persona, Script | Per DESIGN.md §3 |
| 2026-05-24 | v1 storage: IndexedDB (browser-local) | No server dependency; sets are exportable for portability |
| 2026-05-24 | v1 export: JSON + per-card HTML; PDF deferred to v2 | MVP scope; HTML covers print preview use case |
| 2026-05-24 | One canonical visual template per type in v1 | Simplifies editor UX; variant selection is design-time |
| 2026-05-24 | Life point slot layout = v2 concern; v1 tracks count + element references | Full spatial overlap layout is complex; v1 captures the data, v2 adds the visual editor |
| 2026-05-24 | Set type tracked as metadata but not enforced in v1 | Avoids premature rigidity; user may want to experiment with mixed sets |
| 2026-05-24 | Image upload: local file → base64 data URI only; no URL input in v1 | Simpler, no external dependency, works offline |
| 2026-05-24 | Effect editor: inline `<iconname>[modifier]` syntax parsed in real time | Keeps effect text human-readable while rendering rich icons in preview |
| 2026-05-24 | Triggers and Actions as separate add/remove sections per card | Matches DESIGN.md structure; clear separation of trigger-driven vs player-initiated effects |
| 2026-05-25 | Full component architecture refactor required — monolithic app.ts rejected | Code quality; per-type trigger/action availability cannot be maintained in a single file |
| 2026-05-25 | Per-type trigger availability enforced in each type-specific form component | Prevents invalid data; each type's form only exposes the triggers valid for that type |
| 2026-05-24 | v1 editor built and deployed to `editor/` at repo root | Angular 21 zoneless app; all 8 card types with base fields + type-specific fields; live preview via iframe srcdoc; localStorage persistence; JSON import/export |
| 2026-05-25 | Editor must be mobile-friendly; responsive at 3 breakpoints (<768 / 768–1199 / ≥1200px) | Usable on phone in the field without a separate mobile build |
| 2026-05-25 | Symbol reference popup added to EffectEditorComponent | Reduces friction entering icon syntax; inline reference without leaving the editor |
| 2026-05-25 | Empty containers hidden everywhere on the card, not just mechanics frame | Consistent with "no empty space" design principle across all card sections |
| 2026-05-25 | Baseline templates auto-synced to `assets/templates/` on every card-index.md change; auto-rebuild+deploy | Visual changes flow into the app automatically; no manual trigger needed |
| 2026-05-25 | Build command: `ng build --base-href /yarn-card-editor/editor/ --output-path ../docs/editor` | Correct base-href for GitHub Pages /editor route; output goes directly into docs/editor |
| 2026-05-25 | Track-specific sub-fields per activation track type (turn count, slot count, charges, sub-tracks for AND/OR) | Data model already supported these; form must expose them; values must flow to live preview |
| 2026-05-25 | Live preview uses latest design variant for trigger symbols and activation markers — no wait for acceptance | Designer needs real visual feedback during design iteration, not a placeholder |
| 2026-05-25 | `angular.json` `outputPath.browser` set to `""` to flatten Angular 17+ build output | Angular 17+ defaults to a `browser/` subdirectory which broke GitHub Pages serving from `/editor/` |
| 2026-05-25 | GitHub Actions workflow added at `.github/workflows/deploy.yml` for continuous deployment | Auto-builds on push to master when app source or card baselines change; `[skip ci]` prevents loop |
