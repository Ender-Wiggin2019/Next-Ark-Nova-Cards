import { useTranslation } from 'next-i18next';
import React from 'react';

import { cn } from '@/lib/utils';

import { getCardById } from '@/utils/GetCardById';

import {
  isAnimalCard,
  isEndGameCard,
  isProjectCard,
  isSponsorCard,
} from '@/types/Card';

interface TitleWrapperProps {
  id: string;
  // children: React.ReactNode;
}

const TitleWrapper: React.FC<TitleWrapperProps> = ({ id }) => {
  const { t } = useTranslation('common');
  const cardData = getCardById(id);
  if (!cardData) {
    return null;
  }

  const className = isAnimalCard(cardData)
    ? 'animal-title'
    : isSponsorCard(cardData)
    ? 'sponsor-title'
    : isProjectCard(cardData)
    ? 'project-title'
    : isEndGameCard(cardData)
    ? 'endgame-title'
    : null;

  return (
    <div
      className={cn(
        'flex items-center justify-center px-2 py-1',
        className,
        'rounded text-sm'
      )}
    >
      <div className='text-center'>{t(cardData.name)}</div>
    </div>
  );
};

export default TitleWrapper;
