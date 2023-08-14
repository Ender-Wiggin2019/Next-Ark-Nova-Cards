import React from 'react';

import { SponsorHoverCard } from '@/components/cards/sponsor_cards/SponsorHoverCard';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

import { BaseSponsorCard } from './BaseSponsorCard';

import { ISponsorCard } from '@/types/ISponsorCard';

interface RatedSponsorCardProps {
  cardData: ISponsorCard;
  showLink: boolean;
}

export const RatedSponsorCard: React.FC<RatedSponsorCardProps> = ({
  cardData,
  showLink,
}) => {
  const { sponsorCard, rating, ratingCount } = cardData;

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <BaseSponsorCard sponsor={sponsorCard} />
        </PopoverTrigger>
        <PopoverContent className='z-20 -mt-56 w-48 bg-zinc-50/95 p-2 md:-mt-64 md:w-52'>
          <SponsorHoverCard
            id={sponsorCard.id}
            showLink={showLink}
            rating={rating}
            ratingCount={ratingCount}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
