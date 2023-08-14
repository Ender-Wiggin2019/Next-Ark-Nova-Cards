import { HoverCard, HoverCardTrigger } from '@radix-ui/react-hover-card';
import React from 'react';

import { AnimalModelCard } from '@/components/cards/animal_cards/models/AnimalModelCard';
import { HoverCardContent } from '@/components/ui/hover-card';

import { BaseAnimalCard } from './BaseAnimalCard';

import { IAnimalCard } from '@/types/IAnimalCard';

interface RatedAnimalCardProps {
  cardData: IAnimalCard;
  showLink: boolean;
}

export const RatedAnimalCard: React.FC<RatedAnimalCardProps> = ({
  cardData,
  showLink,
}) => {
  const { animalCard, model, rating, ratingCount } = cardData;

  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <BaseAnimalCard animal={animalCard} />
        </HoverCardTrigger>
        <HoverCardContent className='z-20 -mt-52 w-36 bg-zinc-50/90 p-2 text-xs'>
          <AnimalModelCard
            id={animalCard.id}
            model={model}
            showLink={showLink}
            rating={rating}
          />
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
