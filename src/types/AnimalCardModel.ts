import { Ability } from '@/types/KeyWords';

export type AbilityModel = {
  ability: Ability;
  value: number;
};
export interface AnimalCardModel {
  total: number;
  reputation: number;
  appeal: number;
  conservationPoint: number;
  abilities: AbilityModel[];
  cost: number;
  diff: number;
  costWithSpecialEnclosure: number;
  diffWithSpecialEnclosure: number;
}
