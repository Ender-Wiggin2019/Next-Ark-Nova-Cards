import React from 'react';

interface valueProps {
  value: string | number;
}

const ConservationIcon: React.FC<valueProps> = ({ value }) => {
  return (
    <div className='icon-container icon-container-conservation'>
      <div className='arknova-icon icon-conservation'>{value}</div>
    </div>
  );
};

export default ConservationIcon;
