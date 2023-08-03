import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface ModelCardProps {
  model: AnimalCardModel;
}
import React from 'react';

import { AnimalModelCard } from '@/components/cards/animal_cards/models/AnimalModelCard';

import { AnimalCardModel } from '@/types/AnimalCardModel';

export const AnimalModelHover: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <HoverCard>
      <HoverCardTrigger className='absolute'>Hover</HoverCardTrigger>
      <HoverCardContent className='z-20'>
        <AnimalModelCard model={model} />
      </HoverCardContent>
    </HoverCard>
  );
};
