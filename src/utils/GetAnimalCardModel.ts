import { AnimalCard, getAnimalActualSize } from '@/types/AnimalCard';
import { AbilityModel, AnimalCardModel } from '@/types/AnimalCardModel';
import { KeyWord } from '@/types/KeyWords';

const getValueByKeyWord = (count: number, keyword: KeyWord): number => {
  if (keyword.model === undefined) return 0;
  else if (keyword.multiply === undefined || keyword.multiply) {
    return keyword.model * count;
  } else {
    return keyword.model;
  }
};

export const getAnimalCardModel = (animal: AnimalCard): AnimalCardModel => {
  const reputation = animal.reputation
    ? getValueByKeyWord(animal.reputation, KeyWord.REPUTATION)
    : 0;
  const appeal = animal.appeal
    ? getValueByKeyWord(animal.appeal, KeyWord.APPEAL)
    : 0;
  const conservationPoint = animal.conservationPoint
    ? getValueByKeyWord(animal.conservationPoint, KeyWord.CONSERVATION_POINT)
    : 0;
  const cost = animal.price + getAnimalActualSize(animal) * 2;

  const abilities = animal.abilities
    ? animal.abilities.map((ability) => {
        return {
          ability,
          value: getValueByKeyWord(ability.value as number, ability.keyword),
        } as AbilityModel;
      })
    : [];
  if (
    animal.reefDwellerEffect !== undefined &&
    animal.reefDwellerEffect.length > 0
  ) {
    const ability = animal.reefDwellerEffect[0];
    abilities.push({
      ability,
      value: getValueByKeyWord(ability.value as number, ability.keyword),
    });
  }
  const total =
    reputation +
    appeal +
    conservationPoint +
    abilities.reduce((acc, ability) => acc + ability.value, 0);
  const diff = total - cost;
  let costWithSpecialEnclosure = cost;
  let diffWithSpecialEnclosure = diff;
  if (animal.specialEnclosures && animal.specialEnclosures.length > 0) {
    // for now only take the first. Ignore the special cases
    costWithSpecialEnclosure =
      animal.specialEnclosures[0].size * 2 + animal.price;
    diffWithSpecialEnclosure = total - costWithSpecialEnclosure;
  }
  return {
    total,
    reputation,
    appeal,
    conservationPoint,
    abilities,
    cost,
    diff,
    costWithSpecialEnclosure,
    diffWithSpecialEnclosure,
  };
};
