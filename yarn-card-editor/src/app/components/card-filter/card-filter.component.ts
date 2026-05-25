import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardType } from '../../models/card-types';

export interface CardFilterState {
  searchQuery: string;
  selectedTypes: CardType[];
}

const ALL_TYPES: CardType[] = [
  'persona',
  'location',
  'character',
  'item',
  'event',
  'main-quest',
  'side-quest',
  'script',
];

const TYPE_LABELS: Record<CardType, string> = {
  persona: 'Persona',
  location: 'Location',
  character: 'Character',
  item: 'Item',
  event: 'Event',
  'main-quest': 'Main Quest',
  'side-quest': 'Side Quest',
  script: 'Script',
};

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.css',
})
export class CardFilterComponent {
  @Output() filterChange = new EventEmitter<CardFilterState>();

  allTypes = ALL_TYPES;
  typeLabels = TYPE_LABELS;

  searchQuery = '';
  selectedTypes: CardType[] = [];

  toggleType(type: CardType): void {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    } else {
      this.selectedTypes = [...this.selectedTypes, type];
    }
    this.emit();
  }

  isSelected(type: CardType): boolean {
    return this.selectedTypes.includes(type);
  }

  clearAll(): void {
    this.selectedTypes = [];
    this.searchQuery = '';
    this.emit();
  }

  onSearchChange(): void {
    this.emit();
  }

  private emit(): void {
    this.filterChange.emit({
      searchQuery: this.searchQuery,
      selectedTypes: this.selectedTypes,
    });
  }
}
