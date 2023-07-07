import React from 'react';

interface valueProps {
  value: string | number;
}

const ReputationIcon: React.FC<valueProps> = ({ value }) => {
  return (
    <div className='icon-container icon-container-reputation'>
      <div className='arknova-icon icon-reputation'>{value}</div>
    </div>
  );
};

export default ReputationIcon;
