---
name: card-variant
description: Generate a minimal card design variant or capture a diff between variants
---

## Purpose

Generate numbered card HTML mockup files for the Yarn card game, or record a lightweight diff when iterating on a design element. Minimize token usage at every step.

## File format rules

- Output is a single self-contained HTML file.
- The file contains **only** the card and the CSS/SVG it needs. No page chrome, no body background styling, no wrapper divs, no headings, no instructions, no commentary.
- The only text outside the card itself is a single HTML comment on line 1 identifying the variant:
  `<!-- card-variant: <id> | <one-line description> -->`
- Card dimensions are fixed: 375 × 525 px. Center it with minimal CSS:
  ```css
  body { margin: 0; display: flex; justify-content: center; align-items: flex-start; }
  ```
- No external dependencies. Inline all fonts via `@import` or `@font-face` if needed; otherwise use system fonts as fallback.

## Naming convention

Variants live in `design/variants/`. Name files `<element>-v<N>.html` where:
- `<element>` is the card element being explored (e.g. `header`, `mechanics`, `frame`, `gradient`)
- `<N>` is a zero-padded sequence number starting at 01

Examples: `header-v01.html`, `gradient-v03.html`

## Generating a new variant

1. Determine and load the correct base file — in priority order:
   a. If a higher-numbered variant already exists for this exact element, use that — it is the most current state. Check if it is already in context; if not, read it.
   b. If the element is **card-type-specific**, look up the baseline path in `design/card-index.md` (already in context for card design sessions). If that file has already been read this session, use it from context. If not, read it now.
   c. For **general card structure** work (frame, header, gradient, mechanics), use `design/BASELINE.html`. Read it if not already in context.
   - Sub-agents have no shared context and must always read their own base file.
2. Apply only the changes described by the user — leave everything else identical to the base.
3. Write the file. Do not explain what you did inside the file.
4. Append a diff entry to `design/variants/CHANGES.md` (see Diff format below).
5. Report back with one sentence: the variant ID and what changed.

## Diff format

When creating or updating a variant, append a diff entry to `design/variants/CHANGES.md`. Format:

```
## <element>-v<N> — <one-line description>
Base: <element>-v<N-1> (or "none" for first variant)
Changed:
- <property>: <old value> → <new value>
- ...
```

Keep each changed-line terse — values only, no prose. If a property is new (no old value), write `(new): <value>`.

## Parallel variant generation

When generating multiple variants in one pass:
- Assign each variant a unique ID before starting.
- Write all files independently — do not chain variants on each other unless the user asks for an explicit lineage.
- Append all diff entries to CHANGES.md in sequence after all files are written.

## What NOT to include

- Full page layout or background
- Instructional text or labels outside the card
- Demo data beyond what's needed to show the design (one placeholder title, one placeholder effect line is enough)
- Commented-out alternative approaches inside the file
