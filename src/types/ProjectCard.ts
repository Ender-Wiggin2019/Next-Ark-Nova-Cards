import { Bonus } from '@/types/Bonus';
import { CardSource } from '@/types/CardSource';
import { Tag } from '@/types/Tags';

export interface ProjectSlot {
  position: 1 | 2 | 3;
  bonuses: Bonus[];
}
export enum ProjectCardType {
  BASE = 'Base',
  NORMAL = 'Normal',
  RELEASE = 'Release',
  ZOO = 'Zoo',
  MARINE = 'Marine',
}

export interface ProjectCard {
  id: string;
  name: string;
  type: ProjectCardType;
  image?: string;
  tag: Tag;
  bonus: ProjectSlot[];
  placeBonus: Bonus[];
  description?: string;
  // meta data
  source: CardSource;
}
