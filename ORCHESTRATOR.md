# Yarn — Orchestrator State

This file is read and written by scheduled agents. Do not edit manually during an active agent run.

## System Control

```
blocked_for_weekly_review: false
weekly_review_due: 2026-05-30T08:00:00Z
last_orchestrator_run: 2026-05-25T07:12:59Z
last_status_notification: 2026-05-24T18:02:35Z
```

## Work Streams

Streams are **independent** — a blocked stream does not pause other streams.

---

### Game Design
- **Mode**: interactive (orchestrator surfaces topics; user drives sessions in Claude Code)
- **Source**: DESIGN.md open issues and unresolved questions
- **Status**: active — 5 discussion items tracked; no new items found in scan of 2026-05-25T07:12:59Z (< 48h since last notification)
- **Pending discussion items** *(top 5 by card-design impact)*:
  1. Script Card colour — purple placeholder in script-v01; must confirm before card-index.md entry
  2. Trigger priority (§7) — explicitly TBD; affects card layout ordering rules
  3. Life point slots visual (§3.1) — slots overlapping damageable elements; not yet in VISUAL.md
  4. Action track visual design (§4.4) — 6 track types defined; activation-tracks-v02 in-card mockup created — **ready for user review**
  5. Character dual-mode layout (§3.4) — Character/Ally on one card; no visual design for split yet
- **Last notified**: 2026-05-24T08:53:53Z
- **Blocked on**: —

---

### Card Design
- **Mode**: autonomous
- **Source**: design/VISUAL.md, design/card-index.md
- **Status**: active — multiple independent tracks in progress; review page restructure required

#### Global rules (apply to all Card Design work)

- **Three options per design item**: every new visual element produces exactly 3 variants — option a, b, c — each a single card; named `<element>-v<N>-a.html`, `<element>-v<N>-b.html`, `<element>-v<N>-c.html`; design ID label visible on review page below each card
- **Independence**: each design item is independent — holding or blocking one item does not affect any other
- **Review page structure**: after any card design action, regenerate `review/index.html` with two sections: **Under Review** (grouped by design element, 3 options side by side per group) and **Accepted** (one entry per accepted item); see VISUAL.md §10 for full spec

#### Independent design tracks (each runs independently)

**Track 1 — Activation Tracks** *(3 options each)*
1. **activation-track-basic-v01-a/b/c** — Basic track: single activation marker (~48px), token removed on use; 3 distinct visual options
2. **activation-track-multiturn-v01-a/b/c** — Multi-turn track: marker → cooldown slot(s) → return arrow; 3 options
3. **activation-track-multiuse-v01-a/b/c** — Multi-use track: multiple activation markers; 3 options
4. **activation-track-use-v01-a/b/c** — Use (one-time) track: consumed permanently; 3 options
5. **Hold:** AND/OR compound tracks — only after all 4 primitives accepted

**Track 2 — Die Symbols** *(3 options for the full set of 3 die icons)*
- **die-symbols-v01-a/b/c** — Design 3 die icons (Constitution, Zeal, Path) per VISUAL.md §7; each option shows all 3 die icons on a single card in an effect row context; options must be visually distinct from each other

**Track 3 — Subtitle** *(3 options)*
- **subtitle-v01-a/b/c** — Header subtitle design per VISUAL.md §9.1; each option shows a card with subtitle present and one without

**Track 4 — Flavour Text** *(3 options)*
- **flavour-text-v01-a/b/c** — Flavour text zone design per VISUAL.md §9.2; italic lore text, visual separator from mechanics, absent on cards without it

**Track 5 — Set Symbol** *(3 options)*
- **set-symbol-v01-a/b/c** — Set symbol position/size/treatment per VISUAL.md §9.3; small glyph in corner; consistent across all card types

**Hold:** effects-v04 — create only after trigger symbols + activation tracks both accepted

- **Blocked on**: —
- **Last notified**: 2026-05-24T18:02:35Z

---

### App Design
- **Mode**: autonomous
- **Source**: APP.md
- **Status**: active — full scaffold complete; new requirements added 2026-05-25; ready to implement + build + deploy
- **Next task**: Implement all requirements then build and deploy (in order):
  1. **Add `SymbolReferenceModalComponent`** — read-only modal listing all inline symbol syntax + descriptions; opened by a `?` button on every `EffectEditorComponent`; keyboard-closeable (Escape); full-screen on mobile
  2. **Implement responsive layout** — 3 breakpoints per APP.md §Responsive Layout; sidebar collapses to drawer on mobile; card preview scales with `transform: scale()`; no horizontal overflow; 44px minimum touch targets
  3. **Enforce empty-container rule globally** — every card section (header fields, subtitle, flavour text, image area, all mechanics containers) uses `*ngIf` / `[hidden]`; zero empty boxes visible on a blank card
  4. **Track-specific sub-fields in `ActionsEditorComponent`**:
     - Multi-turn → "Cooldown (turns)" number field, minimum 1; drives number of cooldown slots in preview
     - Multi-use → "Activation slots" number field, minimum 2; drives number of markers shown in preview
     - Use → "Charges" number field, minimum 1; drives number of charge pips shown in preview
     - AND / OR → add/remove list of sub-tracks; each sub-track has its own primitive type dropdown + that type's sub-fields
     - Basic → no additional fields
     - All values flow to live preview in real time
  5. **Live preview design sync** — extract SVG `<symbol>` definitions from latest trigger symbol and activation track variants; embed in `PreviewService`; update whenever a new variant is created (see auto-sync rule below); fall back to `?` / filled circle if no variant exists yet
  6. **Wire `PreviewService` to `assets/templates/`** — load baseline HTML from `yarn-card-editor/src/assets/templates/<type>-baseline.html`; copy current accepted baselines from card-index.md into that directory
  7. **Build** — `cd yarn-card-editor && npm install && npx ng build --base-href /yarn-card-editor/editor/ --output-path ../docs/editor`
  8. **Fix TypeScript compile errors** — resolve any remaining type errors from scaffold stubs
  9. **Deploy** — commit `docs/editor/` output and push to master (GitHub Pages auto-deploys)
- **Auto-sync rule**: After any Card Design stream action that updates `card-index.md` **or** creates a new trigger symbol / activation track variant, the App Design stream must re-run steps 5–9 automatically (sync SVGs + baselines → build → deploy). No user trigger needed.
- **Blocked on**: —
- **Last notified**: 2026-05-24T18:02:35Z

---

## Active Sub-Agents

_(none)_

---

## Work Log

| Timestamp (UTC) | Agent | Action | Outcome |
|---|---|---|---|
| — | — | System initialized | — |
| 2026-05-24T08:46:29Z | Orchestrator | A: Scan DESIGN.md | 4 discussion items surfaced (first run); user notified |
| 2026-05-24T08:46:29Z | Orchestrator | B: Create script-v01.html | Script card v1 — turn schedule layout, purple placeholder colour |
| 2026-05-24T08:46:29Z | Orchestrator | B: Blocker | Script card colour not in VISUAL.md; user notified |
| 2026-05-24T08:46:29Z | Orchestrator | C: Draft app.md | Initial app.md drafted — all 7 card types modelled |
| 2026-05-24T08:46:29Z | Orchestrator | Gallery: regenerate | review/index.html updated |
| 2026-05-24T08:53:53Z | Orchestrator | A: Scan DESIGN.md | 5 discussion items surfaced (second run, broader scan); notified |
| 2026-05-24T08:53:53Z | Orchestrator | B: Create effects-v02.html | Section labels + text labels + 2 action rows; mech-frame 200px |
| 2026-05-24T08:53:53Z | Orchestrator | B: Update | CHANGES.md updated; review/index.html regenerated with 22 variants |
| 2026-05-24T08:53:53Z | Orchestrator | C: Draft app.md | Detailed app.md from DESIGN.md — full typed data model with §references |
| 2026-05-24T12:05:49Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified 3h ago (< 48h threshold) — no notification |
| 2026-05-24T12:05:49Z | Orchestrator | B: Check blocker | Script card colour still unresolved; already notified — skipped |
| 2026-05-24T12:05:49Z | Orchestrator | C: Check blocker | app.md review still pending; already notified — skipped |
| 2026-05-24T13:00:00Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified 4h ago (< 48h) — no notification |
| 2026-05-24T13:00:00Z | Orchestrator | B: Create effects-v03.html | §6.1 display model: no labels, non-italic, 4 sections, placeholder leading symbols |
| 2026-05-24T13:00:00Z | Orchestrator | B: Create trigger-symbols-v01.html | 6 trigger symbol SVG designs per §7 style rules |
| 2026-05-24T13:00:00Z | Orchestrator | B: Create activation-tracks-v01.html | 6 activation track type diagrams per §8 spec |
| 2026-05-24T13:00:00Z | Orchestrator | Gallery: regenerate | review/index.html updated — 25 card-variant entries |
| 2026-05-24T13:00:00Z | Orchestrator | C: Build v1 Angular editor | Built + deployed to editor/; all 8 types with live preview via iframe; localStorage |
| 2026-05-24T13:00:00Z | Orchestrator | C: Update VISUAL.md §9 | Added 4 app design gap tasks for trigger symbols, tracks, sym+modifier, dual-mode |
| 2026-05-24T18:02:35Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified < 48h ago — no notification |
| 2026-05-24T18:02:35Z | Orchestrator | B: Create trigger-symbols-v02.html | 6 trigger symbols redesigned per §7: dark body + lighter detail, shown in card context |
| 2026-05-24T18:02:35Z | Orchestrator | B: Create activation-tracks-v02.html | 6 activation track types redesigned per §8: vertical layout, shown in card context |
| 2026-05-24T18:02:35Z | Orchestrator | Gallery: regenerate | review/index.html updated — 39 card-variant entries |
| 2026-05-24T18:02:35Z | Orchestrator | C: Fix v1 editor | All 6 priority fixes: form fields wired, image upload base64, preview rendering, Triggers/Actions sections, inline icon parsing; built and deployed |
| 2026-05-25T00:08:00Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified ~15h ago (< 48h threshold) — no notification |
| 2026-05-25T00:08:00Z | Orchestrator | B: Check hold | trigger-symbols-v02 and activation-tracks-v02 still unaccepted (not in card-index.md) — stream on hold |
| 2026-05-25T00:08:00Z | Orchestrator | C: Check hold | No queued tasks; awaiting user feedback on v1 editor — stream on hold |
| 2026-05-25T06:02:30Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified ~21h ago (< 48h threshold) — no notification |
| 2026-05-25T06:02:30Z | Orchestrator | B: Check hold | trigger-symbols-v02 and activation-tracks-v02 still unaccepted — stream on hold |
| 2026-05-25T06:02:30Z | Orchestrator | C: Check hold | No new app direction; awaiting user feedback on v1 editor — stream on hold |
| 2026-05-25T07:12:59Z | Orchestrator | A: Scan DESIGN.md | No new items; last notified ~22h ago (< 48h threshold) — no notification |
| 2026-05-25T07:12:59Z | Orchestrator | B: Check hold | trigger-symbols-v02 and activation-tracks-v02 still not in card-index.md — stream on hold |
| 2026-05-25T07:12:59Z | Orchestrator | C: Refactor steps 1–9 complete | All 17 components + 3 services scaffolded: routing, models, services, CardEditor, CardForm, CardPreview, CardList, CardFilter, Layout, SetSelector, all 7 type forms (location/char/item/event/quest/persona/script), EffectEditor, ImageUpload, TriggersEditor, ActionsEditor; app.ts replaced with lean router-outlet shell |

---

## Weekly Review History

| Date | Summary sent | User accepted | New goals set |
|---|---|---|---|
| — | — | — | — |
