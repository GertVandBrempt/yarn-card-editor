import { CardBase } from './card-base.model';
import { CharacterTier, CharacterAlignment } from './card-types';
import { Action, PassiveEffect, Trigger } from './effect.model';

// Ally mode fields — present only if character can be recruited to Tableau
export interface AllyModeFields {
  passiveEffects: PassiveEffect[];
  actions: Action[];
}

// Character Card (§3.4 DESIGN.md)
export interface CharacterCard extends CardBase {
  type: 'character';
  tier: CharacterTier;
  alignment: CharacterAlignment;
  initiative: number;
  triggers: Trigger[];         // Multiple triggers supported (on-reveal, character-phase)
  actions: Action[];           // Available while in Game Area
  allyMode?: AllyModeFields;  // Present only if character can be recruited
}
