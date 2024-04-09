import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';

import { EndGameData } from '@/data/EndGames';

import { RatedEndGameCard } from '@/components/cards/endgame_cards/RatedEndGameCard';
import CardList from '@/components/cards/shared/CardList';

import { fetchCardRatings } from '@/utils/fetch';

import { CardSource } from '@/types/CardSource';
import { EndGameCard, IEndGameCard } from '@/types/EndGameCard';
import { IRating } from '@/types/IRating';
import { SortOrder } from '@/types/Order';

interface EndGameCardListProps {
  selectedCardSources?: CardSource[];
  textFilter?: string;
  sortOrder?: SortOrder;
  onCardCountChange: (count: number) => void;
}

const filterCards = (
  cards: EndGameCard[],
  selectedCardSources: CardSource[] = [],
  textFilter = ''
) => {
  const lowercaseFilter = textFilter.toLowerCase();

  return cards.filter(
    (card) =>
      (selectedCardSources.length === 0 ||
        selectedCardSources.some((src) => card.source === src)) &&
      (textFilter === '' ||
        card.id.toLowerCase().includes(lowercaseFilter) ||
        card.name.toLowerCase().includes(lowercaseFilter))
  );
};

export const EndGameCardList: React.FC<EndGameCardListProps> = ({
  selectedCardSources = [],
  textFilter,
  onCardCountChange,
  sortOrder = SortOrder.ID_ASC,
}) => {
  const shouldFetchRatings = true;
  const { data: cardRatings } = useQuery(['cardRatings'], fetchCardRatings, {
    enabled: shouldFetchRatings,
    // staleTime: 60 * 1000,
  });
  const filteredEndGames = filterCards(
    EndGameData,
    selectedCardSources,
    textFilter
  );

  const combineDataWithRatings = (
    cards: EndGameCard[],
    ratings: IRating[]
  ): IEndGameCard[] => {
    return cards.map((card) => {
      const rating = ratings.find((r) => r.cardid === card.id);
      return {
        id: card.id,
        endGameCard: card,
        rating: rating ? rating._avg.rating : null,
        ratingCount: rating ? rating._count : null,
      };
    });
  };

  const initialEndGameCards: IEndGameCard[] = useMemo(() => {
    return filteredEndGames.map((card) => ({
      id: card.id,
      endGameCard: card,
      rating: null,
      ratingCount: null,
    }));
  }, [filteredEndGames]);

  const ratedEndGameCards: IEndGameCard[] = useMemo(() => {
    if (!cardRatings) {
      return initialEndGameCards;
    }
    return combineDataWithRatings(filteredEndGames, cardRatings);
  }, [filteredEndGames, cardRatings, initialEndGameCards]);

  useEffect(() => {
    onCardCountChange(filteredEndGames.length);
  }, [filteredEndGames, onCardCountChange]);

  switch (sortOrder) {
    case SortOrder.ID_ASC:
      ratedEndGameCards.sort((a, b) => a.id.localeCompare(b.id));
      break;
    case SortOrder.ID_DESC:
      ratedEndGameCards.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case SortOrder.RATING_DESC:
      ratedEndGameCards.sort((a, b) => {
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
      {ratedEndGameCards.map((ratedEndGameCard: IEndGameCard) => (
        <div
          key={ratedEndGameCard.id}
          className='-mb-8 -ml-6 scale-75 md:scale-100 lg:mb-2 lg:ml-8 xl:ml-0'
        >
          <RatedEndGameCard
            key={ratedEndGameCard.id}
            cardData={ratedEndGameCard}
            showLink={true}
          />
        </div>
      ))}
    </CardList>
  );
};
