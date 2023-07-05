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
    // <div className='player-board-inPlay-sponsors' style={{ order: 4 }}>
    //   <div
    //     id={`card-${animalName}`}
    //     data-id={animalName}
    //     className='ark-card zoo-card animal-card tooltipable'
    //     draggable={false}
    //   >
    //     <div className='ark-card-wrapper'>{children}</div>
    //   </div>
    // </div>
    <div className='player-board-hand'>
      <div
        id={`card-${sponsorName}`}
        data-id={sponsorName}
        className='ark-card zoo-card sponsor-card tooltipable'
      >
        <div className='ark-card-wrapper'>{children}</div>
      </div>
    </div>
  );
};

export default SponsorCardWrapper;
