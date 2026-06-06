import { CardBase } from './card-base.model';
import { LocationTier, Direction, EntryState } from './card-types';
import { Action, Trigger } from './effect.model';

// Location connection (one per cardinal direction, up to 4)
export interface Connection {
  direction: Direction;
  target: 'abstract' | string; // 'abstract' = draw from deck; string = cardId
  entryState: EntryState;
}

// Location Card (§3.3 DESIGN.md)
export interface LocationCard extends CardBase {
  type: 'location';
  tier: LocationTier;
  connections: Connection[];   // Up to 4, one per cardinal direction
  triggers: Trigger[];         // Multiple triggers supported (on-reveal, on-enter, on-leave)
  actions: Action[];
}
