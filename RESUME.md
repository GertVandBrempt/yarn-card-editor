# Resume State

Updated: 2026-05-24T (interactive session — design decisions recorded)

## ⚠ Workflow Rule — Read This First

**Interactive sessions write MD files ONLY. Never create HTML.**

- Card variants, icon references, gallery files → orchestrator sub-agents only
- Interactive sessions feed the orchestrator via `VISUAL.md` and `ORCHESTRATOR.md`
- If you find yourself about to write a `.html` file, stop. Write a spec to `VISUAL.md` instead.

This rule is also enforced in `CLAUDE.md § Working Style`.

---

## Current task

Idle — all MD files updated. Orchestrator next run is HIGH PRIORITY: App Design v1 build first, then Card Design tasks.

## Next action

Orchestrator's next run will execute (in order):
1. **App v1 build** — vanilla HTML/CSS/JS editor in `editor/`; live preview from accepted baselines; design gap protocol active; deploy to GitHub Pages; PushNotification on completion ← HIGH PRIORITY (user wants today)
2. **effects-v03** — §6.1 display model (non-italic, no labels, trigger/action row format)
3. **trigger-symbols-v01** — SVG trigger symbol icons
4. **activation-tracks-v01** — SVG activation track designs (all 6 types, §8 spec)

For the user:
- **Game Design session** — 6 discussion items waiting in ORCHESTRATOR.md

## Files touched this session

- `design/VISUAL.md` — §3 body text: removed italic; §4 color table: added Script (cream/off-white); §6.1 effect display model; §8 Activation Tracks spec (AND/OR clarified as compound containers); §9 App-Agent Design Task Queue added
- `ORCHESTRATOR.md` — Card Design: cleared blocker, 3 tasks queued; App Design: unblocked, v1 build task with design gap protocol, HIGH PRIORITY
- `CLAUDE.md` — Working Style: interactive session boundary rule (MD-only writes)
- `APP.md` — accepted; added Tech Stack, Deployment, Design Gap Protocol, Known Design Gaps sections
- `RESUME.md` — this file

## Decisions made

- Script card colour: cream / off-white
- Effect text: Crimson Text 400, NOT italic
- Section labels: none — background colour identifies section
- Sym+modifier group: atomic inline unit `[icon][modifier]`; modifier = number or short label
- Row format: `[leading-symbol] [effect text]` — same for trigger and action rows
- Activation tracks — AND: compound, all sub-tracks need ≥1 token on activation marker before any proceeds; OR: compound, activating one sub-track locks others until fully resolved; sub-tracks are primitive types (Basic/Multi-turn/Multi-use/Use)
- effects-v02 direction: superseded — §6.1 rules replace it
- App v1 tech stack: vanilla HTML/CSS/JS, no build step, deployed to `editor/` on GitHub Pages
- App design gap protocol: app agents note gaps in VISUAL.md §9 + APP.md; never design; show `⏳ Design pending` in preview

## Parked / not started

- Accept script-v01 (cream colour not yet applied — orchestrator task)
- effects-v03 and beyond (queued for orchestrator)
- trigger-symbols-v01 (queued for orchestrator)
- activation-tracks-v01 (queued for orchestrator)
- Image layer integration into variants
- Angular card editor implementation (awaiting app.md user approval)
- Shelved icons: move, tuck-character, tuck-item, die-constitution, die-zeal, die-path
- Game Design discussion items (6 items, interactive session needed)

## Gallery

Card review gallery (GitHub Pages): https://gertvandtbrempt.github.io/yarn-card-editor/review/
