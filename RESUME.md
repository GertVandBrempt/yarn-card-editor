# Yarn — Session Resume Context

_Updated: 2026-05-25T07:12:59Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### 🎮 Stream A — Game Design
**Status:** Active — 5 discussion items tracked  
**Situation:** DESIGN.md exists and has been scanned. No new open questions since last scan. Last notified 2026-05-24T08:53:53Z (~21h ago, < 48h threshold).  
**Pending items:**
1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
4. Action track visual design (§4.4) — activation-tracks-v02 mockup created — **ready for user review**
5. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet

### 🎨 Stream B — Card Design
**Status:** Active — 5 independent tracks running; review page restructure required  
**New rules:** 3 options per design item (a/b/c variants); review page restructured into "Under Review" (grouped) + "Accepted" sections — see VISUAL.md §10  
**Independent tracks:**
1. **Activation Tracks** — 4 primitive types (Basic, Multi-turn, Multi-use, Use), 3 options each; AND/OR on hold until primitives accepted
2. **Die Symbols** — Constitution, Zeal, Path; 3 full-set options; important for conditional roll effects
3. **Subtitle** — header subtitle design; 3 options
4. **Flavour Text** — italic lore text zone; 3 options
5. **Set Symbol** — small corner glyph; 3 options
**Existing hold:** trigger-symbols-v02 and activation-tracks-v02 (old format) unaccepted; effects-v04 on hold until trigger symbols + activation tracks resolved  
**39 variants** in design/variants/ — review gallery needs restructuring per new layout rules

### 🖥️ Stream C — App Design
**Status:** Active — requirements updated; ready to implement + build + deploy  
**Situation:** Full architecture scaffold complete (17 components, 3 services). Requirements added 2026-05-25 (two sessions): mobile layout, symbol reference popup, global empty-container rule, auto visual sync, correct build command; track-specific sub-fields for Actions (turn count / slot count / charges / sub-tracks for AND/OR); live preview uses latest design variant for trigger symbols + activation markers — no placeholder wait.  
**Next:** Orchestrator implements all 9 tasks in ORCHESTRATOR.md Stream C, then builds and deploys.  
**Auto-sync rule:** After any card baseline change OR new trigger/track variant, orchestrator syncs SVGs + baselines, rebuilds, and redeploys without user input.  
**Design gaps:** trigger symbols, activation tracks (in design — preview now uses latest variant, not placeholder); Character dual-mode layout still unresolved.

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only |
| design/VISUAL.md | Locked visual decisions | User + orchestrator reads |
| design/card-index.md | Per-type card HTML baselines | User updates to accept variants |
| design/variants/*.html | Card variant files (39 variants) | Orchestrator (autonomous) |
| design/variants/CHANGES.md | Variant change log | Orchestrator |
| APP.md | App design decisions | Orchestrator (with user feedback) |
| review/index.html | Mobile card review gallery | Orchestrator (regenerated) |
| docs/editor/ | Built Angular app (GitHub Pages) | Orchestrator (built) |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## How to continue work

- **Accept card variants:** view gallery at https://gertvandbrempt.github.io/yarn-card-editor/review/ — say "accept trigger-symbols-v02" and/or "accept activation-tracks-v02" to add them to card-index.md.
- **Give app feedback:** try editor at https://gertvandbrempt.github.io/yarn-card-editor/editor/ and say what to improve.
- **Game design session:** open Claude Code and say "game design" to discuss the 5 pending items.
- **Weekly review gate:** due 2026-05-30T08:00:00Z — orchestrator will pause and notify you then.

---

## Gallery & Editor

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/  
Live editor (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/editor/
