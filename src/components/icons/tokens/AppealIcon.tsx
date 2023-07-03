import React from 'react';

interface valueProps {
  value: string | number;
}

const AppealIcon: React.FC<valueProps> = ({ value }) => {
  return (
    <div className='icon-container icon-container-appeal'>
      <div className='arknova-icon icon-appeal'>{value}</div>
    </div>
  );
};

export default AppealIcon;
