export enum EffectType {
  // Base Game
  PASSIVE = 'passive',
  IMMEDIATE = 'immediate',
  INCOME = 'income',
  ENDGAME = 'endgame',
}

export interface Effect {
  effectType: EffectType;
  effectDesc: string;

  // front end logic
  display?: boolean;
  fontSize?: 'sm' | 'md' | 'lg';
}
