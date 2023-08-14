import { AnimalCard } from '@/types/AnimalCard';
import { AnimalCardModel } from '@/types/AnimalCardModel';

export interface IAnimalCard {
  id: string;
  animalCard: AnimalCard;
  model: AnimalCardModel;
  rating?: number | null;
  ratingCount?: number | null;
  myRating?: number | null;
  myComment?: string | null;
}
