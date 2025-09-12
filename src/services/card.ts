import { request } from '@/services/base';

import { IRating } from '@/types/IRating';

export const fetchCardRatings = async () => {
  const response = await request<IRating[]>('/api/cards/ratings');
  return response?.data || [];
};
