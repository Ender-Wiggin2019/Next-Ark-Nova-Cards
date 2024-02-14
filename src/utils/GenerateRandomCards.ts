import { MapBoards } from '@/data/MapBoards';
import { CardType } from '@/types/Card';
import { getCardIds } from '@/utils/GetAllCardIds';
import _ from 'lodash';

export const NUMBER_HAND = 8;
export const NUMBER_MAP = 2;
export const NUMBER_FINAL_SCORING = 2;
export const NUMBER_CONSERVATION = 3;

export function generateSetUpCards() {
  const ids = getCardIds(
    [CardType.ANIMAL_CARD, CardType.SPONSOR_CARD, CardType.CONSERVATION_CARD],
    undefined,
    'hand'
  );
  return _.sampleSize(ids, NUMBER_HAND);
}

export function generateSetUpConservations() {
  const ids = getCardIds([CardType.CONSERVATION_CARD], undefined, 'game');
  return _.sampleSize(ids, NUMBER_CONSERVATION);
}

export function generateSetUpMaps() {
  const ids = MapBoards.map((mapBoard) => mapBoard.id).filter(
    (id) => id !== 'm0' && id !== 'ma'
  );
  return _.sampleSize(ids, NUMBER_MAP);
}

export function generateSetUpFinalScoring() {
  const ids = getCardIds([CardType.END_GAME_CARD]);
  return _.sampleSize(ids, NUMBER_FINAL_SCORING);
}

export function generateSetUp() {
  return {
    cards: generateSetUpCards(),
    maps: generateSetUpMaps(),
    finalScoring: generateSetUpFinalScoring(),
    conservations: generateSetUpConservations(),
  };
}
