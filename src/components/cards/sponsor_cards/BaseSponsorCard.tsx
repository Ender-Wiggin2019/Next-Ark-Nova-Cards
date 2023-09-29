import { useTranslation } from 'next-i18next';
import React from 'react';

import { cn } from '@/lib/utils';

import Effect from '@/components/abilities/Effect';
import SponsorCardWrapper from '@/components/wrapper/SponsorWrapper';

import { SponsorCard as SponsorCardType } from '@/types/SponsorCard';

interface AnimalCardProps {
  sponsor: SponsorCardType;
}

export const BaseSponsorCard: React.FC<AnimalCardProps> = ({ sponsor }) => {
  const { t } = useTranslation('common');

  return (
    <SponsorCardWrapper id={sponsor.id}>
      <div className='ark-card-top'>
        <div className='ark-card-top-left sf-hidden'></div>
        <div className='ark-card-top-right'></div>
      </div>
      <div className='ark-card-middle'>
        <div className='ark-card-number sf-hidden'>{sponsor.id}</div>
        <div className='ark-card-title-wrapper'>
          <div
            className={cn('ark-card-title', {
              'scale-75 text-sm': t(sponsor.name).length > 27,
            })}
          >
            {t(sponsor.name)}
          </div>
        </div>
      </div>
      {sponsor.effects && (
        <div className='ark-card-bottom text-start'>
          {sponsor.effects.map((effect, index) => {
            if (effect.display === undefined || effect.display) {
              return <Effect key={index} effect={effect} style='full' />;
            } else {
              return null;
            }
          })}
        </div>
      )}
    </SponsorCardWrapper>
  );
};
