# Variant Changes Log

Entries appended by `/card-variants`. Format per entry:

```
## <element>-v<N> — <description>
Base: <base file or "none">
Changed:
- <property>: <old> → <new>
```

---

## ACCEPTED — 2026-05-28
- **effects-container-v04** ✅ — gradient-fade section borders at 0.7 opacity; 0.15 translucent fill per section; locked into VISUAL.md §6
- **set-symbol-v01-a** ✅ — bottom-right circular container, diamond glyph, amber ring, 18px; locked into VISUAL.md §9.3
- **flavour-text-v01-c** ✅ — borderless inset at bottom of mechanics frame; gradient-fade top only; Crimson Text 14px italic; locked into VISUAL.md §9.2
- **subtitle-v01-a** ✅ — below title, Cinzel 400 italic amber, centre rule separator, absent = title shifts down; locked into VISUAL.md §9.1
Orchestrator: update all card type baselines to incorporate these four accepted designs; regenerate review page (move items to Accepted section)

---

## char-enemy-v01 — red type palette (enemy character)
Base: design/BASELINE.html
Changed:
- --bg-top: #221004 → #140200
- --bg-bot: #180c02 → #0c0200
- --type-border: #7a4818 → #781818
- --type-text: #c8860c → #c82020
- --type-glow: rgba(160,90,10,0.28) → rgba(160,30,20,0.28)
- .card-fill: #0d0a06 → #0a0404
- type-label: Persona → Enemy

## char-main-v01 — warm neutral type + golden frame ornaments (main character)
Base: design/BASELINE.html
Changed:
- --bg-top/bot: dark amber → warm dark (#0e0a04 / #080602)
- --type-border/text/glow: adjusted warm gold (#786018 / #c8a010 / rgba(160,140,10,0.28))
- .card-fill: #0d0a06 → #0a0a06
- SVG frame polygon fills: dark wood → golden (#c89820 / #a07018 / #4a3208 / #b08820)
- SVG stitch line strokes: #281806 → #3a2c00
- card-frame ring: #3a2410 → #3a2c00
- type-label: Persona → Main Character

## event-fated-v01 — blue type + golden frame ornaments
Base: design/BASELINE.html
Changed:
- --bg-top/bot: dark amber → dark blue (#030612 / #020408)
- --type-border/text/glow: amber → blue (#1a3878 / #4878c8 / rgba(30,70,160,0.28))
- .card-fill: #0d0a06 → #040608
- SVG frame polygon fills: dark wood → golden (#c89820 / #a07018 / #4a3208 / #b08820)
- SVG stitch line strokes: #281806 → #3a2c00
- card-frame ring: #3a2410 → #3a2c00
- type-label: Persona → Fated Event

## event-v01 — blue type palette
Base: design/BASELINE.html
Changed:
- --bg-top: #221004 → #030612
- --bg-bot: #180c02 → #020408
- --type-border: #7a4818 → #1a3878
- --type-text: #c8860c → #4878c8
- --type-glow: rgba(160,90,10,0.28) → rgba(30,70,160,0.28)
- .card-fill: #0d0a06 → #040608
- type-label: Persona → Event

## location-v01 — green type palette
Base: design/BASELINE.html
Changed:
- --bg-top: #221004 → #050e08
- --bg-bot: #180c02 → #020c04
- --type-border: #7a4818 → #1a6030
- --type-text: #c8860c → #40b060
- --type-glow: rgba(160,90,10,0.28) → rgba(30,120,60,0.28)
- .card-fill background: #0d0a06 → #060a06
- type-label: Persona → Location

## effects-container-v02 — top/bottom border sections, amber-dark palette
Base: design/effects_container.html (scaled to 375×525)
Changed:
- mechanics frame: divided into 4 sections (passive / on-reveal+enter / actions / on-leave+discard)
- section treatment: no fill; top+bottom hairline borders per section; left accent line at 60% opacity
- border colors: amber / rose-copper / deep rust / muted teal-stone (all within existing dark palette)
- content: empty containers only, no text or icons
- card dimensions: 300×420 → 375×525

## effects-container-v01 — full body color sections, translucent bright fills
Base: design/effects_container.html (scaled to 375×525)
Changed:
- mechanics frame: divided into 4 sections (passive / on-reveal+enter / actions / on-leave+discard)
- section treatment: full translucent fill, bright saturated colors (amber / teal / ember / violet)
- section dividers: hairline gradient between adjacent section colors
- content: empty containers only, no text or icons
- card dimensions: 300×420 → 375×525

## effects-container-v04 — gradient-fade borders (v02 style)
Base: design/variants/effects-container-v03.html
Changed:
- borders: hard solid → gradient fade (transparent → color 18%–82% → transparent), opacity 0.7

## char-friendly-v01 — yellow type palette (friendly character)
Base: design/BASELINE.html
Changed:
- --bg-top: #221004 → #141000
- --bg-bot: #180c02 → #0c0a00
- --type-border: #7a4818 → #6a5018
- --type-text: #c8860c → #c8a820
- --type-glow: rgba(160,90,10,0.28) → rgba(150,130,20,0.28)
- .card-fill: #0d0a06 → #0a0a04
- type-label: Persona → Friendly

## effects-container-v03 — triggers unified yellow, more translucent fills, hard borders
Base: design/variants/effects-container-v01.html
Changed:
- passive color: amber → blue (rgba(48,120,240,0.15), border #3078f0)
- trigger color: teal+violet → unified yellow (rgba(240,200,48,0.15), border #f0c830) for both on-reveal/enter and on-leave/discard
- action color: red kept, opacity reduced to 0.15
- fill opacity: 0.28 → 0.15 (more translucent)
- borders: gradient fade → hard solid 1px top+bottom per section

## quest-side-v01 — silver/steel type palette (side quest)
Base: design/BASELINE.html
Changed:
- --bg-top: #221004 → #0a0c10
- --bg-bot: #180c02 → #080a0e
- --type-border: #7a4818 → #506878
- --type-text: #c8860c → #90a8b8
- --type-glow: rgba(160,90,10,0.28) → rgba(100,130,160,0.28)
- .card-fill: #0d0a06 → #080a0c
- type-label: Persona → Side Quest

## location-setpiece-v01 — green type + golden frame ornaments
Base: design/BASELINE.html
Changed:
- --bg-top/bot: dark amber → dark green (#050e08 / #020c04)
- --type-border/text/glow: amber → green (#1a6030 / #40b060 / rgba(30,120,60,0.28))
- .card-fill: #0d0a06 → #060a06
- SVG frame polygon fills: dark wood → golden (#c89820 / #a07018 / #4a3208 / #b08820)
- SVG stitch line strokes: #281806 → #3a2c00
- card-frame ring: #3a2410 → #3a2c00
- type-label: Persona → Setpiece

## quest-main-v01 — deep gold type palette (main quest)
Base: design/BASELINE.html
Changed:
- --bg-top: #221004 → #1a1000
- --bg-bot: #180c02 → #100a00
- --type-border: #7a4818 → #7a6010
- --type-text: #c8860c → #c8a000
- --type-glow: rgba(160,90,10,0.28) → rgba(160,140,0,0.28)
- .card-fill: #0d0a06 → #0e0a00
- type-label: Persona → Main Quest

## item-v01 — light blue/teal type palette
Base: design/BASELINE.html
Changed:
- --bg-top: #221004 → #030c12
- --bg-bot: #180c02 → #020a10
- --type-border: #7a4818 → #1a6080
- --type-text: #c8860c → #40a0c0
- --type-glow: rgba(160,90,10,0.28) → rgba(30,120,160,0.28)
- .card-fill: #0d0a06 → #04080e
- type-label: Persona → Item

## item-key-v01 — teal type + golden frame ornaments (key item)
Base: design/BASELINE.html
Changed:
- --bg-top/bot: dark amber → dark teal (#030c12 / #020a10)
- --type-border/text/glow: amber → teal (#1a6080 / #40a0c0 / rgba(30,120,160,0.28))
- .card-fill: #0d0a06 → #04080e
- SVG frame polygon fills: dark wood → golden (#c89820 / #a07018 / #4a3208 / #b08820)
- SVG stitch line strokes: #281806 → #3a2c00
- card-frame ring: #3a2410 → #3a2c00
- type-label: Persona → Key Item

## quest-main-v02 — richer amber-gold palette + gold frame ornaments
Base: quest-main-v01
Changed:
- --bg-top/bot: #1a1000/#100a00 → #120900/#0d0700
- --type-border: #7a6010 → #8a7020
- --type-text: #c8a000 → #d4a808
- --type-glow: rgba(160,140,0,0.28) → rgba(180,145,8,0.35)
- .card-fill: #0e0a00 → #0f0900
- grad-top/body tint: rgba(75,60,0) → rgba(88,65,0) outer, rgba(52,42,0) → rgba(62,48,0) inner
- .card-title color: #d8c040 → #f0c020
- SVG frame polygon fills: dark wood → golden (#f0c030/0.40, #d4a020/0.55, #7a5c08/0.92, #e0b820/0.68)
- SVG edge/midpoint polygon fills: dark wood → golden (#7a5c08/0.88, #e0b820/0.60)

## char-friendly-v02 — brighter lemon-yellow palette, distinct from gold
Base: char-friendly-v01
Changed:
- --bg-top/bot: #141000/#0c0a00 → #101000/#0a0a00
- --type-border: #6a5018 → #787830
- --type-text: #c8a820 → #d0cc30
- --type-glow: rgba(150,130,20,0.28) → rgba(185,185,30,0.28)
- .card-fill: #0a0a04 → #0a0a02
- grad-top/body tint: rgba(65,55,0) → rgba(55,55,0) outer, rgba(45,38,0) → rgba(38,38,0) inner
- .card-title color: #d8c060 → #e0dc40

## effects-v01 — effect rows with icons in mechanics frame, no exit trigger
Base: design/BASELINE.html
Changed:
- .mech-frame height: 231px → 175px (sec-leave removed)
- .sec-leave: removed
- (new): .effect-row — flex row, icon 20px + .effect-num, padding 0 14px
- (new): .effect-num — Crimson Text 18px italic, rgba(220,200,160,0.9)
- (new): icon symbols inlined — icon-shield, icon-reveal-character, icon-damage
- sec-passive content: icon-shield + 1
- sec-trigger content: icon-reveal-character + 2
- sec-actions content: icon-damage + 3

## effects-v02 — section labels + text labels + two action rows, mech-frame 200px
Base: design/variants/effects-v01.html
Changed:
- .mech-frame height: 175px → 200px
- .sec: added flex column layout (display flex, flex-direction column)
- (new): .sec-label — 7.5px Cinzel 700, 3px letter-spacing, 18px height, section color at 55% opacity
- .sec-passive height: 46px → 56px
- .sec-trigger height: 46px → 56px
- .sec-actions height: 81px → 86px
- .effect-row: height 100% → flex:1 + min-height:0 (fills section after label)
- .effect-row gap: 6px → 8px
- (new): .effect-label — Crimson Text 13px italic, rgba(220,200,160,0.65), flex:1
- sec-passive content: + "Passive" sec-label; effect-row adds "Armor" label
- sec-trigger content: + "On Reveal" sec-label; effect-row adds "Reveal Character" label
- sec-actions content: + "Action" sec-label; adds second row icon-heal + "Mend" 1
- (new): icon-heal symbol — heart path, fill #e84020 red, stroke #901808

## All type palettes accepted — 2026-05-17
Accepted as baselines (card-index.md updated):
- location-v01, location-setpiece-v01
- event-v01, event-fated-v01
- char-friendly-v02 (supersedes v01), char-enemy-v01, char-main-v01
- item-v01, item-key-v01
- quest-main-v02 (supersedes v01), quest-side-v01

## script-v01 — Script card v1, turn schedule layout (2026-05-24)
Base: design/BASELINE.html (adapted — no art layer, custom schedule layout)
Changed:
- --bg-top/bot: amber → deep purple (#0c0618 / #080410)
- --type-border/text/glow: amber → purple (#4a2878 / #9870d8 / rgba(100,60,180,0.28))
- .card-fill: #0d0a06 → #080610
- card-frame rings: amber-wood tones → purple-dark (#06030e / #2a1450 / #06030e / #100820)
- SVG frame polygon fills: dark wood → dark purple (#4a2878 / #3a1860 / #200c40 / #3a2060)
- SVG stitch line strokes: #281806 → #180830
- type-label: Persona → Script
- Layout: replaced art + grad layers + mech-frame with .script-panel (schedule table)
- Schedule panel: header (Turn / Events / Fated) + 7 turn rows (44px) + loop indicator
- NOTE: purple is a placeholder colour — not yet added to VISUAL.md; awaiting user confirmation

## trigger-symbols-v02 — redesigned 6 trigger symbols per §7: dark body + lighter detail, no per-trigger color variation (2026-05-24)
Base: design/variants/trigger-symbols-v01.html (concept only — display format completely replaced)
Changed:
- Display format: isolated 3×2 reference grid → real card mockup (375×525 Persona card, "The Wanderer")
- Symbol palette: per-trigger color fills (yellow/green/orange/purple/green/blue) → unified dark body (#1a0e04) + warm light amber detail (#d4b87a)
- trig-reveal: colored 5-point star → sunburst: dark ring + 8 radiating dark spokes with light amber tip circles + light center pip
- trig-enter: green solid forward arrow → threshold arch: dark arch/portal body + light amber inward-pointing arrow (chevron+tail)
- trig-leave: orange solid backward arrow → exit arrow: dark rightward arrow block + light amber horizontal slot notch in tail
- trig-char-phase: purple solid hexagon → clock dial: dark filled circle + light amber clock-face ring, hour hand, minute hand, center pip
- trig-complete: green solid checkmark → hexagonal badge: dark hexagon body + light amber bold checkmark stroke
- trig-flow-marker: blue solid chevron → track-advance: dark outer chevron + dark left-edge marker block + light amber inner chevron fill + light marker face
- Card mockup: trigger-entry section expanded to 2 rows (trig-reveal + trig-enter); trigger-exit section expanded to 4 rows (trig-leave + trig-char-phase + trig-complete + trig-flow-marker); mech-frame height 200px → 260px
- Activation marker in actions row: unchanged placeholder (§8 redesign deferred to activation-tracks-v02)

## activation-track-basic-v01-b — Basic track option B: diamond marker (2026-05-25)
Base: design/variants/activation-track-basic-v01-a.html
Changed:
- Activation marker shape: circle → diamond (45° rotated square, sharp geometric edges)
- Outer body: dark circle r=22 → dark diamond points="26,8 48,30 26,52 4,30"
- Diamond border stroke: #d4b87a, width 2, opacity 0.55 (emphasizes sharp edges)
- Inner token face: light circle r=9 → amber diamond half-diagonal 13
- Center pip: dark circle r=3.5 → dark diamond half-diagonal 5 (rotated square)
- Exit arrow: same downward exit line + arrowhead as option A
- viewBox: 0 0 52 80 (unchanged)

## activation-track-basic-v01-c — Basic track option C: hexagon marker with glow (2026-05-25)
Base: design/variants/activation-track-basic-v01-a.html
Changed:
- Activation marker shape: circle → flat-top hexagon (6-sided, horizontal flat edges)
- Outer body: dark circle → dark flat-top hexagon inscribed-radius 22, fill #1a0e04
- Hexagon edge stroke: #d4b87a, width 2.5, opacity 0.55
- Glow halo: SVG filter (feGaussianBlur stdDeviation=3) on larger amber hex opacity 0.18
- Inner token face: light circle → amber hexagon R=11, opacity 0.75
- Center pip: dark circle r=3.5 (unchanged)
- Exit arrow: same downward exit line + arrowhead
- viewBox: 0 0 52 84 (slightly taller to accommodate flat-top hex)
- Added: filter id="hex-glow" for soft ambient glow treatment

## activation-track-multiturn-v01-a — Multi-turn track option A: circle + squares + dashed return (2026-05-25)
Base: design/variants/activation-track-basic-v01-a.html (circle marker style)
Changed:
- Track type: Basic (single slot, exit) → Multi-turn (activation + 2 cooldown + return)
- mech-frame height: 100px → 160px (taller to fit full track)
- Activation marker: circle r=19 (dark body) + r=14 ring + r=10 face + r=3.5 pip
- Cooldown slot 1: dark square 22×22 with inner amber square 12×12, opacity 0.55
- Cooldown slot 2: same as cooldown slot 1
- Flow arrows: solid downward arrowheads between each slot (pointing down)
- Return path: dashed left-side lines (stroke #d4b87a, dasharray 3,3, opacity 0.7)
  — horizontal stub from cooldown 2 left edge → vertical up to activation height
  — return arrowhead pointing right back into activation circle
- viewBox: 0 0 52 154

## activation-track-multiturn-v01-b — Multi-turn track option B: diamond + round cooldowns + curved return (2026-05-25)
Base: design/variants/activation-track-basic-v01-b.html (diamond marker style)
Changed:
- Track type: Basic (single slot, exit) → Multi-turn (activation + 2 cooldown + return)
- mech-frame height: 100px → 160px
- Activation marker: diamond (outer half-diag=20, inner amber half-diag=12, pip half-diag=4)
- Cooldown slot 1: small dark circle r=11 + amber ring stroke r=8 (not filled, ring only) + center dot r=3 opacity 0.4
- Cooldown slot 2: same as cooldown slot 1
- Flow arrows: solid downward arrowheads between slots
- Return path: dashed cubic bezier curve on right side (M 37,112 C 50,112 50,24 37,24)
  — curved path visually distinct from option A's straight lines
  — return arrowhead pointing left back into the diamond
- viewBox: 0 0 52 154

## activation-track-multiturn-v01-c — Multi-turn track option C: hexagon + elongated capsules + dotted return (2026-05-25)
Base: design/variants/activation-track-basic-v01-c.html (hexagon marker style)
Changed:
- Track type: Basic (single slot, exit) → Multi-turn (activation + 2 cooldown + return)
- mech-frame height: 100px → 160px
- Activation marker: flat-top hexagon R=18 (dark body, amber edge stroke, inner hex R≈9, dark pip r=3)
- Cooldown slot 1: elongated capsule (pill) shape: rect 36×14 rx=7, dark fill, amber edge, inner capsule 26×8 rx=4
- Cooldown slot 2: same as cooldown slot 1
- Connectors: dotted lines between slots (stroke-dasharray 2,2, opacity 0.5)
  — softer connectors visually distinct from flow arrows (A) and no connectors (B)
- Return path: dotted left-side path (dasharray 2,2, opacity 0.65)
  — same geometry as option A but dotted vs dashed
  — return arrowhead pointing right back into hex
- viewBox: 0 0 52 154

## activation-track-multiturn-v02-a — Multi-turn track v02 option A: diamond+inner-diamond activation, 2 hollow cooldown diamonds, directional arrows, no return arrow (2026-05-25)
Base: design/variants/activation-track-multiturn-v01-a.html (structure reused; shapes completely replaced per locked §8 spec)
Changed:
- Activation marker shape: circle → diamond with inner diamond (outer half-diag=20, inner half-diag=10, pip half-diag=4)
- Cooldown slot 1 & 2: filled squares → hollow/empty diamonds (outer half-diag=16, amber edge stroke, no inner element)
- Return arc: REMOVED — no return arrow per §8 locked spec
- Slot count: 2 cooldown slots (unchanged from v01-a)
- Cooldown trigger: absent
- viewBox: 0 0 52 136

## activation-track-multiturn-v02-b — Multi-turn track v02 option B: diamond+inner-diamond activation, 3 cooldown slots including a cooldown trigger in slot 2, directional arrows, no return arrow (2026-05-25)
Base: design/variants/activation-track-multiturn-v02-a.html
Changed:
- Slot count: 2 cooldown slots → 3 cooldown slots (more than option A)
- Cooldown trigger added at slot 2 position: same outer diamond silhouette as hollow slots; inner arrow (bold amber downward-pointing arrow) distinguishes it as a trigger
- Cooldown trigger fires its own effect row → card now has TWO action rows (activation + cooldown trigger)
- Second effect row leading marker: cooldown trigger symbol (diamond+inner arrow, 32×32 rendered)
- Row divider: hairline gradient line between action rows
- mech-frame height: 150px → 230px (taller to fit 2 rows + full 4-slot track)
- viewBox for full track: 0 0 52 165

## activation-track-multiturn-v02-c — Multi-turn track v02 option C: diamond+inner-diamond activation, 1 hollow cooldown diamond, generous spacing, no cooldown trigger, no return arrow (2026-05-25)
Base: design/variants/activation-track-multiturn-v02-a.html
Changed:
- Slot count: 2 cooldown slots → 1 cooldown slot (fewer than option A)
- Marker sizes increased: activation outer half-diag 20 → 22; cooldown outer half-diag 16 → 18 (larger shapes, airy layout)
- Spacing: arrow between activation and cooldown lengthened from ~9px gap → ~20px gap
- Cooldown trigger: absent
- Return arrow: absent (consistent with all v02)
- mech-frame height: 150px → 130px (shorter — only 1 cooldown slot)
- viewBox: 0 0 52 108

## activation-track-multiuse-v01-a — Multi-use track option A: 3 filled diamond slots, vertical layout, compact spacing (2026-05-25)
Base: design/variants/activation-track-multiturn-v02-a.html (CSS/frame structure reused; track SVG and row layout replaced)
Changed:
- Track type: Multi-turn (activation + cooldown slots + arrows) → Multi-use (multiple independent activation slots)
- Slot count: 3 (compact)
- Layout: VERTICAL — each slot is the leading symbol for its own effect row
- Marker shape: diamond with inner diamond (locked §8 shape); outer half-diag=18, inner=9, pip=3.5
- Marker size rendered: 40×40 (40px slot, compact)
- mech-frame height: 150px → 200px (3 effect rows)
- Effect rows: 3 rows (one per slot); row dividers between rows
- Lead slot width: 52px (standard, fits 40px marker)
- No connecting arrows between slots — slots are independent, not sequential
- Lead column shows only the single slot symbol (not the full track strip)

## activation-track-multiuse-v01-b — Multi-use track option B: 4 filled diamond slots, horizontal track strip in lead column, active slot highlighted (2026-05-25)
Base: design/variants/activation-track-multiuse-v01-a.html (structure; track display approach completely replaced)
Changed:
- Slot count: 3 → 4 (one more than option A)
- Layout: HORIZONTAL TRACK STRIP — each row's lead column (100px wide) shows the full 4-slot track as a compact horizontal strip
- Active slot: full opacity (#1a0e04 body, #d4b87a inner) — indicates which slot this row belongs to
- Inactive slots: opacity 0.25 (dimmed) — shows the track context while keeping focus on the active slot
- Small diamond half-diag: 9px per slot; slot spacing: 24px (center-to-center); gap = 6px between outer edges
- Lead slot width: 52px → 100px (wider to fit 4-slot horizontal strip)
- Track SVG viewBox: 0 0 100 28 (horizontal strip, 28px tall for 18px diamonds with margin)
- mech-frame height: 200px → 240px (4 effect rows)
- 4 separate SVG symbols (b-row1 through b-row4) — each highlights a different slot
- Effect text: shorter labels (3 varied effects: 2× damage, heal, shield) to fit narrower text column

## activation-track-multiuse-v01-c — Multi-use track option C: 5 filled diamond slots, vertical layout, large 48px markers, generous spacing (2026-05-25)
Base: design/variants/activation-track-multiuse-v01-a.html (structure reused; marker size and row count changed)
Changed:
- Slot count: 3 → 5 (maximum count — most generous option)
- Layout: VERTICAL — same approach as option A (each slot leads its own row)
- Marker size: outer half-diag 18 → 22 (total 44px outer diamond); inner half-diag 9 → 11; pip 3.5 → 4.5
- Marker SVG rendered at: 40×40 → 48×48 (larger, more prominent)
- Lead slot width: 52px → 56px (wider to comfortably fit 48px diamond)
- mech-frame height: 200px → 310px (5 effect rows with generous row height)
- Row height: ~58px per row (vs ~60px/3 ≈ 20px in A — much taller per row)
- viewBox per slot symbol: 0 0 40 40 → 0 0 48 48
- 5 effect rows (3 varied effects: 2× damage×2, heal, shield, damage×3)

## activation-tracks-v02 — redesigned 6 activation track types per §8: dark body + lighter detail, vertical layout in card context (2026-05-24)
Base: design/variants/activation-tracks-v01.html (concept only — display format completely replaced)
Changed:
- Display format: isolated 2-column reference grid → real card mockup (375×525 Persona card, "The Chronicler")
- Track palette: per-track color fills (red hexagons, gold diamonds, blue flow lines, green/purple gates) → unified dark body (#1a0e04) + warm light amber detail (#d4b87a); no per-track color variation
- Layout: horizontal diagram strips → vertical SVG strips (narrow leading markers in action rows)
- track-basic: colored hexagon + colored arc → dark circle (activation slot) + light inner circle (slot face/token) + light center pip; vertical axis line
- track-multiturn: colored hexagon + horizontal gold diamonds + colored arc → dark circle (activation) + dark square (cooldown) stacked vertically, downward flow arrow, dashed left-side return arc with return arrowhead
- track-multiuse: three colored hexagons horizontal → three dark circles stacked vertically; bottom slot shown spent (dimmed, outline only); separator dots between slots
- track-use: colored hexagon + horizontal charge dots + X → dark square activation + descending light charge pips + X cross at bottom; vertical one-way layout
- track-and (compound): horizontal Y-merge into AND gate (D-shape) → two side-by-side vertical sub-track columns (each dark circle + light face); horizontal bracket gate bar with light detail strip; single downward output arrow; compound rows use wider 44px lead slot (effect-lead-compound)
- track-or (compound): horizontal Y-merge into OR gate (curved shape) + lock X → two side-by-side vertical sub-track columns; left (active) full opacity, right (locked) dimmed with light X cross; diagonal arms converge to light diamond OR gate point; downward output arrow; compound rows use wider 44px lead slot
- Card mockup: actions section expanded to 6 rows (one per track type); AND + OR rows use effect-row-compound (48px height); mech-frame height 260px → 310px
- Action section sub-dividers: hairline gradient lines between action rows for readability

## activation-track-use-v01-a — Use (one-time) track option A: square with inner square, balanced proportions (2026-05-26)
Base: design/variants/activation-track-multiuse-v01-a.html (CSS/frame structure reused; track SVG completely replaced)
Changed:
- Track type: Multi-use (multiple activation diamonds) → Use (single consumed marker, permanently spent)
- Marker shape: diamond with inner diamond → square with inner square (activation marker rotated 45° per §8 locked spec)
- Outer square: 36×36 px, centered in 52×52 viewBox
- Inner square: 18×18 px (50% of outer) — balanced, medium-proportion amber fill
- Center pip: 6×6 px dark square — small accent at center
- Outer border: amber stroke 2px, opacity 0.6 — medium weight
- Rendered marker size: 40×40 px (standard, matches multiuse A)
- Lead slot width: 52px (standard)
- Row count: 3 (multiuse) → 1 (single use, permanently consumed)
- mech-frame height: 200px → 100px (one row only)
- No connecting arrows — token permanently consumed, no return path
- Card title: "The Arbiter"; effect: deal 5 damage to all enemies in range

## activation-track-use-v01-b — Use (one-time) track option B: large square, wide inner square, no pip (2026-05-26)
Base: design/variants/activation-track-use-v01-a.html
Changed:
- Outer square: 36×36 → 44×44 px (larger — 4px margin in 52×52 viewBox)
- Inner square: 18×18 → 31×31 px — 70% of outer (much wider amber fill proportion)
- Center pip: removed — inner fill is the focal element (no pip)
- Outer body: dark 6.5px ring on each side vs option A's 9px ring (proportionally thinner frame)
- Marker appearance: "wide-window" — mostly amber with a thin dark surround vs A's balanced ring
- Rendered marker size: 40×40 → 48×48 px (larger)
- Lead slot width: 52px → 58px (wider to accommodate 48px marker)
- mech-frame height: 100px → 110px (slightly taller for larger marker)
- Effect text references permanent single use: "Restore 6 HP — this action may never be used again"
- Card title: "The Last Stand"

## activation-track-use-v01-c — Use (one-time) track option C: small square, three-tier layering, corner bracket accents (2026-05-26)
Base: design/variants/activation-track-use-v01-a.html
Changed:
- Outer square: 36×36 → 32×32 px (smaller — 6px margin in 44×44 viewBox)
- Inner square: 18×18 → 20×20 px at 62% scale — creates visible amber ring between outer dark and center pip
- Center pip: 6×6 → 8×8 px (proportionally much larger relative to inner square — 40% of inner)
- Three visible tiers: dark outer → amber ring → dark center pip (layered "seal" composition)
- Corner bracket accents added: 4 amber L-shaped polyline brackets (1.5px stroke, 5px legs) at each corner of outer square
- Rendered marker size: 40×40 → 36×36 px (smallest of the three options)
- Lead slot width: 52px (standard — unchanged)
- mech-frame height: 100px → 95px (tighter for smaller marker)
- Card title: "The Warden's Vow"; effect: mark target, deal 3 damage, exhaust one action slot permanently

## activation-track-use-v01 (2026-05-26T00:05:22Z)
- activation-track-use-v01-a.html — Use (one-time) track: square with inner square, option A — outer 36×36, inner 50% (18×18), center pip 6×6; amber stroke 2px; balanced compact proportions; single action row
- activation-track-use-v01-b.html — Use (one-time) track: square with inner square, option B — outer 44×44, inner 70% (31×31), no pip; wide amber fill, thin dark border ring; heavy 3px stroke; large prominent marker; single action row
- activation-track-use-v01-c.html — Use (one-time) track: square with inner square, option C — outer 32×32 (small), inner 62% (20×20), large pip 8×8; three-tier dark→amber→dark layering; corner-bracket accents; small precise seal-impression; single action row

## die-symbols-v01-a — Die icons option A: flat square face + pip-count arrangement (2026-05-26)
Base: design/BASELINE.html (Persona palette, card "The Stalwart")
Changed:
- (new) icon-die-constitution: rounded-square die body (rx=4, dark fill #1a0e04, amber stroke #d4b87a 2.5px); 1 large center pip r=2.8 — singularity/endurance
- (new) icon-die-zeal: same die body; 3 pips in upward-pointing triangle (top-center, bottom-left, bottom-right) r=2.3 — drive/momentum
- (new) icon-die-path: same die body; 4 pips in compass/cardinal arrangement (N/S/E/W) r=2.1 — wayfinding/skill
- Display: all 3 die icons shown inline in passive row ("Gain +1 armor/speed/insight per die rolled"), trigger row (die condition for draw), action row (die gate for damage)
- mech-frame height: 231px → 180px (3 sections, no sec-leave)

## die-symbols-v01-b — Die icons option B: die body SHAPE distinguishes type (2026-05-26)
Base: design/BASELINE.html (Persona palette, card "The Stalwart")
Changed:
- (new) icon-die-constitution: rounded square (rx=4) — classic die; single center pip r=2.5
- (new) icon-die-zeal: diamond (square rotated 45°, points at top/right/bottom/left) — angular/driven; single center pip r=2.5
- (new) icon-die-path: flat-top hexagon (6 vertices at 30°/90°/150°/210°/270°/330°) — structured/many-routes; single center pip r=2.5
- All three: dark fill #1a0e04, amber stroke #d4b87a 2.5px, viewBox 0 0 24 24, rendered 20×20
- Display: all 3 die icons in same 3-section card layout as option A

## die-symbols-v01-c — Die icons option C: thematic amber symbol inside dark die face (2026-05-26)
Base: design/BASELINE.html (Persona palette, card "The Stalwart")
Changed:
- (new) icon-die-constitution: dark rounded-square body (rx=3.5, no amber stroke); amber ring/circle inside (r=4.5, stroke-width 2.5) — endurance loop
- (new) icon-die-zeal: dark rounded-square body; amber upward chevron (V-shape, apex at top, 2.8px stroke) — drive/energy upward
- (new) icon-die-path: dark rounded-square body; amber Y-fork (horizontal stem + two branches at right) — route choice/wayfinding
- Palette: dark body #1a0e04 (same as trigger symbols); amber detail #d4b87a (matches trigger symbol detail color)
- Display: all 3 die icons in same 3-section card layout as options A and B

## trigger-symbols-v03 — SUPERSEDED by v04 — First 3-option round for all 6 trigger symbols per §7 (2026-05-26)
Base: design/variants/trigger-symbols-v02.html (card structure reused; all 6 symbols redesigned per option)
- trigger-symbols-v03-a.html — Option A: GEOMETRIC / ANGULAR — all shapes are sharp-edged polygons with no curves on main bodies
  - trig-reveal: 8-point star polygon (two overlapping squares) + amber inner diamond pip
  - trig-enter: solid dark upward-pointing triangle + amber inward-pointing chevron (T-arrow) inside
  - trig-leave: dark rightward arrow polygon + amber horizontal slot rect in tail
  - trig-char-phase: dark octagon body + amber octagon ring stroke + amber square-ended clock hands + square pip
  - trig-complete: dark diamond (square rotated 45°) body + amber square-cap checkmark
  - trig-flow-marker: dark double angular chevron blocks (two overlapping arrow polygons) + amber inner right-pointing diamond pip
  - Distinguishing trait: no curves anywhere; all polygon/polyline constructions; starkest geometric option

- trigger-symbols-v03-b.html — Option B: ROUNDED / ORGANIC — shapes use curved paths, circles, and pill forms
  - trig-reveal: 8 amber ray lines (round caps) radiating through dark filled circle + amber center pip — rays visible outside circle
  - trig-enter: dark rounded-top arch (Q-bezier stadium) + amber downward teardrop/droplet inside (bezier curve)
  - trig-leave: dark rounded arrow (pill-bodied arrowhead) + amber crescent-moon accent in tail + amber dot on tip
  - trig-char-phase: dark filled circle + amber stroke ring + amber round-cap clock hands + amber center dot — fully circular
  - trig-complete: dark rounded square (rx=5) + amber round-cap bezier checkmark
  - trig-flow-marker: dark horizontal pill/capsule (rx=5) + amber rounded arrowhead inside + amber separator dot at left
  - Distinguishing trait: all bodies are circles, pills, or softly rounded; no hard polygon corners

- trigger-symbols-v03-c.html — Option C: PICTOGRAPHIC / SILHOUETTE — each is the bold silhouette of a recognizable concept-object; amber is a single interior detail or cutout
  - trig-reveal: dark eye-almond silhouette (pointed oval) + amber iris circle + dark pupil — the act of seeing
  - trig-enter: dark door-frame rectangle + amber doorway opening rect + dark threshold details (knob, floor) + amber threshold line
  - trig-leave: dark foot/boot silhouette (simplified angled form) + three amber speed-lines behind foot
  - trig-char-phase: dark person-figure silhouette (circle head + shoulder-to-hip triangle body) + amber diamond at chest center
  - trig-complete: dark scroll silhouette (rect + ellipse rolled ends) + amber bold checkmark on scroll body
  - trig-flow-marker: dark three-bar track/rail silhouette (three horizontal rounded rects = ladder) + amber advancing token dot on top rail + dimmed trail dot on middle rail
  - Distinguishing trait: pictographic/literal concept objects; shapes differ completely from A and B in construction principle

## subtitle-v01 — Three subtitle header design options (2026-05-26)
Base: design/BASELINE.html (Persona palette; each file shows two cards side-by-side: with subtitle and without)
- subtitle-v01-a.html — Option A: subtitle BELOW the card title; Cinzel 400 italic, 10px, amber #c8a050 at 72% opacity; letter-spacing 3px, uppercase; short centre rule beneath subtitle at top:118px; title at top:65px (unchanged from baseline); no layout shift when absent — the subtitle element simply is not rendered and the title rule moves up to top:105px
- subtitle-v01-b.html — Option B: subtitle BETWEEN type band and title; Crimson Text italic, 11px, muted cream rgba(210,190,150,0.65), letter-spacing 1.5px; flanked by small 7×7px SVG diamond ornaments at 50% opacity; subtitle row at top:55px; title shifts to top:73px when present, reverts to top:65px when absent; fundamentally different font family and ornament treatment from A
- subtitle-v01-c.html — Option C: subtitle EMBEDDED inside the type band as a second row; type band expands from 35px to 52px when subtitle present; row 1 = type label (Cinzel 700, standard); 0.5px hairline divider; row 2 = subtitle (Cinzel 400, 7.5px, letter-spacing 2px, title case, type-text color at 65% opacity); title shifts to top:82px when subtitle present; when absent type band stays 35px and title is at baseline top:65px — zero visual gap

## flavour-text-v01 — Three flavour text zone design options (2026-05-26)
Base: design/BASELINE.html (Persona palette; each file shows a single card with flavour text present)
- flavour-text-v01-a.html — Option A: mechanics frame raised to bottom:76px; full-width amber hairline gradient rule (rgba(212,184,122,0.55)) immediately above the flavour zone; 48px flavour zone below with a subtle dark tinted panel (rgba(10,6,2,0.45)); Crimson Text italic 12.5px, warm cream rgba(210,188,140,0.72), centred; demonstrates a Location card "The Ashwood Bridge" with mechanics rows and one-line flavour text
- flavour-text-v01-b.html — Option B: mechanics frame raised to bottom:84px; ornamental SVG divider (two amber gradient rules flanking a centre diamond ornament — outer diamond fill #d4b87a opacity 0.60, hollow inner pip) spanning full card width; Crimson Text italic 13.5px, slightly lighter cream rgba(225,202,158,0.78), LEFT-ALIGNED with 14px indent (typographically distinct from A's centred layout); demonstrates an Event card "The Ashen Pact"
- flavour-text-v01-c.html — Option C: INTEGRATED / BORDERLESS — mechanics frame expanded to bottom:22.5px height:230px to contain both mechanics sections and the flavour row within one container; flavour row is a sec-flavour section (height:65px, rgba(8,5,2,0.35) darker fill) appended after the action section; top edge is a softer amber gradient fade (opacity 0.38 vs 0.55 for mechanics borders); NO visible hard rule or ornament; Crimson Text italic 14px, rgba(230,208,162,0.68), centred; demonstrates a Character card "Sister Halvaine"

## die-symbols-v02 — Redesigned die icons: flat square face + single centered star, per-type color coding (2026-05-31)
Base: design/variants/die-symbols-v01-a.html (flat square die face foundation reused; pips replaced with single star; per-type color coding added per VISUAL.md §7 updated spec)
Supersedes: die-symbols-v01-a/b/c (v01 rejected — v01-a closest; pips replaced with single star; per-type color coding required)
- die-symbols-v02-a.html — Option A: MEDIUM STAR, THIN BORDER ACCENT — flat square die body (rx=2, dark fill #1a0e04); 5-point star (outer r=5.5, inner r=2.2) centered on face; thin colored border accent (0.8px, 0.45 opacity); Constitution=#d84040 red, Zeal=#4888d8 blue, Path=#48b868 green; lightest star treatment; viewBox 0 0 24 24
- die-symbols-v02-b.html — Option B: HEAVY STAR, THICK BORDER ACCENT — same die body; larger 5-point star (outer r=6.2, inner r=3.2) with fatter wider arms; thicker colored border accent (1.2px, 0.55 opacity); brighter colors: Constitution=#e03838, Zeal=#4080e0, Path=#40c060; star fills more of the die face for stronger color presence; viewBox 0 0 24 24
- die-symbols-v02-c.html — Option C: SMALL PRECISE STAR, DOUBLE-RING BORDER — same die body; smaller 5-point star (outer r=4.8, inner r=1.8) with sharp thin points; dark outline stroke (1px #1a0e04) on star for crisp separation; double-ring colored border band (outer 1.8px ring at 0.40 opacity, inner dark rect cutout creates a visible colored stripe); Constitution=#c84040 deep red, Zeal=#4878c8 steel blue, Path=#40a858 forest green; most refined/engraved treatment; viewBox 0 0 24 24
All three: dark die body #1a0e04; viewBox 0 0 24 24; rendered at 20×20 inline; shown in 3-section Persona card "The Stalwart" — passive row shows all 3 dice together, trigger row shows constitution conditional, action row shows path gating

## die-symbols-v01 — SUPERSEDED by v02 — Three die icon style options (2026-05-26)
Base: design/BASELINE.html (Persona palette, card "The Stalwart")
- die-symbols-v01-a.html — Option A: flat die face, pip-count: Constitution 1 pip, Zeal 3 pips (triangle), Path 4 pips (compass)
- die-symbols-v01-b.html — Option B: die body shape distinguishes type: Constitution=rounded-square, Zeal=diamond, Path=hexagon; single center pip each
- die-symbols-v01-c.html — Option C: thematic amber cutout inside dark die face: Constitution=ring, Zeal=chevron, Path=Y-fork
All three: dark fill #1a0e04, amber stroke #d4b87a, viewBox 0 0 24 24, rendered 20×20

## cooldown-trigger-marker-v02 — Redesigned cooldown trigger marker: inset diamond in right-vertex cutout (2026-05-31)
Base: design/variants/cooldown-trigger-marker-v01-c.html (card structure reused; marker symbol completely redesigned per VISUAL.md §8 updated spec)
Supersedes: cooldown-trigger-marker-v01-a/b/c (v01 rejected — a/b external indicators violate shared bounding-box; c notch concept closest but needs inset diamond fill)
- cooldown-trigger-marker-v02-a.html — Option A: COMPACT INSET — same outer diamond silhouette as flow marker; right vertex stroke cut open; small inset diamond (half-diag 5, 10px tip-to-tip) placed in the cutout; solid amber fill + dark center pip (half-diag 2); no stroke border on inset; lightest visual weight of the three options; viewBox 0 0 52 52
- cooldown-trigger-marker-v02-b.html — Option B: MEDIUM INSET WITH BORDER — same outer diamond with right vertex gap; medium inset diamond (half-diag 7, 14px tip-to-tip); solid amber fill + amber stroke border (1.5px, opacity 0.7) + dark center pip (half-diag 3); the stroke border echoes the outer diamond's edge treatment, creating a layered "mini activation marker" look; moderate visual weight; viewBox 0 0 52 52
- cooldown-trigger-marker-v02-c.html — Option C: LARGE BOLD INSET — same outer diamond with right vertex gap (widest gap); large inset diamond (half-diag 9, 18px tip-to-tip); solid amber fill + thick amber stroke border (2px, opacity 0.8); NO center pip — the large amber mass is the focal element; heaviest visual weight; most prominent cutout; viewBox 0 0 52 52
All three: dark body #1a0e04, amber detail #d4b87a; outer diamond identical to flow marker (half-diag 20, centered at 26,26); outer stroke drawn as four line segments omitting right vertex area; inset diamond fully within original bounding box; shown in context as Row 3 of a multi-turn track (activation row + flow marker row + cooldown trigger row) inside an action section on a Persona card "The Wayfarer"

## cooldown-trigger-marker-v02 — CORRECTED: bounding-box compliance + trigger label + consistent marker sizing (2026-06-01)
Base: cooldown-trigger-marker-v02-a/b/c (geometry and presentation corrections)
Changed:
- Option B inset center: (40,26) → (39,26) — rightmost tip was at x=47 (1px beyond outer diamond boundary x=46); now flush at x=46
- Option C inset center: (39,26) → (37,26) — rightmost tip was at x=48 (2px beyond outer diamond boundary x=46); now flush at x=46
- Option B outer stroke gap endpoints: recalculated to (35,18)/(35,34) to properly frame the repositioned medium inset
- Option C outer stroke gap endpoints: recalculated to (33,16)/(33,36) to properly frame the repositioned large inset
- All three: marker SVG rendered size: inconsistent (52×52 activation, 44×44 flow) → consistent 48×48 for all markers (activation, flow, cooldown trigger) per §8 consistent sizing rule
- All three: added "On Flow Marker" trigger name label (Crimson Text 10px italic, muted amber at 55% opacity) per design-stage convention — provides readability anchor during review; label is between marker and arrow in the cooldown trigger effect row
- All three: added .trigger-label CSS class for the trigger name label styling

## cooldown-trigger-marker-v01 — SUPERSEDED by v02 — Three cooldown trigger marker indicator-style options (2026-05-28)
Base: design/variants/activation-track-multiturn-v02-a.html (card structure reused; new cooldown trigger marker symbol added as third row in multi-turn action track)
- cooldown-trigger-marker-v01-a.html — Option A: FILLED WEDGE — solid filled amber triangle flush at the right vertex of the hollow diamond; base at (46,20)→(46,32), tip at (54,26); indicator extends ~8px beyond diamond right tip; no gap between diamond body and wedge; viewBox 0 0 60 52
- cooldown-trigger-marker-v01-b.html — Option B: LINE + ARROWHEAD — short amber stem line (6px, 1.5px stroke) extending rightward from right vertex, followed by a small separate filled arrowhead triangle; stem (47,26)→(54,26); arrowhead (53,21)→(59,26)→(53,31); gap-and-dart appearance; viewBox 0 0 64 52
- cooldown-trigger-marker-v01-c.html — Option C: RIGHT-VERTEX NOTCH — no element extends beyond diamond boundary; instead the right vertex is cut inward to a concave V-notch: outer polygon points="26,6 44,22 40,26 44,30 26,46 6,26"; inner amber stroke mirrors the notch; small amber circle pip at notch apex (40,26) r=2; viewBox 0 0 52 52 (same footprint as flow marker)
All three: dark body #1a0e04, amber detail #d4b87a; hollow diamond silhouette unchanged from flow marker; shown in context as Row 3 of a multi-turn track (activation row + flow marker row + cooldown trigger row) inside an action section on a Persona card "The Wayfarer"

## trigger-symbols-v04 — Redesigned trigger symbols v04: 48×48 viewBox, intuitively legible pictographic icons, trigger name labels (2026-06-01)
Base: design/variants/trigger-symbols-v03-a/b/c.html (card structure reused; all 6 symbols completely redesigned at 48×48 canvas per updated VISUAL.md §7 spec; v03 rejected)
Supersedes: trigger-symbols-v03-a/b/c (v03 rejected — symbols were 24×24 viewBox at 20×20 rendered, too small and abstract; v04 uses 48×48 viewBox at 48×48 rendered to match activation track markers; all symbols must directly evoke trigger concept)

- trigger-symbols-v04-a.html — Option A: NATURALISTIC PICTOGRAPHIC — real-world object silhouettes
  - trig-reveal: wide-open eye silhouette (almond) + amber iris with dark pupil + highlight dot + radiating lash/ray lines — seeing/revealing
  - trig-enter: dark door frame rectangle + amber doorway opening + dark arrow entering from left through doorway — crossing threshold
  - trig-char-phase: dark hourglass body + amber top/bottom plates + amber sand in upper/lower chambers + sand stream through neck — passage of character time
  - trig-leave: dark door frame + amber doorway + dark arrow exiting rightward through doorway — departure (mirrored enter)
  - trig-complete: dark circular wax seal + amber double-ring border + amber ribbon tails + amber bold checkmark impression — official completion
  - trig-flow-marker: dark horizontal track rail + amber tick marks + dark diamond token resting on rail + amber inner diamond + amber forward arrow — token advancing onto slot
  - Distinguishing trait: everyday recognizable objects (eye, door, hourglass, seal, rail); most literal/universal iconography

- trigger-symbols-v04-b.html — Option B: THEATRICAL / DRAMATIC — stage and narrative metaphors
  - trig-reveal: dark parting curtain panels pulled aside + amber spotlight circle center + amber stage floor + amber tie-backs — theatrical unveiling
  - trig-enter: dark crenellated gatehouse/portcullis frame + amber passage below + dark raised portcullis bars + dark arrow entering — castle gate entry
  - trig-char-phase: dark elliptical sundial face + amber hour markers + amber gnomon triangle + dark shadow + amber dial ring — time passage via sundial
  - trig-leave: dark crenellated gatehouse + portcullis lowered (bars blocking passage) + amber arrow exiting below — gate closing/departure
  - trig-complete: amber parchment scroll body + dark rolled top/bottom ends + dark bold checkmark on body + dark text-line hints — completed quest scroll
  - trig-flow-marker: dark stacked wave/current shapes + amber wave crest highlights + dark diamond token riding on wave + amber motion lines — current carrying token forward
  - Distinguishing trait: medieval stage/narrative vocabulary (curtains, portcullis, sundial, scroll, waves); thematically aligned with card world

- trigger-symbols-v04-c.html — Option C: HERALDIC / EMBLEM — medieval heraldic devices and charges
  - trig-reveal: dark torch handle/shaft + amber layered flame (outer glow, mid, inner core) + amber grip wrapping + amber emanating light rays — torch illuminating the hidden
  - trig-enter: dark shield-shaped escutcheon + amber keyhole (circle + slot) + dark key silhouette inserted + dark key ward + amber key bow ring at top — key unlocking entry
  - trig-char-phase: dark great helm silhouette (flat top, rounded chin) + amber visor slit + amber breathing holes + amber crest ridge + amber rivets + amber nasal bar — knight acting in their phase
  - trig-leave: dark chain link segments (left 2, right 2) + dark broken middle links pulling apart + amber fracture/break marks + amber sparks at break point — breaking free / departing
  - trig-complete: dark laurel wreath (two branches of ellipse leaves curving up) + amber leaf veins + amber ribbon tie at base + amber bold checkmark in wreath center — victor's wreath
  - trig-flow-marker: dark banner pole + amber pole finial + dark pennant/banner body unfurling right + amber border stripes + amber diamond device on banner + amber forward arrow below — heraldic banner advancing
  - Distinguishing trait: medieval manuscript/heraldic language (torch, key, helm, chains, laurel, banner); most thematically decorative; strongest medieval identity

All three options:
- ViewBox: 0 0 48 48; rendered at 48×48 px (matching activation track marker size per §7 spec)
- Palette: dark body #1a0e04 + amber/off-white detail #d4b87a (consistent across all triggers and options)
- All 6 trigger types shown: On Reveal, On Enter, Character Phase, On Leave, On Complete, On Flow Marker
- Trigger name labels (Crimson Text 10px italic, muted amber 55% opacity) between symbol and arrow per design-stage convention
- Card mockup: Persona card "The Wanderer" with passive section, trigger-entry (2 rows), action (1 row), trigger-exit (4 rows)
- mech-frame height: 420px to accommodate all 6 trigger rows at 48px minimum row height
- a/b/c vary the iconographic interpretation per trigger concept — not the size, colour, or layout

## trigger-symbols-v04 — Fix container placement and heights (2026-06-01)
Base: trigger-symbols-v04-a/b/c.html (all three options)
Changed:
- Character Phase trigger: moved from sec-trigger-exit (Exit) → sec-trigger-entry (Entry, yellow) per VISUAL.md §6 line 84
- On Flow Marker trigger: moved from sec-trigger-exit (Exit) → sec-actions (Action, red) per VISUAL.md §6 line 85
- All container sections (.sec-passive, .sec-trigger-entry, .sec-actions, .sec-trigger-exit): removed fixed height values → content-driven sizing per VISUAL.md §6.0
- .mech-frame: height: 420px → height: auto; removed background gradient
- .mech-sections: position: absolute → position: relative; removed overflow: hidden

---

## Baseline propagation — accepted design elements integrated into all type baselines (2026-06-05)
Base: all 11 card type baseline files per card-index.md
Changed (applied to every baseline):
- (new) .card-subtitle CSS: position absolute below title-rule at top:108px; Cinzel 400 italic 10px, amber #c8a050 at 72% opacity, letter-spacing 3px, uppercase; per accepted subtitle-v01-a (VISUAL.md §9.1)
- (new) .sec-flavour + .flavour-text CSS: borderless inset row at bottom of mech-sections; rgba(8,5,2,0.35) darker fill; gradient-fade top border (rgba(212,184,122,0.38)); Crimson Text 14px italic, rgba(230,208,162,0.68), centred; per accepted flavour-text-v01-c (VISUAL.md §9.2)
- (new) .set-symbol CSS + SVG: bottom-right (bottom:16px right:18px) dark circular container (r=8.5, #1a0e04, opacity 0.85) with amber ring stroke (#d4b87a, 1px, opacity 0.55); inner diamond glyph placeholder + center pip; 18px rendered; z-index 13; per accepted set-symbol-v01-a (VISUAL.md §9.3)
- HTML: added `<div class="card-subtitle">Subtitle</div>` after title-rule in card-header
- HTML: added `<div class="sec sec-flavour"><span class="flavour-text">...</span></div>` as last child of mech-sections
- HTML: added `<div class="set-symbol"><svg>...</svg></div>` after mech-frame, inside .card
- effects-container-v04 was already present in all baselines (gradient-fade borders, 0.15 translucent fills) — no changes needed
Files modified:
- design/variants/location-v01.html
- design/variants/location-setpiece-v01.html
- design/variants/event-v01.html
- design/variants/event-fated-v01.html
- design/variants/char-friendly-v02.html
- design/variants/char-enemy-v01.html
- design/variants/char-main-v01.html
- design/variants/item-v01.html
- design/variants/item-key-v01.html
- design/variants/quest-main-v02.html
- design/variants/quest-side-v01.html

## Baseline propagation cleanup — Task 5 (2026-06-06)
Base: design/BASELINE.html
Changed:
- Reverted design/BASELINE.html to pre-propagation state: removed .card-subtitle CSS, .sec-flavour + .flavour-text CSS, .set-symbol CSS; removed subtitle HTML element, sec-flavour HTML element, set-symbol HTML element
- Reason: design/BASELINE.html is outside design/variants/ and should not be modified by the Card Design agent; the 11 type baselines inside design/variants/ retain all propagated elements
- min-height audit: confirmed no min-height fixed declarations exist on container sections in any of the 11 type baselines — all container heights are content-driven per VISUAL.md §6

## activation-track-basic-v02 / multiturn-v03 — min-height cleanup (2026-06-06)
Base: activation-track-basic-v02-a/b/c.html, activation-track-multiturn-v03-a/b/c.html
Changed:
- Removed min-height from .effect-row CSS in all 6 files per VISUAL.md §6 (container heights must be fully content-driven)
- activation-track-basic-v02-a: removed `min-height: 36px` from .effect-row
- activation-track-basic-v02-b: removed `min-height: 40px` from .effect-row
- activation-track-basic-v02-c: removed `min-height: 46px` from .effect-row; removed min-height reference from HTML comment
- activation-track-multiturn-v03-a: removed `min-height: 36px` from .effect-row CSS; removed 2× inline `style="min-height:32px;"` from flow-marker effect rows
- activation-track-multiturn-v03-b: removed `min-height: 40px` from .effect-row CSS; removed 1× inline `style="min-height:34px;"` from flow-marker effect row
- activation-track-multiturn-v03-c: removed `min-height: 42px` from .effect-row CSS; removed 3× inline `style="min-height:34px;"` from flow-marker effect rows

## activation-track-multiuse-v02 — Multi-use track v02: 4-container layout, accepted diamond markers at ~29px (2026-06-06)
Supersedes: activation-track-multiuse-v01-a/b/c
Base: activation-track-basic-v02-a/b/c (CSS structure reused; track type changed to multi-use with independent activation slots)
- activation-track-multiuse-v02-a.html — Option A: COMPACT — 3 independent activation diamond markers (29×29), each leads own effect row; tight spacing (4px padding, 6px gap); hairline gradient dividers between action rows; card "The Arbiter" with strike/shield/heal effects; 4 containers (permanent blue + entry yellow + action red + exit yellow)
- activation-track-multiuse-v02-b.html — Option B: BALANCED — 4 independent activation diamond markers (29×29), each leads own effect row; medium spacing (6px padding, 8px gap); strike×2/shield/heal effects; card "The Templar" with On Enter trigger; 4 containers
- activation-track-multiuse-v02-c.html — Option C: GENEROUS — 2 independent activation diamond markers (29×29), each leads own effect row; wide spacing (8px padding, 10px gap); longer effect text with wrapping; card "The Vigil" with On Reveal trigger; 4 containers
- All three: no min-height; no connecting arrows between slots (independent); markers use accepted activation-track-basic-v01-b diamond shape at 29px rendered; content-driven container heights per VISUAL.md §6

## activation-track-use-v02 — Use (one-time) track v02: 4-container layout, accepted square-with-inner-square marker at ~29px (2026-06-06)
Supersedes: activation-track-use-v01-a/b/c
Base: activation-track-basic-v02-a/b/c (CSS structure reused; marker shape changed to square with inner square per accepted use-v01-a spec)
- activation-track-use-v02-a.html — Option A: COMPACT — single square-with-inner-square use marker (29×29); tight spacing (4px padding, 6px gap); card "The Last Stand" — deal 5 damage to all enemies; On Reveal → gain shield; On Complete → draw 2; 4 containers; use marker: outer 36×36 dark, inner 18×18 amber, center pip 6×6 dark, amber stroke 2px
- activation-track-use-v02-b.html — Option B: BALANCED — single use marker (29×29); medium spacing (6px padding, 8px gap); card "The Oath" — restore 6 HP (permanently consumed); 2 permanent effects; Character Phase trigger; On Leave trigger; 4 containers
- activation-track-use-v02-c.html — Option C: GENEROUS — single use marker (29×29); wide spacing (8px padding, 10px gap); card "The Warden's Vow" — mark + deal 3 + exhaust permanently; On Reveal + On Enter triggers; On Leave trigger; flavour text row included; 4 containers
- All three: no min-height; single consumed marker (permanently removed on use, no return); content-driven container heights per VISUAL.md §6

---

## set-symbol-v01 — Three set symbol position/size/treatment design options (2026-05-26)
Base: design/BASELINE.html (Persona palette; each file shows two cards side-by-side: one Persona + one other type to demonstrate cross-type consistency)
- set-symbol-v01-a.html — Option A: BOTTOM-RIGHT, CIRCULAR CONTAINER — dark circle (r=8.5, #1a0e04, opacity 0.85) with amber ring stroke (#d4b87a, 1px, opacity 0.55); inner diamond glyph placeholder (amber stroke polygon, points at N/E/S/W, stroke 1.2px, opacity 0.72) + center pip (r=1.5, amber, opacity 0.65); rendered 18×18px; positioned bottom:16px right:18px (inside card safe area, above frame border); shows Persona "The Wanderer" + Location "The Iron Gate"
- set-symbol-v01-b.html — Option B: BOTTOM-LEFT, ROUNDED-SQUARE CONTAINER WITH MONOGRAM — dark rounded-square (18×18 rx=3, #1a0e04, opacity 0.88) with amber border stroke (#d4b87a, 1px, opacity 0.50); inner recessed panel (13×13 rx=1.5, #241408, opacity 0.60); monogram letter "Y" placeholder (Cinzel 700, 11px, amber, opacity 0.72); rendered 20×20px (larger than A); positioned bottom:16px LEFT:18px (opposite corner from A); shows Persona "The Wanderer" + Event "The Ashen Pact"
- set-symbol-v01-c.html — Option C: FRAMELESS EMBOSSED TREFOIL IN FRAME BORDER ZONE — no container background; three interlocking circle loops forming a trefoil knot (r=3, amber stroke 1.2px, opacity 0.62) with soft glow shadow layer (stroke 1.8px, opacity 0.30, blurred); center pip where loops meet (r=1.2, amber, opacity 0.55); rendered 16×16px (smallest); positioned bottom:4px right:4px (tucked INTO the card frame border zone, partially overlapping the dark inset ring); shows Persona "The Wanderer" + Item "Warden's Lantern"
