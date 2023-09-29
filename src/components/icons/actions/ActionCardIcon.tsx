import React from 'react';

import { cn } from '@/lib/utils';

import { ActionCardType } from '@/types/ActionCard';

interface actionTypeProps {
  actionType?: ActionCardType;
}

const ActionCardIcon: React.FC<actionTypeProps> = ({ actionType }) => {
  const actionClass =
    actionType === undefined
      ? 'icon-action-card'
      : 'icon-action-card-' + actionType.toLowerCase();

  return (
    <div className={cn('icon-container', actionClass)}>
      <div className={cn('arknova-icon', actionClass)}></div>
    </div>
  );
};

export default ActionCardIcon;
