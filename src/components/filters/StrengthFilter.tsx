import React, { useEffect, useState } from 'react';
import { SiSquareenix } from 'react-icons/si';

import { cn } from '@/lib/utils';

import { Slider } from '@/components/ui/slider';
type StrengthFilterProps = React.ComponentProps<typeof Slider> & {
  onFilterChange: (strength: number[]) => void;
  reset: boolean;
};

export function StrengthFilter({
  className,
  onFilterChange,
  reset,
  ...props
}: StrengthFilterProps) {
  const [strength, setStrength] = useState([0]);

  const handleStrengthChange = (value: number[]) => {
    setStrength(value);
  };

  useEffect(() => {
    onFilterChange(strength);
  }, [strength]);

  useEffect(() => {
    if (reset) {
      setStrength([0]);
    }
  }, [reset]);

  return (
    <div className='group mt-1 flex w-48 flex-row items-center justify-center space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-blue-500 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'>
      <div className='flex w-10 flex-row gap-2'>
        <SiSquareenix className='h-auto w-3' />
        <div>{strength[0] <= 2 ? 'All' : strength[0]}</div>
      </div>
      <Slider
        value={strength}
        min={2}
        max={6}
        step={1}
        onValueChange={handleStrengthChange}
        className={cn('w-[60%]', className)}
        color='blue'
        {...props}
      />
    </div>
  );
}
