import React from 'react';

import {
  SpecialEnclosure,
  SpecialEnclosureType,
} from '@/types/SpecialEnclosure';

interface SpecialEnclosureProps {
  specialEnclosures: SpecialEnclosure[];
}

const formatClassName = (type: SpecialEnclosureType): string => {
  return type.toLowerCase().split(' ').join('-');
};

const SpecialEnclosureComponent: React.FC<SpecialEnclosureProps> = ({
  specialEnclosures,
}) => {
  return (
    <>
      {specialEnclosures.map((enclosure, index) => (
        <div
          key={index}
          className={`arknova-icon icon-enclosure-special-${formatClassName(
            enclosure.type
          )}`}
        >
          {enclosure.size}
        </div>
      ))}
    </>
  );
};

export default SpecialEnclosureComponent;
