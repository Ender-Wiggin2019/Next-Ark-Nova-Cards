import { AnimalsData } from '@/data/Animals';
import { SponsorsData } from '@/data/Sponsors';

import { AnimalCard } from '@/types/AnimalCard';
import { CardType } from '@/types/Card';
import { EndGameCard } from '@/types/EndGameCard';
import { SponsorCard } from '@/types/SponsorCard';
import { EndGameData } from '@/data/EndGames';
export function getCardById(
  id: string
): AnimalCard | SponsorCard | EndGameCard | undefined {
  if (getCardTypeById(id) === CardType.ANIMAL_CARD)
    return AnimalsData.find((card) => card.id === id);
  else if (getCardTypeById(id) === CardType.SPONSOR_CARD)
    return SponsorsData.find((card) => card.id === id);
  else if (getCardTypeById(id) === CardType.END_GAME_CARD)
    return EndGameData.find((card) => card.id === id);
  return undefined;
}

export function getCardTypeById(id: string) {
  if (parseInt(id) > 400) return CardType.ANIMAL_CARD;
  else if (parseInt(id) <= 50) return CardType.END_GAME_CARD;
  else if (parseInt(id) <= 500) return CardType.SPONSOR_CARD;
  return undefined;
}
