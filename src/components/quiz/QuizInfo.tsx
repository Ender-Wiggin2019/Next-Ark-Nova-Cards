import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const QuizInfo: React.FC<Prisma.SetUpGroupByOutputType> = (props) => {
  const { t } = useTranslation('common');

  return (
    <Link href='/'>
      <Card className=' grid h-12 grid-cols-3 place-items-center content-center p-2'>
        <Badge
          className={cn(
            'flex w-20 justify-center place-self-start text-center',
            {
              'bg-sky-600 hover:bg-sky-500': props.title === 'ALL EXP',
            }
          )}
        >
          {t(props.title)}
        </Badge>
        <div className='text-bold'>
          {dayjs(props.updatedat).format('DD/MM/YYYY')}
        </div>
        <div className='text-bold'>{t('quiz.total') + ': ' + props.total}</div>
      </Card>
    </Link>
  );
};
