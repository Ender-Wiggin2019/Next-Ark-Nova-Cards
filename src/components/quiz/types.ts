import { IQuizComment } from '@/types/quiz';

export type ICommentMemo = {
  cardPickComments: Map<string, IQuizComment[]>;
  total: number;
  userComment?: IQuizComment;
};

export type ICardPickMemo = {
  cardPick: Map<string, number>;
  total: number;
  userPick: string[];
};
