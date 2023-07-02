import React from 'react';

interface MoneyProps {
  value: number;
}

const Money: React.FC<MoneyProps> = ({ value }) => {
  return <div className='arknova-icon icon-money original-cost'>{value}</div>;
};

export default Money;
