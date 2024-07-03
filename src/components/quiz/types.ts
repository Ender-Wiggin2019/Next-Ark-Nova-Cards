import { IQuizComment } from '@/types/IQuiz';

export type ICommentMemo = {
  cardPickComments: Map<string, IQuizComment[]>;
  total: number;
  userComment: undefined;
};

export type ICardPickMemo = {
  cardPick: Map<string, number>;
  total: number;
  userPick: string[];
};
