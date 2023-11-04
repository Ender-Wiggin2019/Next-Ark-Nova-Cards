import { ActionCard } from '@/types/ActionCard';
import { AnimalCard } from '@/types/AnimalCard';
import { SponsorCard } from '@/types/SponsorCard';

export type Card = AnimalCard | SponsorCard | ActionCard;

export enum CardType {
  ANIMAL_CARD = 'AnimalCard',
  SPONSOR_CARD = 'SponsorCard',
  ACTION_CARD = 'ActionCard',
  END_GAME_CARD = 'EndGameCard',
}
