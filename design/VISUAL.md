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
| Body / effect text | Crimson Text | 400 / italic | — |

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

---

## 7. Icons

Icons are used inline in effect text to represent game concepts. The accepted icon set lives in `design/icons.html` as reusable SVG `<symbol>` definitions.

### Style rules

- **ViewBox:** `0 0 24 24`
- **Stroke:** `#1a0e04`, `stroke-width="2.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- **Shape principle:** single continuous filled surface — one bold shape per icon, no internal line detail
- **Usage pattern:** `<svg width="20" height="20"><use href="#icon-damage"/></svg>` followed by a modifier number

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

### Shelved (pending design)

- `icon-move` (boot) — move spaces
- `icon-tuck-character`, `icon-tuck-item` — tuck mechanic
- `icon-die-constitution`, `icon-die-zeal`, `icon-die-path` — persona dice
