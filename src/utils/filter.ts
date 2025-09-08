import { AnimalCard } from '@/types/AnimalCard';
import { SponsorCard } from '@/types/SponsorCard';

/**
 * Filters animal cards based on text search criteria
 * @param textFilter - The text to search for
 * @param animals - Array of animal cards to filter
 * @param t - Translation function for i18n
 * @returns Filtered array of animal cards
 */
export const filterAnimalsByText = (
  textFilter: string,
  animals: AnimalCard[],
  t: (text: string) => string,
): AnimalCard[] => {
  const lowercaseFilter = textFilter.toLowerCase().trim();

  if (!lowercaseFilter) {
    return animals;
  }

  return animals.filter((animal) => {
    // Check basic fields with i18n
    if (
      animal.id.toLowerCase().includes(lowercaseFilter) ||
      t(animal.name).toLowerCase().includes(lowercaseFilter) ||
      (animal.latinName !== undefined &&
        animal.latinName.toLowerCase().includes(lowercaseFilter))
    ) {
      return true;
    }

    // Check abilities with i18n
    if (animal.abilities !== undefined) {
      return animal.abilities.some(
        (ability) =>
          t(ability.title).toLowerCase().includes(lowercaseFilter) ||
          t(ability.description).toLowerCase().includes(lowercaseFilter),
      );
    }

    return false;
  });
};

/**
 * Filters sponsor cards based on text search criteria
 * @param textFilter - The text to search for
 * @param sponsors - Array of sponsor cards to filter
 * @param t - Translation function for i18n
 * @returns Filtered array of sponsor cards
 */
export const filterSponsorsByText = (
  textFilter: string,
  sponsors: SponsorCard[],
  t: (text: string) => string,
): SponsorCard[] => {
  const lowercaseFilter = textFilter.toLowerCase().trim();

  if (!lowercaseFilter) {
    return sponsors;
  }

  return sponsors.filter((sponsor) => {
    // Check basic fields with i18n
    if (
      sponsor.id.toLowerCase().includes(lowercaseFilter) ||
      t(sponsor.name).toLowerCase().includes(lowercaseFilter)
    ) {
      return true;
    }

    // Check effects with i18n
    if (sponsor.effects !== undefined) {
      return sponsor.effects.some((effect) =>
        t(effect.effectDesc).toLowerCase().includes(lowercaseFilter),
      );
    }

    return false;
  });
};

/**
 * Generic text filter for any card type with basic fields
 * @param text - The text to search for
 * @param cards - Array of cards to filter
 * @param t - Translation function
 * @returns Filtered array of cards
 */
export const filterText = (
  text: string,
  cards: Array<{
    id: string;
    name: string;
    description?: string;
    flavorText?: string;
    effects?: unknown[];
  }>,
  t: (text: string) => string,
) => {
  const searchText = text.toLowerCase().trim();
  if (!searchText) return cards;

  return cards.filter(
    (card) =>
      card.id.toLowerCase().includes(searchText) ||
      t(card.name).toLowerCase().includes(searchText) ||
      card.description?.toLowerCase().includes(searchText) ||
      t(card.flavorText || '')
        ?.toLowerCase()
        .includes(searchText) ||
      effectsHasText(card.effects, searchText, t),
  );
};

/**
 * Checks if effects contain the search text
 * @param effects - Array of effects to search
 * @param text - Text to search for
 * @param t - Translation function
 * @returns True if effects contain the text
 */
const effectsHasText = (
  effects: unknown[] | undefined,
  text: string,
  t: (text: string) => string,
): boolean => {
  if (!effects) return false;

  const effectsStr = effects2String(effects, t).toLowerCase();
  return effectsStr.includes(text);
};

/**
 * Converts effects array to searchable string
 * @param effects - Effects to convert
 * @param t - Translation function
 * @returns String representation of effects
 */
const effects2String = (
  effects: unknown | unknown[],
  t: (text: string) => string,
): string => {
  if (Array.isArray(effects)) {
    const arr = effects.map((effect) => effect2String(effect, t));
    return arr.join(' ');
  } else {
    return effect2String(effects, t);
  }
};

/**
 * Converts single effect to searchable string
 * @param effect - Effect to convert
 * @param t - Translation function
 * @returns String representation of effect
 */
const effect2String = (
  effect: unknown,
  t: (text: string) => string,
): string => {
  const effectArray: string[] = [];

  // Type guard to check if effect has the expected structure
  if (typeof effect === 'object' && effect !== null) {
    const effectObj = effect as Record<string, unknown>;

    if (
      effectObj.effectType === 'BASE' ||
      effectObj.effectType === 'CUSTOMIZED'
    ) {
      effectArray.push((effectObj.type as string) || '');
      effectArray.push(t((effectObj.helperText as string) || ''));
      effectArray.push(t((effectObj.desc as string) || ''));
    } else if (
      effectObj.effectType === 'MISSION_QUICK' ||
      effectObj.effectType === 'MISSION_FULL'
    ) {
      const missions = effectObj.missions as unknown[];
      missions?.forEach((mission: unknown) => {
        const missionObj = mission as Record<string, unknown>;
        effectArray.push(effects2String(missionObj.req, t));
        effectArray.push(effects2String(missionObj.reward, t));
      });
      effectArray.push(t((effectObj.desc as string) || ''));
    } else if (effectObj.effectType === 'OR') {
      effectArray.push(effects2String(effectObj.effects, t));
    }
  }

  return effectArray.join(' ');
};
