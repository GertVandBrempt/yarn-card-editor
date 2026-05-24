# Yarn — Orchestrator State

This file is read and written by scheduled agents. Do not edit manually during an active agent run.

## System Control

```
blocked_for_weekly_review: false
weekly_review_due: 2026-05-30T08:00:00Z
last_orchestrator_run: —
last_status_notification: —
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

### Game Design
- **Mode**: interactive (orchestrator surfaces topics; user drives sessions in Claude Code)
- **Source**: DESIGN.md open issues and unresolved questions
- **Status**: active
- **Pending discussion items**: — (orchestrator scans DESIGN.md each run)
- **Last notified**: —
- **Blocked on**: —

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: pending
- **Next task**: Check for pending card variants or unaccepted designs
- **Blocked on**: —

### App Design
- **Mode**: autonomous
- **Source**: app.md (created by orchestrator on first App Design run)
- **Status**: pending — first run drafts app.md
- **Next task**: Draft initial app.md from DESIGN.md + CLAUDE.md context
- **Blocked on**: —

## Active Sub-Agents

_(orchestrator fills this in during a run)_

## Work Log

| Timestamp (UTC) | Agent | Action | Outcome |
|---|---|---|---|
| — | — | System initialized | — |

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
