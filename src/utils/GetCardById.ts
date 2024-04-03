import { cardTypeDataMapping } from '@/utils/GetAllCardIds';

import { Card } from '@/types/Card';
export function getCardById(id: string): Card | undefined {
  for (const [_, value] of cardTypeDataMapping) {
    for (const card of value) {
      if (card.id === id) return card;
    }
  }
  return undefined;
}

export function getCardTypeById(id: string) {
  for (const [key, value] of cardTypeDataMapping) {
    if (value.find((card) => card.id === id)) return key;
  }
  return undefined;
}
