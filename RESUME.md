# Yarn — Session Resume Context

_Updated: 2026-06-05T06:10:23Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Active — two items accepted (2026-06-05)  
**Accepted this session:** `cooldown-trigger-marker-v02-b` (hollow diamond, medium amber inset diamond in right-vertex cutout), `die-symbols-v02-b` (heavy-weight 5-point star, thicker color border accent)  
**Unblocked:** Task 2 (baseline propagation) and Task 3 (activation track rework) are now unblocked  
**Still awaiting acceptance:** trigger-symbols-v04 (a/b/c) — independent, does not block Tasks 2 or 3

### App Design
**Status:** Unblocked (2026-06-05, user-confirmed)  
**Situation:** Previous BLOCKED status was a false diagnosis. Full Angular source exists at `yarn-card-editor/src/app/` (components, services, models, forms — everything). `yarn-card-editor/angular.json` outputPath is correct. Agents were incorrectly inspecting `src/app/` at the repo root, which is only the default scaffold (5 files). Tasks 13 and 14 resolved.  
**Next:** Task 15 — rebuild from real source: `cd yarn-card-editor && npm install && npx ng build --base-href /yarn-card-editor/editor/`; verify `docs/editor/index.html` is the card editor, not scaffold.

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

- **Review card variants:** visit https://gertvandbrempt.github.io/yarn-card-editor/review/ and accept or give feedback on pending designs
- **Accept variants:** say "accept cooldown-trigger-marker-v02-a" (or b/c) to unblock baseline propagation and track rework
- **Game design:** handled in interactive sessions only — no orchestrator stream
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/
Editor app: https://gertvandbrempt.github.io/yarn-card-editor/editor/
