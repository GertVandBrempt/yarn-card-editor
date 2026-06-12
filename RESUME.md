# Yarn — Session Resume Context

_Updated: 2026-06-12T06:10:06Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Blocked — (1) trigger-symbols-v06 not yet created; (2) all 4 activation track types need redesign (wrong symbols + wrong multi-use layout)
**Completed this run:** v05 superseded; v06 spec written; activation track issues identified (Task 6 queued); VISUAL.md §6.1/§6.2/§8 updated; rolled effects spec added (Track 7, independent — can start immediately)
**Next:** Orchestrator creates trigger-symbols-v06 + 4 activation track redesigns + rolled-effects-v01 in parallel
**Awaiting creation:** trigger-symbols-v06, activation-track-basic-v03/multiturn-v04/multiuse-v03/use-v03, rolled-effects-v01

### App Design
**Status:** Active — all queued tasks complete; Task 22 (living task) re-verified
**Completed this run:** Routine maintenance — Task 22 re-verified; variant files in sync (97); review gallery timestamp updated; app rebuilt
**Next:** Task 22 is a living task — revisited when Card Design accepts new visual features
**Backlog:** None — all queued tasks complete

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only (interactive sessions) |
| design/VISUAL.md | Locked visual decisions | User + orchestrator reads |
| design/card-index.md | Per-type card HTML baselines | User + orchestrator reads |
| design/variants/*.html | Card variant files | Orchestrator (autonomous) |
| APP.md | App design decisions | Orchestrator (with user feedback) |
| docs/review/index.html | Card review gallery | Orchestrator (regenerated) |
| docs/editor/ | Angular app build output | Orchestrator (rebuilt) |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator + user |
| .claude/agents/*.md | Sub-agent definitions | User (interactive sessions) |

---

## How to continue work

- **Review card variants:** visit https://gertvandbrempt.github.io/yarn-card-editor/review/ — trigger-symbols-v06 will appear once the orchestrator runs
- **Accept variants:** say "accept trigger-symbols-v06-a" (or b/c) to unblock effects-v04
- **Game design:** handled in interactive sessions only — no orchestrator stream
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/
Editor app: https://gertvandbrempt.github.io/yarn-card-editor/editor/
