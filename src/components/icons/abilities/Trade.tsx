import React from 'react';

import MoneyIcon from '@/components/icons/tokens/MoneyIcon';
import XToken from '@/components/icons/tokens/XToken';

const Trade: React.FC = () => {
  return (
    <div className='flex scale-75'>
      <XToken /> : <MoneyIcon value={5} />
    </div>
  );
};

export default Trade;
