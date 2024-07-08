import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Quiz } from '@/components/quiz/Quiz';
import { QuizInfo } from '@/components/quiz/QuizInfo';
// import { CardSource } from '@/types/CardSource';
// import { IRating } from '@/types/IRating';
// import { ISponsorCard } from '@/types/ISponsorCard';
// import { SortOrder } from '@/types/Order';
// import { SponsorCard as SponsorCardType } from '@/types/SponsorCard';
// import { SponsorCard } from '@/types/SponsorCard';
// import {
//   isAnimalTag,
//   isContinentTag,
//   isOtherTag,
//   OtherTag,
//   Tag,
// } from '@/types/Tags';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';
// import {
//   NUMBER_CONSERVATION,
//   NUMBER_FINAL_SCORING,
//   NUMBER_HAND,
//   NUMBER_MAP,
// } from '@/utils/GenerateRandomCards';
// import CardWrapper from '@/components/wrapper/CardWrapper';
// import { MapBoard } from '@/components/map_boards/MapBoard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { fetchAllQuizs } from '@/utils/fetch';

import { GameMode } from '@/types/IQuiz';

export const QuizList: React.FC<{ mode: GameMode }> = ({ mode }) => {
  const { t } = useTranslation('common');
  const shouldFetchRatings = true;
  let { data: allQuizs } = useQuery(['allQuizs'], fetchAllQuizs, {
    enabled: shouldFetchRatings,
    // staleTime: 60 * 1000,
  });

  allQuizs = allQuizs?.filter((q: any) => q.gameconfig.mode === mode);

  console.log('allQuizs', mode, allQuizs);
  const todayQuiz = allQuizs ? allQuizs[0] : null;

  // console.log('22', allQuizs[0].seed[1], allQuizs.filter((q: any) => q.seed[1] !== '-'));
  console.log(todayQuiz);
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
            // .filter(
            //   (quiz: Prisma.SetUpGroupByOutputType) =>
            //     dayjs(quiz.createdat).diff(dayjs('2024-01-01')) > 0
            // )
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
