# Yarn — Session Resume Context

_Updated: 2026-05-24T08:30:38Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### 🎮 Stream A — Game Design
**Status:** Waiting for content  
**Situation:** DESIGN.md does not exist yet. Once the user creates it, the orchestrator will scan it for open questions and surface them in interactive sessions.  
**To start a game design session:** open Claude Code and say "game design".

### 🎨 Stream B — Card Design
**Status:** Blocked  
**Blocked on:** `design/VISUAL.md` and `design/card-index.md` do not exist.  
These must be created before card variants can be built. They define the visual language and per-type card HTML baselines.  
**To unblock:** create VISUAL.md and card-index.md with initial visual decisions, then tell the orchestrator.

### 🖥️ Stream C — App Design
**Status:** Blocked — awaiting user review  
**Situation:** Initial `app.md` was drafted on first run. It covers: Core Loop, Card Data Model (with TBDs pending DESIGN.md), Card Set Management, Import/Export, Visual Editor, Open Questions.  
**To unblock:** read `app.md` and reply "app looks good" or give feedback.

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only |
| design/VISUAL.md | Locked visual decisions | User + orchestrator reads |
| design/card-index.md | Per-type card HTML baselines | User + orchestrator reads |
| design/variants/*.html | Card variant files | Orchestrator (autonomous) |
| app.md | App design decisions | Orchestrator (with user feedback) |
| review/index.html | Mobile card review gallery | Orchestrator (regenerated) |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## How to continue work

- **Interactive session:** open Claude Code, say what you want to work on. Say "game design" to discuss DESIGN.md, "card design" to review variants, "app design" to discuss app.md.
- **Accept app.md draft:** say "app looks good" (or give specific feedback).
- **Unblock card design:** share your VISUAL.md and card-index.md, or ask the orchestrator to draft them from DESIGN.md once that exists.
- **Weekly review:** the orchestrator will pause and notify you when a review gate is reached.

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/review/  
_(Currently empty — no card variants have been created yet.)_
