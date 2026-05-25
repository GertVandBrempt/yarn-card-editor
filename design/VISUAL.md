# Yarn — Visual Design

> Card visual design reference. Maintained alongside the type baselines in `design/variants/`. See `design/card-index.md` for the full list of per-type baseline files.

---

## 1. Card Dimensions

- **Size:** 375 × 525 px
- **Corner radius:** 12.5 px
- **Frame inset:** 12.5 px (safe area for content)

---

## 2. Frame Style — Tome

The accepted frame style is "Tome": a dark inset box-shadow border with SVG corner and edge polygon ornaments and faint dashed stitching.

- **Border layers:** Four inset box-shadow rings (dark → medium dark → dark → darkest), creating depth without hard lines
- **Corner ornaments:** Layered SVG polygons at each corner — four opacity levels from glow to solid fill
- **Edge ornaments:** Midpoint triangles on each side, matching the corner polygon layers
- **Stitching:** Faint dashed SVG lines along the top/bottom edges and side midpoints — kept at BASELINE darkness; not recolored per type

The structural foundation is `design/BASELINE.html` (Persona palette). All type variants build on top of it.

---

## 3. Typography

| Usage | Font | Weight | Notes |
|---|---|---|---|
| Type band label | Cinzel | 700 | 9 px, letter-spacing 5 px, uppercase |
| Card title | Cinzel | 700 | 26 px |
| Body / effect text | Crimson Text | 400 | Not italic |

---

## 4. Card Type Color Coding

Each card type uses a distinct color palette on the type band, frame accents, card title, and background gradient tint. Colors are applied through CSS variables (`--type-border`, `--type-text`, `--type-glow`, `--bg-top`, `--bg-bot`) and tinted radial gradients.

| Card Type | Color |
|---|---|
| Persona | Amber / gold *(structural baseline)* |
| Location | Green |
| Character — Friendly / Neutral | Yellow |
| Character — Enemy | Red |
| Event | Blue |
| Item | Teal / light blue |
| Main Quest | Deep gold *(more saturated / yellower than Persona amber)* |
| Side Quest | Silver / steel blue |
| Script | Cream / off-white |

### Named Card Visual Accent

Named (set-aside) cards — Setpieces, Main Characters, Key Items, and Fated Events — use their base type color for the type band, title, and tint. Their **SVG frame ornament polygons** are upgraded to bright gold to signal the special tier:

- Corner and edge polygon fills: bright gold at higher opacity
- Stitching and outer border rect: unchanged from BASELINE (not recolored)
- Card-frame inset ring: unchanged from BASELINE

Main Quest Cards are inherently gold and carry no additional accent.

---

## 5. Background Gradient Tints

Two radial gradient overlays sit above the card art:

- **Top overlay** — ellipse anchored at top center, fades downward
- **Body overlay** — ellipse anchored at bottom center, fades upward

Each uses the card type's color mixed into a near-black (e.g. `rgba(10,50,25,.9)` for green). This gives the art a tinted atmospheric quality without washing it out. The outer stop always fades to transparent.

---

## 6. Effect Sections

The mechanics frame (bottom panel) is divided into four sections top-to-bottom:

| Section | Color | Purpose |
|---|---|---|
| Passive | Blue | Always-on effects |
| Trigger — entry | Yellow | On Reveal / On Enter |
| Actions | Red | Player-initiated effects |
| Trigger — exit | Yellow | On Leave / On Discard |

Treatment: 0.15 translucent fill + gradient-fade 1 px top and bottom border per section (opacity 0.7, fading transparent → color 18%–82% → transparent).

### 6.0 Dynamic Container Rule

Mechanics frame containers are **dynamic** in the final rendered card:

- A container is only rendered if it contains at least one effect or action row
- Container height auto-adjusts to its contents — no fixed heights, no empty space
- A card with only triggers shows only the trigger container(s); a card with only actions shows only the actions container; a card with both shows both

This is a rendering rule for the live editor and exported cards. Design variants may include empty containers when useful for reference context.

### 6.1 Effect Display Model

- **No section labels** — section identity is communicated by background color only; do not render "PASSIVE", "ON REVEAL", "ACTION", etc. as text
- **Sym+modifier group** — `[icon][modifier]` is an atomic inline unit; a modifier is either a number (amount) or a short label (set-aside card name); the group floats inline in flowing effect text
- **Row format** — every effect row uses the pattern: `[leading symbol] [effect text]`
  - Trigger rows: leading symbol = trigger symbol (On Reveal, On Enter, On Leave, etc.)
  - Action rows: leading symbol = activation marker for that action's track
  - Passive rows: no leading symbol — effect text only
- **Text and trigger/action rows share the same formatting rules** — no visual distinction between a trigger row and an action row beyond the leading symbol

---

## 7. Icons

Icons are used inline in effect text to represent game concepts. The accepted icon set lives in `design/icons.html` as reusable SVG `<symbol>` definitions.

### Style rules

- **ViewBox:** `0 0 24 24`
- **Stroke:** `#1a0e04`, `stroke-width="2.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- **Shape principle:** single continuous filled surface — one bold shape per icon, no internal line detail
- **Usage pattern:** `<svg width="20" height="20"><use href="#icon-damage"/></svg>` followed by a modifier number

### Trigger symbol style rules

Trigger symbols follow the same sizing and stroke rules as effect icons but use a **unified color scheme** (not per-trigger color):

- **Size:** 20×20, matching effect icons — consistent inline sizing throughout effect rows
- **Body fill:** dark (`#1a0e04` or close variant) — same dark tone used for card frame and strokes
- **Detail / highlight fill:** a single lighter tone (e.g. warm off-white or light amber) for interior shape details — consistent across all trigger symbols
- **No per-trigger color variation** — all trigger symbols share the same dark+light palette; shape alone distinguishes trigger type
- **Display context:** always shown as the leading symbol of a trigger row on a card — never displayed as an isolated reference sheet; variant files must show them in use inside the trigger sections of a real card mockup

### Accepted icons

| ID | Concept | Fill color | Shape |
|---|---|---|---|
| `icon-damage` | Damage | `#f0c030` yellow | Irregular 8-point impact star |
| `icon-shield` | Shield | `#4090e0` blue | Heater shield silhouette |
| `icon-heal` | Heal | `#e84020` red | Heart |
| `icon-scout` | Scout adjacent locations | `#40c8d0` cyan | Eye almond + dark iris |
| `icon-gain-action` | Gain action | `#f0c030` yellow | Lightning bolt |
| `icon-reveal-character` | Reveal a character | `#d4cc30` yellow | Overlapping cards, person pip |
| `icon-reveal-item` | Reveal an item | `#40a0c0` teal | Overlapping cards, diamond pip |

### Die symbols — in design

Each persona die type has a distinct icon used inline in conditional effect text (e.g. "if you rolled 2+ <die-constitution>"). Three die types, one icon each:

| ID | Die type | Persona role |
|---|---|---|
| `icon-die-constitution` | Constitution | Endurance / body |
| `icon-die-zeal` | Zeal | Spirit / drive |
| `icon-die-path` | Path | Mind / skill |

**Style rules (same as all icons):**
- ViewBox `0 0 24 24`; rendered at 20×20 inline
- Stroke: `#1a0e04`, `stroke-width="2.5"`, round linecap/join
- Single bold shape per icon; no internal line detail
- Base shape: a **die face** (cube perspective or flat face) — shape variant distinguishes die type (number of pips, or a unique face symbol per role)
- Do **not** use three identical die shapes; the three types must be visually distinct at a glance at 20 px

Three design options required (see §Review Page Rules).

### Shelved (pending design)

- `icon-move` (boot) — move spaces
- `icon-tuck-character`, `icon-tuck-item` — tuck mechanic

---

## 8. Activation Tracks

Activation tracks appear on cards to represent how a card's actions can be used. All track designs use **shapes, colors, and connecting lines only — no text**. Each design must distinguish:

- **Activation marker** — the slot/shape a player places their activation token onto to use an action
- **Cooldown marker** — a slot/shape that holds a used token during cooldown
- **Trigger marker** — a slot/shape that fires automatically (not player-placed)
- **Token flow path** — lines showing the direction tokens move between markers

### Primitive track types

These are the building blocks. Each describes the lifecycle of a single token on a single track segment:

| Track | Description |
|---|---|
| Basic | Single activation slot; token is removed on use — no cooldown |
| Multi-turn | Single activation slot → cooldown slot → token returns after N turns |
| Multi-use | Multiple activation slots on one track; each can be used independently per round |
| Use | One-time use; token is consumed permanently and not returned |

### Compound track types

AND and OR are **compound containers** — each holds two or more sub-tracks. Each sub-track is a primitive track (Basic, Multi-turn, Multi-use, or Use) with its own activation markers, cooldown slots, and token flow. Visually, sub-tracks are drawn as distinct track segments connected by a shared AND/OR gate element.

| Compound | Gate logic |
|---|---|
| AND | All sub-tracks must have ≥ 1 token on an activation marker simultaneously before any token proceeds further. Once the gate condition is met, each token advances along its own sub-track per that sub-track's rules. |
| OR | Activating any one sub-track (placing a token on its activation marker) disables all other sub-tracks until that sub-track is fully resolved (token returned or consumed). Choice reopens after full resolution. |

**Design note:** nested AND/OR (a sub-track that is itself an AND/OR compound) is conceptually valid but should not be expected in the visual design. Design for one level of nesting only.

### Activation track visual style rules

- **Color scheme:** same dark body + lighter detail palette as trigger symbols — no separate color per track type; shape and structure alone distinguish types
- **Layout:** vertical — each track runs top-to-bottom inside its action row, covering the full width of the action container
- **Simplicity:** minimal shapes only — avoid decoration; a marker is a shape, a flow path is a line or arrow; nothing more
- **Marker size:** all activation markers, cooldown markers, and trigger markers must be the **same size** across all track types — large enough to physically place a standard board game cube (~8 mm, e.g. Pandemic cubes); target ~48 px diameter/side at card scale (375 px wide)
- **Consistent sizing:** all icons and markers across the entire card (effect icons, trigger symbols, activation markers) share the same base size — no marker may be larger or smaller than another
- **One track per card:** each primitive track type (Basic, Multi-turn, Multi-use, Use) gets its own dedicated card variant with one sample action row using that track
- **AND/OR:** hold — design only after all four primitive track types are accepted
- **Display context:** shown in use on a card — leading marker in an action row; include whatever containers are useful for the reference mockup

### Conceptual framework — marker shapes *(locked — 2026-05-25)*

Every marker shape communicates **who or what fires the trigger**. All shapes share the same visual weight and size.

#### Shape vocabulary

The diamond is the **unifying design element** across all marker types. All activation/cooldown markers are variants of the same diamond silhouette — close visual relatives that share a family look while remaining distinct:

| Marker | Shape | Meaning |
|---|---|---|
| **Activation marker** | Diamond with inner diamond | Player-fired trigger — diamond orientation (point up/down); inner diamond signals ready to receive a token |
| **Cooldown slot** | Empty / hollow diamond | Passive wait slot — same outer diamond silhouette as activation marker; no inner element |
| **Cooldown trigger** | Diamond with inner arrow | Auto-fires an effect when token reaches this slot; same outer diamond silhouette; inner arrow distinguishes it as a trigger |
| **Consumed marker** | Square with inner square | Activation marker design rotated 45° — square orientation (flat sides); same inner/outer relationship as activation marker; signals permanent consumption through the rotation alone |

All four marker types share the **same design element** (a shape with an optional inner element) and differ only in orientation and inner detail. The diamond family is unified — a reader familiar with one marker immediately understands the others.

#### Connecting arrows between markers

Sequential markers in a track are connected by **small directional arrows** showing the token's path:

- Activation marker → cooldown slot(s) → (optional cooldown trigger) — all connected by arrows showing flow direction
- **The return arrow looping back from the last slot to the activation marker is not needed and should not be drawn** — the cycle is implicit; the design does not need to depict it

#### The "each marker = its own effect line" rule

Each marker that fires an effect corresponds to exactly one effect row in the card's mechanics frame, with that marker's symbol as the leading icon:
- Activation marker → one effect row, led by the activation marker symbol
- Cooldown trigger → one effect row, led by the cooldown trigger symbol
- Passive cooldown slots (hollow diamonds) → no effect row — they are structural, not triggers

#### Shape usage per track type

- **Basic** — one activation marker; token removed on use; one effect row
- **Multi-turn** — one activation marker → one or more cooldown slots (hollow diamonds) connected by arrows; optionally one or more cooldown triggers (diamond with inner arrow) at any cooldown position, each with its own effect row; no return arrow at the end
- **Multi-use** — multiple activation markers in a row, each connected by flow indicators; each marker = one effect row
- **Use** — one consumed marker (square with inner square — activation marker rotated 45°); permanently consumed; one effect row

---

## 9. Header Elements

### 9.1 Subtitle

The subtitle is a secondary classification label in the header area, rendered **between the type band and the card title** (or below the title — three options required). It is a short designer-defined string (e.g. "Skill", "Instinct", "Coastal Village").

**Known constraints:**
- Must not compete visually with the card title (title is the primary label)
- Must remain legible against the background gradient tint at top of card
- Present only if a subtitle value exists — absent cards must show no empty gap where the subtitle would be

Three design options required (see §Review Page Rules). Each option must show a card with a subtitle present *and* demonstrate what the header looks like without one.

### 9.2 Flavour Text

Flavour text is lore-only prose, rendered in italics, with no mechanical effect. It occupies a designated zone on the card, visually separated from the mechanics frame.

**Known constraints:**
- Must be clearly distinct from effect text — italic treatment is required; a visual separator (rule line, spacing, or fade) between flavour text and mechanics frame is expected
- Flavour text zone should only appear if the card has flavour text — no empty zone on cards without it
- Position: likely below the image zone and above (or within) the mechanics frame — three options required
- Font: Crimson Text italic (same family as body, distinct weight/style)

Three design options required (see §Review Page Rules).

### 9.3 Set Symbol

A small glyph indicating which card set a card belongs to. Provides a quick visual identifier when cards from multiple sets are mixed.

**Known constraints:**
- Must be unobtrusive — small, positioned in a corner or along the card edge (bottom corner preferred)
- Rendered as a simple geometric shape or monogram placeholder for now (actual per-set symbols are future work); the design task is to lock in the **position, size, and visual treatment** — not the specific symbol per set
- Must be legible against the card background at small size (~16–20 px)
- Must work for any card type (appears on every card type that has a set assigned)

Three design options required (see §Review Page Rules).

---

## 10. Review Page Rules

These rules govern how the Card Design orchestrator generates `review/index.html`.

### Three options per design item

Whenever a new visual element is designed, the orchestrator produces **exactly three variants** — option A, option B, option C — each a single card showing that element in context.

- File naming: `<element>-v<N>-a.html`, `<element>-v<N>-b.html`, `<element>-v<N>-c.html`
- Each variant carries a **design ID** as a label: shown both in the HTML comment on line 1 and as a small visible label on the review page (below or overlaid on the card)
- The three options for a design item are presented **side by side** on the review page under that item's group heading
- Options within a round are lettered (a/b/c); if all three are rejected and a new round is needed, bump to v<N+1>

### Review page structure

`review/index.html` is divided into two sections:

1. **Under Review** — design items currently awaiting user acceptance; each item is a named group with its 3 options shown side by side; items are independent of each other
2. **Accepted** — previously accepted baselines; shown as a reference gallery; one entry per accepted item (the winning option only)

Within **Under Review**, items are grouped by design element. Current groups (add as new items are created):

| Group | Design items |
|---|---|
| Die Symbols | icon-die-constitution, icon-die-zeal, icon-die-path (all three as one group) |
| Subtitle | subtitle options |
| Flavour Text | flavour-text options |
| Set Symbol | set-symbol options |
| Activation Tracks | one group per primitive track type: Basic, Multi-turn, Multi-use, Use |
| Trigger Symbols | trigger-symbols group |
| Effects | effects layout group |

Each group has a header with the design element name. Inside, the 3 options for the current design round are shown side by side with their design IDs as labels.

### Independence rule

Each design item group is **fully independent**. A blocked or unaccepted item in one group does not put any other group on hold. The orchestrator creates, iterates, and holds each group independently.

---

## 12. App-Agent Design Task Queue

App agents add entries here when the live preview requires a visual element that is not yet designed. Card Design agents pick these up after completing queued tasks in §7 and §8.

*Format: `- [ ] [short title] — [what the app needs; where it appears in the preview]`*

- [ ] **Trigger symbols in effect rows** — app preview needs `<svg><use href="#trig-reveal"/></svg>` etc. at the leading position of trigger-type effect rows; trigger-symbols-v01 defines candidate symbols, user acceptance needed before integrating into card baselines and app
- [ ] **Activation track widget visuals** — action track sub-form (per track type) needs track diagrams matching §8 spec for the live preview; activation-tracks-v01 defines candidate designs, user acceptance needed
- [ ] **Inline sym+modifier rendering** — effect text with `[icon][modifier]` groups (e.g. `[damage][3]`) needs final inline layout and sizing rules for the effects panel; effects-v03 demonstrates the approach, pending acceptance
- [ ] **Character dual-mode layout** — Character card Ally Mode tab (separate mechanics from Character mode) has no visual template; needed for Character card live preview Ally Mode panel
