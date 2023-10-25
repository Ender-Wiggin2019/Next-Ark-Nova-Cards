import { Icon } from '@/types/Icon';

export interface EndGameCard {
  id: string;
  dataId?: string; // for official cards
  name: string;
  image: string;
  description: string;
  topIcon: Icon;
  bottomIcon: Icon;
  scoreArray: EndGameScoreArray;
}

type EndGameScore = {
  requirement: number;
  conservationPoint: number;
};

type EndGameScoreArray = [
  EndGameScore,
  EndGameScore,
  EndGameScore,
  EndGameScore
];
