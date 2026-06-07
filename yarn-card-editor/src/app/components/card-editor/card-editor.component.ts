import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { AnyCard, CardType } from '../../models';
import { CardFormComponent } from '../card-form/card-form.component';
import { CardPreviewComponent } from '../card-preview/card-preview.component';

@Component({
  selector: 'app-card-editor',
  standalone: true,
  imports: [CommonModule, CardFormComponent, CardPreviewComponent],
  templateUrl: './card-editor.component.html',
  styleUrl: './card-editor.component.css',
})
export class CardEditorComponent implements OnInit {
  card = signal<AnyCard | null>(null);
  saving = signal(false);
  saved = signal(false);
  error = signal<string | null>(null);

  private setId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardService: CardService
  ) {}

  async ngOnInit(): Promise<void> {
    this.setId = this.route.parent?.snapshot.paramMap.get('setId') ?? '';
    const cardId = this.route.snapshot.paramMap.get('cardId');

    if (cardId) {
      // Edit existing card
      try {
        const card = await this.cardService.getCard(cardId);
        if (!card) {
          this.error.set('Card not found.');
          return;
        }
        this.card.set(card);
      } catch {
        this.error.set('Failed to load card.');
      }
    } else {
      // New card — type comes from query param (selected up-front via sidebar)
      const type = (this.route.snapshot.queryParamMap.get('type') ?? 'persona') as CardType;
      const newCard = this.cardService.createCard(type, this.setId);
      this.card.set(newCard);

      // Immediately persist the new card so it exists in the set
      // even if the user closes the editor without making changes
      try {
        await this.cardService.saveCard(newCard);
        this.saved.set(true);
        // Update URL to the card's permanent route
        this.router.navigate(['/sets', this.setId, 'cards', newCard.id], {
          replaceUrl: true,
        });
      } catch {
        this.error.set('Failed to save new card.');
      }
    }
  }

  onCardChange(updated: AnyCard): void {
    this.card.set(updated);
    this.saved.set(false);
    // Auto-save after debounce — done by triggering save
    this.autoSave();
  }

  private autoSaveTimer: ReturnType<typeof setTimeout> | null = null;

  private autoSave(): void {
    if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
    this.autoSaveTimer = setTimeout(() => this.saveCard(), 500);
  }

  async saveCard(): Promise<void> {
    const card = this.card();
    if (!card) return;

    this.saving.set(true);
    try {
      await this.cardService.saveCard(card);
      this.saved.set(true);
    } catch {
      this.error.set('Failed to save card.');
    } finally {
      this.saving.set(false);
    }
  }

  navigateBack(): void {
    this.router.navigate(['/sets', this.setId]);
  }
}
