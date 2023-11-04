import React from 'react';

import Kiosk from '@/components/icons/buildings/Kiosk';
import Pavilion from '@/components/icons/buildings/Pavilion';

const KioskPavilionPair: React.FC = () => {
  return (
    <div className='flex items-start '>
      <div className='-ml-6 -mr-7 -mt-4 scale-[0.5]'>
        <Kiosk />
      </div>
      <div className='text-md flex items-center'>+</div>
      <div className='-ml-7 -mr-6 mt-4 scale-[0.5]'>
        <Pavilion />
      </div>
    </div>
  );
};

export default KioskPavilionPair;
