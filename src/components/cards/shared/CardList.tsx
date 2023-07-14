import React, { ReactNode } from 'react';

interface CardListProps {
  children: ReactNode;
}

const CardList: React.FC<CardListProps> = ({ children }) => (
  <div className='grid w-full grid-cols-2 gap-2 p-4 md:p-2 lg:grid-cols-3 xl:grid-cols-4'>
    {children}
  </div>
);

export default CardList;
