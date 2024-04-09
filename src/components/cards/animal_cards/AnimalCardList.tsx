// import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';

import { RatedAnimalCard } from '@/components/cards/animal_cards/RatedAnimalCard';
import CardList from '@/components/cards/shared/CardList';

import { fetchCardRatings } from '@/utils/fetch';
import { getAnimalCardModel } from '@/utils/GetAnimalCardModel';

import { useAnimalData } from './useAnimalData';

import { AnimalCard } from '@/types/AnimalCard';
import { CardSource } from '@/types/CardSource';
import { IAnimalCard } from '@/types/IAnimalCard';
import { IRating } from '@/types/IRating';
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
  animals: AnimalCard[],
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
  // const { user } = useUser();
  // const userId = user?.id ?? '';
  const shouldFetchRatings = true;
  const {
    data: cardRatings,
    // isLoading,
    // isError,
    // error,
  } = useQuery(['cardRatings'], fetchCardRatings, {
    enabled: shouldFetchRatings,
    // staleTime: 60 * 1000,
  });

  // const {
  //   data: userCardRatings,
  // } = useQuery(['userCardRatings', userId], fetchUserCardRatings, {
  //   enabled: shouldFetchRatings,
  // });

  const animalsData = useAnimalData();
  const filteredAnimals = filterAnimals(
    animalsData,
    selectedTags,
    selectedRequirements,
    selectedCardSources,
    textFilter,
    size
  );

  const combineDataWithRatings = (
    animals: AnimalCard[],
    ratings: IRating[]
  ): IAnimalCard[] => {
    return animals.map((animal) => {
      const rating = ratings.find((r) => r.cardid === animal.id);
      return {
        id: animal.id,
        animalCard: animal,
        model: getAnimalCardModel(animal),
        rating: rating ? rating._avg.rating : null,
        ratingCount: rating ? rating._count : null,
      };
    });
  };

  const initialAnimalCards: IAnimalCard[] = useMemo(() => {
    return filteredAnimals.map((animal) => ({
      id: animal.id,
      animalCard: animal,
      model: getAnimalCardModel(animal),
      rating: null,
      ratingCount: null,
    }));
  }, [filteredAnimals]);

  const ratedAnimalCards: IAnimalCard[] = useMemo(() => {
    if (!cardRatings) {
      return initialAnimalCards;
    }
    return combineDataWithRatings(filteredAnimals, cardRatings);
  }, [filteredAnimals, cardRatings, initialAnimalCards]);

  useEffect(() => {
    onCardCountChange(filteredAnimals.length);
  }, [filteredAnimals, onCardCountChange]);

  switch (sortOrder) {
    case SortOrder.ID_ASC:
      ratedAnimalCards.sort((a, b) => a.id.localeCompare(b.id));
      break;
    case SortOrder.ID_DESC:
      ratedAnimalCards.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case SortOrder.DIFF_ASC:
      ratedAnimalCards.sort(
        (a, b) =>
          a.model.diffWithSpecialEnclosure - b.model.diffWithSpecialEnclosure
      );
      break;
    case SortOrder.DIFF_DESC:
      ratedAnimalCards.sort(
        (a, b) =>
          b.model.diffWithSpecialEnclosure - a.model.diffWithSpecialEnclosure
      );
      break;
    case SortOrder.RATING_DESC:
      ratedAnimalCards.sort((a, b) => {
        if ((b.rating ?? -1) !== (a.rating ?? -1)) {
          return (b.rating ?? -1) - (a.rating ?? -1);
        } else {
          return (b.ratingCount ?? -1) - (a.ratingCount ?? -1);
        }
      });
      break;
  }

  return (
    <CardList>
      {ratedAnimalCards.map((ratedAnimalCard: IAnimalCard) => (
        <div
          key={ratedAnimalCard.id}
          className='-mb-12 scale-75 sm:mb-1 sm:scale-90 md:mb-4 md:scale-100'
        >
          <RatedAnimalCard
            key={ratedAnimalCard.id}
            cardData={ratedAnimalCard}
            showLink={true}
          />
        </div>
      ))}
    </CardList>
  );
};

const hasRockAndWaterRequirements = (animal: AnimalCard, req: Tag) => {
  if (req === OtherTag.Rock) {
    return animal.rock && animal.rock > 0;
  } else if (req === OtherTag.Water) {
    return animal.water && animal.water > 0;
  } else {
    return false;
  }
};
