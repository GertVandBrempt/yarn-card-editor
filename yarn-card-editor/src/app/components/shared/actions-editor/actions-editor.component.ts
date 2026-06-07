import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Action, Effect, FlowMarker, TrackType, SubTrack, PrimitiveTrackType } from '../../../models';
import { EffectEditorComponent } from '../effect-editor/effect-editor.component';

const TRACK_TYPE_LABELS: Record<TrackType, string> = {
  basic: 'Basic',
  'multi-turn': 'Multi-turn',
  'multi-use': 'Multi-use',
  and: 'AND',
  or: 'OR',
  use: 'Use',
};

const PRIMITIVE_TRACK_TYPE_LABELS: Record<PrimitiveTrackType, string> = {
  basic: 'Basic',
  'multi-turn': 'Multi-turn',
  'multi-use': 'Multi-use',
  use: 'Use',
};

const TRACK_TYPES: TrackType[] = ['basic', 'multi-turn', 'multi-use', 'and', 'or', 'use'];
const PRIMITIVE_TRACK_TYPES: PrimitiveTrackType[] = ['basic', 'multi-turn', 'multi-use', 'use'];

/**
 * Represents a single cooldown slot in the multi-turn action sub-form.
 * Each slot is either a plain flow-marker (no effect) or a cooldown-trigger
 * (has an effect that fires when the flow marker reaches this slot).
 */
export interface CooldownSlot {
  position: number;           // 1-indexed position on the cooldown track
  isTrigger: boolean;         // true = cooldown-trigger (has effect); false = flow-marker
  effect: Effect;             // Only meaningful when isTrigger is true
}

@Component({
  selector: 'app-actions-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, EffectEditorComponent],
  templateUrl: './actions-editor.component.html',
  styleUrl: './actions-editor.component.css',
})
export class ActionsEditorComponent implements OnChanges {
  @Input() actions: Action[] = [];
  @Output() actionsChange = new EventEmitter<Action[]>();

  localActions: Action[] = [];
  trackTypes = TRACK_TYPES;
  primitiveTrackTypes = PRIMITIVE_TRACK_TYPES;
  trackTypeLabels = TRACK_TYPE_LABELS;
  primitiveTrackTypeLabels = PRIMITIVE_TRACK_TYPE_LABELS;

  /**
   * Per-action cooldown slot arrays for multi-turn actions.
   * Keyed by action index. Rebuilt whenever the action list or cooldownTurns changes.
   */
  cooldownSlots: Map<number, CooldownSlot[]> = new Map();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actions']) {
      this.localActions = this.actions ? [...this.actions] : [];
      this.rebuildAllCooldownSlots();
    }
  }

  addAction(): void {
    const newAction: Action = {
      id: crypto.randomUUID(),
      label: '',
      trackType: 'basic',
      effects: [{ variant: 'fixed', text: '' }],
    };
    this.localActions = [...this.localActions, newAction];
    this.rebuildAllCooldownSlots();
    this.emit();
  }

  removeAction(index: number): void {
    this.localActions = this.localActions.filter((_, i) => i !== index);
    this.rebuildAllCooldownSlots();
    this.emit();
  }

  onLabelChange(index: number, label: string): void {
    this.localActions = this.localActions.map((a, i) =>
      i === index ? { ...a, label } : a
    );
    this.emit();
  }

  onTrackTypeChange(index: number, trackType: TrackType): void {
    // Clear type-specific fields when switching types
    const base = this.localActions[index];
    const updated: Action = {
      ...base,
      trackType,
      cooldownTurns: trackType === 'multi-turn' ? (base.cooldownTurns ?? 1) : undefined,
      flowMarkers: trackType === 'multi-turn' ? (base.flowMarkers ?? []) : undefined,
      slotCount: trackType === 'multi-use' ? (base.slotCount ?? 2) : undefined,
      chargeCount: trackType === 'use' ? (base.chargeCount ?? 1) : undefined,
      subTracks: (trackType === 'and' || trackType === 'or')
        ? (base.subTracks ?? [])
        : undefined,
    };
    this.localActions = this.localActions.map((a, i) => i === index ? updated : a);
    this.rebuildAllCooldownSlots();
    this.emit();
  }

  onCooldownChange(index: number, cooldownTurns: number): void {
    const val = Math.max(1, cooldownTurns || 1);
    const action = this.localActions[index];

    // Reconcile flowMarkers: trim excess, keep existing within range
    const existingMarkers = action.flowMarkers ?? [];
    const reconciledMarkers = existingMarkers.filter(m => m.position <= val);

    this.localActions = this.localActions.map((a, i) =>
      i === index ? { ...a, cooldownTurns: val, flowMarkers: reconciledMarkers } : a
    );
    this.rebuildCooldownSlots(index);
    this.emit();
  }

  onSlotCountChange(index: number, slotCount: number): void {
    const val = Math.max(2, slotCount || 2);
    this.localActions = this.localActions.map((a, i) =>
      i === index ? { ...a, slotCount: val } : a
    );
    this.emit();
  }

  onChargeCountChange(index: number, chargeCount: number): void {
    const val = Math.max(1, chargeCount || 1);
    this.localActions = this.localActions.map((a, i) =>
      i === index ? { ...a, chargeCount: val } : a
    );
    this.emit();
  }

  // ── Cooldown slot methods (multi-turn) ────────────

  /**
   * Get the cooldown slots array for a given action index.
   * Returns an empty array for non-multi-turn actions.
   */
  getCooldownSlots(actionIndex: number): CooldownSlot[] {
    return this.cooldownSlots.get(actionIndex) ?? [];
  }

  /**
   * Toggle a cooldown slot between flow-marker and cooldown-trigger.
   */
  onSlotToggle(actionIndex: number, slotIndex: number): void {
    const slots = this.getCooldownSlots(actionIndex);
    if (slotIndex < 0 || slotIndex >= slots.length) return;

    const slot = slots[slotIndex];
    const newIsTrigger = !slot.isTrigger;

    // Update the slot
    const updatedSlots = slots.map((s, i) =>
      i === slotIndex
        ? { ...s, isTrigger: newIsTrigger, effect: newIsTrigger ? (s.effect.text ? s.effect : { variant: 'fixed' as const, text: '' }) : { variant: 'fixed' as const, text: '' } }
        : s
    );
    this.cooldownSlots.set(actionIndex, updatedSlots);

    // Sync back to action's flowMarkers
    this.syncSlotsToAction(actionIndex);
  }

  /**
   * Update the effect on a cooldown-trigger slot.
   */
  onSlotEffectChange(actionIndex: number, slotIndex: number, effect: Effect): void {
    const slots = this.getCooldownSlots(actionIndex);
    if (slotIndex < 0 || slotIndex >= slots.length) return;

    const updatedSlots = slots.map((s, i) =>
      i === slotIndex ? { ...s, effect } : s
    );
    this.cooldownSlots.set(actionIndex, updatedSlots);

    // Sync back to action's flowMarkers
    this.syncSlotsToAction(actionIndex);
  }

  /**
   * Rebuild cooldown slots for all multi-turn actions.
   */
  private rebuildAllCooldownSlots(): void {
    this.cooldownSlots.clear();
    for (let i = 0; i < this.localActions.length; i++) {
      if (this.localActions[i].trackType === 'multi-turn') {
        this.rebuildCooldownSlots(i);
      }
    }
  }

  /**
   * Rebuild the cooldown slots array for a specific action from its flowMarkers.
   */
  private rebuildCooldownSlots(actionIndex: number): void {
    const action = this.localActions[actionIndex];
    if (action.trackType !== 'multi-turn') {
      this.cooldownSlots.delete(actionIndex);
      return;
    }

    const cooldown = action.cooldownTurns ?? 1;
    const markers = action.flowMarkers ?? [];
    const slots: CooldownSlot[] = [];

    for (let pos = 1; pos <= cooldown; pos++) {
      const marker = markers.find(m => m.position === pos);
      if (marker?.effect) {
        slots.push({
          position: pos,
          isTrigger: true,
          effect: { ...marker.effect },
        });
      } else {
        slots.push({
          position: pos,
          isTrigger: false,
          effect: { variant: 'fixed', text: '' },
        });
      }
    }

    this.cooldownSlots.set(actionIndex, slots);
  }

  /**
   * Sync the cooldown slots UI state back to the action's flowMarkers array.
   */
  private syncSlotsToAction(actionIndex: number): void {
    const slots = this.getCooldownSlots(actionIndex);
    const flowMarkers: FlowMarker[] = slots
      .filter(s => s.isTrigger)
      .map(s => ({
        position: s.position,
        effect: { ...s.effect },
      }));

    // Also include non-trigger slots as markers without effects (so position tracking is preserved)
    // Actually, the model only stores flow markers that have effects (cooldown triggers).
    // Plain flow-marker slots don't need storage — their existence is implied by position.

    this.localActions = this.localActions.map((a, i) =>
      i === actionIndex ? { ...a, flowMarkers } : a
    );
    this.emit();
  }

  // ── Sub-track methods (AND/OR) ─────────────────────

  addSubTrack(actionIndex: number): void {
    const newSub: SubTrack = {
      id: crypto.randomUUID(),
      trackType: 'basic',
    };
    this.localActions = this.localActions.map((a, i) => {
      if (i !== actionIndex) return a;
      return { ...a, subTracks: [...(a.subTracks ?? []), newSub] };
    });
    this.emit();
  }

  removeSubTrack(actionIndex: number, subIndex: number): void {
    this.localActions = this.localActions.map((a, i) => {
      if (i !== actionIndex) return a;
      return { ...a, subTracks: (a.subTracks ?? []).filter((_, si) => si !== subIndex) };
    });
    this.emit();
  }

  onSubTrackTypeChange(actionIndex: number, subIndex: number, trackType: PrimitiveTrackType): void {
    this.localActions = this.localActions.map((a, i) => {
      if (i !== actionIndex) return a;
      const subTracks = (a.subTracks ?? []).map((s, si) => {
        if (si !== subIndex) return s;
        return {
          ...s,
          trackType,
          cooldownTurns: trackType === 'multi-turn' ? (s.cooldownTurns ?? 1) : undefined,
          slotCount: trackType === 'multi-use' ? (s.slotCount ?? 2) : undefined,
          chargeCount: trackType === 'use' ? (s.chargeCount ?? 1) : undefined,
        };
      });
      return { ...a, subTracks };
    });
    this.emit();
  }

  onSubCooldownChange(actionIndex: number, subIndex: number, v: number): void {
    const val = Math.max(1, v || 1);
    this.localActions = this.localActions.map((a, i) => {
      if (i !== actionIndex) return a;
      const subTracks = (a.subTracks ?? []).map((s, si) =>
        si === subIndex ? { ...s, cooldownTurns: val } : s
      );
      return { ...a, subTracks };
    });
    this.emit();
  }

  onSubSlotCountChange(actionIndex: number, subIndex: number, v: number): void {
    const val = Math.max(2, v || 2);
    this.localActions = this.localActions.map((a, i) => {
      if (i !== actionIndex) return a;
      const subTracks = (a.subTracks ?? []).map((s, si) =>
        si === subIndex ? { ...s, slotCount: val } : s
      );
      return { ...a, subTracks };
    });
    this.emit();
  }

  onSubChargeCountChange(actionIndex: number, subIndex: number, v: number): void {
    const val = Math.max(1, v || 1);
    this.localActions = this.localActions.map((a, i) => {
      if (i !== actionIndex) return a;
      const subTracks = (a.subTracks ?? []).map((s, si) =>
        si === subIndex ? { ...s, chargeCount: val } : s
      );
      return { ...a, subTracks };
    });
    this.emit();
  }

  // ── Effect methods ─────────────────────────────────

  addEffect(actionIndex: number): void {
    this.localActions = this.localActions.map((a, i) =>
      i === actionIndex
        ? { ...a, effects: [...a.effects, { variant: 'fixed' as const, text: '' }] }
        : a
    );
    this.emit();
  }

  removeEffect(actionIndex: number, effectIndex: number): void {
    this.localActions = this.localActions.map((a, i) =>
      i === actionIndex
        ? { ...a, effects: a.effects.filter((_, ei) => ei !== effectIndex) }
        : a
    );
    this.emit();
  }

  onEffectChange(actionIndex: number, effectIndex: number, effect: Effect): void {
    this.localActions = this.localActions.map((a, i) => {
      if (i !== actionIndex) return a;
      const effects = a.effects.map((e, ei) => (ei === effectIndex ? effect : e));
      return { ...a, effects };
    });
    this.emit();
  }

  private emit(): void {
    this.actionsChange.emit([...this.localActions]);
  }
}
