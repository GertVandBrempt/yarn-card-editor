---
name: finish-session
description: Close out a work session by ensuring all persistent files are up to date
---

## Purpose

Run at the end of any session to make sure nothing is left undocumented. Checks and updates the three files that carry state across sessions: `VISUAL.md`, `RESUME.md`, and `design/card-index.md`.

## Steps

1. **Review the session** — scan the conversation for design decisions made, files changed, and work completed or parked.

2. **Update `design/VISUAL.md`** — if any design element was finalized this session (patterns locked in, reference files created, decisions accepted), add or update the relevant section. Skip if nothing was finalized.

3. **Update `design/card-index.md`** — if any card type baseline changed (new variant accepted, file path updated), reflect that here. Skip if unchanged.

4. **Update `RESUME.md`** — always. Use this format:

```markdown
# Resume State

Updated: <date>

## Current task
<one sentence: what is actively in progress>

## Next action
<the exact next step — specific enough that a fresh session can start without asking>

## Files touched this session
- <file path> — <one-line note>

## Decisions made
- <decision> — <why, in one clause>

## Parked / not started
- <item> — <brief note>
```

5. Report: confirm which files were updated and which were skipped (with reason).
