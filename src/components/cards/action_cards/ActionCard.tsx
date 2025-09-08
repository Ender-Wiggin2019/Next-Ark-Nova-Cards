import { useTranslation } from 'next-i18next';
import React from 'react';
import ReactCardFlip from 'react-card-flip';

import ActionCardWrapper from '@/components/wrapper/ActionWrapper';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';

interface AnimalCardProps {
  animal: AnimalCardType;
}

export const ActionCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const { t } = useTranslation('common');
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
      <div onClick={handleClick}>
        <ActionCardWrapper id={animal.id}>1</ActionCardWrapper>
      </div>

      <div onClick={handleClick}>
        <ActionCardWrapper id={animal.id}>2</ActionCardWrapper>
      </div>
    </ReactCardFlip>
  );
};
