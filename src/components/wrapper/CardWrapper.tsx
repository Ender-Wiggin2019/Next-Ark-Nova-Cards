import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { BaseAnimalCard } from '@/components/cards/animal_cards/BaseAnimalCard';
import { BaseEndGameCard } from '@/components/cards/endgame_cards/BaseEndGameCard';
import {
  ProjectCard,
  TokenProjectCard,
} from '@/components/cards/project_cards/ProjectCard';
import { BaseSponsorCard } from '@/components/cards/sponsor_cards/BaseSponsorCard';

import { getCardById } from '@/utils/GetCardById';

import {
  isAnimalCard,
  isEndGameCard,
  isProjectCard,
  isSponsorCard,
} from '@/types/Card';

interface CardWrapperProps {
  id: string;
  canSelect: boolean;
  disable: boolean;
  index?: number;
  onSelect?: (id: string, add: boolean) => void;
  // children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  id,
  canSelect,
  disable,
  index,
  // children,
  onSelect,
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if ((!canSelect || disable) && !selected) return;
    setSelected(!selected);
    if (onSelect) {
      console.log('666', id, selected);
      onSelect(id, !selected);
    }
  };
  const cardData = getCardById(id);
  if (!cardData) {
    return null;
  }

  const Card = isAnimalCard(cardData) ? (
    <BaseAnimalCard animal={cardData} />
  ) : isSponsorCard(cardData) ? (
    <BaseSponsorCard sponsor={cardData} />
  ) : isProjectCard(cardData) ? (
    <TokenProjectCard project={cardData} pos={index as any} />
  ) : isEndGameCard(cardData) ? (
    <BaseEndGameCard card={cardData} />
  ) : null;
  return (
    <div
      className={cn('player-board-hand w-min cursor-pointer', {
        'rounded-sm ring-4 ring-lime-500 ring-offset-2': selected,
        'cursor-auto': !canSelect,
        'cursor-not-allowed grayscale': disable && !selected,
      })}
      onClick={handleSelect}
    >
      {Card}
    </div>
  );
};

export default CardWrapper;
