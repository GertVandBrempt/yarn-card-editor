# Variant Changes Log

Entries appended by `/card-variants`. Format per entry:

```
## <element>-v<N> — <description>
Base: <base file or "none">
Changed:
- <property>: <old> → <new>
```

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
