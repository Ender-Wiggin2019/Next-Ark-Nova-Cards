import React from 'react';

import { EndGameHoverCard } from '@/components/cards/endgame_cards/EndGameHoverCard';
import {
  PopHover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/PopHover';
import { useRatingTrigger } from '@/hooks/useRatingTrigger';
import { IEndGameCard } from '@/types/EndGameCard';
import { BaseEndGameCard } from './BaseEndGameCard';

interface RatedEndGameCardProps {
  cardData: IEndGameCard;
  showLink: boolean;
}

export const RatedEndGameCard: React.FC<RatedEndGameCardProps> = ({
  cardData,
  showLink,
}) => {
  const { endGameCard, rating, ratingCount } = cardData;
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
