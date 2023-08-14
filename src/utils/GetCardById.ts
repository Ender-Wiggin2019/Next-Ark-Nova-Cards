import { AnimalsData } from '@/data/Animals';
import { SponsorsData } from '@/data/Sponsors';

import { AnimalCard } from '@/types/AnimalCard';
import { CardType } from '@/types/Card';
import { SponsorCard } from '@/types/SponsorCard';
export function getCardById(id: string): AnimalCard | SponsorCard | undefined {
  if (getCardTypeById(id) === CardType.ANIMAL_CARD)
    return AnimalsData.find((card) => card.id === id);
  else if (getCardTypeById(id) === CardType.SPONSOR_CARD)
    return SponsorsData.find((card) => card.id === id);
  return undefined;
}

export function getCardTypeById(id: string) {
  if (parseInt(id) > 400) return CardType.ANIMAL_CARD;
  else if (parseInt(id) <= 500) return CardType.SPONSOR_CARD;
  return undefined;
}
