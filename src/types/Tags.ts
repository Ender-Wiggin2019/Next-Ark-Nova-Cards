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
  Upgrade = 'upgrade',
  ANIMAL_SIZE_4 = 'ANIMAL-SIZE-4',
  ANIMAL_SIZE_2 = 'ANIMAL-SIZE-2',
  Rock = 'rock',
  Water = 'water',
  University = 'university',
  Kiosk = 'kiosk',
}

export type Tag = AnimalTag | ContinentTag | OtherTag;
