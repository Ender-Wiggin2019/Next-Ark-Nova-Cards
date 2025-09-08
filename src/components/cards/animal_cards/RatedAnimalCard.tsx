import React from 'react';

import { AnimalModelCard } from '@/components/cards/animal_cards/models/AnimalModelCard';
import {
  PopHover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/PopHover';
import { useRatingTrigger } from '@/hooks/useRatingTrigger';
import { IAnimalCard } from '@/types/IAnimalCard';
import { BaseAnimalCard } from './BaseAnimalCard';

interface RatedAnimalCardProps {
  cardData: IAnimalCard;
  showLink: boolean;
}

export const RatedAnimalCard: React.FC<RatedAnimalCardProps> = ({
  cardData,
  showLink,
}) => {
  const { animalCard, model, rating, ratingCount } = cardData;
  const { triggerRatingFetch } = useRatingTrigger();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // 当popover打开时，触发评分数据获取
      triggerRatingFetch();
    }
  };

  return (
    <>
      <PopHover onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <BaseAnimalCard animal={animalCard} />
        </PopoverTrigger>
        <PopoverContent className='z-20 -mt-56 w-48 bg-zinc-50/95 p-2 md:-mt-64 md:w-52'>
          <AnimalModelCard
            id={animalCard.id}
            model={model}
            showLink={showLink}
            rating={rating}
            ratingCount={ratingCount}
          />
        </PopoverContent>
      </PopHover>
    </>
  );
};
