# Yarn — Session Resume Context

_Updated: 2026-06-08T00:15:00Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Blocked — trigger-symbols-v05-a/b/c verified spec-compliant; awaiting user acceptance
**Completed this run:** No work — blocked on user acceptance
**Next:** Awaiting user acceptance of trigger-symbols-v05; once accepted, effects-v04 design track unblocks
**Awaiting acceptance:** trigger-symbols-v05 (only remaining blocker before effects-v04)

### App Design
**Status:** Active — all queued tasks complete; Task 22 (living task) re-verified
**Completed this run:** Task 22 re-verified (feature-undesigned treatment on Location connections + Persona life points confirmed); review gallery synced; app rebuilt
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

- **Review card variants:** visit https://gertvandbrempt.github.io/yarn-card-editor/review/ — activation track v02/v03 variants and trigger-symbols-v05 are under review
- **Accept variants:** say "accept activation-track-basic-v02-a" (or b/c) to advance track design
- **Game design:** handled in interactive sessions only — no orchestrator stream
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/
Editor app: https://gertvandbrempt.github.io/yarn-card-editor/editor/
