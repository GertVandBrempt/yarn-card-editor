import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Action, Effect, TrackType } from '../../../models';
import { EffectEditorComponent } from '../effect-editor/effect-editor.component';

const TRACK_TYPE_LABELS: Record<TrackType, string> = {
  basic: 'Basic',
  'multi-turn': 'Multi-turn',
  'multi-use': 'Multi-use',
  and: 'AND',
  or: 'OR',
  use: 'Use',
};

const TRACK_TYPES: TrackType[] = ['basic', 'multi-turn', 'multi-use', 'and', 'or', 'use'];

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
  trackTypeLabels = TRACK_TYPE_LABELS;

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
    this.localActions = this.localActions.map((a, i) =>
      i === index ? { ...a, trackType } : a
    );
    this.emit();
  }

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
