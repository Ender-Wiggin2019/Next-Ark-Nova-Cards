import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { GameConfigCard } from '@/components/quiz/game/GameConfigCard';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export const QuizInfo: React.FC<
  Prisma.SetUpGroupByOutputType & { idx: number; day: number }
> = (props) => {
  const { t } = useTranslation('common');

  return (
    <Link href={`/daily-quiz?seed=${props.seed}`}>
      <Card className=' flex h-12 items-center justify-between px-4 py-2'>
        {/* <Badge
          className={cn(
            'flex w-20 justify-center place-self-start text-center',
            {
              'bg-sky-600 hover:bg-sky-500': props.title === 'ALL EXP',
            }
          )}
        >
          {t(props.title)}
        </Badge> */}
        <div className='flex items-center justify-start gap-2'>
          <div className='font-bold'>
            {'Day ' +
              (dayjs(props.createdat || '').diff(dayjs('2024-07-02'), 'day') +
                1)}
            <div className='text-xs font-normal text-zinc-400'>
              {dayjs(props.createdat).format('DD/MM/YYYY')}
            </div>
          </div>

          <div>
            {(props.gameconfig as any)?.mode !== 'default' && (
              <>
                <HoverCard>
                  <HoverCardTrigger>
                    {' '}
                    <Badge>{t((props.gameconfig as any)?.mode)}</Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className='w-full'>
                    <GameConfigCard gameConfig={props.gameconfig as any} />
                  </HoverCardContent>
                </HoverCard>
                {/* <Badge>
          {t((props.gameconfig as any)?.mode)}
          </Badge> */}
              </>
            )}
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          {props.idx !== 0 && (
            <Link href={`/daily-quiz?seed=${props.seed}&result=true`}>
              <Badge className='bg-lime-500 hover:bg-lime-600'>
                {t('View Result')}
              </Badge>
            </Link>
          )}
          <div className='w-28 text-start font-semibold'>
            {t('quiz.total') + ': ' + props.total}
          </div>
        </div>
      </Card>
    </Link>
  );
};
