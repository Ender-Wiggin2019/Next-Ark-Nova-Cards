import { SponsorCard } from '@/types/SponsorCard';

export interface ISponsorCard {
  id: string;
  sponsorCard: SponsorCard;
  rating?: number | null;
  ratingCount?: number | null;
}
