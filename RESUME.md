# Yarn — Session Resume Context

_Updated: 2026-05-31T18:16:02Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Active — die-symbols-v02-a/b/c created this run; cooldown-trigger-marker-v02 awaiting acceptance  
**Situation:** Die-symbols-v02 created (3 options: compact/heavy/precise star variants with per-type color coding). Cooldown-trigger-marker-v02 still awaiting acceptance. Trigger-symbols-v04 is next (requires iconography research). Tasks 2 and 3 (baseline propagation, activation track rework) still blocked on cooldown trigger marker acceptance.  
**Awaiting acceptance:** cooldown-trigger-marker-v02 (a/b/c), die-symbols-v02 (a/b/c), trigger-symbols-v04 (pending)  
**To unblock:** accept one of the cooldown-trigger-marker-v02 options at the review gallery.

### App Design
**Status:** Active — Task 1 in progress  
**Situation:** Model imports added to PreviewService but functional wiring of form fields to live preview not yet complete. Templates and build output unchanged this run.  
**Next:** Complete Task 1 (wire all form fields to live preview); then Tasks 2–5 queued.

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
