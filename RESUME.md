# Yarn — Session Resume Context

_Updated: 2026-05-31T06:14:44Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** On hold  
**Situation:** 4 design elements accepted (effects-container-v04, set-symbol-v01-a, flavour-text-v01-c, subtitle-v01-a). 4 marker shapes accepted. All 9 independent design tracks complete.  
**Awaiting acceptance:** cooldown-trigger-marker-v01 (a/b/c), die-symbols-v01 (a/b/c), trigger-symbols-v03 (a/b/c)  
**Blocked tasks:** Task 2 (baseline propagation) and Task 3 (activation track rework) both require cooldown-trigger-marker acceptance.  
**To unblock:** review and accept pending variants at the review gallery.

### App Design
**Status:** Active — 5 tasks queued  
**Situation:** Live preview only updates on title changes — all other fields are disconnected. Accepted design elements (subtitle-v01-a, flavour-text-v01-c, set-symbol-v01-a, effects-container-v04) not yet implemented in app templates. Containers are fixed-height and do not hide when empty.  
**Next:** Task 1 — hook up all form fields to live preview; Task 2 — dynamic container rendering.

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only |
| design/VISUAL.md | Locked visual decisions | User + orchestrator reads |
| design/card-index.md | Per-type card HTML baselines | User + orchestrator reads |
| design/variants/*.html | Card variant files | Orchestrator (autonomous) |
| APP.md | App design decisions | Orchestrator (with user feedback) |
| docs/review/index.html | Card review gallery | Orchestrator (regenerated) |
| docs/editor/ | Angular app build output | Orchestrator (rebuilt) |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## How to continue work

- **Review card variants:** visit https://gertvandbrempt.github.io/yarn-card-editor/review/ and accept or give feedback on pending designs
- **Interactive session:** open Claude Code, say what you want to work on
- **Accept variants:** say "accept cooldown-trigger-marker-v01-a" (or b/c) to unblock baseline propagation and track rework
- **Game design:** handled in interactive sessions only — no orchestrator stream
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/
Editor app: https://gertvandbrempt.github.io/yarn-card-editor/editor/
