# Yarn — Session Resume Context

_Updated: 2026-06-12T20:37:17Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Active — Task 6 complete; trigger-symbols-v06 and rolled-effects-v01 next
**Completed this run:** Task 6 — all 4 primitive activation tracks redesigned (basic-v03, multiturn-v04, multiuse-v03, use-v03; 12 variant files) using verbatim accepted SVG symbol defs; v02/v03 predecessors marked superseded
**Next:** trigger-symbols-v06-a/b/c creation (single dark color + negative space); rolled-effects-v01-a/b/c (independent, can proceed immediately)
**Awaiting acceptance:** activation-track-basic-v03, activation-track-multiturn-v04, activation-track-multiuse-v03, activation-track-use-v03, trigger-symbols-v06 (not yet created), rolled-effects-v01 (not yet created)

### App Design
**Status:** Active — Task 24 complete; Task 22 (living task) re-verified
**Completed this run:** Task 24 — review gallery fixed: cooldown-trigger-marker-v02-b moved to Accepted section; superseded activation tracks removed from Under Review; new basic-v03 trio added; variant files synced; app rebuilt
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

- **Review card variants:** visit https://gertvandbrempt.github.io/yarn-card-editor/review/ — activation track v03/v04 variants are now under review; trigger-symbols-v06 will appear in a future run
- **Accept variants:** say "accept activation-track-basic-v03-a" (or b/c) etc. to unblock effects-v04
- **Game design:** handled in interactive sessions only — no orchestrator stream
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/
Editor app: https://gertvandbrempt.github.io/yarn-card-editor/editor/
