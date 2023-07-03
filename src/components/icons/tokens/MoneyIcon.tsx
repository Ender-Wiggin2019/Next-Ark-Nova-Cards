import React from 'react';

interface valueProps {
  value: string | number;
}

const MoneyIcon: React.FC<valueProps> = ({ value }) => {
  return (
    <div className='icon-container icon-container-money'>
      <div className='arknova-icon icon-money'>{value}</div>
    </div>
  );
};

export default MoneyIcon;
