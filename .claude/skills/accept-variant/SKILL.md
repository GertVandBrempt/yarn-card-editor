---
name: accept-variant
description: Promote an accepted card design variant into design/BASELINE.html
---

## Purpose

When the user accepts a variant, merge its changes into `design/BASELINE.html` so future variants start from the correct base.

## Steps

1. Identify the accepted variant file (user names it, or it is the most recent variant discussed).

2. Read `design/BASELINE.html` and the accepted variant file.

3. Merge the accepted changes into BASELINE.html:
   - Copy only the parts that changed (CSS rules, HTML structure) from the variant into BASELINE.
   - Do NOT copy the variant's first-line `<!-- card-variant: ... -->` comment.
   - Keep BASELINE's first-line comment exactly: `<!-- baseline: accepted card design | update via /accept-variant when a new variant is approved -->`
   - Keep any existing BASELINE sections that the variant did not touch.

4. Write the updated BASELINE.html.

5. Append an entry to `design/variants/CHANGES.md`:
   ```
   ## BASELINE updated — <date>
   Accepted: <variant file>
   Merged: <one-line description of what changed>
   ```

6. Update `design/VISUAL.md` — add or update the section that describes the accepted design element. If the element already has a section, revise it to reflect the new state. Keep entries concise; document the visual rule, not the iteration history.

7. Update `RESUME.md` — set Current task and Decisions made to reflect the newly accepted design.

8. Report: one sentence confirming what was merged.
