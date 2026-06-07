import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { AnyCard, CardType } from '../../models';
import { CardFilterComponent, CardFilterState } from '../card-filter/card-filter.component';

/** Ordered list of card types for display grouping */
const TYPE_ORDER: CardType[] = [
  'location',
  'character',
  'item',
  'event',
  'main-quest',
  'side-quest',
  'persona',
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

/**
 * Per-type accent colour derived from accepted card baselines (--type-text CSS var).
 * Used for group headers, left border on list items, and badge styling.
 */
const TYPE_COLORS: Record<CardType, string> = {
  persona: '#c8860c',
  location: '#40b060',
  character: '#d0cc30',
  item: '#40a0c0',
  event: '#4878c8',
  'main-quest': '#d4a808',
  'side-quest': '#90a8b8',
  script: '#9870d8',
};

/** A single group of cards sharing the same type */
export interface CardGroup {
  type: CardType;
  label: string;
  colour: string;
  cards: AnyCard[];
  expanded: boolean;
}

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

  /** Track which groups are collapsed (session-only, all start expanded) */
  private collapsedTypes = new Set<CardType>();

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

  /** Cards grouped by type, ordered by TYPE_ORDER, hiding empty groups */
  groupedCards = computed<CardGroup[]>(() => {
    const cards = this.filteredCards();
    const byType = new Map<CardType, AnyCard[]>();

    for (const card of cards) {
      const list = byType.get(card.type) ?? [];
      list.push(card);
      byType.set(card.type, list);
    }

    return TYPE_ORDER
      .filter(type => byType.has(type))
      .map(type => ({
        type,
        label: TYPE_LABELS[type],
        colour: TYPE_COLORS[type],
        cards: byType.get(type)!.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
        expanded: !this.collapsedTypes.has(type),
      }));
  });

  /** Total count across all filtered cards */
  totalCount = computed(() => this.filteredCards().length);

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

  toggleGroup(type: CardType): void {
    if (this.collapsedTypes.has(type)) {
      this.collapsedTypes.delete(type);
    } else {
      this.collapsedTypes.add(type);
    }
    // Force recomputation of groupedCards by touching allCards signal
    this.allCards.update(cards => [...cards]);
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

  typeColour(type: CardType): string {
    return TYPE_COLORS[type] ?? '#6b7280';
  }
}
