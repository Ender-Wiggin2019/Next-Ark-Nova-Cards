import { CardSource } from '@/types/CardSource';
import { EndangeredCategory } from '@/types/EndangeredCategory';
import { Ability } from '@/types/KeyWords';
import { SpecialEnclosure } from '@/types/SpecialEnclosure';
import { Tag } from '@/types/Tags';

export enum ActionCardType {
  ANIMAL = 'Animal',
  ASSOCIATION = 'Association',
  BUILD = 'Build',
  CARDS = 'Cards',
  SPONSORS = 'Sponsors',
}

export interface ActionCard {
  id: string;
  actionType: ActionCardType;
  latinName?: string;
  endangeredCategory?: EndangeredCategory;
  image?: string;

  // upper
  size: number; // Size;
  rock?: number;
  water?: number;
  price: number;
  requirements?: Tag[];
  tags: Tag[];
  canBeInStandardEnclosure?: boolean;
  specialEnclosures?: SpecialEnclosure[];

  // middle
  abilities?: Ability[];
  description?: string;
  reefDwellerEffect?: Ability[];
  soloEffect?: Ability[];

  // bottom
  reputation?: number;
  appeal?: number;
  conservationPoint?: number;

  // meta data
  source: CardSource;
}
