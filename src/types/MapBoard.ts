import { CardSource } from '@/types/CardSource';

export interface MapBoard {
  id: string;
  name: string;
  image: string;
  cardSource: CardSource;
  description: string[];
}
