import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { Quiz } from '@/components/quiz/Quiz';
import { QuizInfo } from '@/components/quiz/QuizInfo';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { fetchAllQuizs } from '@/utils/fetch';

import { GameMode } from '@/types/IQuiz';

const ITEMS_PER_PAGE = 5;

const QuizInfoSkeleton: React.FC = () => {
  return (
    <Card className='flex h-12 items-center justify-between px-4 py-2'>
      <div className='flex items-center justify-start gap-2'>
        <div className='space-y-1'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-3 w-24' />
        </div>
        <Skeleton className='h-5 w-20' />
      </div>
      <div className='flex justify-end gap-4'>
        <Skeleton className='h-5 w-24' />
        <Skeleton className='h-5 w-28' />
      </div>
    </Card>
  );
};

const QuizSkeleton: React.FC = () => {
  return (
    <Card className='p-4'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-6 w-32' />
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className='h-32 w-full' />
          ))}
        </div>
      </div>
    </Card>
  );
};

export const QuizList: React.FC<{ mode: GameMode }> = ({ mode }) => {
  const { t } = useTranslation('common');
  const shouldFetchRatings = true;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: allQuizsData, isLoading } = useQuery(
    ['allQuizs'],
    fetchAllQuizs,
    {
      enabled: shouldFetchRatings,
    }
  );

  const filteredQuizzes =
    allQuizsData?.filter((q: any) => q.gameconfig.mode === mode) || [];
  const todayQuiz = filteredQuizzes[0] || null;

  const totalPages = Math.ceil(filteredQuizzes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuizzes = filteredQuizzes.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 3;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    items.push(
      <PaginationItem key='prev'>
        <PaginationPrevious
          href='#'
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
          aria-disabled={currentPage === 1}
        />
      </PaginationItem>
    );

    // First page
    if (startPage > 1) {
      items.push(
        <PaginationItem key='1'>
          <PaginationLink
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key='ellipsis1'>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key='ellipsis2'>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key='next'>
        <PaginationNext
          href='#'
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) handlePageChange(currentPage + 1);
          }}
          aria-disabled={currentPage === totalPages}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className=''>
      {isLoading ? (
        <>
          <QuizSkeleton />
          <Separator orientation='horizontal' className='my-2' />
          <Card className='grid grid-cols-1 gap-2 bg-white/50 p-2'>
            <CardHeader>
              <CardTitle>{t('quiz.prev')}</CardTitle>
            </CardHeader>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <QuizInfoSkeleton key={index} />
            ))}
          </Card>
        </>
      ) : (
        <>
          {todayQuiz && (
            <Quiz
              seed={todayQuiz.seed}
              gameConfig={todayQuiz.gameconfig}
              isDailyQuiz={true}
              header={
                t('quiz.today') +
                ' Day ' +
                (dayjs(todayQuiz.createdat || '').diff(
                  dayjs('2024-07-02'),
                  'day'
                ) +
                  1)
              }
            />
          )}
          <Separator orientation='horizontal' className='my-2' />
          <Card className='grid grid-cols-1 gap-2 bg-white/50 p-2'>
            <CardHeader>
              <CardTitle>{t('quiz.prev')}</CardTitle>
            </CardHeader>
            {currentQuizzes.map(
              (quiz: Prisma.SetUpGroupByOutputType, index: number) => (
                <QuizInfo
                  key={quiz.id}
                  {...quiz}
                  idx={index}
                  day={filteredQuizzes.length - (startIndex + index)}
                />
              )
            )}
            {totalPages > 1 && (
              <div className='mt-4 flex justify-center'>
                <Pagination>
                  <PaginationContent>
                    {renderPaginationItems()}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
};
