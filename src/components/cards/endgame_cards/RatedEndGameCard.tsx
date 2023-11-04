import React from 'react';

import { EndGameHoverCard } from '@/components/cards/endgame_cards/EndGameHoverCard';
import {
  PopHover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/PopHover';

import { BaseEndGameCard } from './BaseEndGameCard';

import { IEndGameCard } from '@/types/EndGameCard';

interface RatedEndGameCardProps {
  cardData: IEndGameCard;
  showLink: boolean;
}

export const RatedEndGameCard: React.FC<RatedEndGameCardProps> = ({
  cardData,
  showLink,
}) => {
  const { endGameCard, rating, ratingCount } = cardData;

  return (
    <>
      <PopHover>
        <PopoverTrigger>
          <BaseEndGameCard card={endGameCard} />
        </PopoverTrigger>
        <PopoverContent className='z-20 -mt-56 w-48 bg-zinc-50/95 p-2 md:-mt-72 md:w-52'>
          <EndGameHoverCard
            id={endGameCard.id}
            card={endGameCard}
            showLink={showLink}
            rating={rating}
            ratingCount={ratingCount}
          />
        </PopoverContent>
      </PopHover>
    </>
  );
};
