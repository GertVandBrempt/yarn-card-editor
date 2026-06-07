# Yarn — Session Resume Context

_Updated: 2026-06-07T00:23:26Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Active — trigger-symbols-v05-a/b/c verified spec-compliant; CHANGES.md entry confirmed
**Completed this run:** Verified all 3 trigger-symbols-v05 variants (5 triggers, 29px, two-tone, max 2 shape elements per icon)
**Next:** Awaiting user acceptance of trigger-symbols-v05; once accepted, effects-v04 design track unblocks
**Awaiting acceptance:** activation-track-basic-v02, activation-track-multiturn-v03, activation-track-multiuse-v02, activation-track-use-v02, trigger-symbols-v05

### App Design
**Status:** Active — Task 18 Parts A+B complete, Part C pending
**Completed this run:** container-utils.ts created (triggerToRow, actionToRows, passiveToRow, cardToContainers); PreviewService refactored to Container/Row model; review gallery fixed (all v05 + multiuse-v02 options shown); app rebuilt
**Next:** Task 18 Part C — update ActionsEditorComponent + TriggersEditorComponent to edit Row[] within groupings; multi-turn/use-track sub-forms; wire to live preview
**Backlog:** Task 19 (autosave), Task 21 (grouped card list), Task 22 (gray out undesigned fields), Task 20 (export/import JSON)

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
