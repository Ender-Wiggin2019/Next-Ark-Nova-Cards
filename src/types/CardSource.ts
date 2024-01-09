import { z } from 'zod';

export enum CardSource {
  BASE = 'Base',
  MARINE_WORLD = 'Marine World',
  PROMO = 'Promo',
  FAN_MADE = 'Fan Made',
}

export const CardSourceSchema = z.enum([
  CardSource.BASE,
  CardSource.MARINE_WORLD,
  CardSource.PROMO,
  CardSource.FAN_MADE,
]);
