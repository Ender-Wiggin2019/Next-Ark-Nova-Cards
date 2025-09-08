import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo } from 'react';

import CardList from '@/components/cards/shared/CardList';

import { fetchCardRatings } from '@/services/card';
import { CardSource } from '@/types/CardSource';
import { IRating } from '@/types/IRating';
import { ISponsorCard } from '@/types/ISponsorCard';
import { SortOrder } from '@/types/Order';
import {
  SponsorCard,
  SponsorCardType,
  SponsorCard as TypedSponsorCard,
} from '@/types/SponsorCard';
import {
  isAnimalTag,
  isContinentTag,
  isOtherTag,
  OtherTag,
  Tag,
} from '@/types/Tags';
import { filterSponsorsByText } from '@/utils/filter';
import { RatedSponsorCard } from './RatedSponsorCard';
import { useSponsorData } from './useSponsorData';

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
  strength: number[] = [2],
  t: (text: string) => string,
) => {
  // First apply text filter using the utility function
  const textFilteredSponsors = filterSponsorsByText(textFilter, sponsors, t);

  // Then apply other filters
  const res = textFilteredSponsors.filter(
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
            hasRockAndWaterRequirements(sponsor, req),
        )) &&
      (selectedCardSources.length === 0 ||
        selectedCardSources.some((src) => sponsor.source === src)) &&
      (strength.length === 0 ||
        strength.includes(0) ||
        strength.includes(1) ||
        strength.includes(2) ||
        strength.includes(sponsor.strength)),
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
  const { t } = useTranslation('common');
  // 监听评分数据，但不主动获取（由点击触发）
  const { data: cardRatings } = useQuery(['cardRatings'], fetchCardRatings, {
    enabled: false, // 不主动获取
    staleTime: 5 * 60 * 1000, // 5分钟缓存
  });
  const sponsorsData = useSponsorData();
  const filteredSponsors = filterSponsors(
    sponsorsData,
    selectedTags,
    selectedRequirements,
    selectedCardSources,
    showHumanSponsors,
    textFilter,
    strength,
    t,
  );

  const combineDataWithRatings = (
    sponsors: SponsorCard[],
    ratings: IRating[],
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
  }, [cardRatings, initialSponsorCards, filteredSponsors, sortOrder, maxNum]);

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
