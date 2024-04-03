import { AnimalCard } from '@/types/AnimalCard';
import { EndGameCard } from '@/types/EndGameCard';
import { ProjectCard } from '@/types/ProjectCard';
import { SponsorCard } from '@/types/SponsorCard';

export type Card = AnimalCard | SponsorCard | ProjectCard | EndGameCard;

export enum CardType {
  ANIMAL_CARD = 'AnimalCard',
  SPONSOR_CARD = 'SponsorCard',
  CONSERVATION_CARD = 'ConservationCard',
  ACTION_CARD = 'ActionCard',
  END_GAME_CARD = 'EndGameCard',
}

export function isAnimalCard(card: Card): card is AnimalCard {
  return (card as AnimalCard).size !== undefined;
}

export function isSponsorCard(card: Card): card is SponsorCard {
  return (card as SponsorCard).strength !== undefined;
}

export function isProjectCard(card: Card): card is ProjectCard {
  return (card as ProjectCard).slots !== undefined;
}

export function isEndGameCard(card: Card): card is EndGameCard {
  return (card as EndGameCard).scoreArray !== undefined;
}
