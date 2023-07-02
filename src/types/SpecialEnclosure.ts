export enum SpecialEnclosureType {
  PettingZoo = 'Petting Zoo',
  LargeBirdAviary = 'Large Bird Aviary',
  ReptileHouse = 'Reptile House',
  Aquarium = 'Aquarium',
}
export class SpecialEnclosure {
  constructor(public type: SpecialEnclosureType, public size: number) {}
}
