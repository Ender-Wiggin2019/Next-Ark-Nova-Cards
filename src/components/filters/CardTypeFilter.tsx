// CategoryFilter.tsx
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import TextButton from '@/components/buttons/TextButton';

import { CardType } from '@/types/Card';

type CardTypeFilterProps = {
  onFilterChange: (tags: CardType[]) => void;
  reset: boolean;
};

export const CardTypeFilter: React.FC<CardTypeFilterProps> = ({
  onFilterChange,
  reset,
}) => {
  const { t } = useTranslation('common');
  const [selectedCategories, setSelectedCategories] = useState<CardType[]>([]);

  const handleCategoryChange = (cardType: CardType) => {
    setSelectedCategories((prev: CardType[]) =>
      prev.includes(cardType)
        ? prev.filter((t) => t !== cardType)
        : [...prev, cardType]
    );
  };

  useEffect(() => {
    onFilterChange(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    if (reset) {
      setSelectedCategories([]);
    }
  }, [reset]);

  return (
    <div className='flex gap-4'>
      <TextButton
        selected={selectedCategories.includes(CardType.ANIMAL_CARD)}
        className='hover:text-amber-500'
        selectClassName='text-amber-500 ring-amber-500/90 ring-2'
        onClick={() => handleCategoryChange(CardType.ANIMAL_CARD)}
      >
        {t('Animal Card')}
      </TextButton>
      <TextButton
        selected={selectedCategories.includes(CardType.SPONSOR_CARD)}
        className='hover:text-sky-600'
        selectClassName='text-sky-600 ring-sky-600/90 ring-2'
        onClick={() => handleCategoryChange(CardType.SPONSOR_CARD)}
      >
        {t('Sponsor Card')}
      </TextButton>
      {/*<TextButton onClick={() => handleCategoryChange(null)}>All Cards</TextButton>*/}
    </div>
  );
};
