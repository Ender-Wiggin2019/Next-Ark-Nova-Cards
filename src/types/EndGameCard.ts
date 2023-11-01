import { CardSource } from '@/types/CardSource';
import { Effect } from '@/types/Effect';
import { Icon } from '@/types/Icon';

export interface EndGameCard {
  id: string;
  name: string;
  image: string;
  description: Effect;
  topIcon: Icon;
  bottomIcon: Icon;
  scoreArray: EndGameScoreArray;
  originalArray?: EndGameScoreArray;
  source: CardSource;
}

/**
 * Official card has `data-id` id selector in CSS for background image.
 * @param endGameCard
 */
export function getCSSDataId(endGameCard: EndGameCard) {
  const name = endGameCard.name.replace(/ /g, '');
  return `F${endGameCard.id}_${name}`;
}

export function isTableLayout(endGameCard: EndGameCard) {
  return !endGameCard.scoreArray.some(
    (score) => typeof score.requirement === 'string'
  );
}

type EndGameScore = {
  requirement: number | string;
  conservationPoint: number;
};

type EndGameScoreArray =
  | [EndGameScore, EndGameScore, EndGameScore, EndGameScore]
  | [EndGameScore];

export interface IEndGameCard {
  id: string;
  endGameCard: EndGameCard;
  rating?: number | null;
  ratingCount?: number | null;
}
