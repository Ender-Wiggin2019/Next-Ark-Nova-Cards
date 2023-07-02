import { AnimalCard } from '@/types/AnimalCard';
import { Ability, KeyWord } from '@/types/KeyWords';
import {
  SpecialEnclosure,
  SpecialEnclosureType,
} from '@/types/SpecialEnclosure';
import { AnimalTag, OtherTag } from '@/types/Tags';
// import {Size} from "@/types/Size";

export const AnimalsData: AnimalCard[] = [
  {
    id: '405',
    name: 'FennecFox',
    latinName: 'Heteractis magnifica',
    image: 'path/to/lion.jpg',
    size: 5,
    rock: 1,
    water: 1,
    price: 20,
    requirements: [OtherTag.AnimalsII, OtherTag.Science],
    tags: [AnimalTag.Bear, AnimalTag.Bird],
    specialEnclosures: [
      new SpecialEnclosure(SpecialEnclosureType.LargeBirdAviary, 3),
    ],
    abilities: [new Ability(KeyWord.MARK, 1)],
    description: '',
    reefDwellerEffect: [new Ability(KeyWord.MARK, 1)],
    soloEffect: [],
    reputation: 4,
    appeal: 3,
    conservationPoints: 10,
    source: 'MarineWorld',
  },
];
