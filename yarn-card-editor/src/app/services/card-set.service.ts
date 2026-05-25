import { Injectable } from '@angular/core';
import { CardSet } from '../models/card-set.model';

const DB_NAME = 'yarn-card-editor';
const DB_VERSION = 1;
const SETS_STORE = 'card-sets';
const CARDS_STORE = 'cards';

@Injectable({ providedIn: 'root' })
export class CardSetService {
  private db: IDBDatabase | null = null;

  /** Open (or upgrade) the IndexedDB database. */
  async openDb(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(SETS_STORE)) {
          db.createObjectStore(SETS_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(CARDS_STORE)) {
          const store = db.createObjectStore(CARDS_STORE, { keyPath: 'id' });
          store.createIndex('setId', 'setId', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = () => reject(request.error);
    });
  }

  // --- Card Set CRUD ---

  async getAllSets(): Promise<CardSet[]> {
    const db = await this.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SETS_STORE, 'readonly');
      const req = tx.objectStore(SETS_STORE).getAll();
      req.onsuccess = () => resolve(req.result as CardSet[]);
      req.onerror = () => reject(req.error);
    });
  }

  async getSet(id: string): Promise<CardSet | undefined> {
    const db = await this.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SETS_STORE, 'readonly');
      const req = tx.objectStore(SETS_STORE).get(id);
      req.onsuccess = () => resolve(req.result as CardSet | undefined);
      req.onerror = () => reject(req.error);
    });
  }

  async saveSet(cardSet: CardSet): Promise<void> {
    const db = await this.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SETS_STORE, 'readwrite');
      const req = tx.objectStore(SETS_STORE).put(cardSet);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async deleteSet(id: string): Promise<void> {
    const db = await this.openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SETS_STORE, 'readwrite');
      const req = tx.objectStore(SETS_STORE).delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  /** Create a new empty card set with a generated UUID. */
  createNewSet(name: string): CardSet {
    const now = new Date().toISOString();
    return {
      id: crypto.randomUUID(),
      name,
      createdAt: now,
      updatedAt: now,
    };
  }
}
