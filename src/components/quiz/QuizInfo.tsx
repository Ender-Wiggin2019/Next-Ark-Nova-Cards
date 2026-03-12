/*
 * @Author: Ender-Wiggin
 * @Date: 2025-03-05 09:57:52
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-08-07 15:50:58
 * @Description:
 */
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { GameConfigCard } from '@/components/quiz/game/GameConfigCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { IQuizData } from '@/types/quiz';

export const QuizInfo: React.FC<IQuizData & { idx: number; day: number }> = (
  props,
) => {
  const { t } = useTranslation('common');

  return (
    <Card className='flex items-center justify-between border-border/80 bg-card/85 px-4 py-3 transition-colors hover:bg-primary/5 hover:ring-1 hover:ring-primary/30'>
      <Link
        href={`/daily-quiz?seed=${props.seed}`}
        className='flex min-w-0 flex-1 items-center'
      >
        <div>
          <div className='font-bold leading-tight'>
            {'Day ' +
              (dayjs(props.createdat || '').diff(dayjs('2024-07-02'), 'day') +
                1)}
          </div>
          <div className='text-xs text-muted-foreground'>
            {dayjs(props.createdat).format('DD/MM/YYYY')}
          </div>
        </div>
      </Link>

      <div className='flex items-center gap-3'>
        {props.gameconfig?.mode !== 'default' && (
          <HoverCard>
            <HoverCardTrigger>
              <Badge variant='nature'>{t(props.gameconfig?.mode)}</Badge>
            </HoverCardTrigger>
            <HoverCardContent className='w-full border-border/70 bg-gradient-to-br from-card/95 to-secondary/60 backdrop-blur-md'>
              <GameConfigCard gameConfig={props.gameconfig} />
            </HoverCardContent>
          </HoverCard>
        )}
        {props.idx !== 0 && (
          <Button asChild size='sm' className='h-7 rounded-full px-3 text-xs'>
            <Link href={`/daily-quiz?seed=${props.seed}&result=true`}>
              {t('View Result')}
            </Link>
          </Button>
        )}
        <span className='text-sm font-semibold text-muted-foreground'>
          {t('quiz.total') + ': ' + props.total}
        </span>
      </div>
    </Card>
  );
};
