import { MapBoards } from '@/data/MapBoards';
import { CardType } from '@/types/Card';
import { CardSource } from '@/types/CardSource';
import { getCardIds } from '@/utils/GetAllCardIds';
import _ from 'lodash';

export const NUMBER_HAND = 8;
export const NUMBER_MAP = 2;
export const NUMBER_FINAL_SCORING = 2;
export const NUMBER_CONSERVATION = 3;

export function generateSetUpCards(
  cardSources: CardSource[] = [
    CardSource.BASE,
    CardSource.MARINE_WORLD,
    CardSource.PROMO,
  ]
) {
  const ids = getCardIds(
    [CardType.ANIMAL_CARD, CardType.SPONSOR_CARD, CardType.CONSERVATION_CARD],
    cardSources,
    'hand'
  );
  return _.sampleSize(ids, NUMBER_HAND);
}

export function generateSetUpConservations(
  cardSources: CardSource[] = [
    CardSource.BASE,
    CardSource.MARINE_WORLD,
    CardSource.PROMO,
  ]
) {
  const ids = getCardIds([CardType.CONSERVATION_CARD], cardSources, 'game');
  return _.sampleSize(ids, NUMBER_CONSERVATION);
}

export function generateSetUpMaps() {
  const ids = MapBoards.map((mapBoard) => mapBoard.id).filter(
    (id) => id !== 'm0' && id !== 'ma'
  );
  return _.sampleSize(ids, NUMBER_MAP);
}

export function generateSetUpFinalScoring(
  cardSources: CardSource[] = [
    CardSource.BASE,
    CardSource.MARINE_WORLD,
    CardSource.PROMO,
  ]
) {
  const ids = getCardIds([CardType.END_GAME_CARD], cardSources);
  return _.sampleSize(ids, NUMBER_FINAL_SCORING);
}

export function generateActionCards() {
  const cards = ['CARDS', 'SPONSORS', 'ASSOCIATION', 'BUILD'];
  const res = _.sampleSize(cards, 4);
  return ['ANIMAL', ...res];
}

export function generateSetUp(
  cardSources: CardSource[] = [
    CardSource.BASE,
    CardSource.MARINE_WORLD,
    CardSource.PROMO,
  ]
) {
  return {
    cards: generateSetUpCards(cardSources),
    maps: generateSetUpMaps(),
    finalScoring: generateSetUpFinalScoring(cardSources),
    conservations: generateSetUpConservations(cardSources),
    action_cards: generateActionCards(),
    oppo_action_cards: generateActionCards(),
    position: _.sample([0, 1]),
  };
}
