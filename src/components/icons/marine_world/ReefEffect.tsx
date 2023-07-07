import React from 'react';

type ReefEffectProps = {
  children?: React.ReactNode;
};
const ReefEffect: React.FC<ReefEffectProps> = ({ children }) => {
  return (
    <div className='arknova-reef-container arknova-icon icon-reef-effect'>
      <div className='ml-8 mt-5 flex h-8 w-12 scale-[2.2] items-center justify-center'>
        {children}
      </div>
    </div>
  );
};

export default ReefEffect;
