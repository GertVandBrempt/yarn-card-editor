import { CardBase } from './card-base.model';
import { PersonaRole } from './card-types';
import { Action, PassiveEffect, SlotDefinition, SlotCoverage } from './effect.model';

// Persona Card (§3.1–3.2 DESIGN.md)
export interface PersonaCard extends CardBase {
  type: 'persona';
  role: PersonaRole;
  trait?: string;
  isCore: boolean;
  passiveEffects: PassiveEffect[];
  actions: Action[];
  personaSlots?: SlotDefinition[];   // Core Persona only
  lifePointSlotCount: number;
  lifePointSlotElements: SlotCoverage[];
}
