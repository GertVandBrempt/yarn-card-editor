# Yarn — Session Resume Context

_Updated: 2026-05-24T13:00:00Z (orchestrator run)_

---

## ⚠ Workflow Rule — Read This First

**Interactive sessions write MD files ONLY. Never create HTML.**

- Card variants, icon references, gallery files → orchestrator sub-agents only
- Interactive sessions feed the orchestrator via `VISUAL.md` and `ORCHESTRATOR.md`
- If you find yourself about to write a `.html` file, stop. Write a spec to `VISUAL.md` instead.

This rule is also enforced in `CLAUDE.md § Working Style`.

---

## Current task

**Ready for user review.** This run built the v1 editor and all 3 queued card design variants.

---

## What was done this run

### 🖥️ App Design (HIGH PRIORITY — completed)
- **Built and deployed v1 Angular card editor** to `editor/` at repo root
- **Live URL**: https://gertvandtbrempt.github.io/yarn-card-editor/editor/
- Features: all 8 card types, type selector, form fields, live preview (baseline HTML + title injection via iframe), localStorage persistence, JSON import/export
- Design gaps noted in VISUAL.md §9 and APP.md — trigger symbols, activation tracks, sym+modifier, dual-mode layout

### 🎨 Card Design (all 3 queued tasks done)
1. **effects-v03** — §6.1 display model: no section labels, non-italic Crimson Text, 4 sections (passive / trigger-entry / actions / trigger-exit), placeholder leading symbols for trigger and activation rows
2. **trigger-symbols-v01** — SVG reference: 6 trigger symbol designs (On Reveal ⭐, On Enter →, On Leave ←, Character Phase ⬡, On Complete ✓, On Flow Marker ›)
3. **activation-tracks-v01** — SVG reference: 6 activation track type diagrams with legend (Basic, Multi-turn, Multi-use, AND, OR, Use)

### 🎮 Game Design
- No notification sent (< 48h since last)
- 5 discussion items unchanged

---

## Next actions for user

1. **Review the v1 editor**: https://gertvandtbrempt.github.io/yarn-card-editor/editor/
   - Say "editor feedback: [your thoughts]" to give feedback
   - The editor is live and functional for all card types

2. **Review the card design variants**: https://gertvandtbrempt.github.io/yarn-card-editor/review/
   - **effects-v03** — does the §6.1 row format look right? Accept or request changes
   - **trigger-symbols-v01** — approve individual symbols or request redesigns
   - **activation-tracks-v01** — approve track diagrams or request changes
   - **script-v01** — still needs cream/off-white colour applied (awaiting acceptance of script card colour decision from previous session)

3. **Game Design session** — 5 items waiting, say "game design" to begin

---

## What unblocks each stream

| Stream | What to do |
|---|---|
| 🎮 Game Design | Say "game design" to open a discussion session |
| 🎨 Card Design | Accept/reject effects-v03, trigger-symbols-v01, activation-tracks-v01; confirm Script cream colour |
| 🖥️ App Design | Try the live editor; give feedback via "editor feedback: ..." |

---

## Key decisions from previous session (carry forward)

- Script card colour: cream / off-white
- Effect text: Crimson Text 400, NOT italic
- Section labels: none — background colour identifies section
- Sym+modifier group: atomic inline unit `[icon][modifier]`
- Row format: `[leading symbol] [effect text]`
- Activation tracks — AND/OR are compound containers
- App v1 tech stack: Angular 21 (zoneless)
- App design gap protocol: note gaps in VISUAL.md §9 + APP.md; show `⏳ Design pending` in preview

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only |
| design/VISUAL.md | Locked visual decisions + §9 app gap queue | Orchestrator |
| design/card-index.md | Per-type card HTML baselines | User + orchestrator reads |
| design/variants/*.html | Card variant files | Orchestrator (autonomous) |
| app.md | App design decisions | Orchestrator (with user feedback) |
| editor/ | Deployed v1 Angular editor | Orchestrator builds |
| review/index.html | Mobile card review gallery | Orchestrator (regenerated) |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/review/
Card editor v1 (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/editor/
_(25 card-variant entries in gallery; editor now live)_
