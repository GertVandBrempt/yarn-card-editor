# Yarn Card Editor — App Design

> Scope: editor only. Game-runtime concepts (turn order, play areas, life tracking, dice resolution) belong in DESIGN.md, not here.
>
> Durable design decisions only. Mark superseded decisions rather than deleting them.

**Status: v1 deployed; architecture refactor required — see §Component Architecture**

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
| flowMarkers | FlowMarker[]? | Multi-turn tracks only — each may carry an OnFlowMarker effect |
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

## Visual Editor

- Each card type has a canonical visual template (defined in `design/card-index.md`; style rules in `design/VISUAL.md`).
- The editor shows a **live preview** rendered from the template + current field values.
- Users edit via a structured form panel; preview updates in real time.
- Art upload: local file picker only (no URLs in v1); image stored as base64 data URI in the card record; drag-and-drop welcome but file picker is minimum.
- **Template selection** is fixed per type in v1 — one canonical template per type.

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

Use `⏳ Design pending` placeholder for the trigger leading symbol in the preview until trigger-symbols-v02 is accepted.

### Actions section

Each card type that supports actions (Location, Character, Item, Persona) must have an **Actions** section in the form with an add/remove list. Each action entry:

1. **Activation track type dropdown** — values: Basic, Multi-turn, Multi-use, AND, OR, Use
2. **Effect editor** (see Effect Editor below)

Use existing placeholder visuals for activation track markers in the preview until activation-tracks-v02 is accepted. Show track placeholder at leading position of the action row.

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
| `EffectEditorComponent` | Single effect text input; parses `<icon>[modifier]` syntax; emits parsed + raw value |
| `ImageUploadComponent` | File picker → base64 data URI; drag-and-drop; preview thumbnail |

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

## Tech Stack — v1

| Concern | Decision |
|---|---|
| Framework | Angular — project root is `yarn-card-editor/` subfolder |
| Build | `ng build --base-href /yarn-card-editor/editor/` |
| Deployment | Build output to `docs/editor/`; committed to master; GitHub Pages serves `docs/` folder |
| Live URL | `https://gertvandtbrempt.github.io/yarn-card-editor/editor/` |
| Storage | IndexedDB (browser-local) |
| Live preview | Angular component loads accepted baseline HTML template per card type; reactive form binding updates preview in real time |
| Undesigned elements | Form fields built; preview shows `⏳ Design pending` placeholder |
| Script card preview | Unavailable until script baseline accepted into card-index.md |

**⚠ Repo prerequisite**: `yarn-card-editor/` was previously added to `.gitignore` to fix a submodule conflict. The inner `.git` directory in `yarn-card-editor/` must be deleted and the folder committed to the outer repo as a normal subdirectory before the app agent can build. If this is not done, the app agent will notify the user via PushNotification and wait.

---

## Deployment

- App lives in `editor/` at repo root
- GitHub Pages serves it automatically from master branch
- Orchestrator commits and pushes after every meaningful build increment
- After each deploy, a PushNotification is sent with the live URL

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
