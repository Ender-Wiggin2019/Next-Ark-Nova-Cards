'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import React from 'react';
import { BiCheck, BiChevronDown } from 'react-icons/bi';

import { cn } from '@/lib/utils';

const Root = SelectPrimitive.Root;

const Group = SelectPrimitive.Group;

const Value = SelectPrimitive.Value;

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'group flex w-36 items-center justify-between space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80',
      className
    )}
    {...props}
  >
    {children}
    <BiChevronDown className='h-4 w-4 opacity-50' />
  </SelectPrimitive.Trigger>
));
Trigger.displayName = SelectPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-xl border border-stone-100 bg-white text-stone-700 shadow-xl animate-in fade-in-80 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300',
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className='p-1'>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Content.displayName = SelectPrimitive.Content.displayName;

const Label = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'py-1.5 pl-8 pr-2 text-sm font-semibold text-stone-800 dark:text-stone-200',
      className
    )}
    {...props}
  />
));
Label.displayName = SelectPrimitive.Label.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative z-50 flex cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm font-medium outline-none transition-colors focus:bg-stone-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-stone-800',
      'tracking-tight',
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <BiCheck className='h-4 w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
Item.displayName = SelectPrimitive.Item.displayName;

const Separator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-stone-100 dark:bg-stone-700', className)}
    {...props}
  />
));
Separator.displayName = SelectPrimitive.Separator.displayName;

export const LocaleSelect = Object.freeze({
  Root,
  Group,
  Value,
  Trigger,
  Content,
  Label,
  Item,
  Separator,
});
