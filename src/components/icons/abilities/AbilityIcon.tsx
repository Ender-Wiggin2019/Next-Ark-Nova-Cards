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

  const valueClass =
    keyWord === KeyWord.POUCH
      ? 'pouch'
      : keyWord === KeyWord.PERCEPTION_2 || keyWord === KeyWord.PERCEPTION_4
      ? 'perception'
      : keyWord === KeyWord.SUN_BATHING
      ? 'sunbathing'
      : keyWord === KeyWord.SHARK_ATTACK
      ? 'text-white pl-1 pb-1 text-xs'
      : keyWord === KeyWord.HUNTER
      ? 'hunter'
      : keyWord === KeyWord.DIGGING
      ? 'text-white pl-2 pb-1 text-xs'
      : '';

  return (
    <div className='icon-container'>
      <div className={`arknova-icon scale-90 icon-${keyWordClass}`}>
        <div className={valueClass}>{value}</div>
      </div>
    </div>
  );
};

export default AbilityIcon;
