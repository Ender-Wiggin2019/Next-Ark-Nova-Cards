import React, { useEffect } from 'react';

import CardList from '@/components/cards/shared/CardList';

import { getAnimalCardModel } from '@/utils/GetAnimalCardModel';

import { AnimalCard } from './AnimalCard';
import { useAnimalData } from './useAnimalData';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';
import { CardSource } from '@/types/CardSource';
import { SortOrder } from '@/types/Order';
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
  sortOrder?: SortOrder;
  size?: number[];
  onCardCountChange: (count: number) => void;
  // ... any other filters
}

const filterAnimals = (
  animals: AnimalCardType[],
  selectedTags: Tag[] = [],
  selectedRequirements: Tag[] = [],
  selectedCardSources: CardSource[] = [],
  textFilter = '',
  size: number[] = [0]
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
          ))) &&
      (size.length === 0 || size.includes(0) || size.includes(animal.size))
  );
};

export const AnimalCardList: React.FC<AnimalCardListProps> = ({
  selectedTags,
  selectedRequirements,
  selectedCardSources = [],
  textFilter,
  onCardCountChange,
  sortOrder = SortOrder.ID_ASC,
  size = [0],
}) => {
  const animalsData = useAnimalData();
  const filteredAnimals = filterAnimals(
    animalsData,
    selectedTags,
    selectedRequirements,
    selectedCardSources,
    textFilter,
    size
  );

  // 排序逻辑
  switch (sortOrder) {
    case SortOrder.ID_ASC:
      filteredAnimals.sort((a, b) => a.id.localeCompare(b.id));
      break;
    case SortOrder.ID_DESC:
      filteredAnimals.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case SortOrder.DIFF_ASC:
      filteredAnimals.sort(
        (a, b) =>
          getAnimalCardModel(a).diffWithSpecialEnclosure -
          getAnimalCardModel(b).diffWithSpecialEnclosure
      );
      break;
    case SortOrder.DIFF_DESC:
      filteredAnimals.sort(
        (a, b) =>
          getAnimalCardModel(b).diffWithSpecialEnclosure -
          getAnimalCardModel(a).diffWithSpecialEnclosure
      );
      break;
  }

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
