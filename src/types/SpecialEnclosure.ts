import { z } from 'zod';

export enum SpecialEnclosureType {
  PettingZoo = 'Petting Zoo',
  LargeBirdAviary = 'Large Bird Aviary',
  ReptileHouse = 'Reptile House',
  Aquarium = 'Aquarium',
}

export class SpecialEnclosure {
  constructor(public type: SpecialEnclosureType, public size: number) {}

  toObject(): { type: SpecialEnclosureType; size: number } {
    return {
      type: this.type,
      size: this.size,
    };
  }

  static fromObject(data: {
    type: SpecialEnclosureType;
    size: number;
  }): SpecialEnclosure {
    return new SpecialEnclosure(data.type, data.size);
  }
}

export const SpecialEnclosureSchema = z.object({
  type: z.enum([
    SpecialEnclosureType.PettingZoo,
    SpecialEnclosureType.LargeBirdAviary,
    SpecialEnclosureType.ReptileHouse,
    SpecialEnclosureType.Aquarium,
  ]),
  size: z.number(),
});
