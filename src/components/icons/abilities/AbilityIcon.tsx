import React from 'react';

import { KeyWord } from '@/types/KeyWords';

type Props = {
  keyWord: KeyWord;
  value?: string;
};
const AbilityIcon: React.FC<Props> = ({ keyWord, value = '' }) => {
  const keyWordClass =
    keyWord === KeyWord.POUCH
      ? 'pouch'
      : keyWord === KeyWord.PERCEPTION_2 || keyWord === KeyWord.PERCEPTION_4
      ? 'perception'
      : keyWord === KeyWord.SUN_BATHING
      ? 'sunbathing'
      : keyWord === KeyWord.SHARK_ATTACK
      ? 'shark-attack'
      : keyWord === KeyWord.HUNTER
      ? 'hunter'
      : keyWord === KeyWord.DIGGING
      ? 'digging'
      : null;

  return (
    <div className='icon-container'>
      <div className={`arknova-icon scale-90 icon-${keyWordClass}`}>
        {value}
      </div>
    </div>
  );
};

export default AbilityIcon;
