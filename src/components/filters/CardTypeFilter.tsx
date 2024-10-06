/*
 * @Author: Ender-Wiggin
 * @Date: 2023-07-08 11:36:49
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2024-10-07 00:52:10
 * @Description:
 */
// CategoryFilter.tsx
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import TextButton from '@/components/buttons/TextButton';
import HumanSponsor from '@/components/icons/HumanSponsor';

import { CardType } from '@/types/Card';

type CardTypeFilterProps = {
  cardTypes: CardType[];
  onFilterChange: (tags: CardType[]) => void;
  reset: boolean;
};

export const CardTypeFilter: React.FC<CardTypeFilterProps> = ({
  cardTypes,
  onFilterChange,
  reset,
}) => {
  const router = useRouter();
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
  }, [selectedCategories, onFilterChange]);

  useEffect(() => {
    if (reset) {
      setSelectedCategories([]);
    }
  }, [reset]);

  return (
    <div className='flex justify-between gap-4'>
      {cardTypes.includes(CardType.ANIMAL_CARD) && (
        <TextButton
          selected={selectedCategories.includes(CardType.ANIMAL_CARD)}
          className='hover:text-amber-500'
          selectClassName='text-amber-500 ring-amber-500/90 ring-2'
          onClick={() => handleCategoryChange(CardType.ANIMAL_CARD)}
        >
          {t('Animal Card')}
        </TextButton>
      )}
      {cardTypes.includes(CardType.SPONSOR_CARD) && (
        <div className='relative'>
          <TextButton
            selected={selectedCategories.includes(CardType.SPONSOR_CARD)}
            className='hover:text-sky-600'
            selectClassName='text-sky-600 ring-sky-600/90 ring-2'
            onClick={() => handleCategoryChange(CardType.SPONSOR_CARD)}
          >
            {t('Sponsor Card')}
          </TextButton>
          <div
            className='absolute -top-2 right-0 cursor-pointer hover:opacity-80'
            onClick={() => router.push('/people-sponsors')}
          >
            <HumanSponsor />
          </div>
        </div>
      )}
      {cardTypes.includes(CardType.CONSERVATION_CARD) && (
        <TextButton
          selected={selectedCategories.includes(CardType.CONSERVATION_CARD)}
          className='hover:text-lime-500'
          selectClassName='text-lime-500 ring-lime-500/90 ring-2'
          onClick={() => handleCategoryChange(CardType.CONSERVATION_CARD)}
        >
          {t('Conservation Projects')}
        </TextButton>
      )}
      {cardTypes.includes(CardType.END_GAME_CARD) && (
        <TextButton
          selected={selectedCategories.includes(CardType.END_GAME_CARD)}
          className='hover:text-amber-800'
          selectClassName='text-amber-800 ring-amber-800/90 ring-2'
          onClick={() => handleCategoryChange(CardType.END_GAME_CARD)}
        >
          {t('Final Scoring Cards')}
        </TextButton>
      )}
      {/*<TextButton onClick={() => handleCategoryChange(null)}>All Cards</TextButton>*/}
    </div>
  );
};
