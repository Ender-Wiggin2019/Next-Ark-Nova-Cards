import React from 'react';

interface StandardEnclosureProps {
  size: number | string;
  rock?: number;
  water?: number;
  forbidden: boolean;
}

const StandardEnclosure: React.FC<StandardEnclosureProps> = ({
  size,
  rock = 0,
  water = 0,
  forbidden,
}) => {
  const classes = [
    forbidden ? 'icon-enclosure-forbidden' : 'icon-enclosure-regular',
  ];

  if (rock > 1) {
    classes.push('rock-rock');
  } else if (rock === 1 && water === 1) {
    classes.push('rock-water');
  } else if (rock === 1) {
    classes.push('rock');
  }

  if (water > 1) {
    classes.push('water-water');
  } else if (rock === 0 && water === 1) {
    classes.push('water');
  }

  return <div className={'arknova-icon ' + classes.join('-')}>{size}</div>;
};

export default StandardEnclosure;
