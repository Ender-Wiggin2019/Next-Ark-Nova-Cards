import React, { ReactNode } from 'react';

interface CardListProps {
  children: ReactNode;
}

const CardList: React.FC<CardListProps> = ({ children }) => (
  <div className='-py-1 grid w-full grid-cols-2 gap-2 px-4 lg:grid-cols-3 lg:px-2 xl:grid-cols-4'>
    {children}
  </div>
);

export default CardList;
