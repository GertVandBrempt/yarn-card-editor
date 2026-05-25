import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnyCard, CardType } from '../../models';
import { PersonaCard } from '../../models/persona-card.model';
import { LocationCard } from '../../models/location-card.model';
import { CharacterCard } from '../../models/character-card.model';
import { ItemCard } from '../../models/item-card.model';
import { EventCard } from '../../models/event-card.model';
import { MainQuestCard, SideQuestCard, QuestCard } from '../../models/quest-card.model';
import { ScriptCard } from '../../models/script-card.model';

import { PersonaFormComponent } from '../forms/persona-form/persona-form.component';
import { LocationFormComponent } from '../forms/location-form/location-form.component';
import { CharacterFormComponent } from '../forms/character-form/character-form.component';
import { ItemFormComponent } from '../forms/item-form/item-form.component';
import { EventFormComponent } from '../forms/event-form/event-form.component';
import { QuestFormComponent } from '../forms/quest-form/quest-form.component';
import { ScriptFormComponent } from '../forms/script-form/script-form.component';

/**
 * CardFormComponent — delegates to the appropriate type-specific form component.
 * Each type-specific form only exposes triggers/actions valid for that type.
 */
@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    CommonModule,
    PersonaFormComponent,
    LocationFormComponent,
    CharacterFormComponent,
    ItemFormComponent,
    EventFormComponent,
    QuestFormComponent,
    ScriptFormComponent,
  ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css',
})
export class CardFormComponent implements OnChanges {
  @Input() card!: AnyCard;
  @Output() cardChange = new EventEmitter<AnyCard>();

  cardType: CardType | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && this.card) {
      this.cardType = this.card.type;
    }
  }

  // Type-safe casts for template
  get asPersona(): PersonaCard { return this.card as PersonaCard; }
  get asLocation(): LocationCard { return this.card as LocationCard; }
  get asCharacter(): CharacterCard { return this.card as CharacterCard; }
  get asItem(): ItemCard { return this.card as ItemCard; }
  get asEvent(): EventCard { return this.card as EventCard; }
  get asQuest(): QuestCard { return this.card as QuestCard; }
  get asScript(): ScriptCard { return this.card as ScriptCard; }

  onCardChange(card: AnyCard): void {
    this.cardChange.emit(card);
  }
}
