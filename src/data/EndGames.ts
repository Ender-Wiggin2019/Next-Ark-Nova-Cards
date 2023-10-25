import { EndGameCard } from '@/types/EndGameCard';
import { IconName } from '@/types/IconName';
import { CardSource } from '@/types/CardSource';
import { EffectType } from '@/types/Effect';

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
      iconName: IconName.SIZE,
      params: { value: '2', type: 'Animal' },
    },
    bottomIcon: {
      iconName: IconName.SIZE,
      params: { value: '2', type: 'Animal' },
    },
    scoreArray: [
      { requirement: 3, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 7, conservationPoint: 4 },
    ],
    source: CardSource.BASE,
  },
];
