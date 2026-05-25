import { CardBase } from './card-base.model';
import { ItemTier } from './card-types';
import { Action, PassiveEffect } from './effect.model';

// Item Card (§3.5 DESIGN.md)
export interface ItemCard extends CardBase {
  type: 'item';
  tier: ItemTier;
  passiveEffects: PassiveEffect[];
  actions: Action[];
}
