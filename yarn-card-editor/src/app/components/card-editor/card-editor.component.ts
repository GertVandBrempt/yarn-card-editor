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
  private isNew = false;

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
      this.isNew = false;
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
      // New card — type comes from query param
      this.isNew = true;
      const type = (this.route.snapshot.queryParamMap.get('type') ?? 'persona') as CardType;
      const newCard = this.cardService.createCard(type, this.setId);
      this.card.set(newCard);
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
    this.autoSaveTimer = setTimeout(() => this.saveCard(), 800);
  }

  async saveCard(): Promise<void> {
    const card = this.card();
    if (!card) return;

    this.saving.set(true);
    try {
      await this.cardService.saveCard(card);
      this.saved.set(true);

      // If this was a new card, update the URL so browser history is correct
      if (this.isNew) {
        this.isNew = false;
        this.router.navigate(['/sets', this.setId, 'cards', card.id], {
          replaceUrl: true,
        });
      }
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
