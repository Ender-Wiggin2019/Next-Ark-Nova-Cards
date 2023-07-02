import React from 'react';

import { cardNames } from '@/data/CardNames'; // Assuming the json file is named animalData.json

interface AnimalCardWrapperProps {
  id: string;
  children: React.ReactNode;
}

const AnimalCardWrapper: React.FC<AnimalCardWrapperProps> = ({
  id,
  children,
}) => {
  const animalName = cardNames[id];

  return (
    <div className='player-board-hand' style={{ order: 4 }}>
      <div
        id={`card-${animalName}`}
        data-id={animalName}
        className='ark-card zoo-card animal-card tooltipable'
        draggable={false}
      >
        <div className='ark-card-wrapper'>{children}</div>
      </div>
    </div>
  );
};

export default AnimalCardWrapper;
