import { HoverCard, HoverCardTrigger } from '@radix-ui/react-hover-card';
import React from 'react';

import { SponsorHoverCard } from '@/components/cards/sponsor_cards/SponsorHoverCard';
import { HoverCardContent } from '@/components/ui/hover-card';

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
      <HoverCard>
        <HoverCardTrigger>
          <BaseSponsorCard sponsor={sponsorCard} />
        </HoverCardTrigger>
        <HoverCardContent className='z-20 -mt-52 w-36 bg-zinc-50/90 p-2 text-xs'>
          <SponsorHoverCard
            id={sponsorCard.id}
            showLink={showLink}
            rating={rating}
          />
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
