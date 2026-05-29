# Yarn — Session Resume Context

_Updated: 2026-05-29T18:12:54Z_

---

## Project overview

**Yarn** is a card game. This repo is its **card editor** — an Angular web app for creating and exporting card sets. It is NOT a game runner.

Card types: **Location, Character, Item, Event, Quest, Persona, Script**

---

## Current stream status

### Stream A — Game Design
**Status:** Active — 7 discussion items tracked, no new items found  
**Last notified:** 2026-05-29T00:11:07Z (~18h ago; < 48h threshold — no notification this run)  
**Pending items:**
1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
4. Action track visual design (§4.4) — activation-tracks-v02 mockup created — **ready for user review**
5. Location connections visual design (§3.3) — solid vs hollow arrows for face-down/face-up; not yet in VISUAL.md
6. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
7. Inline sym+modifier rendering (§6.1) — `[icon][modifier]` inline layout/sizing rules not yet finalised in VISUAL.md

### Stream B — Card Design
**Status:** On hold — all design tracks complete; awaiting user acceptance of pending variants  
**Accepted:**
- Marker shapes locked: activation = inlayed diamond, flow = hollow diamond, use = square+square
- 4 design elements: effects-container-v04, set-symbol-v01-a, flavour-text-v01-c, subtitle-v01-a
**Next tasks (in order):**
1. ~~Design cooldown trigger marker~~ DONE — 3 options created (wedge/arrowhead/notch)
2. Baseline propagation — apply 4 accepted elements to all type baselines (blocked until cooldown trigger marker accepted)
3. Activation track rework — all 4 track types, using accepted markers, 4-container layout (blocked until cooldown trigger marker accepted)
**Still awaiting acceptance:** cooldown-trigger-marker-v01, die-symbols-v01, trigger-symbols-v03

### Stream C — App Design
**Status:** On hold — all known issues resolved; awaiting baseline propagation from Card Design  
**Next:** Awaiting Card Design Task 2 (baseline propagation) to complete, then auto-sync updated templates, rebuild, and redeploy.

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
| docs/review/index.html | Card review gallery | Orchestrator (regenerated) |
| docs/editor/ | Built Angular app (GitHub Pages, flat layout) | Orchestrator (built) |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## How to continue work

- **Accept design variants:** Review cooldown-trigger-marker-v01 (a/b/c) in the gallery — accepting one unblocks baseline propagation and activation track rework. Also review die-symbols-v01 and trigger-symbols-v03.
- **Try the editor:** https://gertvandbrempt.github.io/yarn-card-editor/editor/ (live preview and card scaling now fixed)
- **Game design session:** open Claude Code and say "game design" to discuss the 7 pending items.
- **Weekly review gate:** due 2026-05-30T08:00:00Z — orchestrator will pause and notify you then.

---

## Gallery & Editor

Card review gallery (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/review/  
Live editor (GitHub Pages): https://gertvandbrempt.github.io/yarn-card-editor/editor/
