import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterCard, AllyModeFields, Trigger, Action, PassiveEffect } from '../../../models';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { TriggersEditorComponent } from '../../shared/triggers-editor/triggers-editor.component';
import { ActionsEditorComponent } from '../../shared/actions-editor/actions-editor.component';

// Valid trigger types for Character cards (game area mode)
const CHARACTER_TRIGGER_TYPES = ['on-reveal', 'character-phase'] as const;

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ImageUploadComponent,
    TriggersEditorComponent,
    ActionsEditorComponent,
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css',
})
export class CharacterFormComponent implements OnChanges {
  @Input() card!: CharacterCard;
  @Output() cardChange = new EventEmitter<CharacterCard>();

  local!: CharacterCard;
  activeTab: 'character' | 'ally' = 'character';
  allowedTriggerTypes = [...CHARACTER_TRIGGER_TYPES] as any[];
  triggers: Trigger[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card']) {
      this.local = { ...this.card, triggers: [...(this.card.triggers ?? [])] };
      this.triggers = [...this.local.triggers];
    }
  }

  onTitleChange(title: string): void { this.local = { ...this.local, title }; this.emit(); }
  onSubtitleChange(subtitle: string): void { this.local = { ...this.local, subtitle }; this.emit(); }
  onFlavourChange(flavourText: string): void { this.local = { ...this.local, flavourText }; this.emit(); }
  onTierChange(tier: 'generic' | 'main'): void { this.local = { ...this.local, tier }; this.emit(); }
  onAlignmentChange(alignment: 'ally' | 'neutral' | 'enemy'): void { this.local = { ...this.local, alignment }; this.emit(); }
  onInitiativeChange(initiative: number): void { this.local = { ...this.local, initiative }; this.emit(); }
  onImageChange(imageUrl: string | undefined): void { this.local = { ...this.local, imageUrl }; this.emit(); }

  onTriggersChange(triggers: Trigger[]): void {
    this.local = { ...this.local, triggers: [...triggers] };
    this.triggers = [...triggers];
    this.emit();
  }

  onActionsChange(actions: Action[]): void {
    this.local = { ...this.local, actions };
    this.emit();
  }

  // Ally Mode
  get allyModeEnabled(): boolean { return !!this.local.allyMode; }

  toggleAllyMode(enabled: boolean): void {
    if (enabled) {
      this.local = {
        ...this.local,
        allyMode: { passiveEffects: [], actions: [] },
      };
    } else {
      const { allyMode: _, ...rest } = this.local;
      this.local = rest as CharacterCard;
    }
    this.emit();
  }

  onAllyActionsChange(actions: Action[]): void {
    if (!this.local.allyMode) return;
    this.local = {
      ...this.local,
      allyMode: { ...this.local.allyMode, actions },
    };
    this.emit();
  }

  private emit(): void {
    this.cardChange.emit({ ...this.local });
  }
}
