import { Injectable } from '@angular/core';
import { AnyCard, CardType, TriggerType } from '../models';
import { Trigger, Action, PassiveEffect, Effect } from '../models/effect.model';
import { PersonaCard } from '../models/persona-card.model';
import { LocationCard } from '../models/location-card.model';
import { CharacterCard } from '../models/character-card.model';
import { ItemCard } from '../models/item-card.model';
import { EventCard } from '../models/event-card.model';
import { MainQuestCard, SideQuestCard, Objective } from '../models/quest-card.model';

/**
 * SVG symbol definitions extracted from the latest design variants.
 *
 * Trigger symbols: trigger-symbols-v03-a.html (highest version)
 * Die symbols: die-symbols-v02-b.html (accepted — heavy star, per-type color coding)
 * Activation track basic: activation-track-basic-v01-a.html
 * Activation track multiturn: activation-track-multiturn-v02-a/b/c.html (highest version)
 * Activation track multiuse: activation-track-multiuse-v01-a/b/c.html
 * Activation track use (one-time): activation-track-use-v01-a.html
 *
 * These are embedded here so the preview iframe can use <use href="#sym-id"/>.
 */
const SVG_DEFS = `
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Inline effect icons (from trigger-symbols-v02) -->
  <symbol id="icon-shield" viewBox="0 0 24 24">
    <path d="M12 2 L20 5 L20 12 Q20 19 12 22 Q4 19 4 12 L4 5 Z"
          fill="#4090e0" stroke="#205098" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-damage" viewBox="0 0 24 24">
    <polygon points="12,2 13.4,8.2 17.8,4.5 15.6,10.3 22,10.8 16.9,14.2 19.6,20.1 13.2,17 12,23 10.5,17.1 4.2,20.5 6.7,14.4 1,11.2 7.5,10.2 5,4.8 10.7,8.1"
             fill="#f0c030" stroke="#a08000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-heal" viewBox="0 0 24 24">
    <path d="M12 21 C9 18 3 14 3 9 C3 6 5.5 4 8 5 C10 5.8 11 7.5 12 9 C13 7.5 14 5.8 16 5 C18.5 4 21 6 21 9 C21 14 15 18 12 21 Z"
          fill="#e84020" stroke="#901808" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>
  <symbol id="icon-reveal-character" viewBox="0 0 24 24">
    <rect x="6" y="5" width="13" height="16" rx="1.5"
          fill="#a89e18" stroke="#807800" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="2" y="2" width="13" height="16" rx="1.5"
          fill="#d4cc30" stroke="#807800" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="8.5" cy="7.5" r="1.8" fill="#1a0e04"/>
    <path d="M5.5 14.5 Q5.5 11 8.5 11 Q11.5 11 11.5 14.5" fill="#1a0e04" stroke="none"/>
  </symbol>
  <symbol id="icon-reveal-item" viewBox="0 0 24 24">
    <rect x="5" y="3" width="14" height="18" rx="2"
          fill="#8060c0" stroke="#503888" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
    <line x1="8" y1="8" x2="16" y2="8" stroke="#c0a0f0" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="8" y1="12" x2="16" y2="12" stroke="#c0a0f0" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="8" y1="16" x2="13" y2="16" stroke="#c0a0f0" stroke-width="1.5" stroke-linecap="round"/>
  </symbol>
  <!-- icon-scout and icon-gain-action: no variant file — placeholder filled circle -->
  <symbol id="icon-scout" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="#6b7280"/>
    <text x="12" y="16" text-anchor="middle" font-size="10" fill="#fff" font-family="sans-serif">?</text>
  </symbol>
  <symbol id="icon-gain-action" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="#6b7280"/>
    <text x="12" y="16" text-anchor="middle" font-size="10" fill="#fff" font-family="sans-serif">?</text>
  </symbol>

  <!-- Trigger symbols — trigger-symbols-v03-a.html (geometric/angular approach) -->
  <!-- §7 Trigger Symbols v03-a: sharp polygonal silhouettes; body #1a0e04, detail #d4b87a -->

  <!-- On Reveal — 8-point sharp star (two overlapping squares rotated 45°), amber center pip -->
  <symbol id="trig-reveal" viewBox="0 0 24 24">
    <!-- 8-point star: union of two squares -->
    <polygon points="12,1 14.5,9.5 23,12 14.5,14.5 12,23 9.5,14.5 1,12 9.5,9.5"
             fill="#1a0e04" stroke="none"/>
    <!-- Amber center pip -->
    <polygon points="12,9.5 14.5,12 12,14.5 9.5,12"
             fill="#d4b87a" stroke="none"/>
  </symbol>

  <!-- On Enter — upward-pointing solid triangle, amber inward chevron (arrow entering) -->
  <symbol id="trig-enter" viewBox="0 0 24 24">
    <!-- Solid dark triangle (point up) -->
    <polygon points="12,2 22,22 2,22" fill="#1a0e04" stroke="none"/>
    <!-- Amber downward chevron inside triangle — entering motion -->
    <polygon points="12,9 16,14 13.5,14 13.5,19 10.5,19 10.5,14 8,14"
             fill="#d4b87a" stroke="none"/>
  </symbol>

  <!-- On Leave — rightward arrow polygon, amber slot cut in the tail body -->
  <symbol id="trig-leave" viewBox="0 0 24 24">
    <!-- Dark arrow block heading right -->
    <polygon points="2,9 14,9 14,5 22,12 14,19 14,15 2,15"
             fill="#1a0e04" stroke="none"/>
    <!-- Amber slot in tail — signals departure/exit -->
    <rect x="4" y="11" width="6" height="2" fill="#d4b87a"/>
  </symbol>

  <!-- Character Phase — octagon body, amber clock hands + pip (angular vs v02 circle) -->
  <symbol id="trig-char-phase" viewBox="0 0 24 24">
    <!-- Dark octagon body -->
    <polygon points="8.5,2 15.5,2 21,7.5 21,15.5 15.5,21 8.5,21 3,15.5 3,7.5"
             fill="#1a0e04" stroke="none"/>
    <!-- Amber octagon edge ring -->
    <polygon points="8.5,2 15.5,2 21,7.5 21,15.5 15.5,21 8.5,21 3,15.5 3,7.5"
             fill="none" stroke="#d4b87a" stroke-width="1.5"/>
    <!-- Amber hour hand ~10 o'clock, from center -->
    <line x1="12" y1="11.5" x2="8.5" y2="7.5" stroke="#d4b87a" stroke-width="2" stroke-linecap="square"/>
    <!-- Amber minute hand ~12 o'clock -->
    <line x1="12" y1="11.5" x2="12" y2="5.5" stroke="#d4b87a" stroke-width="1.3" stroke-linecap="square"/>
    <!-- Amber center pip (small square) -->
    <rect x="10.5" y="10.5" width="3" height="3" fill="#d4b87a"/>
  </symbol>

  <!-- On Complete — tilted square (diamond orientation), amber bold checkmark (angular) -->
  <symbol id="trig-complete" viewBox="0 0 24 24">
    <!-- Dark diamond body (square tilted 45°) -->
    <polygon points="12,2 22,12 12,22 2,12" fill="#1a0e04" stroke="none"/>
    <!-- Amber bold checkmark (angular, no curves) -->
    <polyline points="7.5,12 10.5,15.5 16.5,8.5"
              fill="none" stroke="#d4b87a" stroke-width="2.8"
              stroke-linecap="square" stroke-linejoin="miter"/>
  </symbol>

  <!-- On Flow Marker — double angular chevron pointing right, amber inner double-chevron pip -->
  <symbol id="trig-flow-marker" viewBox="0 0 24 24">
    <!-- Dark outer double-chevron block -->
    <polygon points="2,5 10,12 2,19 5.5,19 13.5,12 5.5,5" fill="#1a0e04" stroke="none"/>
    <polygon points="9,5 17,12 9,19 12.5,19 20.5,12 12.5,5" fill="#1a0e04" stroke="none"/>
    <!-- Amber inner pip on right chevron interior -->
    <polygon points="11,9 14.5,12 11,15 12,15 15.5,12 12,9" fill="#d4b87a" stroke="none"/>
  </symbol>

  <!-- Activation track markers — activation-track-basic-v01-a.html -->
  <!-- Basic track: circle marker with exit arrow (viewBox 0 0 52 80) -->
  <symbol id="track-basic-a" viewBox="0 0 52 80">
    <circle cx="26" cy="30" r="22" fill="#1a0e04" stroke="none"/>
    <circle cx="26" cy="30" r="16" fill="none" stroke="#d4b87a" stroke-width="2" opacity="0.6"/>
    <circle cx="26" cy="30" r="9" fill="#d4b87a" stroke="none"/>
    <circle cx="26" cy="30" r="3.5" fill="#1a0e04" stroke="none"/>
    <line x1="26" y1="52" x2="26" y2="66" stroke="#1a0e04" stroke-width="2" stroke-linecap="round"/>
    <polygon points="26,72 21,63 31,63" fill="#1a0e04"/>
  </symbol>

  <!-- Multi-turn track markers — activation-track-multiturn-v02-a/b/c.html -->
  <!-- v02a: diamond activation + 2 hollow cooldown diamonds, directional arrows (viewBox 0 0 52 136) -->
  <symbol id="track-multiturn-v02a" viewBox="0 0 52 136">
    <polygon points="26,4 46,24 26,44 6,24" fill="#1a0e04" stroke="none"/>
    <polygon points="26,14 36,24 26,34 16,24" fill="#d4b87a" stroke="none"/>
    <polygon points="26,20 30,24 26,28 22,24" fill="#1a0e04" stroke="none"/>
    <line x1="26" y1="45" x2="26" y2="54" stroke="#1a0e04" stroke-width="1.5" stroke-linecap="round"/>
    <polygon points="26,58 22,52 30,52" fill="#1a0e04"/>
    <polygon points="26,60 42,76 26,92 10,76" fill="#1a0e04" stroke="none"/>
    <polygon points="26,63 39,76 26,89 13,76" fill="none" stroke="#d4b87a" stroke-width="1.5" opacity="0.55"/>
    <line x1="26" y1="93" x2="26" y2="102" stroke="#1a0e04" stroke-width="1.5" stroke-linecap="round"/>
    <polygon points="26,106 22,100 30,100" fill="#1a0e04"/>
    <polygon points="26,108 42,124 26,140 10,124" fill="#1a0e04" stroke="none"/>
    <polygon points="26,111 39,124 26,137 13,124" fill="none" stroke="#d4b87a" stroke-width="1.5" opacity="0.55"/>
  </symbol>

  <!-- v02b: diamond activation + 3 cooldown slots (slot 2 = cooldown trigger with inner arrow) (viewBox 0 0 52 144) -->
  <symbol id="track-multiturn-v02b-activation" viewBox="0 0 52 144">
    <polygon points="26,4 44,22 26,40 8,22" fill="#1a0e04" stroke="none"/>
    <polygon points="26,13 35,22 26,31 17,22" fill="#d4b87a" stroke="none"/>
    <polygon points="26,18.5 29.5,22 26,25.5 22.5,22" fill="#1a0e04" stroke="none"/>
    <line x1="26" y1="41" x2="26" y2="48" stroke="#1a0e04" stroke-width="1.5" stroke-linecap="round"/>
    <polygon points="26,52 22,47 30,47" fill="#1a0e04"/>
    <polygon points="26,54 40,68 26,82 12,68" fill="#1a0e04" stroke="none"/>
    <polygon points="26,57 37,68 26,79 15,68" fill="none" stroke="#d4b87a" stroke-width="1.5" opacity="0.55"/>
    <line x1="26" y1="83" x2="26" y2="90" stroke="#1a0e04" stroke-width="1.5" stroke-linecap="round"/>
    <polygon points="26,94 22,89 30,89" fill="#1a0e04"/>
    <polygon points="26,96 40,110 26,124 12,110" fill="#1a0e04" stroke="none"/>
    <polygon points="26,99 37,110 26,121 15,110" fill="none" stroke="#d4b87a" stroke-width="1.5" opacity="0.55"/>
    <line x1="26" y1="103" x2="26" y2="113" stroke="#d4b87a" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    <polygon points="26,118 22,112 30,112" fill="#d4b87a" opacity="0.9"/>
    <line x1="26" y1="125" x2="26" y2="131" stroke="#1a0e04" stroke-width="1.5" stroke-linecap="round"/>
    <polygon points="26,135 22,130 30,130" fill="#1a0e04"/>
    <polygon points="26,137 40,151 26,165 12,151" fill="#1a0e04" stroke="none"/>
    <polygon points="26,140 37,151 26,162 15,151" fill="none" stroke="#d4b87a" stroke-width="1.5" opacity="0.55"/>
  </symbol>

  <!-- v02b cooldown trigger icon — used as inline effect-lead icon (viewBox 0 0 52 32) -->
  <symbol id="track-cooldown-trigger-v02b" viewBox="0 0 52 32">
    <polygon points="26,2 40,16 26,30 12,16" fill="#1a0e04" stroke="none"/>
    <polygon points="26,5 37,16 26,27 15,16" fill="none" stroke="#d4b87a" stroke-width="1.5" opacity="0.55"/>
    <line x1="26" y1="8" x2="26" y2="18" stroke="#d4b87a" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    <polygon points="26,23 22,17 30,17" fill="#d4b87a" opacity="0.9"/>
  </symbol>

  <!-- v02c: large diamond activation + 1 hollow cooldown, generous spacing (viewBox 0 0 52 108) -->
  <symbol id="track-multiturn-v02c" viewBox="0 0 52 108">
    <polygon points="26,4 48,26 26,48 4,26" fill="#1a0e04" stroke="none"/>
    <polygon points="26,15 37,26 26,37 15,26" fill="#d4b87a" stroke="none"/>
    <polygon points="26,21.5 30.5,26 26,30.5 21.5,26" fill="#1a0e04" stroke="none"/>
    <line x1="26" y1="49" x2="26" y2="64" stroke="#1a0e04" stroke-width="1.5" stroke-linecap="round"/>
    <polygon points="26,69 22,63 30,63" fill="#1a0e04"/>
    <polygon points="26,72 44,90 26,108 8,90" fill="#1a0e04" stroke="none"/>
    <polygon points="26,75 41,90 26,105 11,90" fill="none" stroke="#d4b87a" stroke-width="1.5" opacity="0.55"/>
  </symbol>

  <!-- Multi-use track markers — activation-track-multiuse-v01-a/b/c.html -->

  <!--
    Option A — Multi-use Track v01 (activation-track-multiuse-v01-a.html)
    3 filled diamond slots, VERTICAL layout, compact spacing.
    Each slot: outer diamond half-diag=18, inner half-diag=9, pip half-diag=3.5.
    viewBox 0 0 40 40 — single slot (used as lead for each effect row).
    Color: dark body #1a0e04, amber detail #d4b87a.
  -->
  <symbol id="track-multiuse-a-slot" viewBox="0 0 40 40">
    <!-- Outer diamond body: half-diagonal 18 -->
    <polygon points="20,2 38,20 20,38 2,20"
             fill="#1a0e04" stroke="none"/>
    <!-- Inner diamond: half-diagonal 9, amber fill -->
    <polygon points="20,11 29,20 20,29 11,20"
             fill="#d4b87a" stroke="none"/>
    <!-- Center pip: dark diamond half-diagonal 3.5 -->
    <polygon points="20,16.5 23.5,20 20,23.5 16.5,20"
             fill="#1a0e04" stroke="none"/>
  </symbol>

  <!--
    Option B — Multi-use Track v01 (activation-track-multiuse-v01-b.html)
    4 filled diamond slots, HORIZONTAL TRACK STRIP in each row's lead column.
    Each row's symbol shows all 4 slots; the active slot is full opacity,
    the others are dimmed (opacity 0.25).
    viewBox 0 0 100 28 — horizontal strip of 4 slots.
    Slot centers x: 13, 37, 61, 85. Small diamond half-diag=9; inner=5; pip=2.
    Color: dark body #1a0e04, amber detail #d4b87a.
  -->
  <!-- Row 1 — slot 1 active (full), slots 2/3/4 dimmed -->
  <symbol id="track-multiuse-b-row1" viewBox="0 0 100 28">
    <polygon points="13,5 22,14 13,23 4,14"  fill="#1a0e04"/>
    <polygon points="13,9 18,14 13,19 8,14"  fill="#d4b87a"/>
    <polygon points="13,12 15,14 13,16 11,14" fill="#1a0e04"/>
    <g opacity="0.25">
      <polygon points="37,5 46,14 37,23 28,14" fill="#1a0e04"/>
      <polygon points="37,9 42,14 37,19 32,14" fill="#d4b87a"/>
      <polygon points="37,12 39,14 37,16 35,14" fill="#1a0e04"/>
    </g>
    <g opacity="0.25">
      <polygon points="61,5 70,14 61,23 52,14" fill="#1a0e04"/>
      <polygon points="61,9 66,14 61,19 56,14" fill="#d4b87a"/>
      <polygon points="61,12 63,14 61,16 59,14" fill="#1a0e04"/>
    </g>
    <g opacity="0.25">
      <polygon points="85,5 94,14 85,23 76,14" fill="#1a0e04"/>
      <polygon points="85,9 90,14 85,19 80,14" fill="#d4b87a"/>
      <polygon points="85,12 87,14 85,16 83,14" fill="#1a0e04"/>
    </g>
  </symbol>
  <!-- Row 2 — slot 2 active (full), slots 1/3/4 dimmed -->
  <symbol id="track-multiuse-b-row2" viewBox="0 0 100 28">
    <g opacity="0.25">
      <polygon points="13,5 22,14 13,23 4,14"  fill="#1a0e04"/>
      <polygon points="13,9 18,14 13,19 8,14"  fill="#d4b87a"/>
      <polygon points="13,12 15,14 13,16 11,14" fill="#1a0e04"/>
    </g>
    <polygon points="37,5 46,14 37,23 28,14" fill="#1a0e04"/>
    <polygon points="37,9 42,14 37,19 32,14" fill="#d4b87a"/>
    <polygon points="37,12 39,14 37,16 35,14" fill="#1a0e04"/>
    <g opacity="0.25">
      <polygon points="61,5 70,14 61,23 52,14" fill="#1a0e04"/>
      <polygon points="61,9 66,14 61,19 56,14" fill="#d4b87a"/>
      <polygon points="61,12 63,14 61,16 59,14" fill="#1a0e04"/>
    </g>
    <g opacity="0.25">
      <polygon points="85,5 94,14 85,23 76,14" fill="#1a0e04"/>
      <polygon points="85,9 90,14 85,19 80,14" fill="#d4b87a"/>
      <polygon points="85,12 87,14 85,16 83,14" fill="#1a0e04"/>
    </g>
  </symbol>
  <!-- Row 3 — slot 3 active (full), slots 1/2/4 dimmed -->
  <symbol id="track-multiuse-b-row3" viewBox="0 0 100 28">
    <g opacity="0.25">
      <polygon points="13,5 22,14 13,23 4,14"  fill="#1a0e04"/>
      <polygon points="13,9 18,14 13,19 8,14"  fill="#d4b87a"/>
      <polygon points="13,12 15,14 13,16 11,14" fill="#1a0e04"/>
    </g>
    <g opacity="0.25">
      <polygon points="37,5 46,14 37,23 28,14" fill="#1a0e04"/>
      <polygon points="37,9 42,14 37,19 32,14" fill="#d4b87a"/>
      <polygon points="37,12 39,14 37,16 35,14" fill="#1a0e04"/>
    </g>
    <polygon points="61,5 70,14 61,23 52,14" fill="#1a0e04"/>
    <polygon points="61,9 66,14 61,19 56,14" fill="#d4b87a"/>
    <polygon points="61,12 63,14 61,16 59,14" fill="#1a0e04"/>
    <g opacity="0.25">
      <polygon points="85,5 94,14 85,23 76,14" fill="#1a0e04"/>
      <polygon points="85,9 90,14 85,19 80,14" fill="#d4b87a"/>
      <polygon points="85,12 87,14 85,16 83,14" fill="#1a0e04"/>
    </g>
  </symbol>
  <!-- Row 4 — slot 4 active (full), slots 1/2/3 dimmed -->
  <symbol id="track-multiuse-b-row4" viewBox="0 0 100 28">
    <g opacity="0.25">
      <polygon points="13,5 22,14 13,23 4,14"  fill="#1a0e04"/>
      <polygon points="13,9 18,14 13,19 8,14"  fill="#d4b87a"/>
      <polygon points="13,12 15,14 13,16 11,14" fill="#1a0e04"/>
    </g>
    <g opacity="0.25">
      <polygon points="37,5 46,14 37,23 28,14" fill="#1a0e04"/>
      <polygon points="37,9 42,14 37,19 32,14" fill="#d4b87a"/>
      <polygon points="37,12 39,14 37,16 35,14" fill="#1a0e04"/>
    </g>
    <g opacity="0.25">
      <polygon points="61,5 70,14 61,23 52,14" fill="#1a0e04"/>
      <polygon points="61,9 66,14 61,19 56,14" fill="#d4b87a"/>
      <polygon points="61,12 63,14 61,16 59,14" fill="#1a0e04"/>
    </g>
    <polygon points="85,5 94,14 85,23 76,14" fill="#1a0e04"/>
    <polygon points="85,9 90,14 85,19 80,14" fill="#d4b87a"/>
    <polygon points="85,12 87,14 85,16 83,14" fill="#1a0e04"/>
  </symbol>

  <!--
    Option C — Multi-use Track v01 (activation-track-multiuse-v01-c.html)
    5 filled diamond slots, VERTICAL layout, spacious/premium look.
    Each slot: outer diamond half-diag=22, inner half-diag=11, pip half-diag=4.5.
    viewBox 0 0 48 48 — single slot (used as lead for each effect row).
    Color: dark body #1a0e04, amber detail #d4b87a.
  -->
  <symbol id="track-multiuse-c-slot" viewBox="0 0 48 48">
    <!-- Outer diamond body: half-diagonal 22 (total width/height 44px) -->
    <polygon points="24,2 46,24 24,46 2,24"
             fill="#1a0e04" stroke="none"/>
    <!-- Inner diamond: half-diagonal 11, amber fill -->
    <polygon points="24,13 35,24 24,35 13,24"
             fill="#d4b87a" stroke="none"/>
    <!-- Center pip: dark diamond half-diagonal 4.5 -->
    <polygon points="24,19.5 28.5,24 24,28.5 19.5,24"
             fill="#1a0e04" stroke="none"/>
  </symbol>

  <!--
    Use track marker — activation-track-use-v01-a.html
    Consumed marker (one-time use): square with inner square.
    Outer square: 36x36 px centered at (26,26); inner square: 18x18 amber fill;
    center pip: 6x6 dark square. No return path — permanently consumed.
    viewBox 0 0 52 52 — square proportions.
    Color: dark body #1a0e04, amber detail/stroke #d4b87a.
  -->
  <symbol id="track-use-a-marker" viewBox="0 0 52 52">
    <!-- Outer square: 36x36 centered at (26,26) -->
    <rect x="8" y="8" width="36" height="36"
          fill="#1a0e04" stroke="#d4b87a" stroke-width="2" opacity="1"/>
    <!-- Inner square: 18x18 centered at (26,26) — amber fill -->
    <rect x="17" y="17" width="18" height="18"
          fill="#d4b87a" stroke="none"/>
    <!-- Center pip: 6x6 dark square centered at (26,26) -->
    <rect x="23" y="23" width="6" height="6"
          fill="#1a0e04" stroke="none"/>
  </symbol>

  <!-- Fallback filled circle for undesigned track types -->
  <symbol id="track-fallback" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="#1a0e04"/>
    <circle cx="12" cy="12" r="6" fill="#d4b87a"/>
  </symbol>

  <!-- Die symbols — die-symbols-v02-b accepted -->
  <!-- Constitution: Bold red star (heavy 5-point, outer r=6.2, inner r=3.2) -->
  <symbol id="icon-die-constitution" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="2"
          fill="#1a0e04" stroke="#1a0e04" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="3" y="3" width="18" height="18" rx="1.5"
          fill="none" stroke="#e03838" stroke-width="1.2" opacity="0.55"/>
    <polygon points="12,5.8 13.43,9.53 17.89,10.08 14.46,12.48 15.64,16.40 12,13.96 8.36,16.40 9.54,12.48 6.11,10.08 10.57,9.53"
             fill="#e03838" stroke="none"/>
  </symbol>
  <!-- Zeal: Bold blue star -->
  <symbol id="icon-die-zeal" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="2"
          fill="#1a0e04" stroke="#1a0e04" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="3" y="3" width="18" height="18" rx="1.5"
          fill="none" stroke="#4080e0" stroke-width="1.2" opacity="0.55"/>
    <polygon points="12,5.8 13.43,9.53 17.89,10.08 14.46,12.48 15.64,16.40 12,13.96 8.36,16.40 9.54,12.48 6.11,10.08 10.57,9.53"
             fill="#4080e0" stroke="none"/>
  </symbol>
  <!-- Path: Bold green star -->
  <symbol id="icon-die-path" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="2"
          fill="#1a0e04" stroke="#1a0e04" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="3" y="3" width="18" height="18" rx="1.5"
          fill="none" stroke="#40c060" stroke-width="1.2" opacity="0.55"/>
    <polygon points="12,5.8 13.43,9.53 17.89,10.08 14.46,12.48 15.64,16.40 12,13.96 8.36,16.40 9.54,12.48 6.11,10.08 10.57,9.53"
             fill="#40c060" stroke="none"/>
  </symbol>

  <!-- Set symbol — set-symbol-v01-a accepted -->
  <symbol id="set-symbol-icon" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="8.5" fill="#1a0e04" opacity="0.85"/>
    <circle cx="9" cy="9" r="8.5" fill="none" stroke="#d4b87a" stroke-width="1" opacity="0.55"/>
    <polygon points="9,4 13,9 9,14 5,9" fill="none" stroke="#d4b87a" stroke-width="1.2" opacity="0.72"/>
    <circle cx="9" cy="9" r="1.5" fill="#d4b87a" opacity="0.65"/>
  </symbol>
</defs>
</svg>`;

/**
 * Maps card types to their baseline HTML template paths (relative to assets).
 * Script card has no accepted baseline yet — see Known Design Gaps in APP.md.
 */
const BASELINE_PATHS: Partial<Record<CardType, string>> = {
  persona: 'assets/templates/persona-baseline.html',
  location: 'assets/templates/location-baseline.html',
  character: 'assets/templates/character-baseline.html',
  item: 'assets/templates/item-baseline.html',
  event: 'assets/templates/event-baseline.html',
  'main-quest': 'assets/templates/main-quest-baseline.html',
  'side-quest': 'assets/templates/side-quest-baseline.html',
};

/**
 * Maps trigger type strings to the SVG symbol IDs embedded above.
 */
const TRIGGER_SYMBOL_MAP: Record<string, string> = {
  'on-reveal': 'trig-reveal',
  'on-enter': 'trig-enter',
  'on-leave': 'trig-leave',
  'character-phase': 'trig-char-phase',
  'on-complete': 'trig-complete',
  'on-flow-marker': 'trig-flow-marker',
};

/**
 * Human-readable trigger type labels for section headers.
 */
const TRIGGER_LABELS: Record<string, string> = {
  'on-reveal': 'On Reveal',
  'on-enter': 'On Enter',
  'on-leave': 'On Leave',
  'character-phase': 'Character Phase',
  'on-complete': 'On Complete',
  'on-flow-marker': 'On Flow Marker',
};

/**
 * Dynamic container rendering per VISUAL.md §6.0:
 * Containers render only when they have at least one row.
 * Heights are content-driven — no fixed pixel values.
 * Empty containers produce no shell and no gap.
 */

@Injectable({ providedIn: 'root' })
export class PreviewService {
  private templateCache = new Map<string, string>();

  /**
   * Load baseline HTML template for a card type.
   * Returns null if no baseline exists (e.g. Script cards).
   */
  async loadTemplate(type: CardType): Promise<string | null> {
    const path = BASELINE_PATHS[type];
    if (!path) return null;

    if (this.templateCache.has(path)) {
      return this.templateCache.get(path)!;
    }

    try {
      const response = await fetch(path);
      if (!response.ok) return null;
      const html = await response.text();
      this.templateCache.set(path, html);
      return html;
    } catch {
      return null;
    }
  }

  /**
   * Inject card field values into a baseline HTML template.
   * Returns the rendered HTML string with all placeholders replaced.
   */
  injectFields(template: string, card: AnyCard): string {
    let html = template;

    // Inject SVG defs so trigger symbols, activation markers, and set symbol render
    html = html.replace('<body>', `<body>${SVG_DEFS}`);

    // ── Title ───────────────────────────────────────────
    html = this.replace(html, '{{title}}', this.escapeHtml(card.title || ''));

    // ── Type label ──────────────────────────────────────
    html = this.replace(html, '{{typeLabel}}', this.resolveTypeLabel(card));

    // ── Subtitle (subtitle-v01-a accepted) ──────────────
    const hasSubtitle = !!(card.subtitle && card.subtitle.trim());
    if (hasSubtitle) {
      html = this.replace(
        html,
        '{{subtitleHtml}}',
        `<div class="card-subtitle">${this.escapeHtml(card.subtitle!)}</div>`
      );
      html = this.replace(html, '{{titleRuleHtml}}', '<div class="title-rule"></div>');
    } else {
      html = this.replace(html, '{{subtitleHtml}}', '');
      html = this.replace(html, '{{titleRuleHtml}}', '<div class="title-rule-nosub"></div>');
    }

    // ── Card image (full-bleed art layer behind content) ─
    if (card.imageUrl) {
      html = this.replace(
        html,
        '{{cardImage}}',
        `<div class="card-image-custom" style="background-image:url('${card.imageUrl}')"></div>`
      );
    } else {
      html = this.replace(html, '{{cardImage}}', '');
    }

    // ── Mechanics sections (dynamic container rendering per VISUAL.md §6.0) ──
    // Containers render only when they contain at least one row.
    // Heights are content-driven — no fixed pixel values.
    // Empty containers produce no shell and no gap.
    const { sectionsHtml, hasContent } = this.buildMechSections(card);
    html = this.replace(html, '{{mechSections}}', sectionsHtml);
    // When there are no mechanics sections, hide the mech-frame entirely (no empty shell, no gap)
    if (!hasContent) {
      html = html.replace(
        /class="mech-frame"/,
        'class="mech-frame" style="display:none"'
      );
    }

    // ── Set symbol (set-symbol-v01-a accepted) ──────────
    // Show the set symbol whenever the card belongs to a set (setId is always present)
    // The symbol is a circular dark container with amber ring and diamond glyph placeholder
    if (card.setId) {
      html = this.replace(
        html,
        '{{setSymbol}}',
        `<div class="set-symbol"><svg width="18" height="18" viewBox="0 0 18 18"><use href="#set-symbol-icon"/></svg></div>`
      );
    } else {
      html = this.replace(html, '{{setSymbol}}', '');
    }

    // Hide empty title container
    if (!card.title) {
      html = html.replace(/class="card-title"/g, 'class="card-title" style="display:none"');
    }

    // Inline icon syntax: <iconname>[modifier] -> SVG use markup
    html = this.parseInlineEffects(html);

    return html;
  }

  // ── Type label resolution ─────────────────────────────

  /**
   * Resolves the human-readable type label for the card type band.
   * Considers tier/alignment sub-types for correct labeling.
   */
  private resolveTypeLabel(card: AnyCard): string {
    switch (card.type) {
      case 'persona':
        return 'Persona';
      case 'location': {
        const loc = card as LocationCard;
        return loc.tier === 'setpiece' ? 'Setpiece' : 'Location';
      }
      case 'character': {
        const ch = card as CharacterCard;
        if (ch.tier === 'main') return 'Main Character';
        if (ch.alignment === 'enemy') return 'Enemy';
        if (ch.alignment === 'ally') return 'Friendly';
        return 'Character';
      }
      case 'item': {
        const it = card as ItemCard;
        return it.tier === 'key' ? 'Key Item' : 'Item';
      }
      case 'event': {
        const ev = card as EventCard;
        return ev.tier === 'fated' ? 'Fated Event' : 'Event';
      }
      case 'main-quest':
        return 'Main Quest';
      case 'side-quest':
        return 'Side Quest';
      case 'script':
        return 'Script';
      default:
        return 'Card';
    }
  }

  // ── Mechanics sections builder ────────────────────────

  /**
   * Builds all mechanics sections HTML for the card.
   * Returns the inner HTML for .mech-sections and whether any content exists.
   *
   * Dynamic container rendering (VISUAL.md §6.0):
   * - Containers render only when they contain at least one row
   * - Heights are content-driven (no fixed pixel values)
   * - Empty containers produce no shell and no gap
   */
  private buildMechSections(card: AnyCard): { sectionsHtml: string; hasContent: boolean } {
    const sections: string[] = [];

    // ── 1) Passive / Permanent effects ──────────────────
    // Render only when at least one row exists; hide entirely when empty (no shell, no gap)
    const passives = this.getPassiveEffects(card);
    if (passives.length > 0) {
      const rowsHtml = passives.map(p =>
        `<div class="effect-row"><span class="effect-text">${this.renderEffectText(p.text)}</span></div>`
      ).join('');
      sections.push(
        `<div class="sec sec-passive">` +
        `<div class="effect-label">Permanent</div>${rowsHtml}</div>`
      );
    }

    // ── 2) Entry triggers (on-reveal, on-enter) ─────────
    const entryTriggers = this.getEntryTriggers(card);
    if (entryTriggers.length > 0) {
      const rowsHtml = entryTriggers.map(t => this.renderTriggerRow(t)).join('');
      sections.push(
        `<div class="sec sec-trigger">` +
        `<div class="effect-label">Entry</div>${rowsHtml}</div>`
      );
    }

    // ── 3) Actions ──────────────────────────────────────
    const actions = this.getActions(card);
    if (actions.length > 0) {
      const rowsHtml = actions.map(a => {
        const rows = this.renderActionRows(a);
        return rows.html;
      }).join('');
      sections.push(
        `<div class="sec sec-actions">` +
        `<div class="effect-label">Action</div>${rowsHtml}</div>`
      );
    }

    // ── 4) Exit triggers (on-leave, on-complete) ────────
    const exitTriggers = this.getExitTriggers(card);
    if (exitTriggers.length > 0) {
      const rowsHtml = exitTriggers.map(t => this.renderTriggerRow(t)).join('');
      sections.push(
        `<div class="sec sec-leave">` +
        `<div class="effect-label">Exit</div>${rowsHtml}</div>`
      );
    }

    // ── 5) Flavour text (flavour-text-v01-c accepted) ───
    if (card.flavourText && card.flavourText.trim()) {
      sections.push(
        `<div class="sec sec-flavour">` +
        `<div class="flavour-inner"><span class="flavour-text">${this.escapeHtml(card.flavourText)}</span></div></div>`
      );
    }

    return { sectionsHtml: sections.join(''), hasContent: sections.length > 0 };
  }

  // ── Data extraction helpers (type-aware) ──────────────

  /** Get passive/permanent effects from a card. */
  private getPassiveEffects(card: AnyCard): PassiveEffect[] {
    switch (card.type) {
      case 'persona':
        return (card as PersonaCard).passiveEffects || [];
      case 'item':
        return (card as ItemCard).passiveEffects || [];
      case 'character': {
        // Ally mode passives if in ally mode
        const ch = card as CharacterCard;
        return ch.allyMode?.passiveEffects || [];
      }
      default:
        return [];
    }
  }

  /** Get entry triggers (on-reveal, on-enter) from a card. */
  private getEntryTriggers(card: AnyCard): Trigger[] {
    const triggers: Trigger[] = [];
    switch (card.type) {
      case 'location': {
        const loc = card as LocationCard;
        if (loc.onReveal) triggers.push(loc.onReveal);
        if (loc.onEnter) triggers.push(loc.onEnter);
        break;
      }
      case 'character': {
        const ch = card as CharacterCard;
        if (ch.onReveal) triggers.push(ch.onReveal);
        break;
      }
      case 'event': {
        const ev = card as EventCard;
        if (ev.onReveal) triggers.push(ev.onReveal);
        break;
      }
      default:
        break;
    }
    return triggers;
  }

  /** Get exit triggers (on-leave, character-phase, on-complete) from a card. */
  private getExitTriggers(card: AnyCard): Trigger[] {
    const triggers: Trigger[] = [];
    switch (card.type) {
      case 'location': {
        const loc = card as LocationCard;
        if (loc.onLeave) triggers.push(loc.onLeave);
        break;
      }
      case 'character': {
        const ch = card as CharacterCard;
        if (ch.characterPhase) triggers.push(ch.characterPhase);
        break;
      }
      default:
        break;
    }
    return triggers;
  }

  /** Get actions array from a card (most types have actions). */
  private getActions(card: AnyCard): Action[] {
    switch (card.type) {
      case 'persona':
        return (card as PersonaCard).actions || [];
      case 'location':
        return (card as LocationCard).actions || [];
      case 'character':
        return (card as CharacterCard).actions || [];
      case 'item':
        return (card as ItemCard).actions || [];
      default:
        return [];
    }
  }

  // ── Rendering helpers ─────────────────────────────────

  /** Render a trigger row: trigger icon + effect text. */
  private renderTriggerRow(trigger: Trigger): string {
    const symbolHtml = this.getTriggerSymbolHtml(trigger.type, 18);
    const label = TRIGGER_LABELS[trigger.type] || trigger.type;
    const text = trigger.effect?.text
      ? this.renderEffectText(trigger.effect.text)
      : `<span style="opacity:0.4">${label}</span>`;
    return `<div class="effect-row">` +
      `<span class="effect-icon">${symbolHtml}</span>` +
      `<span class="effect-text">${text}</span></div>`;
  }

  /**
   * Render action effect rows for a single action.
   * Returns the HTML and the number of rows generated.
   */
  private renderActionRows(action: Action): { html: string; count: number } {
    const markerHtml = this.getActivationMarkerForTrack(action.trackType);
    const effects = action.effects || [];
    if (effects.length === 0) {
      // Show the action label placeholder even with no effects
      const label = action.label
        ? this.escapeHtml(action.label)
        : `<span style="opacity:0.4">Action</span>`;
      return {
        html: `<div class="effect-row">` +
          `<span class="effect-icon">${markerHtml}</span>` +
          `<span class="effect-text">${label}</span></div>`,
        count: 1,
      };
    }

    const rows = effects.map((eff, i) => {
      const icon = i === 0 ? `<span class="effect-icon">${markerHtml}</span>` : `<span class="effect-icon" style="width:20px"></span>`;
      const text = eff.text
        ? this.renderEffectText(eff.text)
        : `<span style="opacity:0.4">Effect</span>`;
      return `<div class="effect-row">${icon}<span class="effect-text">${text}</span></div>`;
    });

    return { html: rows.join(''), count: effects.length };
  }

  /**
   * Get a compact activation marker SVG for the action section's lead icon.
   * Uses a small 20x20 rendering for inline use.
   */
  private getActivationMarkerForTrack(trackType: string): string {
    switch (trackType) {
      case 'basic':
        return `<svg width="20" height="20" viewBox="0 0 52 80" preserveAspectRatio="xMidYMid meet"><use href="#track-basic-a"/></svg>`;
      case 'multi-turn':
        return `<svg width="20" height="20" viewBox="0 0 52 52" preserveAspectRatio="xMidYMid meet"><use href="#track-multiturn-v02a"/></svg>`;
      case 'multi-use':
        return `<svg width="20" height="20" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet"><use href="#track-multiuse-a-slot"/></svg>`;
      case 'use':
        return `<svg width="20" height="20" viewBox="0 0 52 52" preserveAspectRatio="xMidYMid meet"><use href="#track-use-a-marker"/></svg>`;
      case 'and':
      case 'or':
        return `<svg width="20" height="20" viewBox="0 0 24 24"><use href="#track-fallback"/></svg>`;
      default:
        return `<svg width="20" height="20" viewBox="0 0 24 24"><use href="#track-fallback"/></svg>`;
    }
  }

  /** Render effect text: escapes HTML then applies inline icon syntax. */
  private renderEffectText(text: string): string {
    return this.escapeHtml(text);
  }

  /**
   * Returns the SVG trigger symbol HTML for a given trigger type ID.
   * Falls back to '?' if no symbol is defined.
   */
  getTriggerSymbolHtml(triggerType: string, size = 20): string {
    const symbolId = TRIGGER_SYMBOL_MAP[triggerType];
    if (symbolId) {
      return `<svg width="${size}" height="${size}"><use href="#${symbolId}"/></svg>`;
    }
    return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;font-size:${size * 0.7}px">?</span>`;
  }

  /**
   * Returns the SVG activation track marker HTML for a given track type.
   * Supported types:
   *   basic (v01-a): circle marker
   *   multiturn-v02a/b/c: diamond + cooldown slots with directional arrows
   *   multiuse-v01a: 3-slot vertical diamond column (slot marker, viewBox 40x40)
   *   multiuse-v01b-row{1..4}: 4-slot horizontal strip with active slot highlighted (viewBox 100x28)
   *   multiuse-v01c: 5-slot vertical diamond column (slot marker, viewBox 48x48)
   *   use-v01a: square-with-inner-square consumed marker (viewBox 52x52); permanently consumed, no return
   * Falls back to a filled circle if no variant exists.
   */
  getActivationMarkerHtml(trackType: string, width = 52, height = 80): string {
    if (trackType === 'basic') {
      return `<svg width="${width}" height="${height}" viewBox="0 0 52 80" preserveAspectRatio="xMidYMid meet"><use href="#track-basic-a"/></svg>`;
    }
    if (trackType === 'multiturn-v02a') {
      return `<svg width="${width}" height="${Math.round(width * 136 / 52)}" viewBox="0 0 52 136" preserveAspectRatio="xMidYMid meet"><use href="#track-multiturn-v02a"/></svg>`;
    }
    if (trackType === 'multiturn-v02b') {
      return `<svg width="${width}" height="${Math.round(width * 144 / 52)}" viewBox="0 0 52 144" preserveAspectRatio="xMidYMid meet"><use href="#track-multiturn-v02b-activation"/></svg>`;
    }
    if (trackType === 'multiturn-v02c') {
      return `<svg width="${width}" height="${Math.round(width * 108 / 52)}" viewBox="0 0 52 108" preserveAspectRatio="xMidYMid meet"><use href="#track-multiturn-v02c"/></svg>`;
    }
    // Multi-use track variants (activation-track-multiuse-v01-a/b/c)
    if (trackType === 'multiuse-v01a') {
      // Option A: 3-slot vertical column; single slot marker 40x40
      const h = Math.round(width * 40 / 40);
      return `<svg width="${width}" height="${h}" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet"><use href="#track-multiuse-a-slot"/></svg>`;
    }
    if (trackType === 'multiuse-v01b-row1') {
      // Option B row 1: horizontal strip 100x28, slot 1 active
      const h = Math.round(width * 28 / 100);
      return `<svg width="${width}" height="${h}" viewBox="0 0 100 28" preserveAspectRatio="xMidYMid meet"><use href="#track-multiuse-b-row1"/></svg>`;
    }
    if (trackType === 'multiuse-v01b-row2') {
      const h = Math.round(width * 28 / 100);
      return `<svg width="${width}" height="${h}" viewBox="0 0 100 28" preserveAspectRatio="xMidYMid meet"><use href="#track-multiuse-b-row2"/></svg>`;
    }
    if (trackType === 'multiuse-v01b-row3') {
      const h = Math.round(width * 28 / 100);
      return `<svg width="${width}" height="${h}" viewBox="0 0 100 28" preserveAspectRatio="xMidYMid meet"><use href="#track-multiuse-b-row3"/></svg>`;
    }
    if (trackType === 'multiuse-v01b-row4') {
      const h = Math.round(width * 28 / 100);
      return `<svg width="${width}" height="${h}" viewBox="0 0 100 28" preserveAspectRatio="xMidYMid meet"><use href="#track-multiuse-b-row4"/></svg>`;
    }
    if (trackType === 'multiuse-v01c') {
      // Option C: 5-slot vertical column; single slot marker 48x48
      return `<svg width="${width}" height="${width}" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><use href="#track-multiuse-c-slot"/></svg>`;
    }
    // Use track (one-time consumed) — activation-track-use-v01-a.html
    if (trackType === 'use-v01a') {
      // Square marker 52x52 viewBox; render at same width/height (square)
      return `<svg width="${width}" height="${width}" viewBox="0 0 52 52" preserveAspectRatio="xMidYMid meet"><use href="#track-use-a-marker"/></svg>`;
    }
    // All other track types — fallback filled circle
    return `<svg width="20" height="20" viewBox="0 0 24 24"><use href="#track-fallback"/></svg>`;
  }

  /**
   * Parse inline effect syntax in rendered HTML text content.
   * <iconname> -> SVG <use> element referencing the embedded defs
   * [N] after icon -> <span class="sym-mod">N</span>
   */
  parseInlineEffects(text: string): string {
    const ICON_NAMES = [
      'damage', 'shield', 'heal', 'scout', 'gain-action',
      'reveal-character', 'reveal-item',
      'die-constitution', 'die-zeal', 'die-path',
    ];

    for (const icon of ICON_NAMES) {
      const pattern = new RegExp(`&lt;${icon}&gt;(\\[(.*?)\\])?`, 'g');
      text = text.replace(pattern, (_match, _modGroup, mod) => {
        const modHtml = mod
          ? `<span class="sym-mod">${this.escapeHtml(mod)}</span>`
          : '';
        return `<span class="sym-group"><svg width="16" height="16"><use href="#icon-${icon}"/></svg>${modHtml}</span>`;
      });
    }

    return text;
  }

  /**
   * Render a full preview HTML document for a card.
   * Falls back to a placeholder if no baseline template exists.
   */
  async renderCard(card: AnyCard): Promise<string> {
    const template = await this.loadTemplate(card.type);

    if (!template) {
      // Script card or missing baseline — show design pending placeholder
      return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
        body { font-family: sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; background:#f8fafc; }
        .msg { text-align:center; color:#9ca3af; font-size:1rem; padding:2rem; }
      </style></head><body><div class="msg">Design pending — no baseline template for card type: ${card.type}</div></body></html>`;
    }

    return this.injectFields(template, card);
  }

  private replace(html: string, placeholder: string, value: string): string {
    return html.split(placeholder).join(value);
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
