import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonaCard, Action, PersonaRole } from '../../../models';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { ActionsEditorComponent } from '../../shared/actions-editor/actions-editor.component';

// Persona cards: no triggers; only actions (§per-type table in APP.md)

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageUploadComponent, ActionsEditorComponent],
  templateUrl: './persona-form.component.html',
  styleUrl: './persona-form.component.css',
})
export class PersonaFormComponent implements OnChanges {
  @Input() card!: PersonaCard;
  @Output() cardChange = new EventEmitter<PersonaCard>();

  local!: PersonaCard;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card']) {
      this.local = { ...this.card };
    }
  }

  onTitleChange(title: string): void { this.local = { ...this.local, title }; this.emit(); }
  onSubtitleChange(subtitle: string): void { this.local = { ...this.local, subtitle }; this.emit(); }
  onFlavourChange(flavourText: string): void { this.local = { ...this.local, flavourText }; this.emit(); }
  onRoleChange(role: PersonaRole): void { this.local = { ...this.local, role }; this.emit(); }
  onTraitChange(trait: string): void { this.local = { ...this.local, trait }; this.emit(); }
  onIsCoreChange(isCore: boolean): void { this.local = { ...this.local, isCore }; this.emit(); }
  onLifePointSlotCountChange(n: number): void { this.local = { ...this.local, lifePointSlotCount: n }; this.emit(); }
  onImageChange(imageUrl: string | undefined): void { this.local = { ...this.local, imageUrl }; this.emit(); }
  onActionsChange(actions: Action[]): void { this.local = { ...this.local, actions }; this.emit(); }

  private emit(): void {
    this.cardChange.emit({ ...this.local });
  }
}
