# Yarn — Session Resume Context

_Updated: 2026-06-05T12:19:03Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Active — Task 2 (baseline propagation) FAILED this run  
**Issue:** Agent wrote to wrong filenames (`*-baseline.html`) instead of actual baselines from card-index.md (e.g. `location-v01.html`, `char-main-v01.html`). No baselines were modified.  
**Partial work:** activation-track-basic-v02-a/b/c created (Task 3 work, incomplete — only basic track type done)  
**Next:** Task 2 — Baseline propagation (retry with correct filenames)  
**Independent track pending:** trigger-symbols-v05 (a/b/c) — needs creation; does not block Task 3

### App Design
**Status:** Active — Tasks 15 + 23 complete  
**Completed this run:** App rebuilt from real source; die symbol SVGs (die-symbols-v02-b) integrated into PreviewService with per-type color coding; review gallery regenerated (85 variants)  
**Next:** Task 16 — Fix set overview page readability (black on black)  
**Backlog:** Task 17 (trigger limit bug), Task 18 (Row/Container domain model), Task 19 (autosave), Task 21 (grouped card list), Task 22 (gray out undesigned fields), Task 20 (export/import JSON)

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

- **Review card variants:** visit https://gertvandbrempt.github.io/yarn-card-editor/review/ — trigger-symbols-v05 and cooldown-trigger-marker-v02 are under review
- **Accept variants:** say "accept trigger-symbols-v05-a" (or b/c) to advance trigger symbol design
- **Game design:** handled in interactive sessions only — no orchestrator stream
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/
Editor app: https://gertvandbrempt.github.io/yarn-card-editor/editor/
