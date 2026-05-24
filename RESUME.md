# Resume State

Updated: 2026-05-24T08:53:53Z (orchestrator — merged from two concurrent runs)

## Current task
Two orchestrator runs completed back-to-back. Both done; working state merged.

- Run 1 created: `script-v01.html` (Script card, purple placeholder), `app.md` (initial draft)
- Run 2 created: `effects-v02.html` (section labels + text labels + 2 action rows), updated `app.md` (detailed DESIGN.md cross-references)

## Next action
Two things need your attention:

1. **Script card colour** — `script-v01.html` uses purple as a placeholder. Open it in the gallery, then tell the orchestrator the right colour for Script cards. Once confirmed, VISUAL.md will be updated and script-v01 can be accepted as baseline.

2. **app.md review** — read `app.md` and reply "app looks good" or give feedback to unblock the App Design stream.

Also: review `effects-v02.html` — the new iteration adds section labels (PASSIVE / ON REVEAL / ACTION), text labels on rows, and two action rows. Say "accept effects-v02" or give feedback.

## Files touched (both orchestrator runs)
- `design/variants/script-v01.html` — Script card v1; turn schedule layout; purple placeholder colour
- `design/variants/effects-v02.html` — section labels + text labels + 2 action rows; mech-frame 200px; icon-heal added
- `design/variants/CHANGES.md` — both variant entries appended
- `review/index.html` — fully regenerated; 22 card variants indexed; Effects + Icons + Script filter chips
- `app.md` — drafted and refined from DESIGN.md; full typed data model per card type
- `ORCHESTRATOR.md` — merged stream status from both runs
- `RESUME.md` — this file

## Decisions made (orchestrators)
- effects-v02 direction: section labels inside each mech section + text labels on effect rows + 2 action rows
- app.md data model: full per-type fields derived from DESIGN.md §3; includes loopFromTurn for Script
- Life point slot layout = v2 concern; v1 tracks count + element references only

## Parked / not started
- Confirm Script card colour → accept script-v01
- Iterate on effects-v02 layout (accept this direction? → effects-v03)
- Shelved icons: move (boot), tuck-character, tuck-item, die-constitution, die-zeal, die-path
- Image layer integration into variants
- Angular card editor implementation (awaiting app.md user approval)
- Action token track visual design (flagged as game design discussion item)

## Pending game design discussion items
1. Trigger priority (§7 DESIGN.md) — explicitly TBD
2. Action track visual design (§4.4) — 6 types, no VISUAL.md treatment
3. Character dual-mode layout (§3.4) — Character/Ally on one card
4. Script Card design — script-v01 created but needs colour + VISUAL.md entry
5. Life point slots visual (§3.1) — slots overlapping damageable elements
6. Die levels (§5.2) — how many levels, what face distributions?

## Pending app design questions
1. Action track editor widget approach
2. Character dual-mode editing: tabs vs. split panel
3. Set-type enforcement in v1
4. Within-set card ID reference handling
5. Print layout: fixed or configurable

## Gallery
Card review gallery (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/review/
(22 variants indexed: 1 script, 7 effects, 4 character, 2 location, 2 event, 2 item, 3 quest, 2 icons)
