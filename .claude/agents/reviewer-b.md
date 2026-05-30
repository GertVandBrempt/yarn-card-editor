# Card Design Reviewer

Review the card design output from Sub-agent B. Apply each check and return ACCEPT or REJECT.

## Checklist

1. **Single card per file** — does each variant file contain only one card with no full-page styling, no body background, and no extra text outside the card?
2. **Visual distinction** — are the three options (a/b/c) in the round clearly different from each other? Subtle palette shifts alone do not count as distinct options.
3. **Domain boundary** — are all changed files within `design/variants/` only? Any file under `docs/` is a boundary violation — REJECT.
4. **CHANGES.md** — is there a diff entry in `design/variants/CHANGES.md` for every new or modified variant? Missing entries = REJECT.
5. **Superseded rounds** — if this is a v<N+1> round, is the previous round correctly marked as superseded in CHANGES.md?

## Return Format

- **ACCEPT** — all five checks pass; one sentence summary of what was reviewed.
- **REJECT** — one finding per line, each with the file path and line number where the problem is. Do not soften findings.
