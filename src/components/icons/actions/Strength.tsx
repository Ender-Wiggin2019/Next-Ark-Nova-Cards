import React from 'react';

interface valueProps {
  value: string | number;
}

const Strength: React.FC<valueProps> = ({ value }) => {
  return (
    <div className='icon-container icon-container-strength'>
      <div className='arknova-icon icon-strength'>{value.toString()}</div>
    </div>
  );
};

export default Strength;
