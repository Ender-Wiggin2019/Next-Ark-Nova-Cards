import seedrandom from 'seedrandom';

import { getCardIds } from '@/utils/GetAllCardIds';
import { getMaps } from '@/utils/getMaps';

import { ActionCardType } from '@/types/ActionCard';
import { CardType } from '@/types/Card';
import { DEFAULT_CONFIG, GameConfig, IPlayerData } from '@/types/IQuiz';
export const NUMBER_HAND = 8;
export const NUMBER_MAP = 2;
export const NUMBER_FINAL_SCORING = 2;
export const NUMBER_CONSERVATION = 3;
export const NUMBER_DISPLAY = 6;
interface SetUp {
  playersData: IPlayerData[];
  conservations: string[];
  display?: string[];
}

export class GameSetupGenerator {
  private seed: string;
  private gameConfig: GameConfig;

  constructor(seed: string, gameConfig: GameConfig) {
    this.seed = seed;
    this.gameConfig = { ...DEFAULT_CONFIG, ...gameConfig };
  }

  private shuffleArrayWithSeed(array: any[], seed: string = this.seed): any[] {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    const rng = seedrandom(seed);

    while (0 !== currentIndex) {
      randomIndex = Math.floor(rng() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  private sampleSizeWithSeed(
    array: any[],
    size: number,
    seed: string = this.seed
  ): any[] {
    return this.shuffleArrayWithSeed(array, seed).slice(0, size);
  }

  private distributeItemsToPlayers(
    items: string[],
    itemsPerPlayer: number
  ): string[][] {
    const distributedItems: string[][] = [];
    for (let i = 0; i < this.gameConfig.players; i++) {
      distributedItems.push(
        items.slice(i * itemsPerPlayer, (i + 1) * itemsPerPlayer)
      );
    }
    return distributedItems;
  }

  private distributeCards(
    items: string[],
    itemsPerPlayer: number
  ): { cards: string[][]; display: string[] } {
    const distributedItems: string[][] = [];
    for (let i = 0; i < this.gameConfig.players; i++) {
      distributedItems.push(
        items.slice(i * itemsPerPlayer, (i + 1) * itemsPerPlayer)
      );
    }
    return {
      cards: distributedItems,
      display: items.slice(this.gameConfig.players * itemsPerPlayer),
    };
  }

  private generateAndDistribute(array: any[], singleSize: number): string[][] {
    const num = this.gameConfig.players;
    if (this.gameConfig.mode === 'arena') {
      const ids = this.shuffleArrayWithSeed(array).slice(0, singleSize);
      return new Array(num).fill(0).map((_) => ids);
    }
    const ids = this.shuffleArrayWithSeed(array).slice(0, singleSize * num);

    return this.distributeItemsToPlayers(ids, singleSize);
  }

  private generateAndDistributeCards(
    array: any[],
    singleSize: number
  ): { cards: string[][]; display: string[] } {
    const num = this.gameConfig.players;
    const ids = this.shuffleArrayWithSeed(array).slice(
      0,
      singleSize * num + NUMBER_DISPLAY
    );

    return this.distributeCards(ids, singleSize);
  }

  private generateSetUp(): SetUp {
    const maps = this.generateSetUpMaps();
    const actionCards = this.generateActionCards();
    const finalScoring = this.generateSetUpFinalScoring();
    const { cards, display } = this.generateSetUpCards();

    const conservations = this.generateSetUpConservations();

    const mainPlayer = this.sampleSizeWithSeed(
      Array.from({ length: this.gameConfig.players }, (_, index) => index),
      this.gameConfig.players
    )[0];
    const playersData: IPlayerData[] = new Array(this.gameConfig.players)
      .fill(null)
      .map((_, index) => ({
        cards: cards[index],
        maps: maps[index],
        actionCards: actionCards[index],
        finalScoring: finalScoring[index],
        isMainPlayer: index === mainPlayer,
      }));

    return {
      playersData,
      conservations,
      display,
    };
  }

  public generateSetUpCards(): { cards: string[][]; display: string[] } {
    const ids = getCardIds(
      [CardType.ANIMAL_CARD, CardType.SPONSOR_CARD, CardType.CONSERVATION_CARD],
      this.gameConfig.cardSources,
      'hand'
    );
    return this.generateAndDistributeCards(ids, NUMBER_HAND);
  }

  public generateSetUpConservations(): string[] {
    const ids = getCardIds(
      [CardType.CONSERVATION_CARD],
      this.gameConfig.cardSources,
      'game'
    );
    return this.sampleSizeWithSeed(ids, NUMBER_CONSERVATION);
  }

  public generateSetUpMaps(): string[][] {
    const ids = getMaps(this.gameConfig.mapSources).map((map) => map.id);
    return this.generateAndDistribute(ids, NUMBER_MAP);
  }

  public generateSetUpFinalScoring(): string[][] {
    const ids = getCardIds(
      [CardType.END_GAME_CARD],
      this.gameConfig.cardSources
    );
    return this.generateAndDistribute(ids, NUMBER_FINAL_SCORING);
  }

  public generateActionCards(): ActionCardType[][] {
    const cards = [
      ActionCardType.CARDS,
      ActionCardType.SPONSORS,
      ActionCardType.ASSOCIATION,
      ActionCardType.BUILD,
    ];

    return new Array(this.gameConfig.players)
      .fill(0)
      .map((_, index) => [
        ActionCardType.ANIMAL,
        ...this.sampleSizeWithSeed(cards, 4, this.seed + index.toString()),
      ]);
  }

  // 公开方法，用于生成游戏设置
  public generateGameSetup(): SetUp {
    return this.generateSetUp();
  }
}
