# Resume State

Updated: 2026-05-24T08:46:29Z (orchestrator run)

## Current task
Orchestrator completed first full run. Three streams processed.

## Stream A — Game Design
**Status:** 4 discussion items surfaced from DESIGN.md; user notified.

Discussion items pending:
1. **Trigger priority (§7)**: Exact resolution rules TBD. The visual layout (top-to-bottom order on card) is the stated priority mechanism, but specific collision rules haven't been specified.
2. **Script Card visual**: Script card has no colour or layout spec in VISUAL.md. script-v01 was created with a purple placeholder — colour decision needed.
3. **Die levels (§5.2)**: The design says dice come in levels (higher = more successes), but levels aren't defined. How many? What face distributions?
4. **Persona slot rendering (§3.2)**: Core Persona Cards have slot definitions — but no visual treatment is defined for how count + allowed role/trait combos appear on the card.

To start a game design session: say "game design".

## Stream B — Card Design
**Status:** Blocked — script-v01 created; awaiting colour confirmation.

**Done this run:**
- Created `design/variants/script-v01.html` — Script card type, first variant.
  - Unique turn-schedule table layout (no art layer, no standard mech sections).
  - Purple colour palette (placeholder — not yet in VISUAL.md).
  - 7 turn rows (44px), header, loop indicator. Mode badge: ∞ Infinite.
- Logged diff in `design/variants/CHANGES.md`.
- Regenerated `review/index.html` — now lists 21 card variants.

**Blocked on:** Script card colour not confirmed. Purple used as placeholder. Before VISUAL.md can be updated, the user must either confirm purple or provide an alternative.

**To unblock:** reply with "keep purple" or suggest a colour. Once confirmed, VISUAL.md §4 and card-index.md can be updated.

## Stream C — App Design
**Status:** Blocked — initial app.md drafted; awaiting user review.

**Done this run:**
- Created `app.md` — full app design document.
  - Core loop, card data model for all 7 types, card set management, import/export, visual editor spec, open questions, decision log.
  - Data model matches DESIGN.md closely: tier field (Generic/Named), typed sub-models per card type, action track types, effect variants.

**Blocked on:** Awaiting user review of app.md. Open questions include: effect editor UX, Script card row editing, set type enforcement, print layout, Persona slot editor, action track builder UI.

**To unblock:** say "app looks good" or give feedback.

## Key files
| File | Purpose |
|---|---|
| DESIGN.md | Game design doc (user-maintained) |
| design/VISUAL.md | Visual design decisions (locked) |
| design/card-index.md | Per-type HTML baselines |
| design/variants/script-v01.html | Script card v1 (purple placeholder — awaiting confirmation) |
| design/variants/CHANGES.md | Variant diff log |
| app.md | App design decisions (orchestrator-maintained) |
| review/index.html | Card review gallery (21 variants) |
| ORCHESTRATOR.md | System state |

## Gallery
https://gertvandtbrempt.github.io/yarn-card-editor/review/ — 21 variants

## Parked / not started
- Image layer integration into card variants (still parked)
- Angular card editor implementation (still parked)
- Effects-v01 layout iteration (label text, multi-effect rows)
- Shelved icons: move (boot), tuck-character, tuck-item, die-constitution, die-zeal, die-path
