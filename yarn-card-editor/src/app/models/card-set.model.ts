// Card Set metadata — a named collection of cards
export interface CardSet {
  id: string;        // UUID
  name: string;
  setType?: string;  // e.g. 'quest-set', 'location-set', 'side-quest-set' — tracked but not enforced in v1
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
