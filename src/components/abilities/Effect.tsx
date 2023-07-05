import classNames from 'classnames';
import React from 'react';

import ParseDescription from '@/components/abilities/ParseDescription';

import { Effect } from '@/types/Effect';

interface EffectProps {
  effect: Effect;
  style: 'full' | 'short' | 'icon';
}

const EffectComponent: React.FC<EffectProps> = ({ effect, style }) => {
  // const { t } = useTranslation();

  const effectClass = classNames(`effect-${effect.effectType.toLowerCase()}`, {
    [`text-${effect.fontSize}`]: effect.fontSize !== undefined,
  });
  return (
    <>
      <div className='dijitTooltipContainer'>
        <ul className='sponsor-effects-list'>
          <li className={effectClass}>
            <ParseDescription desc={effect} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default EffectComponent;
