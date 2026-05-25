# Yarn — Session Resume Context

_Updated: 2026-05-25T12:04:48Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### 🎮 Stream A — Game Design
**Status:** Active — 5 discussion items tracked  
**Last scan:** 2026-05-25T12:04:48Z — no new items found  
**Last notified:** 2026-05-24T08:53:53Z (~27h ago; 48h threshold not yet reached)  
**Pending items:**
1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
4. Action track visual design (§4.4) — activation-tracks-v02 mockup created — **ready for user review**
5. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet

### 🎨 Stream B — Card Design
**Status:** Active — 2 of 4 primitive activation track types complete  
**Completed this run:**
- `activation-track-basic-v01-a/b/c` ✅ (circle / diamond / hexagon markers)
- `activation-track-multiturn-v01-a/b/c` ✅ (circle+squares / diamond+circles / hexagon+capsules)
**Next tasks (in order):**
- `activation-track-multiuse-v01-a/b/c` — multiple activation markers
- `activation-track-use-v01-a/b/c` — one-time/consumed permanently
- `die-symbols-v01-a/b/c`, `subtitle-v01-a/b/c`, `flavour-text-v01-a/b/c`, `set-symbol-v01-a/b/c`
- AND/OR compound tracks on hold until all 4 primitives accepted  
**Review page:** Restructured to 2-section format (Under Review + Accepted)

### 🖥️ Stream C — App Design
**Status:** Blocked — deployment fix required (editor unreachable at /editor/ endpoint)  
**Deployed features:**
- Responsive layout (3 breakpoints, mobile drawer nav, hamburger button, transform:scale() card preview)
- `SymbolReferenceModalComponent` — wired to EffectEditor with `?` button, Escape close, mobile full-screen
- Empty-container rule — empty title/subtitle/flavour-text sections hidden in preview
- Track-specific sub-fields: Multi-turn (cooldown turns), Multi-use (slots), Use (charges), AND/OR (sub-track list)
- Live SVG sync — trigger-symbols-v02 and activation-track-basic-v01-a symbols embedded in PreviewService
- Baseline templates wired from `src/assets/templates/<type>-baseline.html` (7 types)
**Auto-sync rule:** On next card-index.md update OR new trigger/track variant → orchestrator re-syncs SVGs + baselines, rebuilds, deploys automatically (no user input needed)  
**Next:** Auto-sync when Card Design accepts a baseline

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only |
| design/VISUAL.md | Locked visual decisions | User + orchestrator reads |
| design/card-index.md | Per-type card HTML baselines | User updates to accept variants |
| design/variants/*.html | Card variant files (44 variants) | Orchestrator (autonomous) |
| design/variants/CHANGES.md | Variant change log | Orchestrator |
| APP.md | App design decisions | Orchestrator (with user feedback) |
| review/index.html | Mobile card review gallery | Orchestrator (regenerated) |
| docs/editor/ | Built Angular app (GitHub Pages) | Orchestrator (built) |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## How to continue work

- **Accept card variants:** view gallery at https://gertvandbrempt.github.io/yarn-card-editor/review/ — say "accept activation-track-basic-v01-b" (or whichever option you prefer) to promote it to card-index.md. This triggers an auto-sync + rebuild.
- **Try the editor:** https://gertvandbrempt.github.io/yarn-card-editor/editor/ — test the new responsive layout, track sub-fields, and symbol reference modal.
- **Give app feedback:** say what to improve after trying the editor.
- **Game design session:** open Claude Code and say "game design" to discuss the 5 pending items.
- **Weekly review gate:** due 2026-05-30T08:00:00Z — orchestrator will pause and notify you then.

---

## Gallery & Editor

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/  
Live editor (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/editor/
