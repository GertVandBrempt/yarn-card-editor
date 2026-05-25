import { Injectable } from '@angular/core';
import { CardSetService } from './card-set.service';
import {
  AnyCard,
  CardType,
  PersonaCard,
  LocationCard,
  CharacterCard,
  ItemCard,
  EventCard,
  MainQuestCard,
  SideQuestCard,
  ScriptCard,
} from '../models';

const CARDS_STORE = 'cards';

@Injectable({ providedIn: 'root' })
export class CardService {
  constructor(private cardSetService: CardSetService) {}

  // --- Card CRUD ---

  async getCardsForSet(setId: string): Promise<AnyCard[]> {
    const db = await this.cardSetService.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CARDS_STORE, 'readonly');
      const store = tx.objectStore(CARDS_STORE);
      const index = store.index('setId');
      const req = index.getAll(setId);
      req.onsuccess = () => resolve(req.result as AnyCard[]);
      req.onerror = () => reject(req.error);
    });
  }

  async getCard(cardId: string): Promise<AnyCard | undefined> {
    const db = await this.cardSetService.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CARDS_STORE, 'readonly');
      const req = tx.objectStore(CARDS_STORE).get(cardId);
      req.onsuccess = () => resolve(req.result as AnyCard | undefined);
      req.onerror = () => reject(req.error);
    });
  }

  async saveCard(card: AnyCard): Promise<void> {
    const db = await this.cardSetService.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CARDS_STORE, 'readwrite');
      const updated = { ...card, updatedAt: new Date().toISOString() } as AnyCard;
      const req = tx.objectStore(CARDS_STORE).put(updated);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async deleteCard(cardId: string): Promise<void> {
    const db = await this.cardSetService.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CARDS_STORE, 'readwrite');
      const req = tx.objectStore(CARDS_STORE).delete(cardId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // --- Typed Card Factory ---

  createCard(type: CardType, setId: string): AnyCard {
    const now = new Date().toISOString();
    const base = {
      id: crypto.randomUUID(),
      type,
      title: '',
      setId,
      createdAt: now,
      updatedAt: now,
    };

    switch (type) {
      case 'persona':
        return {
          ...base,
          type: 'persona',
          role: 'constitution',
          isCore: false,
          passiveEffects: [],
          actions: [],
          lifePointSlotCount: 0,
          lifePointSlotElements: [],
        } satisfies PersonaCard;

      case 'location':
        return {
          ...base,
          type: 'location',
          tier: 'generic',
          connections: [],
          actions: [],
        } satisfies LocationCard;

      case 'character':
        return {
          ...base,
          type: 'character',
          tier: 'generic',
          alignment: 'neutral',
          initiative: 0,
          actions: [],
        } satisfies CharacterCard;

      case 'item':
        return {
          ...base,
          type: 'item',
          tier: 'generic',
          passiveEffects: [],
          actions: [],
        } satisfies ItemCard;

      case 'event':
        return {
          ...base,
          type: 'event',
          tier: 'generic',
          onReveal: { type: 'on-reveal', effect: { variant: 'fixed', text: '' } },
        } satisfies EventCard;

      case 'main-quest':
        return {
          ...base,
          type: 'main-quest',
          act: 1,
          objectives: [],
        } satisfies MainQuestCard;

      case 'side-quest':
        return {
          ...base,
          type: 'side-quest',
          tier: 'side',
          objectives: [],
          mandatory: false,
        } satisfies SideQuestCard;

      case 'script':
        return {
          ...base,
          type: 'script',
          mode: 'timed',
          turns: [],
        } satisfies ScriptCard;

      default:
        throw new Error(`Unknown card type: ${type}`);
    }
  }
}
