import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trigger, Effect, TriggerType } from '../../../models';
import { EffectEditorComponent } from '../effect-editor/effect-editor.component';

export interface TriggerOption {
  value: TriggerType;
  label: string;
}

const ALL_TRIGGER_OPTIONS: TriggerOption[] = [
  { value: 'on-reveal', label: 'On Reveal' },
  { value: 'on-enter', label: 'On Enter' },
  { value: 'on-leave', label: 'On Leave' },
  { value: 'character-phase', label: 'Character Phase' },
  { value: 'on-complete', label: 'On Complete' },
  { value: 'on-flow-marker', label: 'On Flow Marker' },
];

@Component({
  selector: 'app-triggers-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, EffectEditorComponent],
  templateUrl: './triggers-editor.component.html',
  styleUrl: './triggers-editor.component.css',
})
export class TriggersEditorComponent implements OnChanges {
  /** List of currently configured triggers. */
  @Input() triggers: Trigger[] = [];

  /** Which trigger types are valid for this card type. */
  @Input() allowedTriggerTypes: TriggerType[] = [
    'on-reveal', 'on-enter', 'on-leave', 'character-phase', 'on-complete', 'on-flow-marker',
  ];

  /**
   * If true, the first trigger is required and cannot be removed
   * (e.g. Event cards always have onReveal).
   */
  @Input() firstRequired = false;

  @Output() triggersChange = new EventEmitter<Trigger[]>();

  localTriggers: Trigger[] = [];

  triggerOptions: TriggerOption[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggers']) {
      this.localTriggers = this.triggers ? [...this.triggers] : [];
    }
    if (changes['allowedTriggerTypes']) {
      this.triggerOptions = ALL_TRIGGER_OPTIONS.filter(
        (opt) => this.allowedTriggerTypes.includes(opt.value)
      );
    }
  }

  addTrigger(): void {
    const defaultType = this.triggerOptions[0]?.value ?? 'on-reveal';
    this.localTriggers = [
      ...this.localTriggers,
      { type: defaultType, effect: { variant: 'fixed', text: '' } },
    ];
    this.emit();
  }

  removeTrigger(index: number): void {
    this.localTriggers = this.localTriggers.filter((_, i) => i !== index);
    this.emit();
  }

  onTypeChange(index: number, type: TriggerType): void {
    this.localTriggers = this.localTriggers.map((t, i) =>
      i === index ? { ...t, type } : t
    );
    this.emit();
  }

  onEffectChange(index: number, effect: Effect): void {
    this.localTriggers = this.localTriggers.map((t, i) =>
      i === index ? { ...t, effect } : t
    );
    this.emit();
  }

  private emit(): void {
    this.triggersChange.emit([...this.localTriggers]);
  }

  triggerLabel(type: TriggerType): string {
    return ALL_TRIGGER_OPTIONS.find((o) => o.value === type)?.label ?? type;
  }
}
