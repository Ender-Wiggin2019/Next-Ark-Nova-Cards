import React, { ReactNode } from 'react';

interface CardListProps {
  children: ReactNode;
}

const CardList: React.FC<CardListProps> = ({ children }) => (
  <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
    {children}
  </div>
);

export default CardList;
