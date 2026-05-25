# Yarn — Session Resume Context

_Updated: 2026-05-25T15:07:31Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### 🎮 Stream A — Game Design
**Status:** Active — 6 discussion items tracked  
**Last scan:** 2026-05-25T15:07:31Z — 1 new item found; user notified  
**Last notified:** 2026-05-25T15:07:31Z  
**Pending items:**
1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
4. Action track visual design (§4.4) — activation-tracks-v02 mockup created — **ready for user review**
5. **Location connections visual design (§3.3) — NEW** — solid vs hollow arrows for face-down/face-up; not yet in VISUAL.md
6. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet

### 🎨 Stream B — Card Design
**Status:** Active — activation-track-basic-v01 ✅ and activation-track-multiturn-v02 ✅ complete  
**Completed this run:**
- `activation-track-multiturn-v02-a/b/c` ✅ (corrected: diamond+inner-diamond markers, hollow cooldown diamonds, cooldown trigger in option b, no return arrow)
**Next tasks (all independent tracks, in queue order):**
- `activation-track-multiuse-v01-a/b/c` — multiple filled diamonds in a row
- `activation-track-use-v01-a/b/c` — one square with inner square (one-time track)
- `die-symbols-v01-a/b/c`, `subtitle-v01-a/b/c`, `flavour-text-v01-a/b/c`, `set-symbol-v01-a/b/c`
- `trigger-symbols-v03-a/b/c` — first 3-option round for trigger symbols
- AND/OR compound tracks on hold until all 4 primitives accepted

### 🖥️ Stream C — App Design
**Status:** Active — deployment fix complete ✅; editor now live  
**Completed this run:**
- Fixed `docs/editor/browser/` → flat `docs/editor/` layout
- Fixed `angular.json` `outputPath` to `{ "base": "../docs/editor", "browser": "" }`
- Updated `.github/workflows/deploy.yml` to not pass `--output-path` (was defeating the flat config)
- Rebuilt and verified `docs/editor/index.html` is at root (not in `browser/` subdir)
**Next:** Auto-sync when Card Design accepts a baseline (card-index.md update → SVG sync → rebuild → deploy)

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only |
| design/VISUAL.md | Locked visual decisions | User + orchestrator reads |
| design/card-index.md | Per-type card HTML baselines | User updates to accept variants |
| design/variants/*.html | Card variant files (51 variants) | Orchestrator (autonomous) |
| design/variants/CHANGES.md | Variant change log | Orchestrator |
| APP.md | App design decisions | Orchestrator (with user feedback) |
| review/index.html | Mobile card review gallery | Orchestrator (regenerated) |
| docs/editor/ | Built Angular app (GitHub Pages, flat layout) | Orchestrator (built) |
| .github/workflows/deploy.yml | CI/CD deploy workflow | Orchestrator |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## How to continue work

- **Accept card variants:** view gallery at https://gertvandbrempt.github.io/yarn-card-editor/review/ — say "accept activation-track-basic-v01-b" (or whichever option you prefer) to promote it to card-index.md. This triggers an auto-sync + rebuild.
- **Try the editor:** https://gertvandbrempt.github.io/yarn-card-editor/editor/ — deployment is now fixed; index.html is at the root.
- **Give app feedback:** say what to improve after trying the editor.
- **Game design session:** open Claude Code and say "game design" to discuss the 6 pending items, including the new Location connections item.
- **Weekly review gate:** due 2026-05-30T08:00:00Z — orchestrator will pause and notify you then.

---

## Gallery & Editor

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/  
Live editor (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/editor/
