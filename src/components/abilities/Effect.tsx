import React from 'react';

import { cn } from '@/lib/utils';

import ParseDescription from '@/components/abilities/ParseDescription';

import { Effect } from '@/types/Effect';

interface EffectProps {
  effect: Effect;
  style: 'full' | 'short' | 'icon';
}

const EffectComponent: React.FC<EffectProps> = ({ effect, style }) => {
  // const { t } = useTranslation();

  const effectClass = cn(`effect-${effect.effectType.toLowerCase()}`, {
    [`text-${effect.fontSize}`]: effect.fontSize !== undefined,
  });

  const startClass = effect.start !== undefined ? 'ml-' + effect.start : '';
  const endClass = effect.end !== undefined ? 'w-' + effect.end : '';
  return (
    <>
      <div className={cn('dijitTooltipContainer', startClass, endClass)}>
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
