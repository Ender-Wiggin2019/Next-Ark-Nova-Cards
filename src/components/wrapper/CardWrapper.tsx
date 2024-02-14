import { BaseAnimalCard } from '@/components/cards/animal_cards/BaseAnimalCard';
import { BaseEndGameCard } from '@/components/cards/endgame_cards/BaseEndGameCard';
import { ProjectCard } from '@/components/cards/project_cards/ProjectCard';
import { BaseSponsorCard } from '@/components/cards/sponsor_cards/BaseSponsorCard';
import { cn } from '@/lib/utils';
import {
  isAnimalCard,
  isEndGameCard,
  isProjectCard,
  isSponsorCard,
} from '@/types/Card';
import { getCardById } from '@/utils/GetCardById';
import React, { useState } from 'react';

interface CardWrapperProps {
  id: string;
  canSelect: boolean;
  disable: boolean;
  onSelect?: (id: string, add: boolean) => void;
  // children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  id,
  canSelect,
  disable,
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
    <ProjectCard project={cardData} />
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
