import { MapBoard } from '@/types/MapBoard';

export interface IMapBoard {
  id: string;
  mapBoard: MapBoard;
  mapTips: string[];
  rating?: number | null;
  ratingCount?: number | null;
  myRating?: number | null;
  myComment?: string | null;
}
