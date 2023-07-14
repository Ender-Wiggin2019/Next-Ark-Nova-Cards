import React, { useEffect } from 'react';

import CardList from '@/components/cards/shared/CardList';

import { AnimalCard } from './AnimalCard';
import { useAnimalData } from './useAnimalData';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';
import { CardSource } from '@/types/CardSource';
import {
  isAnimalTag,
  isContinentTag,
  isOtherTag,
  OtherTag,
  Tag,
} from '@/types/Tags';

interface AnimalCardListProps {
  selectedTags?: Tag[];
  selectedRequirements?: Tag[];
  selectedCardSources?: CardSource[];
  textFilter?: string;
  onCardCountChange: (count: number) => void;
  // ... any other filters
}

const filterAnimals = (
  animals: AnimalCardType[],
  selectedTags: Tag[] = [],
  selectedRequirements: Tag[] = [],
  selectedCardSources: CardSource[] = [],
  textFilter = ''
) => {
  const lowercaseFilter = textFilter.toLowerCase();

  return animals.filter(
    (animal) =>
      (selectedTags.filter(isAnimalTag).length === 0 ||
        selectedTags
          .filter(isAnimalTag)
          .some((tag) => animal.tags.includes(tag))) &&
      (selectedTags.filter(isContinentTag).length === 0 ||
        selectedTags
          .filter(isContinentTag)
          .some((tag) => animal.tags.includes(tag))) &&
      (selectedTags.filter(isOtherTag).length === 0 ||
        selectedTags
          .filter(isOtherTag)
          .some((tag) => animal.tags.includes(tag))) &&
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
        (animal.latinName !== undefined &&
          animal.latinName.toLowerCase().includes(lowercaseFilter)) ||
        (animal.abilities !== undefined &&
          animal.abilities.some(
            (ability) =>
              ability.title.toLowerCase().includes(lowercaseFilter) ||
              ability.description.toLowerCase().includes(lowercaseFilter)
          )))
  );
};

export const AnimalCardList: React.FC<AnimalCardListProps> = ({
  selectedTags,
  selectedRequirements,
  selectedCardSources = [],
  textFilter,
  onCardCountChange,
}) => {
  const animalsData = useAnimalData();
  const filteredAnimals = filterAnimals(
    animalsData,
    selectedTags,
    selectedRequirements,
    selectedCardSources,
    textFilter
  );

  useEffect(() => {
    onCardCountChange(filteredAnimals.length);
  }, [filteredAnimals, onCardCountChange]);

  return (
    <CardList>
      {filteredAnimals.map((animal: AnimalCardType) => (
        <div key={animal.id} className='scale-110 pb-10 md:scale-150 md:pb-36'>
          <AnimalCard key={animal.id} animal={animal} />
        </div>
      ))}
    </CardList>
  );
};

const hasRockAndWaterRequirements = (animal: AnimalCardType, req: Tag) => {
  if (req === OtherTag.Rock) {
    return animal.rock && animal.rock > 0;
  } else if (req === OtherTag.Water) {
    return animal.water && animal.water > 0;
  } else {
    return false;
  }
};
