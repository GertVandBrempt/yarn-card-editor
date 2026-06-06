import { CardBase } from './card-base.model';
import { SideQuestTier } from './card-types';
import { Trigger } from './effect.model';

// Quest Objective
export interface Objective {
  title: string;
  description: string;
  triggers: Trigger[];         // Multiple on-complete triggers supported
}

// Main Quest Card (§3.7 DESIGN.md)
export interface MainQuestCard extends CardBase {
  type: 'main-quest';
  act: number;
  objectives: Objective[];
}

// Side Quest Card (§3.8 DESIGN.md)
export interface SideQuestCard extends CardBase {
  type: 'side-quest';
  tier: SideQuestTier;
  objectives: Objective[];
  mandatory: boolean;
}

// Union type for quest cards (shared QuestFormComponent handles both)
export type QuestCard = MainQuestCard | SideQuestCard;
