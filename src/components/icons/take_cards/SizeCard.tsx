import React from 'react';

type SizeCardProps = {
  size: string | number;
};
const SizeCard: React.FC<SizeCardProps> = ({ size }) => {
  return (
    <div className={`icon-container icon-container-animal-size-${size}`}>
      <div className={`arknova-icon icon-animal-size-${size}`}></div>
    </div>
  );
};

export default SizeCard;
