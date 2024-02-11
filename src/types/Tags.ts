import { z } from 'zod';

export enum AnimalTag {
  // Base Game
  Bird = 'bird',
  Predator = 'predator',
  Reptile = 'reptile',
  Herbivore = 'herbivore',
  Primate = 'primate',
  Pet = 'pet',
  Bear = 'bear',
  // Marine World
  SeaAnimal = 'seaAnimal',
}

export enum ContinentTag {
  Asia = 'asia',
  Europe = 'europe',
  Africa = 'africa',
  Americas = 'americas',
  Australia = 'australia',
}

export enum OtherTag {
  Science = 'science',
  AnimalsI = 'animalsI',
  AnimalsII = 'animalsII',
  BuildI = 'buildI',
  BuildII = 'buildII',
  CardsI = 'cardsI',
  CardsII = 'cardsII',
  SponsorsI = 'sponsorsI',
  SponsorsII = 'sponsorsII',
  WorkerI = 'workerI',
  WorkerII = 'workerII',
  Appeal = 'appeal',
  Partner_Zoo = 'Partner Zoo',
  Reputation = 'reputation',
  Reputation_3 = 'reputation_3',
  Upgrade = 'upgrade',
  ANIMAL_SIZE_4 = 'animal-size-4',
  ANIMAL_SIZE_2 = 'animal-size-2',
  Rock = 'rock',
  Water = 'water',
  University = 'university',
  Kiosk = 'kiosk',
  ALL_ANIMALS = 'all-animals',
  ALL_CONTINENTS = 'all-continents',
}

export function isAnimalTag(tag: string): boolean {
  return Object.values(AnimalTag).includes(tag as AnimalTag);
}

export function isContinentTag(tag: string): boolean {
  return Object.values(ContinentTag).includes(tag as ContinentTag);
}

export function isOtherTag(tag: string): boolean {
  return Object.values(OtherTag).includes(tag as OtherTag);
}

export function getTag(tagName: string) {
  tagName = tagName.toLowerCase();
  switch (true) {
    case isOtherTag(tagName):
      return tagName as keyof typeof OtherTag as OtherTag;
    case isAnimalTag(tagName):
      return tagName as keyof typeof OtherTag as AnimalTag;
    case isContinentTag(tagName):
      return tagName as keyof typeof OtherTag as ContinentTag;
    default:
      return null;
  }
}

const animalTagValues = Object.values(AnimalTag);
const continentTagValues = Object.values(ContinentTag);
export const otherCardTags: OtherTag[] = [OtherTag.Science];
export const otherTagRequirements: OtherTag[] = [
  OtherTag.Science,
  OtherTag.AnimalsII,
  OtherTag.SponsorsII,
  OtherTag.Appeal,
  OtherTag.Partner_Zoo,
  OtherTag.Reputation,
  OtherTag.Rock,
  OtherTag.Water,
  OtherTag.University,
];
export const allCardTags = [
  ...animalTagValues,
  ...continentTagValues,
  ...otherCardTags,
];
export const allRequirements = [
  ...animalTagValues,
  ...continentTagValues,
  ...otherTagRequirements,
];

// Defining the schemas for individual enums
const AnimalTagSchema = z.nativeEnum(AnimalTag);
const ContinentTagSchema = z.nativeEnum(ContinentTag);
const OtherTagSchema = z.nativeEnum(OtherTag);

// Combining them for the Tag type
export const TagSchema =
  AnimalTagSchema.or(ContinentTagSchema).or(OtherTagSchema);

export type Tag = AnimalTag | ContinentTag | OtherTag;
