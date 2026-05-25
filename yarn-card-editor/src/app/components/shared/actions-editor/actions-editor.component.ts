import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Action, Effect, TrackType, SubTrack, PrimitiveTrackType } from '../../../models';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actions']) {
      this.localActions = this.actions ? [...this.actions] : [];
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
    this.emit();
  }

  removeAction(index: number): void {
    this.localActions = this.localActions.filter((_, i) => i !== index);
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
      slotCount: trackType === 'multi-use' ? (base.slotCount ?? 2) : undefined,
      chargeCount: trackType === 'use' ? (base.chargeCount ?? 1) : undefined,
      subTracks: (trackType === 'and' || trackType === 'or')
        ? (base.subTracks ?? [])
        : undefined,
    };
    this.localActions = this.localActions.map((a, i) => i === index ? updated : a);
    this.emit();
  }

  onCooldownChange(index: number, cooldownTurns: number): void {
    const val = Math.max(1, cooldownTurns || 1);
    this.localActions = this.localActions.map((a, i) =>
      i === index ? { ...a, cooldownTurns: val } : a
    );
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
