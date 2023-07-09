import React, { useEffect } from 'react';

import CardList from '@/components/cards/shared/CardList';

import { SponsorCard } from './SponsorCard';
import { useSponsorData } from './useSponsorData';

import { CardSource } from '@/types/CardSource';
import { SponsorCard as SponsorCardType } from '@/types/SponsorCard';
import { OtherTag, Tag } from '@/types/Tags';

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
    (animal) =>
      (selectedTags.length === 0 ||
        selectedTags.some((tag) => animal.tags.includes(tag))) &&
      (selectedRequirements.length === 0 ||
        selectedRequirements.some(
          (req) =>
            (animal.requirements && animal.requirements.includes(req)) ||
            hasRockAndWaterRequirements(animal, req)
        )) &&
      (selectedCardSources.length === 0 ||
        selectedCardSources.some((src) => animal.source === src)) &&
      (textFilter === '' ||
        animal.id.toLowerCase().includes(lowercaseFilter) ||
        animal.name.toLowerCase().includes(lowercaseFilter) ||
        (animal.effects !== undefined &&
          animal.effects.some((effect) =>
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
