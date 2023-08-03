import React from 'react';

interface valueProps {
  value: string | number;
  color?: string;
}

const MoneyIcon: React.FC<valueProps> = ({ value, color }) => {
  const colorClass = color === undefined ? '' : color;
  return (
    <div className='icon-container icon-container-money'>
      <div className='arknova-icon icon-money'>
        <span className={colorClass}>{value}</span>
      </div>
    </div>
  );
};

export default MoneyIcon;
