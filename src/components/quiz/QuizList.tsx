import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Quiz } from '@/components/quiz/DailyQuiz';
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

export const QuizList: React.FC = () => {
  const { t } = useTranslation('common');
  const shouldFetchRatings = true;
  const { data: allQuizs } = useQuery(['allQuizs'], fetchAllQuizs, {
    enabled: shouldFetchRatings,
    // staleTime: 60 * 1000,
  });
  const todayQuiz = allQuizs ? allQuizs[0] : null;

  return (
    <div className=''>
      {!allQuizs && 'loading'}
      {todayQuiz && <Quiz {...todayQuiz} />}
      <Separator orientation='horizontal' className='my-2' />
      <Card className='grid grid-cols-1 gap-2 bg-white/50 p-2'>
        <CardHeader>
          <CardTitle>{t('quiz.prev')}</CardTitle>
        </CardHeader>
        {allQuizs &&
          allQuizs.map((quiz: Prisma.SetUpGroupByOutputType) => {
            return <QuizInfo key={quiz.id} {...quiz} />;
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
