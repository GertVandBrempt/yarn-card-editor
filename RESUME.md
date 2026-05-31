# Yarn — Session Resume Context

_Updated: 2026-05-31T06:14:44Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Stream A — Game Design
**Status:** Active — 7 discussion items tracked, no new items this run  
**Last notified:** 2026-05-31T12:00:00Z (< 48h ago)  
**Top items:** Script Card colour, action track visual design (§4.4 — cooldown trigger marker ready for review), trigger priority cross-card (§7), character dual-mode layout (§3.4), inline sym+modifier rendering (§6.1)  
**To discuss:** open Claude Code and say "game design" to work through these items.

### Stream B — Card Design
**Status:** On hold  
**Situation:** 4 design elements accepted (effects-container-v04, set-symbol-v01-a, flavour-text-v01-c, subtitle-v01-a). 4 marker shapes accepted. All 9 independent design tracks complete.  
**Awaiting acceptance:** cooldown-trigger-marker-v01 (a/b/c), die-symbols-v01 (a/b/c), trigger-symbols-v03 (a/b/c)  
**Blocked tasks:** Task 2 (baseline propagation) and Task 3 (activation track rework) both require cooldown-trigger-marker acceptance.  
**To unblock:** review and accept pending variants at the review gallery.

### Stream C — App Design
**Status:** On hold  
**Situation:** All 14 completed tasks done. Editor deployed to `docs/editor/`. Review gallery at `docs/review/`. All known issues resolved. Gallery verified correct — 73 variant files mirrored, all href paths correct.  
**Awaiting:** Card Design baseline acceptance to trigger auto-sync of updated templates into the Angular app.

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
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/
Editor app: https://gertvandbrempt.github.io/yarn-card-editor/editor/
