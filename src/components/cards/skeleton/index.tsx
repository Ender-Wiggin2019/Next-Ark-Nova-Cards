/*
 * @Author: Ender-Wiggin
 * @Date: 2025-08-04 16:24:28
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-08-04 16:34:59
 * @Description:
 */
import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const AnimalCardSkeleton: React.FC = () => {
  return (
    <div className='h-96 w-64 rounded-lg border-2 border-gray-200 bg-white/50 px-3 py-4 shadow-md flex flex-col gap-2 justify-between'>
        <Skeleton className='h-1/2 w-full rounded-md' />
        <Skeleton className='h-8 w-full rounded' />

        <Skeleton className='h-1/2 w-full rounded' />

    </div>
  );
};

export const AnimalCardListSkeleton: React.FC = () => {
  return (
    <div className='-pt-1 grid w-full grid-cols-2 justify-items-center gap-2 px-1 lg:grid-cols-3 lg:px-2 xl:grid-cols-4'>
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className='-mb-12 scale-75 sm:mb-1 sm:scale-90 md:mb-4 md:scale-100'
        >
          <AnimalCardSkeleton />
        </div>
      ))}
    </div>
  );
};
