# Yarn — Session Resume Context

_Updated: 2026-05-26T06:22:00Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### 🎮 Stream A — Game Design
**Status:** Active — 7 discussion items tracked, no new items found this run  
**Last notified:** 2026-05-25T15:07:31Z (~15h ago — < 48h threshold, no notification sent)  
**Pending items:**
1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
4. Action track visual design (§4.4) — activation-tracks-v02 mockup created — **ready for user review**
5. Location connections visual design (§3.3) — solid vs hollow arrows for face-down/face-up; not yet in VISUAL.md
6. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
7. Inline sym+modifier rendering (§6.1) — `[icon][modifier]` inline layout/sizing rules not yet finalised in VISUAL.md

### 🎨 Stream B — Card Design
**Status:** Active — die-symbols-v01-a/b/c ✅ complete this run  
**Completed tracks:**
- `activation-track-basic-v01-a/b/c` ✅
- `activation-track-multiturn-v02-a/b/c` ✅ (corrected shapes)
- `activation-track-multiuse-v01-a/b/c` ✅
- `activation-track-use-v01-a/b/c` ✅ (one-time square marker)
- `die-symbols-v01-a/b/c` ✅ **NEW** — A: flat square+pip-count; B: shape-based (sq/diamond/hex); C: thematic amber symbol

**Next queued tracks (all independent):**
- `subtitle-v01-a/b/c`
- `flavour-text-v01-a/b/c`
- `set-symbol-v01-a/b/c`
- `trigger-symbols-v03-a/b/c` — first 3-option round for trigger symbols
- AND/OR compound tracks on hold until all 4 activation-track primitives accepted

### 🖥️ Stream C — App Design
**Status:** On hold — awaiting baseline acceptance  
**All known SVG variant defs synced** (trigger-symbols-v02, activation-track-basic/multiturn/multiuse/use-v01 all in preview.service.ts — verified this run)  
**Next:** Auto-sync when card-index.md is updated (new baseline accepted → re-sync SVGs + baselines → rebuild → deploy)

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only |
| design/VISUAL.md | Locked visual decisions | User + orchestrator reads |
| design/card-index.md | Per-type card HTML baselines | User updates to accept variants |
| design/variants/*.html | Card variant files | Orchestrator (autonomous) |
| design/variants/CHANGES.md | Variant change log | Orchestrator |
| APP.md | App design decisions | Orchestrator (with user feedback) |
| review/index.html | Mobile card review gallery | Orchestrator (regenerated) |
| docs/editor/ | Built Angular app (GitHub Pages, flat layout) | Orchestrator (built) |
| .github/workflows/deploy.yml | CI/CD deploy workflow | Orchestrator |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## How to continue work

- **Review new die symbol variants:** gallery at https://gertvandbrempt.github.io/yarn-card-editor/review/ — die-symbols-v01 now has 3 options. Say "accept die-symbols-v01-a" (or b/c) to promote.
- **Accept activation tracks:** all 4 primitive types (basic/multiturn/multiuse/use) have 3 options ready — accepting any will trigger the App Design auto-sync and rebuild.
- **Try the editor:** https://gertvandbrempt.github.io/yarn-card-editor/editor/
- **Give app feedback:** say what to improve after trying the editor.
- **Game design session:** open Claude Code and say "game design" to discuss the 7 pending items (especially item 7 — inline sym+modifier rendering).
- **Weekly review gate:** due 2026-05-30T08:00:00Z — orchestrator will pause and notify you then.

---

## Gallery & Editor

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/  
Live editor (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/editor/
