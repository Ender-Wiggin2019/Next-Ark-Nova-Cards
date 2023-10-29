import React from 'react';

import { IconName } from '@/types/IconName';

type Props = {
  iconName: IconName;
  value?: string;
};
const AbilityIcon: React.FC<Props> = ({ iconName, value = '' }) => {
  const iconNameClass =
    iconName === IconName.POUCH
      ? 'pouch'
      : iconName === IconName.PERCEPTION_2 || iconName === IconName.PERCEPTION_4
      ? 'perception'
      : iconName === IconName.SUN_BATHING
      ? 'sunbathing'
      : iconName === IconName.SHARK_ATTACK
      ? 'shark-attack'
      : iconName === IconName.HUNTER
      ? 'hunter'
      : iconName === IconName.DIGGING
      ? 'digging'
      : null;

  const valueClass =
    iconName === IconName.POUCH
      ? 'pouch'
      : iconName === IconName.PERCEPTION_2 || iconName === IconName.PERCEPTION_4
      ? 'perception'
      : iconName === IconName.SUN_BATHING
      ? 'sunbathing'
      : iconName === IconName.SHARK_ATTACK
      ? 'text-white pl-1 pb-1 text-xs'
      : iconName === IconName.HUNTER
      ? 'hunter'
      : iconName === IconName.DIGGING
      ? 'text-white pl-2 pb-1 text-xs'
      : '';

  return (
    <div className='icon-container'>
      <div className={`arknova-icon scale-90 icon-${iconNameClass}`}>
        <div className={valueClass}>{value}</div>
      </div>
    </div>
  );
};

export default AbilityIcon;
