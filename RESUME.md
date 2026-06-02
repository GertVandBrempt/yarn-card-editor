# Yarn — Session Resume Context

_Updated: 2026-06-02T00:18:32Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** On hold — awaiting user acceptance  
**Situation:** All current design items are complete and awaiting acceptance: cooldown-trigger-marker-v02 (a/b/c), die-symbols-v02 (a/b/c), trigger-symbols-v04 (a/b/c). Tasks 2 (baseline propagation) and 3 (activation track rework) are blocked until cooldown trigger marker is accepted.  
**Awaiting acceptance:** cooldown-trigger-marker-v02 (a/b/c), die-symbols-v02 (a/b/c), trigger-symbols-v04 (a/b/c)  
**To unblock:** accept one of the cooldown-trigger-marker-v02 options at the review gallery.

### App Design
**Status:** Active — all queued tasks verified complete  
**Situation:** Tasks 3 (subtitle), 4 (flavour text), 5 (set symbol) verified as already implemented in templates and PreviewService. Task 15 (form field wiring) complete — live preview pipeline fully wired end-to-end. App rebuilt and deployed.  
**Next:** New feature work or integration of design elements as they are accepted (die symbols, trigger symbols, cooldown trigger markers, activation tracks).

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
