import { useContext } from 'react';

import { SponsorDataContext } from './SponsorDataContext';

export function useSponsorData() {
  return useContext(SponsorDataContext);
}
