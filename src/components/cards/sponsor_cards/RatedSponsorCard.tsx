import React from 'react';

import { SponsorHoverCard } from '@/components/cards/sponsor_cards/SponsorHoverCard';
import {
  PopHover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/PopHover';
import { useRatingTrigger } from '@/hooks/useRatingTrigger';
import { ISponsorCard } from '@/types/ISponsorCard';
import { SponsorCardType } from '@/types/SponsorCard';
import { BaseSponsorCard } from './BaseSponsorCard';

interface RatedSponsorCardProps {
  cardData: ISponsorCard;
  showLink: boolean;
}

export const RatedSponsorCard: React.FC<RatedSponsorCardProps> = ({
  cardData,
  showLink,
}) => {
  const { sponsorCard, rating, ratingCount } = cardData;
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
          <BaseSponsorCard sponsor={sponsorCard} />
        </PopoverTrigger>
        <PopoverContent className='z-20 -mt-56 w-48 bg-zinc-50/95 p-2 md:-mt-64 md:w-52'>
          <SponsorHoverCard
            id={sponsorCard.id}
            showLink={showLink}
            rating={rating}
            ratingCount={ratingCount}
            isPeopleSponsor={sponsorCard.type === SponsorCardType.HUMAN}
          />
        </PopoverContent>
      </PopHover>
    </>
  );
};
