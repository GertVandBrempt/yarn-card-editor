import { CardType } from './card-types';

// Base fields shared by all card types
export interface CardBase {
  id: string;              // UUID
  type: CardType;
  title: string;           // Required
  subtitle?: string;
  flavourText?: string;
  imageUrl?: string;       // URL or base64 data URI
  setId: string;           // UUID of parent card set
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}
