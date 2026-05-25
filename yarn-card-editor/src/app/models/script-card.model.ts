import { CardBase } from './card-base.model';
import { ScriptMode } from './card-types';

// A single turn in a Script card's turn schedule
export interface TurnEntry {
  genericEventCount: number;
  fatedEvent: 'none' | 'random' | string; // string = cardId within set
}

// Script Card (§3.9 DESIGN.md)
export interface ScriptCard extends CardBase {
  type: 'script';
  mode: ScriptMode;
  turns: TurnEntry[];
  loopFromTurn?: number;  // Infinite mode only: 1-indexed turn the repeating tail begins
}
