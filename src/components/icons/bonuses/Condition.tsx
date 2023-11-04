import React from 'react';

const Condition: React.FC = () => {
  return (
    <div className='flex items-center'>
      <div className='h-12 w-12 border-black bg-red-400'></div>
      <div className='-ml-6 h-12 w-12 rounded-full border-2 border-white bg-red-400'></div>
    </div>
  );
};

export default Condition;
