import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationCard, Connection, Trigger } from '../../../models';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { TriggersEditorComponent } from '../../shared/triggers-editor/triggers-editor.component';
import { ActionsEditorComponent } from '../../shared/actions-editor/actions-editor.component';

// Valid trigger types for Location cards
const LOCATION_TRIGGER_TYPES = ['on-reveal', 'on-enter', 'on-leave'] as const;

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ImageUploadComponent,
    TriggersEditorComponent,
    ActionsEditorComponent,
  ],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css',
})
export class LocationFormComponent implements OnChanges {
  @Input() card!: LocationCard;
  @Output() cardChange = new EventEmitter<LocationCard>();

  local!: LocationCard;
  allowedTriggerTypes = [...LOCATION_TRIGGER_TYPES] as any[];

  // Triggers array bound to TriggersEditorComponent
  triggers: Trigger[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card']) {
      this.local = { ...this.card, triggers: [...(this.card.triggers ?? [])] };
      this.triggers = [...this.local.triggers];
    }
  }

  onTitleChange(title: string): void {
    this.local = { ...this.local, title };
    this.emit();
  }

  onSubtitleChange(subtitle: string): void {
    this.local = { ...this.local, subtitle };
    this.emit();
  }

  onFlavourChange(flavourText: string): void {
    this.local = { ...this.local, flavourText };
    this.emit();
  }

  onTierChange(tier: 'generic' | 'setpiece'): void {
    this.local = { ...this.local, tier };
    this.emit();
  }

  onImageChange(imageUrl: string | undefined): void {
    this.local = { ...this.local, imageUrl };
    this.emit();
  }

  onTriggersChange(triggers: Trigger[]): void {
    this.local = { ...this.local, triggers: [...triggers] };
    this.triggers = [...triggers];
    this.emit();
  }

  onActionsChange(actions: any[]): void {
    this.local = { ...this.local, actions };
    this.emit();
  }

  private emit(): void {
    this.cardChange.emit({ ...this.local });
  }
}
