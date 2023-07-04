// AnimalCardList.tsx
import React from 'react';

import { AnimalCard } from './AnimalCard';
import { useAnimalData } from './useAnimalData';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';

export const AnimalCardList: React.FC = () => {
  const animalsData = useAnimalData();

  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {animalsData.map((animal: AnimalCardType) => (
        <div key={animal.id} className='scale-[1.8] pb-48'>
          <AnimalCard key={animal.id} animal={animal} />
        </div>
      ))}
    </div>
  );
};
