export class Size {
  constructor(public size: number) {}

  isLargeAnimal(): boolean {
    return this.size >= 4;
  }

  isSmallAnimal(): boolean {
    return this.size <= 2;
  }
}
