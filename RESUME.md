# Yarn — Session Resume Context

_Updated: 2026-05-24T18:02:35Z (orchestrator run)_

---

## ⚠ Workflow Rule — Read This First

**Interactive sessions write MD files ONLY. Never create HTML.**

- Card variants, icon references, gallery files → orchestrator sub-agents only
- Interactive sessions feed the orchestrator via `VISUAL.md` and `ORCHESTRATOR.md`
- If you find yourself about to write a `.html` file, stop. Write a spec to `VISUAL.md` instead.

This rule is also enforced in `CLAUDE.md § Working Style`.

---

## Current task

Orchestrator run complete — all streams active, no blockers.

---

## What was done this run

### 🎨 Card Design (2 tasks done)
1. **trigger-symbols-v02** — 6 trigger symbols redesigned per §7: dark body + lighter detail, 20×20, no per-trigger color variation; shown as leading symbols in trigger rows on a real card mockup (NOT an isolated reference sheet)
2. **activation-tracks-v02** — 6 activation track types redesigned per §8: vertical layout covering the action container, simple shapes, dark body + lighter detail palette; AND/OR compound sub-tracks shown as separate vertical columns with shared gate element; shown as leading markers in action rows on a real card mockup

### 🖥️ App Design (all 6 priority fixes done + built)
Fixed all v1 review issues:
1. **Wired all form fields** to live preview (every field now functional)
2. **Fixed image upload** — local file picker → base64 data URI; drag-and-drop supported; URL input removed
3. **Fixed live preview rendering** — injectCardData rewrote with indexOf/lastIndexOf logic; SVG symbol injection fixed; DomSanitizer added for SafeHtml
4. **Added Triggers section** — per-card add/remove list; trigger type dropdown + effect editor; ⏳ Design pending placeholder for leading symbols
5. **Added Actions section** — per-card add/remove list; activation track type dropdown + effect editor
6. **Effect editor with inline parsing** — `<iconname>[modifier]` syntax parsed in real time; correct SVG icons render inline in preview
- CSS budget in angular.json raised from 8kB to 40kB (app.css is 9.6kB)
- **Build**: clean compile, deployed to docs/editor

### 🎮 Game Design
- No new items in DESIGN.md; last notified < 48h ago — no notification

### 📋 Gallery
- review/index.html regenerated — 39 card-variant entries (2 new: trigger-symbols-v02, activation-tracks-v02)

---

## Next actions for user

1. **Review trigger-symbols-v02**: https://gertvandtbrempt.github.io/yarn-card-editor/review/
   - Accept or request changes; once accepted → effects-v04 can be created

2. **Review activation-tracks-v02**: https://gertvandtbrempt.github.io/yarn-card-editor/review/
   - Accept or request changes; once accepted → effects-v04 can be created

3. **Test the fixed v1 editor**: https://gertvandtbrempt.github.io/yarn-card-editor/editor/
   - All form fields now wire to preview; image upload (file picker + drag-and-drop); Triggers/Actions sections; `<damage>[2]` inline icon syntax
   - Say "editor feedback: [your thoughts]" to give feedback

4. **Game Design session** — 5 items waiting, say "game design" to begin

---

## What unblocks each stream

| Stream | What to do |
|---|---|
| 🎮 Game Design | Say "game design" to open a discussion session |
| 🎨 Card Design | Accept/reject trigger-symbols-v02 and activation-tracks-v02; confirm Script cream colour |
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
