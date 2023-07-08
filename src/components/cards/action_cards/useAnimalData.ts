import { useContext } from 'react';

import { AnimalDataContext } from './AnimalDataContext';

export function useAnimalData() {
  return useContext(AnimalDataContext);
}
