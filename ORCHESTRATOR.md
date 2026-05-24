# Yarn — Orchestrator State

This file is read and written by scheduled agents. Do not edit manually during an active agent run.

## System Control

```
blocked_for_weekly_review: false
weekly_review_due: 2026-05-30T08:00:00Z
last_orchestrator_run: 2026-05-24T12:05:49Z
last_status_notification: 2026-05-24T08:53:53Z
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

### Game Design
- **Mode**: interactive (orchestrator surfaces topics; user drives sessions in Claude Code)
- **Source**: DESIGN.md open issues and unresolved questions
- **Status**: active — 5 discussion items tracked; no new items since last scan; no re-notification (< 48h)
- **Pending discussion items** *(top 5 by card-design impact)*:
  1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
  2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
  3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
  4. Action track visual design (§4.4) — 6 track types defined; no visual treatment yet
  5. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split
- **Last notified**: 2026-05-24T08:53:53Z
- **Blocked on**: —

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: active — Script colour confirmed (cream/off-white); effects display model defined; activation track spec added; 3 tasks queued
- **Next task**: Three queued tasks (execute in order):
  1. **effects-v03** — inline sym+modifier effect display: non-italic Crimson Text, no section labels, trigger-symbol→text and activation-marker→text row format; use effects-v02 as base but apply the §6.1 rules
  2. **trigger-symbols-v01** — SVG reference variant for all trigger symbols: On Reveal, On Enter, On Leave, Character Phase, On Complete, On Flow Marker; each as a distinct icon per §7 style rules
  3. **activation-tracks-v01** — SVG reference variant for all 6 activation track types (Basic, Multi-turn, Multi-use, AND, OR, Use); shapes/colors/lines only, no text; per §8 spec in VISUAL.md
- **Blocked on**: —
- **Last notified**: 2026-05-24T08:53:53Z

### App Design
- **Mode**: autonomous
- **Source**: APP.md
- **Status**: active — APP.md accepted; build v1 editor for today's review session; **HIGH PRIORITY this run**
- **Next task**: Build and deploy the v1 card editor. Full spec in APP.md. Execute before Card Design tasks this run.
  - **Tech stack**: Angular — project root is `yarn-card-editor/` subfolder; build with `ng build`; deploy built output to `docs/editor/` (GitHub Pages serves `docs/` folder on master); served at `https://gertvandtbrempt.github.io/yarn-card-editor/editor/`; remember to set `--base-href /yarn-card-editor/editor/` on build
  - **⚠ Pre-flight check**: `yarn-card-editor/` was previously added to `.gitignore` to resolve a submodule conflict. Before building, verify `yarn-card-editor/` exists in the cloned repo. If the directory is missing or empty, **stop and send a PushNotification** asking the user to commit the Angular source (`yarn-card-editor/` without its inner `.git` directory) to the repo before the app agent can proceed. Do not create a new Angular project from scratch.
  - **Live preview**: Angular component renders the accepted baseline HTML template per card type (loaded from `design/card-index.md` at runtime); form reactive binding updates the preview on every change
  - **Accepted baselines** (live preview ready): all types listed in card-index.md. Script card NOT yet in card-index.md — build the Script form but show a "Preview unavailable — baseline pending" placeholder in the preview pane
  - **Design gap protocol** — if the live preview requires a visual element not yet in VISUAL.md (trigger symbols, activation track visuals, inline sym+modifier rendering, etc.):
    1. Add a task entry to `VISUAL.md §9` describing what is needed and where it is used
    2. Add a row to APP.md §Known Design Gaps table
    3. Build the form field normally
    4. Show a styled `⏳ Design pending` placeholder in the live preview for that element
    5. Do NOT design the element — that is Card Design stream's responsibility
  - **App agents never do visual design work in any capacity**
  - After commit+push, send a PushNotification with the live editor URL and a one-line summary of what was built
- **Blocked on**: —
- **Last notified**: 2026-05-24T08:53:53Z

## Active Sub-Agents

_(none)_

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

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
