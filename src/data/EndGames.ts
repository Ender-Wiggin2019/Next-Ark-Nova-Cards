import { CardSource } from '@/types/CardSource';
import { EffectType } from '@/types/Effect';
import { EndGameCard } from '@/types/EndGameCard';
import { IconName } from '@/types/IconName';

export const EndGameData: EndGameCard[] = [
  {
    id: '001',
    name: 'Large Animal Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc1',
    },
    topIcon: {
      iconName: IconName.SIZE,
      params: { value: '4', type: 'Animal' },
    },
    bottomIcon: {
      iconName: IconName.SIZE,
      params: { value: '4', type: 'Animal' },
    },
    scoreArray: [
      { requirement: 1, conservationPoint: 1 },
      { requirement: 2, conservationPoint: 2 },
      { requirement: 3, conservationPoint: 3 },
      { requirement: 4, conservationPoint: 4 },
    ],
    originalArray: [
      { requirement: 1, conservationPoint: 1 },
      { requirement: 2, conservationPoint: 2 },
      { requirement: 4, conservationPoint: 3 },
      { requirement: 5, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '002',
    name: 'Small Animal Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc2',
    },
    topIcon: {
      iconName: IconName.SIZE,
      params: { value: '2', type: 'Animal' },
    },
    bottomIcon: {
      iconName: IconName.SIZE,
      params: { value: '2', type: 'Animal' },
    },
    scoreArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 6, conservationPoint: 2 },
      { requirement: 8, conservationPoint: 3 },
      { requirement: 10, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '003',
    name: 'Research Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc3',
    },
    topIcon: {
      iconName: IconName.SCIENCE,
    },
    bottomIcon: {
      iconName: IconName.SCIENCE,
    },
    scoreArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 7, conservationPoint: 4 },
    ],
    originalArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 6, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '004',
    name: 'Architectural Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc4',
    },
    topIcon: {
      iconName: IconName.SIZE,
      params: { value: '', type: 'Empty' },
    },
    bottomIcon: {
      iconName: IconName.SIZE,
      params: { value: '', type: 'Empty' },
    },
    scoreArray: [
      { requirement: 'endgame.desc4-1', conservationPoint: 1 },
      { requirement: 'endgame.desc4-2', conservationPoint: 1 },
      { requirement: 'endgame.desc4-3', conservationPoint: 1 },
      { requirement: 'endgame.desc4-4', conservationPoint: 1 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '005',
    name: 'Conservation Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc5',
    },
    topIcon: {
      iconName: IconName.CONSERVATION_PROJECT,
    },
    bottomIcon: {
      iconName: IconName.CONSERVATION_PROJECT,
    },
    scoreArray: [
      { requirement: 2, conservationPoint: 1 },
      { requirement: 3, conservationPoint: 2 },
      { requirement: 4, conservationPoint: 3 },
      { requirement: 5, conservationPoint: 4 },
    ],
    originalArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 6, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '006',
    name: 'Naturalists Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc6',
    },
    topIcon: {
      iconName: IconName.EMPTY_ENCLOSURE,
    },
    bottomIcon: {
      iconName: IconName.EMPTY_ENCLOSURE,
    },
    scoreArray: [
      { requirement: 6, conservationPoint: 1 },
      { requirement: 12, conservationPoint: 2 },
      { requirement: 18, conservationPoint: 3 },
      { requirement: 24, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '007',
    name: 'Favorite Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc7',
    },
    topIcon: {
      iconName: IconName.REPUTATION,
    },
    bottomIcon: {
      iconName: IconName.REPUTATION,
    },
    scoreArray: [
      { requirement: 6, conservationPoint: 1 },
      { requirement: 9, conservationPoint: 2 },
      { requirement: 12, conservationPoint: 3 },
      { requirement: 15, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '008',
    name: 'Sponsored Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc8',
    },
    topIcon: {
      iconName: IconName.SPONSOR_CARD,
    },
    bottomIcon: {
      iconName: IconName.SPONSOR_CARD,
    },
    scoreArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 5, conservationPoint: 2 },
      { requirement: 7, conservationPoint: 3 },
      { requirement: 9, conservationPoint: 4 },
    ],
    originalArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 6, conservationPoint: 2 },
      { requirement: 8, conservationPoint: 3 },
      { requirement: 10, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '009',
    name: 'Diverse Species Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc9',
    },
    topIcon: {
      // iconName: IconName.ICONS_COMPARE_WITH_PLAYER, // TODO: to be same as physical card
      iconName: IconName.ANIMAL_CATEGORIES,
      params: { value: IconName.ANIMAL_CATEGORIES, type: 'Right' },
    },
    bottomIcon: {
      iconName: IconName.ANIMAL_CATEGORIES,
    },
    scoreArray: [{ requirement: 'endgame.desc9-1', conservationPoint: 1 }],
    source: CardSource.BASE,
  },
  {
    id: '010',
    name: 'Climbing Park',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc10',
    },
    topIcon: {
      iconName: IconName.ROCK,
    },
    bottomIcon: {
      iconName: IconName.ROCK,
    },
    scoreArray: [
      { requirement: 1, conservationPoint: 1 },
      { requirement: 3, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 6, conservationPoint: 4 },
    ],
    originalArray: [
      { requirement: 1, conservationPoint: 1 },
      { requirement: 3, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 7, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '011',
    name: 'Aquatic Park',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc11',
    },
    topIcon: {
      iconName: IconName.WATER,
    },
    bottomIcon: {
      iconName: IconName.WATER,
    },
    scoreArray: [
      { requirement: 2, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 6, conservationPoint: 3 },
      { requirement: 7, conservationPoint: 4 },
    ],
    originalArray: [
      { requirement: 2, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 6, conservationPoint: 3 },
      { requirement: 8, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
  {
    id: '012',
    name: 'Designer Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc12',
    },
    topIcon: {
      iconName: IconName.DIFFERENT_SHAPE,
    },
    bottomIcon: {
      iconName: IconName.DIFFERENT_SHAPE,
    },
    scoreArray: [
      { requirement: 4, conservationPoint: 1 },
      { requirement: 6, conservationPoint: 2 },
      { requirement: 7, conservationPoint: 3 },
      { requirement: 8, conservationPoint: 4 },
    ],
    source: CardSource.MARINE_WORLD,
  },
  {
    id: '013',
    name: 'Specialized Habitat Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc13',
    },
    topIcon: {
      iconName: IconName.ONE_CONTINENT_TAG,
    },
    bottomIcon: {
      iconName: IconName.ONE_CONTINENT_TAG,
    },
    scoreArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 6, conservationPoint: 4 },
    ],
    source: CardSource.MARINE_WORLD,
  },
  {
    id: '014',
    name: 'Specialized Species Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc14',
    },
    topIcon: {
      iconName: IconName.ONE_ANIMAL_TAG,
    },
    bottomIcon: {
      iconName: IconName.ONE_ANIMAL_TAG,
    },
    scoreArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 6, conservationPoint: 4 },
    ],
    source: CardSource.MARINE_WORLD,
  },
  {
    id: '015',
    name: 'Catered Picnic Areas',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc15',
    },
    topIcon: {
      iconName: IconName.KIOSK_PAVILION_PAIR,
    },
    bottomIcon: {
      iconName: IconName.KIOSK_PAVILION_PAIR,
    },
    scoreArray: [
      { requirement: 2, conservationPoint: 1 },
      { requirement: 3, conservationPoint: 2 },
      { requirement: 4, conservationPoint: 3 },
      { requirement: 5, conservationPoint: 4 },
    ],
    source: CardSource.MARINE_WORLD,
  },
  {
    id: '016',
    name: 'Accessible Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc16',
    },
    topIcon: {
      iconName: IconName.CONDITION,
    },
    bottomIcon: {
      iconName: IconName.CONDITION,
    },
    scoreArray: [
      { requirement: 4, conservationPoint: 1 },
      { requirement: 7, conservationPoint: 2 },
      { requirement: 10, conservationPoint: 3 },
      { requirement: 12, conservationPoint: 4 },
    ],
    source: CardSource.MARINE_WORLD,
  },
  {
    id: '017',
    name: 'International Zoo',
    image: '',
    description: {
      effectType: EffectType.ENDGAME,
      effectDesc: 'endgame.desc17',
    },
    topIcon: {
      // iconName: IconName.ICONS_COMPARE_WITH_PLAYER, // TODO: to be same as physical card
      iconName: IconName.CONTINENT_CATEGORIES,
      params: { value: IconName.CONTINENT_CATEGORIES, type: 'Right' },
    },
    bottomIcon: {
      iconName: IconName.CONTINENT_CATEGORIES,
    },
    scoreArray: [{ requirement: 'endgame.desc17-1', conservationPoint: 1 }],
    source: CardSource.MARINE_WORLD,
  },
];
