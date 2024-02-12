import dynamic from 'next/dynamic';
import React from 'react';

const Odometer = dynamic(import('react-odometerjs'), {
  ssr: false,
  loading: () => <span>0</span>,
});

type CardOdometerProps = {
  className?: string;
  name: string;
  value: number;
  // Add custom props here
};

export const CardOdometer: React.FC<CardOdometerProps> = ({
  className,
  name,
  value,
}) => {
  return (
    <div className='group flex w-40 items-center justify-between space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'>
      <div className={className}>{name}</div>
      <Odometer value={value} format='d'>
        duration={500}
      </Odometer>
    </div>
  );
};
