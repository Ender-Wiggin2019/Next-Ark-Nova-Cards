import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';

import CardList from '@/components/cards/shared/CardList';

import { fetchCardRatings } from '@/utils/fetch';

import { RatedSponsorCard } from './RatedSponsorCard';
import { useSponsorData } from './useSponsorData';

import { CardSource } from '@/types/CardSource';
import { IRating } from '@/types/IRating';
import { ISponsorCard } from '@/types/ISponsorCard';
import { SortOrder } from '@/types/Order';
import {
  SponsorCard as TypedSponsorCard,
  SponsorCardType,
} from '@/types/SponsorCard';
import { SponsorCard } from '@/types/SponsorCard';
import {
  isAnimalTag,
  isContinentTag,
  isOtherTag,
  OtherTag,
  Tag,
} from '@/types/Tags';

interface SponsorCardListProps {
  selectedTags?: Tag[];
  selectedRequirements?: Tag[];
  selectedCardSources?: CardSource[];
  textFilter?: string;
  sortOrder?: SortOrder;
  strength?: number[];
  onCardCountChange: (count: number) => void;
  showHumanSponsors?: boolean;
  maxNum?: number;
  // ... any other filters
}

const hasRockAndWaterRequirements = (sponsor: TypedSponsorCard, req: Tag) => {
  if (req === OtherTag.Rock) {
    return sponsor.rock && sponsor.rock > 0;
  } else if (req === OtherTag.Water) {
    return sponsor.water && sponsor.water > 0;
  } else {
    return false;
  }
};
const filterSponsors = (
  sponsors: TypedSponsorCard[],
  selectedTags: Tag[] = [],
  selectedRequirements: Tag[] = [],
  selectedCardSources: CardSource[] = [],
  showHumanSponsors = false,
  textFilter = '',
  strength: number[] = [2]
) => {
  const lowercaseFilter = textFilter.toLowerCase();

  const res = sponsors.filter(
    (sponsor) =>
      (!showHumanSponsors ||
        (showHumanSponsors &&
          sponsor.type &&
          sponsor.type === SponsorCardType.HUMAN)) &&
      (selectedTags.filter(isAnimalTag).length === 0 ||
        selectedTags
          .filter(isAnimalTag)
          .some((tag) => sponsor.tags.includes(tag))) &&
      (selectedTags.filter(isContinentTag).length === 0 ||
        selectedTags
          .filter(isContinentTag)
          .some((tag) => sponsor.tags.includes(tag))) &&
      (selectedTags.filter(isOtherTag).length === 0 ||
        selectedTags
          .filter(isOtherTag)
          .some((tag) => sponsor.tags.includes(tag))) &&
      (selectedRequirements.length === 0 ||
        selectedRequirements.some(
          (req) =>
            (sponsor.requirements && sponsor.requirements.includes(req)) ||
            hasRockAndWaterRequirements(sponsor, req)
        )) &&
      (selectedCardSources.length === 0 ||
        selectedCardSources.some((src) => sponsor.source === src)) &&
      (textFilter === '' ||
        sponsor.id.toLowerCase().includes(lowercaseFilter) ||
        sponsor.name.toLowerCase().includes(lowercaseFilter) ||
        (sponsor.effects !== undefined &&
          sponsor.effects.some((effect) =>
            effect.effectDesc.toLowerCase().includes(lowercaseFilter)
          ))) &&
      (strength.length === 0 ||
        strength.includes(0) ||
        strength.includes(1) ||
        strength.includes(2) ||
        strength.includes(sponsor.strength))
  );

  return res;
};

export const SponsorCardList: React.FC<SponsorCardListProps> = ({
  selectedTags,
  selectedRequirements,
  selectedCardSources = [],
  textFilter,
  onCardCountChange,
  sortOrder = SortOrder.ID_ASC,
  showHumanSponsors = false,
  strength = [0],
  maxNum,
}) => {
  const shouldFetchRatings = true;
  const { data: cardRatings } = useQuery(['cardRatings'], fetchCardRatings, {
    enabled: shouldFetchRatings,
    // staleTime: 60 * 1000,
  });
  const sponsorsData = useSponsorData();
  const filteredSponsors = filterSponsors(
    sponsorsData,
    selectedTags,
    selectedRequirements,
    selectedCardSources,
    showHumanSponsors,
    textFilter,
    strength
  );

  const combineDataWithRatings = (
    sponsors: SponsorCard[],
    ratings: IRating[]
  ): ISponsorCard[] => {
    return sponsors.map((sponsor) => {
      const rating = ratings.find((r) => r.cardid === sponsor.id);
      return {
        id: sponsor.id,
        sponsorCard: sponsor,
        rating: rating ? rating._avg.rating : null,
        ratingCount: rating ? rating._count : null,
      };
    });
  };

  const initialSponsorCards: ISponsorCard[] = useMemo(() => {
    return filteredSponsors.map((sponsor) => ({
      id: sponsor.id,
      sponsorCard: sponsor,
      rating: null,
      ratingCount: null,
    }));
  }, [filteredSponsors]);

  const { ratedSponsorCards, originalCount } = useMemo(() => {
    const _ratedSponsorCards = !cardRatings
      ? initialSponsorCards
      : combineDataWithRatings(filteredSponsors, cardRatings);

    switch (sortOrder) {
      case SortOrder.ID_ASC:
        _ratedSponsorCards.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case SortOrder.ID_DESC:
        _ratedSponsorCards.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case SortOrder.RATING_DESC:
        _ratedSponsorCards.sort((a, b) => {
          if ((b.rating ?? -1) !== (a.rating ?? -1)) {
            return (b.rating ?? -1) - (a.rating ?? -1);
          } else {
            return (b.ratingCount ?? -1) - (a.ratingCount ?? -1);
          }
        });
        break;
    }

    return {
      ratedSponsorCards:
        maxNum !== undefined
          ? _ratedSponsorCards.slice(0, maxNum)
          : _ratedSponsorCards,
      originalCount: _ratedSponsorCards.length,
    };
  }, [filteredSponsors, cardRatings]);

  switch (sortOrder) {
    case SortOrder.ID_ASC:
      ratedSponsorCards.sort((a, b) => a.id.localeCompare(b.id));
      break;
    case SortOrder.ID_DESC:
      ratedSponsorCards.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case SortOrder.RATING_DESC:
      ratedSponsorCards.sort((a, b) => {
        if ((b.rating ?? -1) !== (a.rating ?? -1)) {
          return (b.rating ?? -1) - (a.rating ?? -1);
        } else {
          return (b.ratingCount ?? -1) - (a.ratingCount ?? -1);
        }
      });
      break;
  }

  useEffect(() => {
    onCardCountChange(originalCount);
  }, [originalCount, onCardCountChange]);

  return (
    <CardList>
      {ratedSponsorCards.map((ratedSponsorCard: ISponsorCard) => (
        <div
          key={ratedSponsorCard.id}
          className='-mb-12 scale-75 sm:mb-1 sm:scale-90 md:mb-4 md:scale-100'
        >
          <RatedSponsorCard
            key={ratedSponsorCard.id}
            cardData={ratedSponsorCard}
            showLink={true}
          />
        </div>
      ))}
    </CardList>
  );
};
