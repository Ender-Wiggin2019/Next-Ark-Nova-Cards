import { Separator } from '@/components/ui/separator';

interface HoverCardProps {
  id: string;
  card: EndGameCard;
  showLink: boolean;
  rating?: number | null;
  ratingCount?: number | null;
}
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

import { cn } from '@/lib/utils';

import { EndGameCard } from '@/types/EndGameCard';

export const EndGameHoverCard: React.FC<HoverCardProps> = ({
  id,
  card,
  showLink,
  rating,
  ratingCount,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className='flex flex-col items-center justify-end text-xs '>
      {card.originalArray && (
        <div className='mb-2'>
          <span className='text-bold'>
            {t('This card has been changed')}:&nbsp;
          </span>
          <table className='score-map mt-1 p-0 text-center text-xs text-zinc-600'>
            <tbody>
              <tr>
                <th></th>
                {card.originalArray.map((obj) => {
                  return (
                    <td key={obj.requirement} className='m-0 p-0 text-xs'>
                      {obj.requirement}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>

          <table className='score-map mt-1 p-0 text-center text-xs'>
            <tbody>
              <tr>
                <th></th>
                {card.scoreArray.map((obj, idx) => {
                  return (
                    <td
                      key={obj.requirement}
                      className={cn(
                        'm-0 p-0 text-xs',
                        {
                          'text-lime-600':
                            card.originalArray &&
                            obj.requirement <
                              card.originalArray[idx].requirement,
                        },
                        {
                          'text-red-700':
                            card.originalArray &&
                            obj.requirement >
                              card.originalArray[idx].requirement,
                        }
                      )}
                    >
                      {obj.requirement}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
          {/*  <span*/}
          {/*      className={cn(*/}
          {/*          'text-bold',*/}
          {/*          { 'text-lime-600': model.diffWithSpecialEnclosure >= 0 },*/}
          {/*          { 'text-red-600': model.diffWithSpecialEnclosure < 0 }*/}
          {/*      )}*/}
          {/*  >*/}
          {/*  {model.diffWithSpecialEnclosure}*/}
          {/*    /!*<MoneyIcon value={model.diff} />*!/*/}
          {/*</span>*/}
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
        <div className='flex w-full flex-col items-center'>
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
