import { TriggerType, EffectVariant, TrackType } from './card-types';

// Rolled outcome tier
export interface Tier {
  successCount: number;
  outcome: string;
}

// A single effect (passive, fixed, rolled, or complex)
export interface Effect {
  variant: EffectVariant;
  trigger?: TriggerType;
  text: string;            // Raw inline syntax string e.g. "Deal <damage>[2] to each enemy"
  tiers?: Tier[];          // Rolled effects only
}

// A trigger entry on a card
export interface Trigger {
  type: TriggerType;
  effect: Effect;
}

// Flow marker on a multi-turn action track
export interface FlowMarker {
  position: number;        // 1-indexed position on the track
  effect?: Effect;         // Optional OnFlowMarker effect at this position
}

// Primitive track types (used by AND/OR sub-tracks)
export type PrimitiveTrackType = 'basic' | 'multi-turn' | 'multi-use' | 'use';

// A sub-track within an AND/OR compound action
export interface SubTrack {
  id: string;
  trackType: PrimitiveTrackType;
  cooldownTurns?: number;   // multi-turn: minimum 1
  slotCount?: number;       // multi-use: minimum 2
  chargeCount?: number;     // use: minimum 1
}

// A player-initiated action on a card
export interface Action {
  id: string;
  label: string;
  trackType: TrackType;
  effects: Effect[];
  flowMarkers?: FlowMarker[];  // Multi-turn tracks only
  linkedActionIds?: string[];  // AND/OR tracks only (legacy — use subTracks)
  subTracks?: SubTrack[];      // AND/OR tracks only — configured sub-tracks
  chargeCount?: number;        // Use tracks only
  slotCount?: number;          // Multi-use tracks only
  cooldownTurns?: number;      // Multi-turn tracks only
}

// Passive effect (always-on)
export interface PassiveEffect {
  text: string;            // Raw inline syntax string
}

// Slot definition for Core Persona cards
export interface SlotDefinition {
  count: number;
  allowedRoles?: string[];
  allowedTraits?: string[];
}

// Life point slot coverage element reference
export interface SlotCoverage {
  elementRef: string;      // Reference to the damageable element
}
