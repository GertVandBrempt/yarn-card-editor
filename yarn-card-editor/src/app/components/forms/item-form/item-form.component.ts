import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCard, Action } from '../../../models';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { ActionsEditorComponent } from '../../shared/actions-editor/actions-editor.component';

// Item cards have no triggers, only actions (§per-type table in APP.md)

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageUploadComponent, ActionsEditorComponent],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent implements OnChanges {
  @Input() card!: ItemCard;
  @Output() cardChange = new EventEmitter<ItemCard>();

  local!: ItemCard;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card']) {
      this.local = { ...this.card };
    }
  }

  onTitleChange(title: string): void { this.local = { ...this.local, title }; this.emit(); }
  onSubtitleChange(subtitle: string): void { this.local = { ...this.local, subtitle }; this.emit(); }
  onFlavourChange(flavourText: string): void { this.local = { ...this.local, flavourText }; this.emit(); }
  onTierChange(tier: 'generic' | 'key'): void { this.local = { ...this.local, tier }; this.emit(); }
  onImageChange(imageUrl: string | undefined): void { this.local = { ...this.local, imageUrl }; this.emit(); }
  onActionsChange(actions: Action[]): void { this.local = { ...this.local, actions }; this.emit(); }

  private emit(): void {
    this.cardChange.emit({ ...this.local });
  }
}
