import { Bonus } from '@/types/Bonus';
import { CardSource } from '@/types/CardSource';
import { Effect } from '@/types/Effect';
import { Tag } from '@/types/Tags';

export interface ProjectSlot {
  position: 1 | 2 | 3;
  bonuses: Bonus[];
  indicator?: number;
}
export enum ProjectCategory {
  BASE = 'Base',
  NORMAL = 'Normal',
  RELEASE = 'Release',
  BREED = 'Breed',
  MARINE = 'Marine',
}

export interface ProjectCard {
  id: string;
  name: string;
  type: ProjectCategory;
  image?: string;
  tag: Tag;
  slots: ProjectSlot[];
  placeBonuses: Bonus[];
  description: Effect;
  // meta data
  source: CardSource;
}
