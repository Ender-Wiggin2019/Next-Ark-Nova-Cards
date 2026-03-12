import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  pickNum: number;
  totalNum: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ pickNum, totalNum }) => {
  const percentage = totalNum > 0 ? pickNum / totalNum : 0;
  const toneClass =
    percentage > 0.66
      ? 'bg-gradient-to-r from-primary/80 to-primary'
      : percentage > 0.33
        ? 'bg-gradient-to-r from-amber-300/85 to-amber-500/90 dark:from-amber-400/70 dark:to-amber-500/70'
        : 'bg-gradient-to-r from-muted to-muted-foreground/40';

  return (
    <div className='relative h-7 w-24 overflow-hidden rounded-md bg-secondary/80 ring-1 ring-border/70'>
      <div
        className={cn(
          'h-full transition-[width] duration-500 ease-out',
          toneClass,
        )}
        style={{ width: `${percentage * 100}%` }}
      />
      <span className='absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground'>
        {`${(percentage * 100).toFixed(0)}%`}
      </span>
    </div>
  );
};

export default ProgressBar;
