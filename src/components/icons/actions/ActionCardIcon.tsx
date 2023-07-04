import classNames from 'classnames';
import React from 'react';

import { ActionCardType } from '@/types/ActionCard';

interface actionTypeProps {
  actionType: ActionCardType | undefined;
}

const ActionCardIcon: React.FC<actionTypeProps> = ({ actionType }) => {
  const actionClass =
    actionType === undefined
      ? 'icon-action-card'
      : 'icon-action-card-' + actionType.toLowerCase();

  return (
    <div className={classNames('icon-container', actionClass)}>
      <div className={classNames('arknova-icon', actionClass)}></div>
    </div>
  );
};

export default ActionCardIcon;
