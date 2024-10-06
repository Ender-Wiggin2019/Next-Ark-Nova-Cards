/*
 * @Author: Ender-Wiggin
 * @Date: 2023-07-06 02:31:29
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2024-10-06 23:54:26
 * @Description:
 */
import { CardSource } from '@/types/CardSource';
import { Effect } from '@/types/Effect';
import { Tag } from '@/types/Tags';

// export interface CardPosition {
//     src: string;
//     x: number;
//     y: number;
// }
export interface SponsorCard {
  id: string;
  name: string;
  image?: string;

  // upper
  strength: number; // Size;
  rock?: number;
  water?: number;
  requirements?: Tag[];
  tags: Tag[];

  // middle
  effects?: Effect[];

  // bottom
  reputation?: number;
  appeal?: number;
  conservationPoint?: number;

  // meta data
  source: CardSource;
  type?: SponsorCardType; // add this for human sponsors
}

export enum SponsorCardType {
  HUMAN = 'HUMAN',
  NORMAL = 'NORMAL',
}
