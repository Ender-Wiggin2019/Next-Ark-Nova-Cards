import { z } from 'zod';

export enum EndangeredCategory {
  ENDANGERED = 'Endangered',
  VULNERABLE = 'Vulnerable',
  NEAR_THREATENED = 'Near Threatened',
  CRITICALLY_ENDANGERED = 'Critically Endangered',
}

export const EndangeredCategorySchema = z.enum([
  EndangeredCategory.ENDANGERED,
  EndangeredCategory.VULNERABLE,
  EndangeredCategory.NEAR_THREATENED,
  EndangeredCategory.CRITICALLY_ENDANGERED,
]);
