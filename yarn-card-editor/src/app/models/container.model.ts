/**
 * Row/Container domain model for card mechanics rendering.
 *
 * The fundamental rendering unit is a Row — a single horizontal line
 * in the mechanics frame containing an optional symbol and/or an effect.
 *
 * A Container is a flat ordered list of rows with a declared type:
 * Permanent (passive), Entry (trigger), Action, or Exit (trigger).
 *
 * At render time, PreviewService flattens all containers into rows
 * and renders them in order. Action groupings are an editor-level
 * convenience that do not exist in the rendered output.
 */

import { TriggerType, TrackType } from './card-types';
import { Effect } from './effect.model';

// ── Container types ──────────────────────────────────

/** The four container types that structure a card's mechanics frame. */
export type ContainerType = 'permanent' | 'entry' | 'action' | 'exit';

// ── Container symbols ────────────────────────────────

/**
 * Symbols that can appear in the leading column of a row.
 * Each ContainerType constrains which symbol values are valid:
 *
 * - Permanent: no symbol (rows have effect only)
 * - Entry: trigger symbols (on-reveal, on-enter)
 * - Action: activation marker symbols
 * - Exit: trigger symbols (on-leave, character-phase, on-complete, on-flow-marker)
 */

/** Trigger symbols used in Entry and Exit containers. */
export type TriggerSymbol = TriggerType;

/** Activation marker symbols used in Action containers. */
export type ActivationSymbol =
  | 'activation'       // Standard activation marker (basic, multi-turn initial)
  | 'flow-marker'      // Flow marker slot in multi-turn cooldown
  | 'cooldown-trigger' // Cooldown trigger slot with an effect
  | 'use-marker';      // Use/consume marker (use and multi-use tracks)

/** Union of all possible container symbols. */
export type ContainerSymbol = TriggerSymbol | ActivationSymbol;

// ── Row ──────────────────────────────────────────────

/**
 * A single rendered row in the mechanics frame.
 *
 * - A passive row has no symbol, only an effect.
 * - A trigger row has a TriggerSymbol and an effect.
 * - An activation row has an ActivationSymbol and optionally an effect.
 * - A flow-marker row has a 'flow-marker' symbol and no effect (unless it's a cooldown-trigger).
 * - A use-marker row has one or more 'use-marker' symbols before the effect text.
 */
export interface Row {
  /** The leading symbol, if any. Absent in passive/permanent rows. */
  symbol?: ContainerSymbol;

  /** The effect content for this row. Absent in symbol-only rows (e.g. flow markers). */
  effect?: Effect;

  /**
   * For use-track actions: the number of use markers to render before the effect text.
   * Only meaningful when symbol is 'use-marker'. Defaults to 1.
   */
  useMarkerCount?: number;
}

// ── Container ────────────────────────────────────────

/**
 * A flat ordered list of rows within a declared container type.
 * Maps directly to a visual section in the mechanics frame.
 */
export interface Container {
  /** The container type determines rendering style and valid symbols. */
  type: ContainerType;

  /** The label shown in the container header (e.g. "Permanent", "Entry", "Action", "Exit"). */
  label?: string;

  /** Ordered list of rows in this container. */
  rows: Row[];
}
