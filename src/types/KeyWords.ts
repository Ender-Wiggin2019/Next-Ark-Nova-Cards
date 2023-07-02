export class KeyWord {
  static CLEVER = new KeyWord('Clever', 'draw {} cards');
  static SUN_BATHING = new KeyWord('Sun Bathing', 'gain {} health');
  static POUCH = new KeyWord('Pouch', 'gain {} health');
  static PERCEPTION = new KeyWord('Perception', 'gain {} health');
  static HUNTER = new KeyWord('Hunter', 'gain {} health');
  static MARK = new KeyWord(
    'Mark',
    'After finishing this action, mark {} Animal card in the display {TakeCardInRange}'
  );

  constructor(public name: string, public descriptionTemplate: string) {}
}

export class Ability {
  constructor(public keyword: KeyWord, public value: string | number) {}

  get title(): string {
    return `${this.keyword.name} ${this.value}`;
  }

  get description(): string {
    return this.keyword.descriptionTemplate.replace('{}', String(this.value));
  }
}
