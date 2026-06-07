/**
 * Utility functions to convert editor-level card data (triggers, actions,
 * passive effects) into the Container/Row rendering model.
 *
 * The editor stores data in typed domain fields (triggers[], actions[],
 * passiveEffects[]) for form editing convenience. At render time, these
 * are converted to Container[] so PreviewService can render a flat
 * sequence of rows with symbols and effects.
 *
 * Action remains an editor-level grouping. PreviewService flattens each
 * action's rows into the action container's row list.
 */

import { Container, ContainerType, Row } from './container.model';
import { Action, Trigger, PassiveEffect, FlowMarker, Effect } from './effect.model';
import { PersonaCard } from './persona-card.model';
import { LocationCard } from './location-card.model';
import { CharacterCard } from './character-card.model';
import { ItemCard } from './item-card.model';
import { EventCard } from './event-card.model';

// Import card union types directly to avoid circular dependency with index.ts
type AnyCard =
  | PersonaCard
  | LocationCard
  | CharacterCard
  | ItemCard
  | EventCard
  | import('./quest-card.model').MainQuestCard
  | import('./quest-card.model').SideQuestCard
  | import('./script-card.model').ScriptCard;

// ── Entry vs Exit trigger classification ────────────────

const ENTRY_TRIGGER_TYPES = new Set(['on-reveal', 'on-enter']);
const EXIT_TRIGGER_TYPES = new Set([
  'on-leave', 'character-phase', 'on-complete', 'on-flow-marker',
]);

// ── Trigger -> Row ──────────────────────────────────────

/** Convert a single Trigger into a Row. */
export function triggerToRow(trigger: Trigger): Row {
  return {
    symbol: trigger.type,
    effect: trigger.effect,
  };
}

// ── Action -> Row[] ─────────────────────────────────────

/**
 * Flatten an Action into its Row[] rendering representation.
 *
 * The row structure depends on the track type:
 *
 * - **basic**: one activation row per effect
 *   - First effect row gets the 'activation' symbol; subsequent rows have no symbol.
 *
 * - **use**: one row with N use markers before the effect text
 *   - Symbol is 'use-marker', useMarkerCount = chargeCount.
 *
 * - **multi-use**: one activation row per slot, each with the same effect
 *   - Each row gets 'use-marker' symbol. slotCount determines row count.
 *
 * - **multi-turn**: activation row, then flow-marker/cooldown-trigger rows
 *   - First row: 'activation' symbol + first effect.
 *   - Subsequent rows: 'flow-marker' (no effect) or 'cooldown-trigger' (with effect).
 *   - Number of cooldown rows = cooldownTurns.
 *
 * - **and/or**: compound — recursively flatten sub-track actions.
 *   (For now, rendered as basic with a fallback marker.)
 */
export function actionToRows(action: Action): Row[] {
  switch (action.trackType) {
    case 'basic':
      return basicActionToRows(action);
    case 'use':
      return useActionToRows(action);
    case 'multi-use':
      return multiUseActionToRows(action);
    case 'multi-turn':
      return multiTurnActionToRows(action);
    case 'and':
    case 'or':
      // Compound tracks: flatten as basic for now (sub-tracks not yet
      // visually designed as accepted variants)
      return basicActionToRows(action);
    default:
      return basicActionToRows(action);
  }
}

/** Basic action: activation symbol on first effect row, rest have no symbol. */
function basicActionToRows(action: Action): Row[] {
  const effects = action.effects ?? [];
  if (effects.length === 0) {
    return [{
      symbol: 'activation',
      effect: { variant: 'fixed', text: action.label || '' },
    }];
  }
  return effects.map((eff, i) => ({
    symbol: i === 0 ? 'activation' as const : undefined,
    effect: eff,
  }));
}

/** Use-track action: one row with N use markers. */
function useActionToRows(action: Action): Row[] {
  const count = action.chargeCount ?? 1;
  const effect = action.effects?.[0] ?? { variant: 'fixed' as const, text: action.label || '' };
  return [{
    symbol: 'use-marker' as const,
    effect,
    useMarkerCount: count,
  }];
}

/** Multi-use action: one activation row per slot, each with the same effect. */
function multiUseActionToRows(action: Action): Row[] {
  const slots = action.slotCount ?? 2;
  const effect = action.effects?.[0] ?? { variant: 'fixed' as const, text: action.label || '' };
  const rows: Row[] = [];
  for (let i = 0; i < slots; i++) {
    rows.push({
      symbol: 'use-marker' as const,
      effect,
    });
  }
  return rows;
}

/** Multi-turn action: activation row + flow/cooldown rows. */
function multiTurnActionToRows(action: Action): Row[] {
  const rows: Row[] = [];
  const effect = action.effects?.[0] ?? { variant: 'fixed' as const, text: action.label || '' };

  // First row: activation marker + effect
  rows.push({
    symbol: 'activation',
    effect,
  });

  // Cooldown rows
  const cooldown = action.cooldownTurns ?? 1;
  const flowMarkers = action.flowMarkers ?? [];

  for (let pos = 1; pos <= cooldown; pos++) {
    const fm = flowMarkers.find(m => m.position === pos);
    if (fm?.effect) {
      // This is a cooldown-trigger slot (has an effect)
      rows.push({
        symbol: 'cooldown-trigger',
        effect: fm.effect,
      });
    } else {
      // Plain flow-marker slot (no effect)
      rows.push({
        symbol: 'flow-marker',
      });
    }
  }

  return rows;
}

// ── Passive -> Row ──────────────────────────────────────

/** Convert a PassiveEffect into a Row (no symbol). */
export function passiveToRow(passive: PassiveEffect): Row {
  return {
    effect: { variant: 'passive', text: passive.text },
  };
}

// ── Card -> Container[] ─────────────────────────────────

/**
 * Convert any card's editor-level fields into the Container[] rendering
 * model. This is the primary entry point for PreviewService.
 *
 * Returns containers in rendering order:
 * 1. Permanent (passive effects)
 * 2. Entry (on-reveal, on-enter triggers)
 * 3. Action (all actions flattened to rows)
 * 4. Exit (on-leave, character-phase, on-complete, on-flow-marker triggers)
 *
 * Empty containers (no rows) are omitted.
 */
export function cardToContainers(card: AnyCard): Container[] {
  const containers: Container[] = [];

  // 1. Permanent (passive effects)
  const passiveRows = getPassiveRows(card);
  if (passiveRows.length > 0) {
    containers.push({ type: 'permanent', label: 'Permanent', rows: passiveRows });
  }

  // 2. Entry triggers
  const entryRows = getEntryTriggerRows(card);
  if (entryRows.length > 0) {
    containers.push({ type: 'entry', label: 'Entry', rows: entryRows });
  }

  // 3. Actions (flattened)
  const actionRows = getActionRows(card);
  if (actionRows.length > 0) {
    containers.push({ type: 'action', label: 'Action', rows: actionRows });
  }

  // 4. Exit triggers
  const exitRows = getExitTriggerRows(card);
  if (exitRows.length > 0) {
    containers.push({ type: 'exit', label: 'Exit', rows: exitRows });
  }

  return containers;
}

// ── Internal helpers ────────────────────────────────────

function getPassiveRows(card: AnyCard): Row[] {
  let passives: PassiveEffect[] = [];
  switch (card.type) {
    case 'persona':
      passives = (card as PersonaCard).passiveEffects ?? [];
      break;
    case 'item':
      passives = (card as ItemCard).passiveEffects ?? [];
      break;
    case 'character':
      passives = (card as CharacterCard).allyMode?.passiveEffects ?? [];
      break;
  }
  return passives.map(passiveToRow);
}

function getAllTriggers(card: AnyCard): Trigger[] {
  switch (card.type) {
    case 'location':
      return (card as LocationCard).triggers ?? [];
    case 'character':
      return (card as CharacterCard).triggers ?? [];
    case 'event':
      return (card as EventCard).triggers ?? [];
    default:
      return [];
  }
}

function getEntryTriggerRows(card: AnyCard): Row[] {
  return getAllTriggers(card)
    .filter(t => ENTRY_TRIGGER_TYPES.has(t.type))
    .map(triggerToRow);
}

function getExitTriggerRows(card: AnyCard): Row[] {
  return getAllTriggers(card)
    .filter(t => EXIT_TRIGGER_TYPES.has(t.type))
    .map(triggerToRow);
}

function getAllActions(card: AnyCard): Action[] {
  switch (card.type) {
    case 'persona':
      return (card as PersonaCard).actions ?? [];
    case 'location':
      return (card as LocationCard).actions ?? [];
    case 'character':
      return (card as CharacterCard).actions ?? [];
    case 'item':
      return (card as ItemCard).actions ?? [];
    default:
      return [];
  }
}

function getActionRows(card: AnyCard): Row[] {
  const actions = getAllActions(card);
  const rows: Row[] = [];
  for (const action of actions) {
    rows.push(...actionToRows(action));
  }
  return rows;
}
