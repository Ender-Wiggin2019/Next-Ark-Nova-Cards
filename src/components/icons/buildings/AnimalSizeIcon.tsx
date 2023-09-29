import React from 'react';

import { cn } from '@/lib/utils';
interface valueProps {
  value: string | number;
}

const AnimalSizeIcon: React.FC<valueProps> = ({ value }) => {
  const containerClass = cn('icon-container', `icon-animal-size-${value}`);
  const iconClass = cn('arknova-icon', `icon-animal-size-${value}`);
  return (
    <div className={containerClass}>
      <div className={iconClass}>{value}</div>
    </div>
  );
};

export default AnimalSizeIcon;
