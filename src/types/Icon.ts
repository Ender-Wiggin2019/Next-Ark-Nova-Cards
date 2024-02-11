import { IconName } from '@/types/IconName';

export type Icon = {
  iconName: IconName | string; // user customized icon can be string
  params?: { value: string; type?: string };
  notBadge?: boolean;
  slotCubeHolder?: boolean;
};
