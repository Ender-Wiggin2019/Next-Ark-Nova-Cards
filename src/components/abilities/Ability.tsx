import { useTranslation } from 'next-i18next';
import React from 'react';

import { cn } from '@/lib/utils';

import ParseDescription from '@/components/abilities/ParseDescription';
import ReefDwellerIcon from '@/components/icons/abilities/ReefDwellerIcon';
import { IconFactory } from '@/components/icons/IconFactory';

import { Ability } from '@/types/KeyWords';

interface AbilityProps {
  ability: Ability;
  style: 'full' | 'short' | 'icon';
  isReefDweller?: boolean;
}

/**
 * Ability component
 * @param ability - the Ability instance
 * @param style - 'icon' for reef dweller icon, 'full' for full description with keyword and description
 * @param isReefDweller - true if the ability is reef dweller (shown on top right corner of animal card)
 */
const AbilityComponent: React.FC<AbilityProps> = ({
  ability,
  style,
  isReefDweller,
}) => {
  const { t } = useTranslation('common');
  const keyword = ability.keyword.name;
  const params = {
    value: ability.value.toString(),
  };
  if (style == 'icon') {
    return <IconFactory iconName={keyword} params={params} />;
  }

  // FIXME: it's a temporary solution, need to be refactored

  let keyWord = '';

  try {
    keyWord =
      ability.value.toString().length > 1
        ? t(ability.keyword.name) + ':' + t(ability.value.toString())
        : ability.value.toString().length === 1
        ? t(ability.keyword.name) + ' ' + t(ability.value.toString())
        : t(ability.keyword.name);
  } catch {
    keyWord =
      ability.value.toString().length > 1
        ? ability.keyword.name + ':' + ability.value.toString()
        : ability.value.toString().length === 1
        ? ability.keyword.name + ' ' + ability.value.toString()
        : ability.keyword.name;
  }
  return (
    <div
      className={cn({
        flex: isReefDweller !== undefined && isReefDweller,
      })}
    >
      {isReefDweller !== undefined && isReefDweller && (
        <div className='-ml-1 -mt-1'>
          <ReefDwellerIcon />
        </div>
      )}
      <div className='text-left'>
        <h6 className='animal-ability-title'>{keyWord}</h6>
        {style == 'full' && (
          <div className='animal-ability-desc'>
            <ParseDescription desc={ability} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AbilityComponent;
