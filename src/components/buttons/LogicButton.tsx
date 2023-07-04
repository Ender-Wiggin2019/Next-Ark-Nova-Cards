// LogicButton.tsx
import classNames from 'classnames';
import * as React from 'react';

type LogicButtonProps = {
  isLoading?: boolean;
  logic: 'And' | 'Or';
  selected: boolean;
} & React.ComponentPropsWithRef<'button'>;

const LogicButton = React.forwardRef<HTMLButtonElement, LogicButtonProps>(
  ({ className, isLoading, logic, selected, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={classNames(
          'filter-button group h-20 w-20 rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 p-2 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
          selected && 'scale-125 transform shadow-yellow-800/5',
          !selected && 'hover:scale-110'
        )}
        {...rest}
      >
        {logic}
      </button>
    );
  }
);

export default LogicButton;
