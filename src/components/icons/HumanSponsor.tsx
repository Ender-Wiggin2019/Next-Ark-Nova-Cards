import Image from 'next/image';
import React from 'react';
const HumanSponsor: React.FC = () => {
  return (
    <>
      <Image
        src='/img/human-sponsor.png'
        alt='human sponsor'
        width={24}
        height={24}
      />
    </>
  );
};

export default HumanSponsor;
