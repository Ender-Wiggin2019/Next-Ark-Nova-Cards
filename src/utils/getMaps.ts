import { AlternativeMapBoards } from '@/data/AlternativeMapBoards';
import { MapBoards } from '@/data/MapBoards';
import { CardSource } from '@/types/CardSource';
import { MapBoard } from '@/types/MapBoard';

export const getMaps = (cardSources: CardSource[]) => {
  const maps = [...MapBoards, ...AlternativeMapBoards];
  if (cardSources.length === 0) {
    return maps;
  }

  const filteredMaps: MapBoard[] = [];
  cardSources.forEach((src) =>
    filteredMaps.push(...maps.filter((map) => map.cardSource === src))
  );

  return filteredMaps;
};
