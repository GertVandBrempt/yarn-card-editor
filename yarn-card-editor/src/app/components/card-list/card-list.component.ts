import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { AnyCard, CardType } from '../../models';
import { CardFilterComponent, CardFilterState } from '../card-filter/card-filter.component';

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
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardFilterComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent implements OnInit {
  allCards = signal<AnyCard[]>([]);
  filterState = signal<CardFilterState>({ searchQuery: '', selectedTypes: [] });
  loading = signal(true);
  error = signal<string | null>(null);
  setId = '';
  typeLabels = TYPE_LABELS;

  filteredCards = computed(() => {
    const { searchQuery, selectedTypes } = this.filterState();
    let cards = this.allCards();

    if (selectedTypes.length > 0) {
      cards = cards.filter((c) => selectedTypes.includes(c.type));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      cards = cards.filter((c) => c.title.toLowerCase().includes(q));
    }

    return cards;
  });

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.setId = this.route.parent?.snapshot.paramMap.get('setId') ?? '';
    try {
      const cards = await this.cardService.getCardsForSet(this.setId);
      this.allCards.set(cards.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    } catch {
      this.error.set('Failed to load cards.');
    } finally {
      this.loading.set(false);
    }
  }

  onFilterChange(state: CardFilterState): void {
    this.filterState.set(state);
  }

  openCard(card: AnyCard): void {
    this.router.navigate(['/sets', this.setId, 'cards', card.id]);
  }

  async deleteCard(card: AnyCard, event: MouseEvent): Promise<void> {
    event.stopPropagation();
    if (!confirm(`Delete "${card.title || 'Untitled'}"?`)) return;
    await this.cardService.deleteCard(card.id);
    this.allCards.update((cards) => cards.filter((c) => c.id !== card.id));
  }

  typeLabel(type: CardType): string {
    return TYPE_LABELS[type] ?? type;
  }
}
