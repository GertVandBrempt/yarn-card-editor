import { CardBase } from './card-base.model';
import { EventTier } from './card-types';
import { Trigger } from './effect.model';

// Event Card (§3.6 DESIGN.md)
// Events always have onReveal (required). They are discarded after resolution.
export interface EventCard extends CardBase {
  type: 'event';
  tier: EventTier;
  triggers: Trigger[];         // First trigger is on-reveal (required); additional triggers allowed
}
