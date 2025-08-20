import type { SetUp } from '@prisma/client';

import { request } from '@/services/base';

import { IQuizComment, IQuizData, ISubmitQuizDataReq } from '@/types/quiz';

/**
 * 提交quiz数据的接口类型
 */
interface ISubmitQuizData {
  seed: string;
  name: string;
  content: string;
  cards: string[];
}

/**
 * 获取quiz结果数据
 */
export async function getQuizResult(seed: string): Promise<IQuizComment[]> {
  const response = await request<IQuizComment[]>(
    `/api/quiz/result?seed=${seed}`
  );
  return response?.data;
}

/**
 * 创建quiz
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createQuiz(quizData: any): Promise<SetUp> {
  const response = await request('/api/quiz/create', {
    method: 'POST',
    body: quizData,
  });
  return response.data;
}

/**
 * 获取quiz列表
 */
export const fetchAllQuizzes = async (): Promise<IQuizData[]> => {
  const response = await request<IQuizData[]>('/api/quiz/lists');
  return response?.data;
};

/**
 * 提交quiz数据
 */
export async function submitQuiz(
  submitData: ISubmitQuizDataReq
): Promise<void> {
  const { seed, name, content, cards } = submitData;
  const sortedCards = [...cards].sort();

  const response = await request('/api/quiz/submit', {
    method: 'POST',
    body: {
      seed,
      name,
      content,
      cards: sortedCards,
    },
  });

  if (!response.ok && name) {
    throw new Error('Name is duplicated. Please change a name.');
  }

  return response.data;
}
