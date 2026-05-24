# Yarn — Orchestrator State

This file is read and written by scheduled agents. Do not edit manually during an active agent run.

## System Control

```
blocked_for_weekly_review: false
weekly_review_due: 2026-05-30T08:00:00Z
last_orchestrator_run: 2026-05-24T13:00:00Z
last_status_notification: 2026-05-24T13:00:00Z
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

---

### Game Design
- **Mode**: interactive (orchestrator surfaces topics; user drives sessions in Claude Code)
- **Source**: DESIGN.md open issues and unresolved questions
- **Status**: active — 5 discussion items tracked; no new items since last scan (< 48h, no re-notification)
- **Pending discussion items** *(top 5 by card-design impact)*:
  1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
  2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
  3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
  4. Action track visual design (§4.4) — 6 track types defined; activation-tracks-v01 reference created — **ready for user review**
  5. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
- **Last notified**: 2026-05-24T08:53:53Z
- **Blocked on**: —

---

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: active — effects-v03 accepted as direction (hold); trigger-symbols and activation-tracks need redesign; 2 tasks queued
- **Next task**: Two queued tasks (execute in order):
  1. **trigger-symbols-v02** — redesign all 6 trigger symbols per updated §7 trigger symbol style rules: dark body + lighter detail, 20×20, no per-trigger color variation, readable distinct shapes; show in use on a card (leading symbols in trigger rows inside the trigger sections of a real card mockup) — NOT as an isolated reference sheet
  2. **activation-tracks-v02** — redesign all 6 activation track types per updated §8 activation track visual style rules: vertical layout covering the action container, simple shapes only, dark body + lighter detail palette, AND/OR must show compound sub-tracks as separate vertical columns with a shared gate element; show in use on a card (leading markers in action rows of a real card mockup) — NOT as an isolated diagram sheet
  - **Hold:** effects-v04 (incorporate accepted trigger symbols + activation tracks into effects display) — create only after both v02 variants are accepted by user
- **Blocked on**: —
- **Last notified**: 2026-05-24T13:00:00Z

---

### App Design
- **Mode**: autonomous
- **Source**: APP.md
- **Status**: active — v1 reviewed; fixes and new sections required; see APP.md §v1 Build Known Issues
- **Next task**: Fix v1 editor based on first review. Full spec in APP.md. In priority order:
  1. **Wire all form fields** to live preview — every field except title was non-functional
  2. **Fix image upload** — local file picker → base64 data URI; remove URL input; drag-and-drop welcome
  3. **Fix live preview rendering** — card drawing is janky; clean up iframe injection or switch to direct DOM rendering
  4. **Add Triggers section** — per-card add/remove list; each entry: trigger type dropdown + effect editor; use `⏳ Design pending` placeholder for trigger leading symbol
  5. **Add Actions section** — per-card add/remove list; each entry: activation track type dropdown + effect editor; use existing placeholder visuals for track marker at leading position
  6. **Effect editor with inline parsing** — plain text input that parses `<iconname>[modifier]` syntax in real time and renders the correct SVG icon inline in the preview; see APP.md §Effect editor for full syntax table
- **Blocked on**: —
- **Last notified**: 2026-05-24T13:00:00Z

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

---

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
