import { useTranslation } from 'next-i18next';
import React from 'react';

import { ConfigBadge } from '@/components/quiz/game/ConfigBadge';

import { GameConfig } from '@/types/quiz';

export type Props = {
  gameConfig: GameConfig;
};
export const GameConfigCard: React.FC<Props> = ({ gameConfig }) => {
  const { t } = useTranslation('common');

  return (
    <div className='flex flex-col gap-2 bg-white/50 p-2 text-sm font-normal'>
      <div className='flex gap-2'>
        <div className=''>{t('Game Mode')}:</div>
        <div className=''>{gameConfig.mode}</div>
      </div>

      <div className='flex gap-2'>
        <div className=''>{t('Card Source')}:</div>
        <div className='flex gap-2'>
          {gameConfig.cardSources.map((src) => (
            <ConfigBadge key={src} source={src} />
          ))}
        </div>
      </div>

      <div className='flex gap-2'>
        <div className=''>{t('Map Source')}:</div>
        <div className='flex gap-2'>
          {gameConfig.mapSources.map((src) => (
            <ConfigBadge key={src} source={src} />
          ))}
        </div>
      </div>

      <div className='flex gap-2'>
        <div className=''>{t('Players')}:</div>
        <div className=''>{gameConfig.players}</div>
      </div>
    </div>
  );
};
