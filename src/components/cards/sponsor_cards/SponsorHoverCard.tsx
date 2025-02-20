/*
 * @Author: Ender-Wiggin
 * @Date: 2024-06-27 23:56:37
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-21 01:35:23
 * @Description:
 */
import { Separator } from '@/components/ui/separator';

interface HoverCardProps {
  id: string;
  showLink: boolean;
  rating?: number | null;
  ratingCount?: number | null;
  isPeopleSponsor?: boolean;
}
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

export const SponsorHoverCard: React.FC<HoverCardProps> = ({
  id,
  showLink,
  rating,
  ratingCount,
  isPeopleSponsor,
}) => {
  // const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <div className='flex flex-col gap-2 text-xs'>
      {isPeopleSponsor && (
        <div className='text-md font-bold text-lime-800'>
          {t("Hi, I'm a People Sponsor!")}
        </div>
      )}
      {rating && (
        <div className='flex flex-row gap-1'>
          <Rating
            emptyStyle={{ display: 'flex' }}
            fillStyle={{ display: '-webkit-inline-box' }}
            className='-mt-1'
            readonly={true}
            initialValue={rating}
            allowFraction={true}
            size={16}
          />
          {rating ? `${rating.toFixed(1)} (${ratingCount} ${t('users')})` : ''}
        </div>
      )}
      {showLink && (
        <div className='flex flex-col items-center'>
          <Separator className='my-2 bg-zinc-300' />
          <Link
            href={'/card/' + id}
            rel='card-detail'
            target='_blank'
            className='w-15 group flex items-center justify-center space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-xs font-medium text-lime-600 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md hover:text-lime-700 focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'
          >
            {t('View More')}{' '}
          </Link>
        </div>
      )}
    </div>
  );
};
