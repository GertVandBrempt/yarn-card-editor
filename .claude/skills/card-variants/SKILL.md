---
name: card-variants
description: Generate multiple card design variants in parallel using sub-agents. Each agent writes one variant independently; results are collected into CHANGES.md.
---

## Purpose

Spawn N parallel sub-agents to generate card design variants simultaneously. Use this instead of sequential iteration — it preserves session budget and produces a comparable set in one pass.

## Steps

### 1. Parse the request

Extract from the user's message:
- **Element** — the card part being explored (e.g. `header`, `gradient`, `mechanics`, `frame`, or a card type like `location`, `char-enemy`)
- **Variants** — a list of (direction, description) pairs, one per variant to generate
- **Base** — determined by this priority order:
  1. The most recent existing variant file for this element (highest version number), if one exists
  2. If the element is **card-type-specific** (`location`, `location-setpiece`, `event`, `event-fated`, `char-friendly`, `char-enemy`, `char-main`, `item`, `item-key`, `quest-main`, `quest-side`): `design/variants/<type>-v01.html`
  3. For **general card structure** elements: `design/BASELINE.html`

Check `design/variants/` for existing files to determine the next available version numbers.

### 2. Spawn parallel agents

Use the Agent tool to launch all agents in a single message (parallel, not sequential). Sub-agents have the Read tool and run in the same working directory. The orchestrator (main session) resolves the correct base file for each agent using `design/card-index.md` (already in context) and passes the resolved path directly — sub-agents do not need to read the index.

Use this prompt template per agent (fill in the bracketed values):

---
```
You are generating a single card design variant for the Yarn card game.

Output file: design/variants/[element]-v[NN].html

Step 1: Read `.claude/skills/card-variant/SKILL.md` — this defines all file format rules, naming conventions, and the diff entry format. Follow it exactly.

Step 2: Read the base file specified below. This is the only file you need to read for the starting design — do not read any other design files.

BASE FILE: [resolved path — provided by the orchestrator: most recent existing variant for this element if one exists; otherwise the type baseline for card-type work; otherwise design/BASELINE.html]
Read this file and use it as the starting point.

DESIGN DIRECTION FOR THIS VARIANT:
[specific direction for this variant]

Step 3: Apply ONLY the changes described in the design direction. Leave everything else identical to the base.

Step 4: Use minimal placeholder content — one card title, one effect line. Enough to show the design, no more.

Step 5: Write the output file.

Step 6: Return ONLY a CHANGES.md entry as defined in the card-variant skill. Nothing else.
```
---

### 3. Collect and write results

After all agents complete:
1. Create `design/variants/CHANGES.md` if it does not exist.
2. Append all returned CHANGES.md entries in version order (lowest N first).

### 4. Report back

One line per variant: `[element]-v[NN] — [description]`. Nothing else.
