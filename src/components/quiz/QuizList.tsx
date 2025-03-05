import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { Quiz } from '@/components/quiz/Quiz';
import { QuizInfo } from '@/components/quiz/QuizInfo';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { fetchAllQuizs } from '@/utils/fetch';

import { GameMode } from '@/types/IQuiz';

const INCREMENT_STEP = 5;

export const QuizList: React.FC<{ mode: GameMode }> = ({ mode }) => {
  const { t } = useTranslation('common');
  const shouldFetchRatings = true;
  const [quizLength, setQuizLength] = useState(INCREMENT_STEP);
  let { data: allQuizs } = useQuery(['allQuizs'], fetchAllQuizs, {
    enabled: shouldFetchRatings,
    // staleTime: 60 * 1000,
  });

  allQuizs = allQuizs?.filter((q: any) => q.gameconfig.mode === mode);

  const todayQuiz = allQuizs ? allQuizs[0] : null;

  const handleViewMore = () => {
    const nextLength = Math.min(
      quizLength + INCREMENT_STEP,
      allQuizs.length,
      30
    );
    setQuizLength(nextLength);
  };
  return (
    <div className=''>
      {!allQuizs && 'loading'}
      {todayQuiz && (
        <Quiz
          seed={todayQuiz.seed}
          gameConfig={todayQuiz.gameconfig}
          isDailyQuiz={true}
          header={
            t('quiz.today') +
            ' Day ' +
            (dayjs(todayQuiz.createdat || '').diff(dayjs('2024-07-02'), 'day') +
              1)
          }
        />
      )}
      <Separator orientation='horizontal' className='my-2' />
      <Card className='grid grid-cols-1 gap-2 bg-white/50 p-2'>
        <CardHeader>
          <CardTitle>{t('quiz.prev')}</CardTitle>
        </CardHeader>
        {allQuizs &&
          allQuizs
            .slice(0, quizLength)
            .map((quiz: Prisma.SetUpGroupByOutputType, index: number) => {
              return (
                <QuizInfo
                  key={quiz.id}
                  {...quiz}
                  idx={index}
                  day={allQuizs.length - index}
                />
              );
            })}
        {quizLength < allQuizs.length && (
          <>
            <div className='h-10 w-full'></div>
            <div className='absolute bottom-0 h-40 w-full bg-gradient-to-b from-transparent via-[#ecf5e8] to-[#ecf5e8] lg:h-60 xl:h-80'></div>
            <Button
              className='absolute bottom-5 h-12 w-full bg-lime-600 hover:bg-lime-700'
              onClick={handleViewMore}
            >
              {t('View More Quizzes')}
            </Button>
          </>
        )}
        {/* <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination> */}
      </Card>
    </div>
  );
};
