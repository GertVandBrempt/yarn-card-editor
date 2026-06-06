# Yarn — Session Resume Context

_Updated: 2026-06-06T00:10:28Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Active — Tasks 5 (cleanup) + 3 (activation track rework) complete
**Completed this run:** BASELINE.html reverted; min-height removed from 6 existing variants; multiuse-v02-a/b/c and use-v02-a/b/c created (6 new files); all 4 primitive activation track types now have updated variants with accepted markers at ~29px
**Next:** trigger-symbols-v05 (a/b/c) — needs creation; independent of activation tracks
**Awaiting acceptance:** activation-track-basic-v02, activation-track-multiturn-v03, activation-track-multiuse-v02, activation-track-use-v02, trigger-symbols-v05

### App Design
**Status:** Active — Task 17 complete
**Completed this run:** Trigger limit bug fixed — form components (Location/Character/Event/Quest), PreviewService, and CardService all updated to use `triggers: Trigger[]` array correctly; multiple triggers now work on all card types; review gallery regenerated (90 variants); app rebuilt
**Next:** Task 18 — Introduce Row/Container domain model and fix activation track rendering
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
