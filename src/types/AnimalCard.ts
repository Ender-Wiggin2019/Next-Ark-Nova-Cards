import { Ability } from '@/types/KeyWords';
import { SpecialEnclosure } from '@/types/SpecialEnclosure';
import { Tag } from '@/types/Tags';
import { EndangeredCategory } from '@/types/EndangeredCategory';

// export interface CardPosition {
//     src: string;
//     x: number;
//     y: number;
// }
export interface AnimalCard {
  id: string;
  name: string;
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
  source: 'Base' | 'MarineWorld';
}
