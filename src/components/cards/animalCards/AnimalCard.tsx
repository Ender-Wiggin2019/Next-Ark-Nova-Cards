// AnimalCard.tsx
import { useTranslation } from 'next-i18next';
import React from 'react';

import Ability from '@/components/abilities/Ability';
import Enclosures from '@/components/icons/Enclosures';
import Money from '@/components/icons/Money';
import Tag from '@/components/icons/Tag';
import AnimalCardWrapper from '@/components/wrapper/AnimalWrapper';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';

interface AnimalCardProps {
  animal: AnimalCardType;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const { t } = useTranslation();

  let dataSize = 1;
  if (animal.reputation !== undefined) dataSize += 1;
  if (animal.conservationPoint !== undefined) dataSize += 1;

  return (
    // <div>
    //     <h2>{animal.name}</h2>
    //     <img src={animal.image.toString()} alt={animal.name} />
    //     <p>Price: {animal.price}</p>
    //     {/* add other fields as needed */}
    // </div>
    <AnimalCardWrapper id={animal.id}>
      <div className='ark-card-top'>
        <div className='ark-card-top-left'>
          <Enclosures
            size={animal.size}
            rock={animal.rock}
            water={animal.water}
            specialEnclosures={animal.specialEnclosures}
          />
          <div className='animal-card-cost'>
            <Money value={animal.price} />
          </div>

          <div className='zoo-card-prerequisites'>
            {animal.requirements &&
              animal.requirements.map((tag, index) => (
                <div key={index} className='zoo-card-badge'>
                  <Tag type={tag} />
                </div>
              ))}
          </div>
        </div>
        <div className='ark-card-top-right'>
          {animal.tags.map((tag, index) => (
            <div key={index} className='zoo-card-badge'>
              <Tag type={tag} />
            </div>
          ))}
        </div>
      </div>

      <div className='ark-card-middle'>
        <div className='ark-card-number'>{animal.id}</div>
        <div className='ark-card-title-wrapper'>
          <div className='ark-card-title pt-2'>{t(animal.name)}</div>
          <div className='ark-card-subtitle sf-hidden'>{animal.latinName}</div>
        </div>
      </div>
      <div className='ark-card-bottom'>
        <div className='zoo-card-bonuses' data-size={dataSize.toString()}>
          {animal.reputation !== undefined && (
            <div className='zoo-card-bonus reputation'>{animal.reputation}</div>
          )}
          {animal.conservationPoint !== undefined && (
            <div className='zoo-card-bonus conservation'>
              {animal.conservationPoint}
            </div>
          )}
          <div className='zoo-card-bonus appeal'>{animal.appeal}</div>
        </div>
        {animal.abilities && (
          <div className='animal-ability'>
            {animal.abilities.map((ability, index) => (
              <Ability key={index} ability={ability} style='full' />
            ))}
          </div>
        )}
      </div>
    </AnimalCardWrapper>
  );
};
