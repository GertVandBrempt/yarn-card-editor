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
**Status:** On hold — awaiting user acceptance  
**Blocked on:** User must accept trigger-symbols-v02 and activation-tracks-v02 (review at gallery). Neither is yet in card-index.md as an accepted baseline.  
**Next:** Once both are accepted, create effects-v04 incorporating accepted trigger symbols + activation tracks.  
**39 variants** in design/variants/ — see review gallery.

### 🖥️ Stream C — App Design
**Status:** Active — refactor in progress  
**Situation:** Architecture refactor well underway. Routing, all 7 typed data models, CardSetService/CardService/PreviewService, CardListComponent, CardFilterComponent, LayoutComponent, and SetSelectorComponent all scaffolded. Remaining: shared sub-components (step 4), type-specific form components (step 5), CardPreviewComponent (step 6), wire AppComponent (step 9), build+deploy (step 10).  
**Design gaps pending card acceptance:** trigger symbols, activation tracks, inline icon rendering, Character dual-mode layout.

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

- **Accept card variants:** view gallery at https://gertvandtbrempt.github.io/yarn-card-editor/review/ — say "accept trigger-symbols-v02" and/or "accept activation-tracks-v02" to add them to card-index.md.
- **Give app feedback:** try editor at https://gertvandtbrempt.github.io/yarn-card-editor/editor/ and say what to improve.
- **Game design session:** open Claude Code and say "game design" to discuss the 5 pending items.
- **Weekly review gate:** due 2026-05-30T08:00:00Z — orchestrator will pause and notify you then.

---

## Gallery & Editor

Card review gallery (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/review/  
Live editor (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/editor/
