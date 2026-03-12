import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Button } from '@/components/ui/button';
import ActionCardWrapper from '@/components/wrapper/ActionWrapper';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';

interface AnimalCardProps {
  animal: AnimalCardType;
}

export const ActionCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={handleClick}
        className='h-auto cursor-pointer p-0 hover:bg-transparent'
        aria-label='Flip action card'
      >
        <ActionCardWrapper id={animal.id}>1</ActionCardWrapper>
      </Button>

      <Button
        type='button'
        variant='ghost'
        size='sm'
        onClick={handleClick}
        className='h-auto cursor-pointer p-0 hover:bg-transparent'
        aria-label='Flip action card'
      >
        <ActionCardWrapper id={animal.id}>2</ActionCardWrapper>
      </Button>
    </ReactCardFlip>
  );
};
