import React, { useEffect } from 'react';

import CardList from '@/components/cards/shared/CardList';

import { SponsorCard } from './SponsorCard';
import { useSponsorData } from './useSponsorData';

import { CardSource } from '@/types/CardSource';
import { SponsorCard as SponsorCardType } from '@/types/SponsorCard';
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
  onCardCountChange: (count: number) => void;
  // ... any other filters
}

const hasRockAndWaterRequirements = (animal: SponsorCardType, req: Tag) => {
  if (req === OtherTag.Rock) {
    return animal.rock && animal.rock > 0;
  } else if (req === OtherTag.Water) {
    return animal.water && animal.water > 0;
  } else {
    return false;
  }
};
const filterSponsors = (
  sponsors: SponsorCardType[],
  selectedTags: Tag[] = [],
  selectedRequirements: Tag[] = [],
  selectedCardSources: CardSource[] = [],
  textFilter = ''
) => {
  const lowercaseFilter = textFilter.toLowerCase();

  return sponsors.filter(
    (sponsor) =>
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
          )))
  );
};

export const SponsorCardList: React.FC<SponsorCardListProps> = ({
  selectedTags,
  selectedRequirements,
  selectedCardSources = [],
  textFilter,
  onCardCountChange,
}) => {
  const sponsorsData = useSponsorData();
  const filteredSponsors = filterSponsors(
    sponsorsData,
    selectedTags,
    selectedRequirements,
    selectedCardSources,
    textFilter
  );

  useEffect(() => {
    onCardCountChange(filteredSponsors.length);
  }, [filteredSponsors, onCardCountChange]);

  return (
    <CardList>
      {filteredSponsors.map((sponsor: SponsorCardType) => (
        <div key={sponsor.id} className='scale-150 pb-36'>
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        </div>
      ))}
    </CardList>
  );
};
