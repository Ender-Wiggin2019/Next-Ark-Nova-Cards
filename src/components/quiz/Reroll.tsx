import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'next-i18next';

export const RerollButton: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <Link href={`/quiz/random?seed=${uuidv4()}`}>
      <Button className='w-full bg-lime-500'>{t('Reroll')}</Button>
    </Link>
  );
};
