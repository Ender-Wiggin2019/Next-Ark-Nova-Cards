/*
 * @Author: Ender Wiggin
 * @Date: 2026-02-22 00:14:04
 * @LastEditors: Ender Wiggin
 * @LastEditTime: 2026-02-22 01:55:22
 * @Description:
 */
// CategoryFilter.tsx
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import TextButton from '@/components/buttons/TextButton';

import { CardSource } from '@/types/CardSource';

type CardSourceFilterProps = {
  onFilterChange: (sources: CardSource[]) => void;
  reset: boolean;
  includeFanMade?: boolean;
};

export const CardSourceFilter: React.FC<CardSourceFilterProps> = ({
  onFilterChange,
  reset,
  includeFanMade = false,
}) => {
  const { t } = useTranslation('common');
  const [selectedCardSource, setSelectedCardSource] = useState<CardSource[]>(
    [],
  );

  const handleCategoryChange = (CardSource: CardSource) => {
    setSelectedCardSource((prev: CardSource[]) =>
      prev.includes(CardSource)
        ? prev.filter((t) => t !== CardSource)
        : [...prev, CardSource],
    );
  };

  useEffect(() => {
    onFilterChange(selectedCardSource);
  }, [onFilterChange, selectedCardSource]);

  useEffect(() => {
    if (reset) {
      setSelectedCardSource([]);
    }
  }, [reset]);

  return (
    <div className='flex justify-between gap-4'>
      <TextButton
        selected={selectedCardSource.includes(CardSource.BASE)}
        className='hover:text-muted-foreground'
        selectClassName='text-foreground ring-foreground/80 ring-2'
        onClick={() => handleCategoryChange(CardSource.BASE)}
      >
        {t('Base')}
      </TextButton>
      <TextButton
        selected={selectedCardSource.includes(CardSource.MARINE_WORLD)}
        className='hover:text-blue-500'
        selectClassName='text-blue-500 ring-blue-500/90 ring-2'
        onClick={() => handleCategoryChange(CardSource.MARINE_WORLD)}
      >
        {t('Marine World')}
      </TextButton>
      <TextButton
        selected={selectedCardSource.includes(CardSource.PROMO)}
        className='hover:text-pink-500'
        selectClassName='text-pink-500 ring-pink-500/90 ring-2'
        onClick={() => handleCategoryChange(CardSource.PROMO)}
      >
        {t('Promo')}
      </TextButton>
      {includeFanMade && (
        <TextButton
          selected={selectedCardSource.includes(CardSource.FAN_MADE)}
          className='hover:text-primary'
          selectClassName='text-primary ring-primary/90 ring-2'
          onClick={() => handleCategoryChange(CardSource.FAN_MADE)}
        >
          {t('Fan Made')}
        </TextButton>
      )}
    </div>
  );
};
