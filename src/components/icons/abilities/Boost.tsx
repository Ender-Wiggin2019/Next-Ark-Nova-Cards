import React from 'react';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';

import ActionCardIcon from '@/components/icons/actions/ActionCardIcon';
import Strength from '@/components/icons/actions/Strength';

import { ActionCardType } from '@/types/ActionCard';
interface actionTypeProps {
  actionType?: ActionCardType;
}

const Boost: React.FC<actionTypeProps> = ({ actionType }) => {
  return (
    <div className='flex scale-50 items-center'>
      <span className='scale-75'>
        <Strength value={1} />
      </span>
      <VscTriangleLeft className='z-20 -ml-2 -mr-1 h-12 ' />
      <ActionCardIcon actionType={actionType} />
      <VscTriangleRight className='z-20 -ml-1 -mr-2 h-12 ' />
      <span className='scale-75'>
        <Strength value={5} />
      </span>
    </div>
  );
};

export default Boost;
