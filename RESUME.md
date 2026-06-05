# Yarn — Session Resume Context

_Updated: 2026-06-05T18:10:50Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Card Design
**Status:** Active — Task 2 (baseline propagation) complete  
**Completed this run:** All 7 card type baselines updated with the four accepted design elements (effects-container-v04, set-symbol-v01-a, flavour-text-v01-c, subtitle-v01-a)  
**Next:** Task 3 — Activation track rework (4 primitive track types with accepted marker shapes at ~29px)  
**Independent track pending:** trigger-symbols-v05 (a/b/c) — needs creation; does not block Task 3

### App Design
**Status:** Active — Task 16 complete  
**Completed this run:** SetSelectorComponent restyled with dark parchment theme, amber accents, proper text contrast; review gallery regenerated (88 variants); app rebuilt  
**Next:** Task 17 — Fix trigger limit bug (only one trigger can be added per card)  
**Backlog:** Task 18 (Row/Container domain model), Task 19 (autosave), Task 21 (grouped card list), Task 22 (gray out undesigned fields), Task 20 (export/import JSON)

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

- **Review card variants:** visit https://gertvandbrempt.github.io/yarn-card-editor/review/ — trigger-symbols-v05 and activation-track variants are under review
- **Accept variants:** say "accept trigger-symbols-v05-a" (or b/c) to advance trigger symbol design
- **Game design:** handled in interactive sessions only — no orchestrator stream
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/
Editor app: https://gertvandbrempt.github.io/yarn-card-editor/editor/
