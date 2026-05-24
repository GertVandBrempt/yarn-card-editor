# Yarn Card Editor — App Design

> Scope: editor only. Game-runtime concepts (turn order, play areas, life tracking, dice) belong in DESIGN.md, not here.

---

## Core Loop

1. User opens the editor and selects a **Card Set** (or creates a new one).
2. User browses, creates, and edits individual **Cards** within the set.
3. Each card has a **type** (Location, Character, Item, Event, Quest, Persona, Script) that determines its fields and visual template.
4. User tweaks card content; a live preview renders the card using the visual template.
5. User exports the set (JSON + rendered HTML/PDF) when ready for print or sharing.

---

## Card Data Model

Each card is a typed record. All types share a common base; type-specific fields extend it.

### Base fields (all types)
| Field | Type | Notes |
|---|---|---|
| id | string (UUID) | Stable identifier |
| type | enum | Location \| Character \| Item \| Event \| Quest \| Persona \| Script |
| name | string | Display name |
| flavourText | string? | Italic flavour/lore text |
| artUrl | string? | URL or data URI for card art |
| setId | string | Parent card set |
| createdAt | ISO timestamp | |
| updatedAt | ISO timestamp | |

### Type-specific fields (TBD — pending DESIGN.md)
Each card type will add fields once DESIGN.md documents their mechanics. Placeholder per type:

- **Location** — description, exits/connections (TBD)
- **Character** — traits, abilities (TBD)
- **Item** — effect, cost (TBD)
- **Event** — trigger, effect (TBD)
- **Quest** — objective, reward (TBD)
- **Persona** — special rules (TBD)
- **Script** — scripted narrative text (TBD)

---

## Card Set Management

- A **Card Set** is a named collection of cards (e.g., "Base Set", "Expansion 1").
- Sets are stored locally (browser localStorage or IndexedDB) and exportable as JSON.
- Multiple sets can coexist; user switches between them via a set selector.
- Cards belong to exactly one set; cross-set references are out of scope for v1.

---

## Import / Export

| Format | Direction | Notes |
|---|---|---|
| JSON | Export | Full card set with all fields |
| JSON | Import | Load a previously exported set |
| HTML (per card) | Export | Rendered card using visual template; for print/preview |
| PDF | Export | Future — not in v1 scope |

---

## Visual Editor

- Each card type has a **visual template** (defined in design/card-index.md once created).
- The editor shows a **live preview** of the card using the active template.
- Users edit card fields via a form panel; the preview updates in real time.
- Template selection per card type is fixed (one canonical template per type in v1); variant selection is an editorial/design-time concern, not a user-facing one.
- Art upload: user can upload an image; it is stored as a data URI in the card record.

---

## Open Questions

1. **Storage backend**: localStorage vs. IndexedDB vs. server-side? (v1 assumption: IndexedDB for larger sets)
2. **Type-specific fields**: blocked on DESIGN.md being written — what fields does each card type need?
3. **Card set sharing**: should sets be shareable via URL/link in v1, or export-only?
4. **Print layout**: how many cards per page? Fixed A4/Letter or configurable?
5. **Variant management**: how does the user pick which visual variant to apply to a type? (v1 assumption: auto, one per type)

---

## Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-24 | Scope = editor only, not game runner | Game runtime is a separate concern; keep editor focused |
| 2026-05-24 | Card types: Location, Character, Item, Event, Quest, Persona, Script | Per orchestrator domain rules |
| 2026-05-24 | v1 storage: IndexedDB (browser-local) | No server dependency; sets can be exported for portability |
| 2026-05-24 | v1 export: JSON + per-card HTML; PDF deferred | MVP scope; HTML covers print preview use case |
| 2026-05-24 | One canonical visual template per type in v1 | Simplifies editor UX; variant selection is design-time |
