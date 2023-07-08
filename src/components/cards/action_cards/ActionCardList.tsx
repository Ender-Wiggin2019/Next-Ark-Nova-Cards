import React from 'react';

import CardList from '@/components/cards/shared/CardList';

import { useAnimalData } from './useAnimalData';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';
import { OtherTag, Tag } from '@/types/Tags';

interface AnimalCardListProps {
  selectedTags?: Tag[];
  selectedRequirements?: Tag[];
  textFilter?: string;
  // ... any other filters
}

const hasRockAndWaterRequirements = (animal: AnimalCardType, req: Tag) => {
  if (req === OtherTag.Rock) {
    return animal.rock && animal.rock > 0;
  } else if (req === OtherTag.Water) {
    return animal.water && animal.water > 0;
  } else {
    return false;
  }
};
const filterAnimals = (
  animals: AnimalCardType[],
  selectedTags: Tag[] = [],
  selectedRequirements: Tag[] = [],
  textFilter = ''
) => {
  const lowercaseFilter = textFilter.toLowerCase();

  return animals.filter(
    (animal) =>
      (selectedTags.length === 0 ||
        selectedTags.some((tag) => animal.tags.includes(tag))) &&
      (selectedRequirements.length === 0 ||
        selectedRequirements.some(
          (req) =>
            (animal.requirements && animal.requirements.includes(req)) ||
            hasRockAndWaterRequirements(animal, req)
        )) &&
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

export const ActionCardList: React.FC<AnimalCardListProps> = ({
  selectedTags,
  selectedRequirements,
  textFilter,
}) => {
  const animalsData = useAnimalData();
  const filteredAnimals = filterAnimals(
    animalsData,
    selectedTags,
    selectedRequirements,
    textFilter
  );

  return (
    <CardList>
      {filteredAnimals.map((animal: AnimalCardType) => (
        <div key={animal.id} className='scale-150 pb-48'>
          {/*<ActionCard key={animal.id} animal={animal} />*/}
        </div>
      ))}
    </CardList>
  );
};
