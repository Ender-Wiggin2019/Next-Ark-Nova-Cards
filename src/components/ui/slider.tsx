'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    color?: string;
  }
>(({ className, color = 'amber', ...props }, ref) => {
  const colorClasses = {
    bg: 'bg-amber-800',
    border: 'border-amber-800',
  };

  switch (color) {
    case 'blue':
      colorClasses.bg = 'bg-blue-500';
      colorClasses.border = 'border-blue-500';
      break;
    case 'zinc':
      colorClasses.bg = 'bg-zinc-900';
      colorClasses.border = 'border-zinc-900';
      break;
    default:
      break;
  }

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-500/50 dark:bg-zinc-800'>
        <SliderPrimitive.Range
          className={`absolute h-full ${colorClasses.bg} dark:bg-zinc-50`}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={`block h-5 w-5 rounded-full border-2 ${colorClasses.border} bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 `}
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
