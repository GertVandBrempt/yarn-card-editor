import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainQuestCard, SideQuestCard, QuestCard, Objective, Trigger } from '../../../models';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { TriggersEditorComponent } from '../../shared/triggers-editor/triggers-editor.component';

// Quest (Main + Side): onComplete triggers live per objective; no top-level actions
const OBJECTIVE_TRIGGER_TYPES = ['on-complete'] as const;

@Component({
  selector: 'app-quest-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageUploadComponent, TriggersEditorComponent],
  templateUrl: './quest-form.component.html',
  styleUrl: './quest-form.component.css',
})
export class QuestFormComponent implements OnChanges {
  @Input() card!: QuestCard;
  @Output() cardChange = new EventEmitter<QuestCard>();

  local!: QuestCard;
  allowedTriggerTypes = [...OBJECTIVE_TRIGGER_TYPES] as any[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card']) {
      this.local = { ...this.card, objectives: [...(this.card.objectives ?? [])] };
    }
  }

  get isMainQuest(): boolean { return this.local.type === 'main-quest'; }
  get isSideQuest(): boolean { return this.local.type === 'side-quest'; }
  get mainLocal(): MainQuestCard { return this.local as MainQuestCard; }
  get sideLocal(): SideQuestCard { return this.local as SideQuestCard; }

  onTitleChange(title: string): void { this.local = { ...this.local, title }; this.emit(); }
  onSubtitleChange(subtitle: string): void { this.local = { ...this.local, subtitle }; this.emit(); }
  onFlavourChange(flavourText: string): void { this.local = { ...this.local, flavourText }; this.emit(); }
  onImageChange(imageUrl: string | undefined): void { this.local = { ...this.local, imageUrl }; this.emit(); }

  onActChange(act: number): void {
    if (this.isMainQuest) {
      this.local = { ...this.mainLocal, act };
      this.emit();
    }
  }

  onTierChange(tier: 'side' | 'key'): void {
    if (this.isSideQuest) {
      this.local = { ...this.sideLocal, tier };
      this.emit();
    }
  }

  onMandatoryChange(mandatory: boolean): void {
    if (this.isSideQuest) {
      this.local = { ...this.sideLocal, mandatory };
      this.emit();
    }
  }

  // Objective management
  addObjective(): void {
    const newObj: Objective = { title: '', description: '' };
    this.local = { ...this.local, objectives: [...this.local.objectives, newObj] };
    this.emit();
  }

  removeObjective(index: number): void {
    this.local = {
      ...this.local,
      objectives: this.local.objectives.filter((_, i) => i !== index),
    };
    this.emit();
  }

  onObjectiveTitleChange(index: number, title: string): void {
    this.updateObjective(index, { title });
  }

  onObjectiveDescriptionChange(index: number, description: string): void {
    this.updateObjective(index, { description });
  }

  onObjectiveTriggerChange(index: number, triggers: Trigger[]): void {
    const onComplete = triggers[0];
    this.updateObjective(index, { onComplete });
  }

  getObjectiveTriggers(obj: Objective): Trigger[] {
    return obj.onComplete ? [obj.onComplete] : [];
  }

  private updateObjective(index: number, patch: Partial<Objective>): void {
    const objectives = this.local.objectives.map((o, i) =>
      i === index ? { ...o, ...patch } : o
    );
    this.local = { ...this.local, objectives };
    this.emit();
  }

  private emit(): void {
    this.cardChange.emit({ ...this.local });
  }
}
