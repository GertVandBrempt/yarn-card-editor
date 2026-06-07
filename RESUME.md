# Yarn — Session Resume Context

_Updated: 2026-06-07T18:11:39Z_

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
**Awaiting acceptance:** activation-track-basic-v02, activation-track-multiturn-v03, activation-track-multiuse-v02, activation-track-use-v02, trigger-symbols-v05

### App Design
**Status:** Active — Task 22 in progress
**Completed this run:** Task 22 partial — `.feature-undesigned` CSS class created; Location connections and Persona life point slots grayed out with "Not yet designed" badges
**Next:** Task 22 continued — apply undesigned treatment to remaining form types (Character health/life points); rebuild and redeploy
**Backlog:** Task 20 (export/import JSON)

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
