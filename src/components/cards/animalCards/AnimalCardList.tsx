// AnimalCardList.tsx
import React from 'react';

import { AnimalCard } from './AnimalCard';
import { useAnimalData } from './useAnimalData';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';

export const AnimalCardList: React.FC = () => {
  const animalsData = useAnimalData();

  return (
    <div>
      {animalsData.map((animal: AnimalCardType) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
};
