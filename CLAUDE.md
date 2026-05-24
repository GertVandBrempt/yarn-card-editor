# Yarn — Claude Instructions

## Project Context

Yarn is a tabletop emergent story generator. This repo contains two things:

- **`DESIGN.md`** — the card game design document (domain model, rules, mechanics)
- **`yarn-card-editor/`** — a locally-hosted Angular app for creating and managing cards

The Angular app is a **card editor**, NOT the game itself. Do not model game-runtime concepts (play areas, tucking, turn order, dice resolution) as first-class editor features. Those belong in DESIGN.md as game mechanics, not in the editor's data model or UI.

## Domain Glossary

### Editor domain [EDITOR]
Concepts that exist in the Angular app's data model and UI:

- **Card** — the primary entity being created/edited
- **Card type** — Location, Character, Item, Event, Quest, Persona, Script
- **Frame** — the visual template for a card (e.g. "Tome" style)
- **Header** — type band + title + subtitle area at the top of a card
- **Image layer** — full-bleed art behind the card content
- **Mechanics frame** — the bottom panel containing effects and actions
- **Effect** — Rolled, Fixed, or Complex effect on a card
- **Action** — player-initiated effect with an activation marker
- **Trigger** — event-driven effect (On Reveal, On Enter, On Leave, etc.)
- **Card set** — a named collection of cards (Quest Set, Location Set, etc.)

### Game domain [GAME] — not first-class editor concepts
Concepts that are game-state mechanics, not editor entities:

- **Play areas** (Tableau, Game Area, Set-Aside, Draw Area) — runtime state, not editor fields
- **Tucking** — a runtime card-placement mechanic, not a card property to edit
- **Turn order** — game flow, not editor concern
- **Dice resolution** — gameplay mechanic, not editor data
- **Life Point Slots** — rendered on the card but not tracked in the editor's game state

## Session Types

Each session has a type declared via `/resume`. Each type loads a specific set of files into context — read once at session start, referenced throughout.

| Session Type | Files Loaded at Start | Additional On-Demand |
|---|---|---|
| **game design** | `DESIGN.md` | — |
| **app design** | *(none — CLAUDE.md provides domain context)* | — |
| **card design** | `design/VISUAL.md`, `design/card-index.md` | Per-type baselines from card-index, loaded only when work on that type begins |

## Visual Design

Visual design is documented in `design/VISUAL.md`. Per-type HTML baseline files are indexed in `design/card-index.md`. Do not change any baseline unless the user explicitly asks to revisit it.

## Working Style

- For game design work: review `DESIGN.md` before making changes that touch the domain model
- For card design work: check `design/VISUAL.md` and `design/card-index.md` — both loaded at session start by `/resume`
- Re-read a file before editing it if it may have changed since the last read
- **Update `RESUME.md` at the end of every meaningful unit of work** — task complete, design decision locked, or before stopping. Use the format defined in `.claude/skills/resume/SKILL.md`. This is the single most important habit for surviving usage-limit interruptions.
- **Update `design/VISUAL.md` whenever a design element is finalized** — a reference file is created, a variant is accepted, or a visual pattern is locked in. Iteration (writing variants, logging diffs) does not require a VISUAL.md update; finalization always does.
- At the start of a new session, run `/resume` to reload context before doing anything else.

## Session Skills

- `/resume` — load context at session start (reads VISUAL.md, card-index.md, RESUME.md)
- `/finish-session` — close out a session; updates VISUAL.md, card-index.md, and RESUME.md
- `/card-variant` — generate or iterate a card HTML mockup
- `/accept-variant` — promote a variant to its type baseline; updates card-index.md and VISUAL.md

## Card Variant Files

Use the `/card-variant` skill for all card HTML mockup work. Key rules:

- A variant file contains **only the card** — no full page styling, no body backgrounds, no extra text
- The only non-card content is a single comment on line 1: `<!-- card-variant: <id> | <description> -->`
- Variants live in `design/variants/` named `<element>-v<N>.html`
- When iterating, capture changes as a lightweight diff entry in `design/variants/CHANGES.md` — not by rewriting prose, not by bloating the HTML file
- Goal: minimize token usage at every step. Write only what changes.
