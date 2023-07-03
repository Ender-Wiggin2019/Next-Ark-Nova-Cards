import React from 'react';
import classNames from 'classnames';

interface valueProps {
  value: string | number;
}

const AnimalSizeIcon: React.FC<valueProps> = ({ value }) => {
  const containerClass = classNames(
    'icon-container',
    `icon-animal-size-${value}`
  );
  const iconClass = classNames('arknova-icon', `icon-animal-size-${value}`);
  return (
    <div className={containerClass}>
      <div className={iconClass}>{value}</div>
    </div>
  );
};

export default AnimalSizeIcon;
