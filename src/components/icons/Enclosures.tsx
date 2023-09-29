import React from 'react';

import { cn } from '@/lib/utils';

import SpecialEnclosureComponent from '@/components/icons/SpecialEnclosure';

import StandardEnclosure from './StandardEnclosure';

import { SpecialEnclosure } from '@/types/SpecialEnclosure';

interface EnclosuresProps {
  size: number;
  rock?: number;
  water?: number;
  canBeInStandardEnclosure?: boolean;
  specialEnclosures?: SpecialEnclosure[];
}

const Enclosures: React.FC<EnclosuresProps> = ({
  size,
  rock,
  water,
  canBeInStandardEnclosure,
  specialEnclosures,
}) => {
  const hasSpecialEnclosures =
    specialEnclosures && specialEnclosures.length > 0;
  const needWide =
    hasSpecialEnclosures || (rock && rock > 0) || (water && water > 0);
  const enclosureClass = cn('animal-card-enclosure-cost', {
    wide: needWide,
  });

  // if (canBeInStandardEnclosure !== undefined) console.log(canBeInStandardEnclosure);
  return (
    <div className={enclosureClass}>
      <div
        className={
          canBeInStandardEnclosure !== undefined && !canBeInStandardEnclosure
            ? 'animal-card-enclosure-forbidden'
            : 'animal-card-enclosure'
        }
      >
        <StandardEnclosure
          size={size}
          rock={rock}
          water={water}
          forbidden={
            canBeInStandardEnclosure !== undefined && !canBeInStandardEnclosure
          }
        />
        {hasSpecialEnclosures && (
          <SpecialEnclosureComponent specialEnclosures={specialEnclosures} />
        )}
      </div>
    </div>
  );
};

export default Enclosures;
