import { z } from 'zod';

import { CardSource, CardSourceSchema } from '@/types/CardSource';
import {
  EndangeredCategory,
  EndangeredCategorySchema,
} from '@/types/EndangeredCategory';
import { Ability } from '@/types/KeyWords';
import {
  SpecialEnclosure,
  SpecialEnclosureSchema,
  SpecialEnclosureType,
} from '@/types/SpecialEnclosure';
import { Tag, TagSchema } from '@/types/Tags';

export interface AnimalCard {
  id: string;
  name: string;
  latinName?: string;
  endangeredCategory?: EndangeredCategory;
  image?: string;

  // upper
  size: number; // Size;
  rock?: number;
  water?: number;
  price: number;
  requirements?: Tag[];
  tags: Tag[];
  canBeInStandardEnclosure?: boolean;
  specialEnclosures?: SpecialEnclosure[];

  // middle
  abilities?: Ability[];
  description?: string;
  reefDwellerEffect?: Ability[];
  soloEffect?: Ability[];
  wave?: boolean;

  // bottom
  reputation?: number;
  appeal?: number;
  conservationPoint?: number;

  // meta data
  source: CardSource;
}

/**
 * Check if the animal is a sea animal
 * @param animal interface AnimalCard
 * @returns return the size of sea animal. if not a sea animal, return -1
 */
export function isSeaAnimal(animal: AnimalCard): number {
  // FIXME: why specialEnclosures is a class? should change to interface
  if (animal.specialEnclosures) {
    for (const specialEnclosure of animal.specialEnclosures) {
      if (specialEnclosure.type === SpecialEnclosureType.Aquarium) {
        return specialEnclosure.size;
      }
    }
  }
  return -1;
}

export function getAnimalActualSize(animal: AnimalCard): number {
  const seaAnimalSize = isSeaAnimal(animal);
  return seaAnimalSize != -1 ? seaAnimalSize : animal.size;
}

// Keyword schema
const KeyWordSchema = z.object({
  name: z.string(),
  descriptionTemplate: z.string(),
  model: z.optional(z.number()),
  multiply: z.optional(z.boolean()),
});

// Ability schema
const AbilitySchema = z.object({
  keyword: KeyWordSchema,
  value: z.union([z.string(), z.number()]),
});

// SpecialEnclosure schema

// Assuming you already have zod schemas for EndangeredCategory, Tag, and CardSource.
// For example:
// const EndangeredCategorySchema = z.enum([...]);
// const TagSchema = z.enum([...]);
// const CardSourceSchema = z.enum([...]);

// AnimalCard schema
export const AnimalCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  latinName: z.optional(z.string()),
  endangeredCategory: z.optional(EndangeredCategorySchema),
  image: z.optional(z.string()),

  size: z.number(),
  rock: z.optional(z.number()),
  water: z.optional(z.number()),
  price: z.number(),
  requirements: z.optional(
    z.array(TagSchema).max(3, 'Only support 3 requirements')
  ),
  tags: z.array(TagSchema),
  canBeInStandardEnclosure: z.optional(z.boolean()),
  specialEnclosures: z.optional(
    z.array(SpecialEnclosureSchema).max(2, 'Only support 2 special enclosures')
  ),

  abilities: z.optional(z.array(AbilitySchema)),
  description: z.optional(z.string()),
  reefDwellerEffect: z.optional(z.array(AbilitySchema)),
  soloEffect: z.optional(z.array(AbilitySchema)),
  wave: z.optional(z.boolean()),

  reputation: z.optional(z.number()),
  appeal: z.optional(z.number()),
  conservationPoint: z.optional(z.number()),

  source: CardSourceSchema,
});

// Now, you can use AnimalCardSchema to validate any AnimalCard object:
// const validatedAnimalCard = AnimalCardSchema.parse(animalCardObj);

export type AnimalCardSchemaDto = z.infer<typeof AnimalCardSchema>;
