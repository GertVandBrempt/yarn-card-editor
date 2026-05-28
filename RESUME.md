# Yarn — Session Resume Context

_Updated: 2026-05-28T12:16:46Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### 🎮 Stream A — Game Design
**Status:** Active — 7 discussion items tracked, no new items found  
**Last notified:** 2026-05-27T06:13:53Z (~30h ago; < 48h — no notification this run)  
**Pending items:**
1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
4. Action track visual design (§4.4) — activation-tracks-v02 mockup created — **ready for user review**
5. Location connections visual design (§3.3) — solid vs hollow arrows for face-down/face-up; not yet in VISUAL.md
6. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
7. Inline sym+modifier rendering (§6.1) — `[icon][modifier]` inline layout/sizing rules not yet finalised in VISUAL.md

### 🎨 Stream B — Card Design
**Status:** On hold — all 9 design tracks complete, awaiting user acceptance  
**Completed tracks (all awaiting acceptance):**
- `activation-track-basic-v01-a/b/c` ✅
- `activation-track-multiturn-v02-a/b/c` ✅ (corrected shapes)
- `activation-track-multiuse-v01-a/b/c` ✅
- `activation-track-use-v01-a/b/c` ✅ (one-time square marker)
- `die-symbols-v01-a/b/c` ✅ (A: pip-count, B: shape-based, C: thematic-symbol)
- `trigger-symbols-v03-a/b/c` ✅ (A: geometric/angular; B: rounded/organic; C: pictographic/silhouette)
- `subtitle-v01-a/b/c` ✅ (A: below title Cinzel italic amber; B: between band+title Crimson Text italic cream+diamonds; C: embedded in type band second row)
- `flavour-text-v01-a/b/c` ✅ (A: amber hairline rule centred; B: ornamental SVG divider left-aligned; C: integrated borderless sec-flavour)
- `set-symbol-v01-a/b/c` ✅ (A: bottom-right circular container 18px; B: bottom-left rounded-square monogram 20px; C: frameless embossed trefoil 16px)

**Next queued tracks (blocked on acceptance):**
- AND/OR compound tracks — on hold until all 4 activation-track primitives accepted
- effects-v04 — on hold until trigger symbols + activation tracks both accepted

### 🖥️ Stream C — App Design
**Status:** On hold — awaiting baseline acceptance  
**Last action:** Review gallery migrated to `docs/review/index.html` (2026-05-28T00:17:35Z)  
**Next:** On hold — awaiting baseline acceptance in card-index.md to trigger auto-sync  
**Last checked:** 2026-05-28T12:16:46Z — no new acceptances

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
| docs/review/index.html | Mobile card review gallery | Orchestrator (regenerated) — ✅ migrated from repo root to docs/ |
| docs/editor/ | Built Angular app (GitHub Pages, flat layout) | Orchestrator (built) |
| .github/workflows/deploy.yml | CI/CD deploy workflow | Orchestrator |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## How to continue work

- **Accept design variants:** All 9 design element tracks have 3 options (a/b/c) ready for review at the gallery. Accept any by saying "accept <element>-v<N>-<option>" (e.g. "accept trigger-symbols-v03-a"). Accepting unlocks the next design tracks and triggers App Design auto-sync.
- **Tracks awaiting acceptance:** activation-track-basic-v01, activation-track-multiturn-v02, activation-track-multiuse-v01, activation-track-use-v01, die-symbols-v01, trigger-symbols-v03, subtitle-v01, flavour-text-v01, set-symbol-v01
- **Try the editor:** https://gertvandbrempt.github.io/yarn-card-editor/editor/
- **Game design session:** open Claude Code and say "game design" to discuss the 7 pending items.
- **Weekly review gate:** due 2026-05-30T08:00:00Z — orchestrator will pause and notify you then.

---

## Gallery & Editor

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/ ✅ now served from docs/review/  
Live editor (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/editor/
