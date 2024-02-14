import React from 'react';

import { cardNames } from '@/data/CardNames'; // Assuming the json file is named animalData.json

interface SponsorCardWrapperProps {
  id: string;
  children: React.ReactNode;
}

const SponsorCardWrapper: React.FC<SponsorCardWrapperProps> = ({
  id,
  children,
}) => {
  const sponsorName = cardNames[id];

  return (
    <div
      id={`card-${sponsorName}`}
      data-id={sponsorName}
      className='ark-card zoo-card sponsor-card tooltipable'
    >
      <div className='ark-card-wrapper'>{children}</div>
    </div>
  );
};

export default SponsorCardWrapper;
