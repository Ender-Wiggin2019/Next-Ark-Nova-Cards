import React from 'react';

interface valueProps {
  value: string | number;
}

/* FIXME: Style issue */
const EmptySizeIcon: React.FC<valueProps> = ({ value }) => {
  return (
    <div className='icon-container icon-enclosure-regular'>
      <div className='arknova-icon icon-enclosure-regular mb-2 text-xs'>
        {value}
      </div>
    </div>
  );
};

export default EmptySizeIcon;
