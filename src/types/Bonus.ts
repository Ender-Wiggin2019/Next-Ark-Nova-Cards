export enum BonusType {
  // Base Game
  CONSERVATION_POINT = 'Conservation Point',
  REPUTATION = 'Reputation',
}

export interface Bonus {
  bonusType: BonusType;
  bonusDesc: string;
  bonusValue: number;
}
