import React from 'react';
import classNames from 'classnames';

interface valueProps {
  value: string | number;
}

const EnclosureIcon: React.FC<valueProps> = ({ value }) => {
  const containerClass = classNames(
    'icon-container',
    `icon-enclosure-size-${value}`
  );
  const iconClass = classNames('arknova-icon', `icon-enclosure-size-${value}`);
  return (
    <div className={containerClass}>
      <div className={iconClass}></div>
    </div>
  );
};

export default EnclosureIcon;
