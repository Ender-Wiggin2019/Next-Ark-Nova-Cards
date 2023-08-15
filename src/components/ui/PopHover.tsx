import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { FC, useContext, useState } from 'react';

import { cn } from '@/lib/utils';

const PopoverOnOpenChangeContext = React.createContext({
  onOpenChange: (open: boolean) => {
    /* empty */
  },
  timeoutId: { current: null } as React.MutableRefObject<ReturnType<
    typeof setTimeout
  > | null>,
});

const PopHover: FC<React.ComponentProps<typeof PopoverPrimitive.Root>> = ({
  open,
  onOpenChange,
  ...props
}) => {
  const [defaultOpen, defaultOnOpenChange] = useState(false);
  const timeoutId = React.useRef(null);

  return (
    <PopoverOnOpenChangeContext.Provider
      value={{
        onOpenChange: onOpenChange ?? defaultOnOpenChange,
        timeoutId,
      }}
    >
      <PopoverPrimitive.Root
        {...props}
        open={open ?? defaultOpen}
        onOpenChange={onOpenChange ?? defaultOnOpenChange}
      />
    </PopoverOnOpenChangeContext.Provider>
  );
};

const PopoverTrigger: React.FC<any> = (props) => {
  const { onOpenChange, timeoutId } = useContext(PopoverOnOpenChangeContext);

  return (
    <PopoverPrimitive.Trigger
      {...props}
      onMouseEnter={() => {
        timeoutId.current && clearTimeout(timeoutId.current);
        onOpenChange(true);
      }}
      onMouseLeave={() => {
        const _timeoutId = setTimeout(() => onOpenChange(false), 300);
        timeoutId.current = _timeoutId;
      }}
    />
  );
};

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const { onOpenChange, timeoutId } = useContext(PopoverOnOpenChangeContext);
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        onMouseEnter={() => {
          timeoutId.current && clearTimeout(timeoutId.current);
        }}
        onMouseLeave={() => {
          const _timeoutId = setTimeout(() => onOpenChange(false), 100);
          timeoutId.current = _timeoutId;
        }}
        className={cn(
          'z-50 w-72 rounded-md border bg-popover p-4 text-lg text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { PopHover, PopoverContent, PopoverTrigger };
