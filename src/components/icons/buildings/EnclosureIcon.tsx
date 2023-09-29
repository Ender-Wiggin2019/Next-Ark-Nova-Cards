import React from 'react';

import { cn } from '@/lib/utils';
interface valueProps {
  value: string | number;
}

const EnclosureIcon: React.FC<valueProps> = ({ value }) => {
  const containerClass = cn('icon-container', `icon-enclosure-size-${value}`);
  const iconClass = cn('arknova-icon', `icon-enclosure-size-${value}`);
  return (
    <div className={containerClass}>
      <div className={iconClass}></div>
    </div>
  );
};

export default EnclosureIcon;
