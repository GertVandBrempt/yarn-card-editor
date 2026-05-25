import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventCard, Trigger } from '../../../models';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { TriggersEditorComponent } from '../../shared/triggers-editor/triggers-editor.component';

// Event cards: onReveal is required and not removable; no actions
const EVENT_TRIGGER_TYPES = ['on-reveal'] as const;

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageUploadComponent, TriggersEditorComponent],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent implements OnChanges {
  @Input() card!: EventCard;
  @Output() cardChange = new EventEmitter<EventCard>();

  local!: EventCard;
  allowedTriggerTypes = [...EVENT_TRIGGER_TYPES] as any[];
  triggers: Trigger[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card']) {
      this.local = { ...this.card };
      this.triggers = [this.local.onReveal];
    }
  }

  onTitleChange(title: string): void { this.local = { ...this.local, title }; this.emit(); }
  onSubtitleChange(subtitle: string): void { this.local = { ...this.local, subtitle }; this.emit(); }
  onFlavourChange(flavourText: string): void { this.local = { ...this.local, flavourText }; this.emit(); }
  onTierChange(tier: 'generic' | 'fated'): void { this.local = { ...this.local, tier }; this.emit(); }
  onImageChange(imageUrl: string | undefined): void { this.local = { ...this.local, imageUrl }; this.emit(); }

  onTriggersChange(triggers: Trigger[]): void {
    // onReveal is required; always use first trigger (cannot be removed)
    const onReveal = triggers[0] ?? this.local.onReveal;
    this.local = { ...this.local, onReveal };
    this.triggers = [onReveal];
    this.emit();
  }

  private emit(): void {
    this.cardChange.emit({ ...this.local });
  }
}
