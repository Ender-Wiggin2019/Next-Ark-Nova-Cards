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
    <div className='flex flex-col gap-2 rounded-md border border-border/70 bg-gradient-to-br from-card/90 to-secondary/60 p-3 text-sm font-normal shadow-sm'>
      <div className='flex gap-2'>
        <div className='text-muted-foreground'>{t('Game Mode')}:</div>
        <div className='font-medium text-foreground'>{gameConfig.mode}</div>
      </div>

      <div className='flex gap-2'>
        <div className='text-muted-foreground'>{t('Card Source')}:</div>
        <div className='flex gap-2'>
          {gameConfig.cardSources.map((src) => (
            <ConfigBadge key={src} source={src} />
          ))}
        </div>
      </div>

      <div className='flex gap-2'>
        <div className='text-muted-foreground'>{t('Map Source')}:</div>
        <div className='flex gap-2'>
          {gameConfig.mapSources.map((src) => (
            <ConfigBadge key={src} source={src} />
          ))}
        </div>
      </div>

      <div className='flex gap-2'>
        <div className='text-muted-foreground'>{t('Players')}:</div>
        <div className='font-medium text-foreground'>{gameConfig.players}</div>
      </div>
    </div>
  );
};
