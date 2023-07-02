import { useTranslation } from 'next-i18next';
import React from 'react';

import ParseDescription from '@/components/abilities/ParseDescription';

import { Ability } from '@/types/KeyWords';

interface AbilityProps {
  ability: Ability;
  style: 'full' | 'short' | 'icon';
}

const AbilityComponent: React.FC<AbilityProps> = ({ ability, style }) => {
  // const { t } = useTranslation();
  return (
    <>
      <h6 className='animal-ability-title'>{ability.title}</h6>
      {style == 'full' && (
        <div className='animal-ability-desc sf-hidden'>
          <ParseDescription ability={ability} />
        </div>
      )}
    </>
  );
};

export default AbilityComponent;
