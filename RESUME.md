# Yarn — Session Resume Context

_Updated: 2026-05-26T00:05:22Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### 🎮 Stream A — Game Design
**Status:** Active — 7 discussion items tracked  
**Last scan:** 2026-05-26T00:05:22Z — 1 new item found (inline sym+modifier rendering §6.1); last notified 9h ago (< 48h threshold, no notification sent)  
**Last notified:** 2026-05-25T15:07:31Z  
**Pending items:**
1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
4. Action track visual design (§4.4) — activation-tracks-v02 mockup created — **ready for user review**
5. Location connections visual design (§3.3) — solid vs hollow arrows for face-down/face-up; not yet in VISUAL.md
6. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
7. **NEW: Inline sym+modifier rendering (§6.1)** — `[icon][modifier]` inline layout/sizing rules not yet finalised in VISUAL.md

### 🎨 Stream B — Card Design
**Status:** Active  
**Completed activation track primitives (all 4 done):**
- `activation-track-basic-v01-a/b/c` ✅
- `activation-track-multiturn-v02-a/b/c` ✅ (corrected shapes)
- `activation-track-multiuse-v01-a/b/c` ✅ (3/4/5 filled diamond slots)
- `activation-track-use-v01-a/b/c` ✅ **NEW** (one-time square marker; 3 size/proportion variants)

**Next tasks (independent tracks, in queue order):**
- `die-symbols-v01-a/b/c` — 3 die icons (Constitution, Zeal, Path)
- `subtitle-v01-a/b/c`
- `flavour-text-v01-a/b/c`
- `set-symbol-v01-a/b/c`
- `trigger-symbols-v03-a/b/c` — first 3-option round for trigger symbols
- AND/OR compound tracks on hold until all 4 primitives accepted (all 4 now done ✅)

### 🖥️ Stream C — App Design
**Status:** Active — auto-sync complete  
**Completed this run:**
- Synced use-v01 square-marker SVG defs into `preview.service.ts`
- Rebuilt Angular app — updated bundle deployed to `docs/editor/`
- Removed spurious `docs/editor/design/` directory (again — watch for recurrence)
**Next:** Auto-sync when Card Design accepts a baseline (card-index.md update → SVG sync → rebuild → deploy)

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

- **Accept card variants:** view gallery at https://gertvandbrempt.github.io/yarn-card-editor/review/ — say "accept activation-track-use-v01-a" (or b/c) to promote to card-index.md. All 4 activation track primitives are now ready.
- **Try the editor:** https://gertvandbrempt.github.io/yarn-card-editor/editor/
- **Give app feedback:** say what to improve after trying the editor.
- **Game design session:** open Claude Code and say "game design" to discuss the 7 pending items (especially item 7 — inline sym+modifier rendering).
- **Weekly review gate:** due 2026-05-30T08:00:00Z — orchestrator will pause and notify you then.

---

## Gallery & Editor

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/  
Live editor (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/editor/
