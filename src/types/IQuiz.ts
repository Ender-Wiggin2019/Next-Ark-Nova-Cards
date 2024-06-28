import { CardSource } from '@/types/CardSource';

export type GameMode = 'default' | 'arena';
export interface GameConfig {
  cardSources: CardSource[];
  mapSources: CardSource[];
  mode: GameMode;
  players: number;
}
export const DEFAULT_CARD_SOURCES: CardSource[] = [
  CardSource.BASE,
  CardSource.MARINE_WORLD,
  CardSource.PROMO,
];
export const DEFAULT_MAP_SOURCES: CardSource[] = [
  CardSource.BASE,
  CardSource.ALTERNATIVE,
  CardSource.PROMO,
];
export const DEFAULT_MODE: GameMode = 'default';
export const DEFAULT_PLAYER = 2;

export const DEFAULT_CONFIG: GameConfig = {
  cardSources: DEFAULT_CARD_SOURCES,
  mapSources: DEFAULT_MAP_SOURCES,
  mode: DEFAULT_MODE,
  players: DEFAULT_PLAYER,
};

export interface IPlayerData {
  cards: string[];
  maps: string[];
  actionCards: string[];
  finalScoring: string[];
  isMainPlayer: boolean;
}
