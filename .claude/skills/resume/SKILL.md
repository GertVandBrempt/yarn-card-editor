---
name: resume
description: Brief the session from RESUME.md so interrupted work can continue exactly where it left off
---

## Purpose

Read RESUME.md and give a concise session brief so the user can continue work without re-explaining context.

## Steps

1. Read `RESUME.md`. If the file does not exist or is empty, say: "No resume state found. What would you like to work on?" and wait.

2. Output a brief (≤ 10 lines) covering:
   - **Current task:** what was in progress
   - **Files touched:** which files were modified last session
   - **Decisions made:** any design choices locked in

3. List the pending next actions from RESUME.md as a numbered menu and ask: "Which would you like to tackle first?" — wait for the user to reply.

4. Based on what the user wants to work on, read the relevant files **once**:
   - **game design work** → read `DESIGN.md`
   - **app design work** → no additional files
   - **card design work** → read `design/VISUAL.md`, then read `design/card-index.md`

5. Confirm what was loaded in one line (e.g. "Loaded: DESIGN.md. Ready."), then proceed with the chosen task.

Do not start any work until the user replies in step 3.

## On-demand loading (card design sessions)

Individual card type baseline files are **not** loaded at session start. When work begins on a specific card type:
- Look up its file in `design/card-index.md` (already in context)
- Read that file **once**
- Reference it from context for the rest of the session — do not re-read it

Sub-agents spawned via the Agent tool have no shared context and must read their own files independently.

## Updating RESUME.md

Update RESUME.md at the end of every meaningful unit of work (task complete, design decision locked, or before stopping). Format:

```markdown
# Resume State

Updated: <date>

## Current task
<one sentence describing what is actively in progress>

## Next action
<the exact next step — specific enough that a fresh session can start without asking>

## Files touched this session
- <file path> — <one-line note on what changed>

## Decisions made
- <decision> — <why, in one clause>

## Parked / not started
- <item> — <brief note>
```

Keep each section tight. The goal is a brief that fits in one read without scrolling.
