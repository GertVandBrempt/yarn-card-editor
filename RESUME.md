# Yarn — Session Resume Context

_Updated: 2026-05-25T00:08:00Z (orchestrator run)_

---

## ⚠ Workflow Rule — Read This First

**Interactive sessions write MD files ONLY. Never create HTML.**

- Card variants, icon references, gallery files → orchestrator sub-agents only
- Interactive sessions feed the orchestrator via `VISUAL.md` and `ORCHESTRATOR.md`
- If you find yourself about to write a `.html` file, stop. Write a spec to `VISUAL.md` instead.

This rule is also enforced in `CLAUDE.md § Working Style`.

---

## Current task

All streams on hold — awaiting user review of card variants and v1 editor feedback.

---

## What was done this run (2026-05-25T00:08:00Z)

### 🎮 Game Design
- Scanned DESIGN.md — no new items found
- 5 discussion items remain tracked (unchanged)
- Last notified 2026-05-24T08:53:53Z (~15h ago, under 48h threshold — no re-notification)

### 🎨 Card Design
- On hold — trigger-symbols-v02 and activation-tracks-v02 still unaccepted
- Confirmed: neither variant has been added to card-index.md as accepted baseline
- Next work: effects-v04 (after both variants are accepted)

### 🖥️ App Design
- On hold — no queued tasks found in APP.md or VISUAL.md §9
- Awaiting user feedback on fixed v1 editor

---

## What the user needs to do

1. **Review trigger-symbols-v02**: https://gertvandtbrempt.github.io/yarn-card-editor/review/
   - Accept or request changes → then effects-v04 can incorporate trigger symbols

2. **Review activation-tracks-v02**: https://gertvandtbrempt.github.io/yarn-card-editor/review/
   - Accept or request changes → then effects-v04 can incorporate activation tracks

3. **Test the fixed v1 editor**: https://gertvandtbrempt.github.io/yarn-card-editor/editor/
   - All form fields wire to preview; image upload (file picker + drag-and-drop); Triggers/Actions sections; `<damage>[2]` inline icon syntax
   - Say "editor feedback: [your thoughts]" to give feedback

4. **Game Design session** — 5 items waiting, say "game design" to begin:
   - Script card colour (purple placeholder — needs decision)
   - Trigger priority visual order (§7 TBD)
   - Life point slots visual (§3.1)
   - Action track visual design — activation-tracks-v02 ready for acceptance
   - Character dual-mode layout (§3.4)

---

## What unblocks each stream

| Stream | What to do |
|---|---|
| 🎮 Game Design | Say "game design" to open a discussion session |
| 🎨 Card Design | Accept trigger-symbols-v02 and activation-tracks-v02; confirm Script cream colour |
| 🖥️ App Design | Test the fixed editor; give feedback via "editor feedback: ..." |

---

## Key decisions from previous sessions (carry forward)

- Script card colour: cream / off-white (still needs applying — awaiting acceptance)
- Effect text: Crimson Text 400, NOT italic
- Section labels: none — background colour identifies section
- Sym+modifier group: atomic inline unit `[icon][modifier]`
- Row format: `[leading symbol] [effect text]`
- Activation tracks — AND/OR are compound containers
- App v1 tech stack: Angular 21 (zoneless)
- App design gap protocol: note gaps in VISUAL.md §9 + APP.md; show `⏳ Design pending` in preview
- Trigger/activation symbols: dark body `#1a0e04` + warm light amber `#d4b87a`, 20×20, no per-type color variation

---

## Key file map

| File | Purpose | Who edits |
|---|---|---|
| DESIGN.md | Game design document | User only |
| design/VISUAL.md | Locked visual decisions + §9 app gap queue | Orchestrator |
| design/card-index.md | Per-type card HTML baselines | User + orchestrator reads |
| design/variants/*.html | Card variant files | Orchestrator (autonomous) |
| APP.md | App design decisions | Orchestrator (with user feedback) |
| docs/editor/ | Deployed v1 Angular editor | Orchestrator builds |
| review/index.html | Mobile card review gallery | Orchestrator (regenerated) |
| ORCHESTRATOR.md | System state / stream tracking | Orchestrator |
| RESUME.md | This file — session context | Orchestrator |

---

## Gallery

Card review gallery (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/review/
Card editor v1 (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/editor/
_(39 card-variant entries in gallery; editor v1 fixes deployed)_
