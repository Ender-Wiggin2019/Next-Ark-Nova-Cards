import React, { useEffect, useState } from 'react';
import { BaseAnimalCard } from '@/components/cards/animal_cards/BaseAnimalCard';
import { BaseEndGameCard } from '@/components/cards/endgame_cards/BaseEndGameCard';
import { TokenProjectCard } from '@/components/cards/project_cards/ProjectCard';
import { BaseSponsorCard } from '@/components/cards/sponsor_cards/BaseSponsorCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  isAnimalCard,
  isEndGameCard,
  isProjectCard,
  isSponsorCard,
} from '@/types/Card';
import { TProjectSlotPosition } from '@/types/ProjectCard';
import { getCardById } from '@/utils/GetCardById';

interface CardWrapperProps {
  id: string;
  canSelect: boolean;
  disable: boolean;
  index?: TProjectSlotPosition;
  onSelect?: (id: string, add: boolean) => void;
  initSelect?: boolean;
  preview?: boolean;
  // children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  id,
  canSelect,
  disable,
  index,
  initSelect,
  preview,
  // children,
  onSelect,
}) => {
  const [selected, setSelected] = useState(initSelect || false);

  useEffect(() => {
    setSelected(initSelect || false);
  }, [initSelect]);

  const handleSelect = () => {
    if ((!canSelect || disable) && !selected) return;
    setSelected(!selected);
    if (onSelect) {
      onSelect(id, !selected);
    }
  };

  const isInteractive = canSelect && (!disable || selected);

  const cardData = getCardById(id);
  if (!cardData) {
    return null;
  }

  const Card = isAnimalCard(cardData) ? (
    <BaseAnimalCard animal={cardData} />
  ) : isSponsorCard(cardData) ? (
    <BaseSponsorCard sponsor={cardData} />
  ) : isProjectCard(cardData) ? (
    <TokenProjectCard project={cardData} pos={index} />
  ) : isEndGameCard(cardData) ? (
    <BaseEndGameCard card={cardData} />
  ) : null;

  const wrapperClassName = cn('player-board-hand w-min', {
    'rounded-sm ring-4 ring-lime-500 ring-offset-2': selected,
    preview: preview,
    'cursor-pointer': isInteractive,
    'cursor-auto': !canSelect,
    'cursor-not-allowed grayscale': disable && !selected,
  });

  if (isInteractive) {
    return (
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className={cn(wrapperClassName, 'h-auto p-0 hover:bg-transparent')}
        onClick={handleSelect}
        aria-label={`Select card ${id}`}
      >
        {Card}
      </Button>
    );
  }

  return (
    <div className={wrapperClassName} aria-disabled='true'>
      {Card}
    </div>
  );
};

export default CardWrapper;
