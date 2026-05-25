// Card type enum — all supported card types in the editor
export type CardType =
  | 'location'
  | 'character'
  | 'item'
  | 'event'
  | 'main-quest'
  | 'side-quest'
  | 'persona'
  | 'script';

// Trigger types available across card types
export type TriggerType =
  | 'on-reveal'
  | 'on-enter'
  | 'on-leave'
  | 'character-phase'
  | 'on-complete'
  | 'on-flow-marker';

// Action track types (§4.4 DESIGN.md)
export type TrackType = 'basic' | 'multi-turn' | 'multi-use' | 'and' | 'or' | 'use';

// Effect variant
export type EffectVariant = 'passive' | 'fixed' | 'rolled' | 'complex';

// Tier for various card types
export type LocationTier = 'generic' | 'setpiece';
export type CharacterTier = 'generic' | 'main';
export type CharacterAlignment = 'ally' | 'neutral' | 'enemy';
export type ItemTier = 'generic' | 'key';
export type EventTier = 'generic' | 'fated';
export type SideQuestTier = 'side' | 'key';
export type ScriptMode = 'timed' | 'infinite';
export type PersonaRole = 'constitution' | 'zeal' | 'path';

// Direction for location connections
export type Direction = 'N' | 'E' | 'S' | 'W';
export type EntryState = 'face-down' | 'face-up';
