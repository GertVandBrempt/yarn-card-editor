# Yarn — Session Resume Context

_Updated: 2026-05-28T06:15:43Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### 🎮 Stream A — Game Design
**Status:** Active — 7 discussion items tracked, no new items found  
**Last notified:** 2026-05-27T06:13:53Z (~24h ago; < 48h — no notification this run)  
**Pending items:**
1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
4. Action track visual design (§4.4) — activation-tracks-v02 mockup created — **ready for user review**
5. Location connections visual design (§3.3) — solid vs hollow arrows for face-down/face-up; not yet in VISUAL.md
6. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
7. Inline sym+modifier rendering (§6.1) — `[icon][modifier]` inline layout/sizing rules not yet finalised in VISUAL.md

### 🎨 Stream B — Card Design
**Status:** Active — marker shapes accepted; 3 tasks queued  
**Accepted:**
- Marker shapes locked: activation = inlayed diamond (basic-v01-b ref), flow = hollow diamond (multiturn-v02-a ref), use = square+square (use-v01-a ref)
- 4 design elements: effects-container-v04, set-symbol-v01-a, flavour-text-v01-c, subtitle-v01-a
**Next tasks (in order):**
1. Design cooldown trigger marker (hollow diamond + right-edge arrow) — 3 options; BLOCKS task 2 and 3
2. Baseline propagation — apply 4 accepted elements to all type baselines
3. Activation track rework — all 4 track types, using accepted markers, 4-container layout
**Still awaiting acceptance:** die-symbols-v01, trigger-symbols-v03

### 🖥️ Stream C — App Design
**Status:** Active — 3 confirmed issues; fix in priority order  
**Issues:**
1. Site not on GitHub Pages — no build notification received; stale pages still up
2. Live preview not updating on form change
3. Viewport too small on desktop (mobile layout rendering)
**Next:** Fix deployment first (Task 1), then live preview (Task 2), then viewport (Task 3)

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
