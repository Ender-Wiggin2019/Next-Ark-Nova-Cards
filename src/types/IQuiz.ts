import { ActionCardType } from '@/types/ActionCard';
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

export const BASE_CONFIG: GameConfig = {
  cardSources: [CardSource.BASE],
  mapSources: [CardSource.BASE],
  mode: DEFAULT_MODE,
  players: DEFAULT_PLAYER,
};

export const BGA_CONFIG: GameConfig = {
  cardSources: [CardSource.BASE, CardSource.PROMO],
  mapSources: [CardSource.ALTERNATIVE, CardSource.PROMO],
  mode: 'arena',
  players: DEFAULT_PLAYER,
};

export interface IPlayerData {
  cards: string[];
  maps: string[];
  actionCards: ActionCardType[];
  finalScoring: string[];
  isMainPlayer: boolean;
}

export type IQuizComment = {
  id: string;
  createdat: string;
  updatedat: string;
  userid: string;
  content: string;
  cards: string[];
  userinfo: {
    username: string;
    imageUrl: string;
  };
};
