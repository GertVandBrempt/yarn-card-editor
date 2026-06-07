import { Injectable } from '@angular/core';
import { CardSetService } from './card-set.service';
import { CardService } from './card.service';
import { CardSet } from '../models/card-set.model';
import {
  AnyCard,
  CardType,
} from '../models';

// ── Export format ──────────────────────────────────────────

/** The canonical JSON export format for a card set. */
export interface CardSetExport {
  /** Format version — allows future migrations. */
  formatVersion: 1;

  /** The card set metadata (no internal IDs). */
  set: CardSetExportData;

  /** All cards in the set. */
  cards: AnyCard[];
}

/** Exported card set metadata (excludes internal IDs). */
interface CardSetExportData {
  name: string;
  setType?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Validation ─────────────────────────────────────────────

const VALID_CARD_TYPES: CardType[] = [
  'location', 'character', 'item', 'event',
  'main-quest', 'side-quest', 'persona', 'script',
];

export interface ImportValidationResult {
  valid: boolean;
  errors: string[];
  data?: CardSetExport;
}

@Injectable({ providedIn: 'root' })
export class ImportExportService {
  constructor(
    private cardSetService: CardSetService,
    private cardService: CardService
  ) {}

  // ── Export ────────────────────────────────────────────

  /**
   * Export the given card set and all its cards to a JSON string.
   * Strips internal IDs (they have no meaning outside the app).
   */
  async exportSet(setId: string): Promise<{ json: string; fileName: string }> {
    const set = await this.cardSetService.getSet(setId);
    if (!set) {
      throw new Error(`Card set not found: ${setId}`);
    }

    const cards = await this.cardService.getCardsForSet(setId);

    const exportData: CardSetExport = {
      formatVersion: 1,
      set: {
        name: set.name,
        setType: set.setType,
        createdAt: set.createdAt,
        updatedAt: set.updatedAt,
      },
      cards,
    };

    const json = JSON.stringify(exportData, null, 2);
    const safeName = set.name.replace(/[^a-zA-Z0-9_\- ]/g, '').trim() || 'card-set';
    return { json, fileName: `${safeName}.json` };
  }

  /**
   * Trigger a file download in the browser.
   */
  downloadJson(json: string, fileName: string): void {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ── Import ────────────────────────────────────────────

  /**
   * Read a File and parse + validate it as a CardSetExport.
   */
  async readAndValidate(file: File): Promise<ImportValidationResult> {
    let text: string;
    try {
      text = await file.text();
    } catch {
      return { valid: false, errors: ['Failed to read file.'] };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return { valid: false, errors: ['File is not valid JSON.'] };
    }

    return this.validate(parsed);
  }

  /**
   * Validate a parsed JSON object as a CardSetExport.
   */
  validate(data: unknown): ImportValidationResult {
    const errors: string[] = [];

    if (!data || typeof data !== 'object') {
      return { valid: false, errors: ['Root must be a JSON object.'] };
    }

    const obj = data as Record<string, unknown>;

    // formatVersion — optional for forward compat, but if present must be 1
    if ('formatVersion' in obj && obj['formatVersion'] !== 1) {
      errors.push(`Unsupported format version: ${obj['formatVersion']}. This app supports version 1.`);
    }

    // set metadata
    if (!obj['set'] || typeof obj['set'] !== 'object') {
      errors.push('Missing or invalid "set" field (must be an object with at least a "name").');
    } else {
      const setData = obj['set'] as Record<string, unknown>;
      if (typeof setData['name'] !== 'string' || !setData['name'].trim()) {
        errors.push('"set.name" must be a non-empty string.');
      }
    }

    // cards array
    if (!Array.isArray(obj['cards'])) {
      errors.push('Missing or invalid "cards" field (must be an array).');
    } else {
      const cards = obj['cards'] as unknown[];
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (!card || typeof card !== 'object') {
          errors.push(`cards[${i}]: must be a JSON object.`);
          continue;
        }
        const c = card as Record<string, unknown>;
        if (typeof c['type'] !== 'string' || !VALID_CARD_TYPES.includes(c['type'] as CardType)) {
          errors.push(`cards[${i}]: invalid or missing "type" (got "${c['type']}"). Must be one of: ${VALID_CARD_TYPES.join(', ')}.`);
        }
        if (typeof c['title'] !== 'string') {
          errors.push(`cards[${i}]: "title" must be a string.`);
        }
      }
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return { valid: true, errors: [], data: obj as unknown as CardSetExport };
  }

  /**
   * Import a validated CardSetExport into the database as a new card set.
   * Returns the new set ID.
   */
  async importAsNewSet(exportData: CardSetExport): Promise<string> {
    const now = new Date().toISOString();
    const newSetId = crypto.randomUUID();

    // Create the set
    const newSet: CardSet = {
      id: newSetId,
      name: exportData.set.name,
      setType: exportData.set.setType,
      createdAt: now,
      updatedAt: now,
    };

    await this.cardSetService.saveSet(newSet);

    // Import each card with a fresh ID and new setId
    for (const card of exportData.cards) {
      const importedCard: AnyCard = {
        ...card,
        id: crypto.randomUUID(),
        setId: newSetId,
        createdAt: now,
        updatedAt: now,
      } as AnyCard;

      await this.cardService.saveCard(importedCard);
    }

    return newSetId;
  }

  /**
   * Replace an existing set's contents with imported data.
   * Deletes all existing cards in the set, then imports the new ones.
   */
  async replaceExistingSet(setId: string, exportData: CardSetExport): Promise<void> {
    const now = new Date().toISOString();

    // Update the set metadata
    const existingSet = await this.cardSetService.getSet(setId);
    if (!existingSet) {
      throw new Error(`Card set not found: ${setId}`);
    }

    const updatedSet: CardSet = {
      ...existingSet,
      name: exportData.set.name,
      setType: exportData.set.setType,
      updatedAt: now,
    };
    await this.cardSetService.saveSet(updatedSet);

    // Delete existing cards
    const existingCards = await this.cardService.getCardsForSet(setId);
    for (const card of existingCards) {
      await this.cardService.deleteCard(card.id);
    }

    // Import new cards
    for (const card of exportData.cards) {
      const importedCard: AnyCard = {
        ...card,
        id: crypto.randomUUID(),
        setId,
        createdAt: now,
        updatedAt: now,
      } as AnyCard;

      await this.cardService.saveCard(importedCard);
    }
  }

  /**
   * Open a file picker and return the selected file, or null if cancelled.
   */
  openFilePicker(): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,application/json';
      input.style.display = 'none';

      input.addEventListener('change', () => {
        const file = input.files?.[0] ?? null;
        document.body.removeChild(input);
        resolve(file);
      });

      // Handle cancel (no file selected)
      input.addEventListener('cancel', () => {
        document.body.removeChild(input);
        resolve(null);
      });

      document.body.appendChild(input);
      input.click();
    });
  }
}
