import classNames from 'classnames';
import React from 'react';

import SpecialEnclosureComponent from '@/components/icons/SpecialEnclosure';

import StandardEnclosure from './StandardEnclosure';

import { SpecialEnclosure } from '@/types/SpecialEnclosure';

interface EnclosuresProps {
  size: number;
  rock?: number;
  water?: number;
  forbidden?: boolean;
  specialEnclosures?: SpecialEnclosure[];
}

const Enclosures: React.FC<EnclosuresProps> = ({
  size,
  rock,
  water,
  forbidden,
  specialEnclosures,
}) => {
  const hasSpecialEnclosures =
    specialEnclosures && specialEnclosures.length > 0;
  const needWide =
    hasSpecialEnclosures || (rock && rock > 0) || (water && water > 0);
  const enclosureClass = classNames('animal-card-enclosure-cost', {
    wide: needWide,
  });
  return (
    <div className={enclosureClass}>
      <div className='animal-card-enclosure'>
        <StandardEnclosure
          size={size}
          rock={rock}
          water={water}
          forbidden={forbidden}
        />
        {hasSpecialEnclosures && (
          <SpecialEnclosureComponent specialEnclosures={specialEnclosures} />
        )}
      </div>
    </div>
  );
};

export default Enclosures;
