import { AnimalsData } from '@/data/Animals';
import { EndGameData } from '@/data/EndGames';
import { SponsorsData } from '@/data/Sponsors';

import { AnimalCard } from '@/types/AnimalCard';
import { Card, CardType } from '@/types/Card';
import { EndGameCard } from '@/types/EndGameCard';
import { SponsorCard } from '@/types/SponsorCard';
import { cardTypeDataMapping, getCardIds } from '@/utils/GetAllCardIds';
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
