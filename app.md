# Yarn Card Editor — App Design

> Scope: editor only. Game-runtime concepts (turn order, play areas, life tracking, dice resolution) belong in DESIGN.md, not here.

---

## Core Loop

1. User opens the editor and selects a **Card Set** (or creates a new one).
2. User selects a card type and creates a new **Card**.
3. Card fields are determined by its type; a live preview renders the card in real time.
4. User fills in fields (title, subtitle, art, effects, triggers, actions, type-specific fields).
5. User saves the card to the set.
6. When ready, user exports the set (JSON + per-card HTML) for print or sharing.

---

## Card Data Model

### Base fields (all types)

| Field | Type | Notes |
|---|---|---|
| id | string (UUID) | Stable identifier |
| type | enum | Location \| Character \| Item \| Event \| Quest \| Persona \| Script |
| tier | enum | Generic \| Named — determines set-aside vs. pooled placement at runtime |
| name | string | Display name |
| subtitle | string? | Secondary label (e.g. "Setpiece", "Key Item") |
| flavourText | string? | Italic lore text; no mechanical effect |
| artUrl | string? | Data URI or URL for card art |
| setId | string | Parent card set |
| createdAt | ISO timestamp | |
| updatedAt | ISO timestamp | |

### Location

| Field | Type | Notes |
|---|---|---|
| connections | Connection[] | Up to 4: `{ direction: N\|S\|E\|W, target: { type: 'abstract'\|'hard-coded', cardId?: string }, entryState: 'face-down'\|'face-up' }` |
| actions | Action[] | Available to players at this location |
| onReveal | Effect? | Fires when card flips face-up |
| onEnter | Effect? | Fires when a player moves onto this location |
| onLeave | Effect? | Fires when a player moves off this location |
| tier | Generic \| Setpiece | Setpiece = named, set-aside |

### Character

| Field | Type | Notes |
|---|---|---|
| alignment | enum | ally \| neutral \| enemy |
| initiative | number | Character Phase order |
| hasAllyMode | boolean | True if card has a separate Ally (Tableau) mode |
| charActions | Action[] | Actions available in Game Area mode |
| allyActions | Action[]? | Actions available in Ally/Tableau mode |
| allyPassives | PassiveEffect[]? | Always-on effects while in Tableau as an Ally |
| onReveal | Effect? | Fires when card is revealed |
| characterPhase | Effect? | Fires at start of Character Phase |
| tier | Generic \| Main | Main = named, set-aside |

### Item

| Field | Type | Notes |
|---|---|---|
| passiveEffects | PassiveEffect[] | Always-on while carried (in Tableau) |
| actions | Action[] | Available while carried |
| tier | Generic \| Key | Key Item = named, set-aside |

### Event

| Field | Type | Notes |
|---|---|---|
| onReveal | Effect | Required — the event's implicit effect on draw |
| tier | Generic \| Fated | Fated Event = named, set-aside |

### Main Quest

| Field | Type | Notes |
|---|---|---|
| act | number | Which act this governs |
| objectives | Objective[] | `{ title: string, description: string, onComplete?: Effect }` |

### Side Quest / Key Quest

| Field | Type | Notes |
|---|---|---|
| objectives | Objective[] | Same structure as Main Quest objectives |
| mandatory | boolean | If true: must complete before current act's Main Quest can finish |
| tier | SideQuest \| KeyQuest | KeyQuest = named, retrieved by ID |

### Persona (including Core Persona)

| Field | Type | Notes |
|---|---|---|
| role | enum | constitution \| zeal \| path |
| trait | string? | Secondary thematic tag (e.g. "Skill", "Instinct") |
| lifePointSlotCount | number | Visual only — slots rendered on card; tracking is runtime |
| passiveEffects | PassiveEffect[] | Always-on while in Tableau |
| actions | Action[] | Player-initiated effects |
| isCore | boolean | True for Core Persona Cards |
| slots | PersonaSlot[]? | Core only: `{ count: number, allowedRoles?: string[], allowedTraits?: string[] }` |

### Script

| Field | Type | Notes |
|---|---|---|
| mode | enum | timed \| infinite |
| turns | Turn[] | `{ eventCount: number, fatedEvent?: { type: 'hard-coded', cardId: string } \| { type: 'random' } }` |
| loopFromTurn | number? | Infinite mode: which 1-indexed turn the schedule loops from |

### Shared sub-types

**Effect** (used for triggers and On Complete):
```
{
  variant: 'fixed' | 'rolled' | 'complex'
  text: string                          // fixed or complex: full effect text
  tiers?: { successCount: number, requiredType?: string, text: string }[]  // rolled only
}
```

**PassiveEffect**:
```
{
  text: string    // always-on effect description
}
```

**Action** (extends Effect with a track):
```
{
  label: string
  variant: 'fixed' | 'rolled' | 'complex'
  text: string
  tiers?: ...
  track: {
    type: 'basic' | 'multi-turn' | 'multi-use' | 'and' | 'or' | 'use'
    flowMarkers?: Effect[]    // multi-turn: On Flow Marker effects
    useCharges?: number       // use track: initial charges
    slotCount?: number        // multi-use: number of independent slots
  }
}
```

---

## Card Set Management

- A **Card Set** is a named collection of cards (e.g. "Base Location Set", "Act I Quest Set").
- Sets have a type: Location Set | Quest Set | Side Quest Set | Persona Set | (untyped).
- Sets are stored locally (IndexedDB) and exportable as JSON.
- Multiple sets coexist; user switches via a set selector in the editor shell.
- Cards belong to exactly one set; cross-set references are out of scope for v1.
- v1 does not enforce which card types are valid in a given set type — freeform.

---

## Import / Export

| Format | Direction | Notes |
|---|---|---|
| JSON | Export | Full card set with all fields |
| JSON | Import | Load a previously exported set |
| HTML (per card) | Export | Rendered card using the type's visual template; for print/preview |
| PDF | Export | Deferred — not in v1 scope |

---

## Visual Editor

- Each card type has one **canonical visual template** in v1 (defined in design/card-index.md).
- The editor renders a **live preview** as the user edits card fields.
- Users edit via a typed form panel (fields determined by card type); preview updates in real time.
- Art upload: user selects an image file; stored as data URI in the card record.
- Template selection is type-determined in v1; no user-selectable variant (design-time concern only).
- Script cards use a distinct tabular layout (turn schedule) rather than the standard effect panel layout.

---

## Open Questions

1. **Effect editor UX**: Rolled effects require tier lists (success count → outcome text). How does the user build this? Rich form, or raw text?
2. **Script card UX**: How are turn rows added/removed in the editor? Is there a maximum turn count?
3. **Set type enforcement**: Should the editor warn if a card type doesn't belong in the selected set type (e.g. a Script card in a Location Set)?
4. **Print layout**: Cards per page, A4 vs. Letter, configurable margins? Or always single-card export?
5. **Persona slot editor**: How does the user define slot definitions on a Core Persona Card? (role/trait restrictions per slot)
6. **Action track builder**: AND/OR tracks link multiple actions — how is that linkage expressed in the editor UI?

---

## Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-24 | Scope = editor only, not game runner | Keep editor focused; game runtime is a separate concern |
| 2026-05-24 | Card types: Location, Character, Item, Event, Quest, Persona, Script | Per DESIGN.md and CLAUDE.md domain rules |
| 2026-05-24 | v1 storage: IndexedDB (browser-local) | No server dependency; JSON export provides portability |
| 2026-05-24 | v1 export: JSON + per-card HTML; PDF deferred | MVP scope; HTML covers print-preview use case |
| 2026-05-24 | One canonical visual template per type in v1 | Simplifies editor UX; variant selection is design-time only |
| 2026-05-24 | tier field on all cards: Generic vs. Named | Per DESIGN.md §1.3 — Named = set-aside; Generic = pooled |
| 2026-05-24 | lifePointSlotCount: count only, not tracked | Slots are rendered visually; actual damage tracking is game runtime |
| 2026-05-24 | v1 set type: freeform (no enforcement) | Avoids premature constraint; set type is informational only in v1 |
