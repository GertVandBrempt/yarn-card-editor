// Barrel export for all models
export * from './card-types';
export * from './effect.model';
export * from './container.model';
export * from './card-base.model';
export * from './card-set.model';
export * from './persona-card.model';
export * from './location-card.model';
export * from './character-card.model';
export * from './item-card.model';
export * from './event-card.model';
export * from './quest-card.model';
export * from './script-card.model';

import { PersonaCard } from './persona-card.model';
import { LocationCard } from './location-card.model';
import { CharacterCard } from './character-card.model';
import { ItemCard } from './item-card.model';
import { EventCard } from './event-card.model';
import { MainQuestCard, SideQuestCard } from './quest-card.model';
import { ScriptCard } from './script-card.model';

// Union type for any card in the system
export type AnyCard =
  | PersonaCard
  | LocationCard
  | CharacterCard
  | ItemCard
  | EventCard
  | MainQuestCard
  | SideQuestCard
  | ScriptCard;
