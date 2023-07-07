// TagButton.tsx
import classNames from 'classnames';
import * as React from 'react';

import TagComponent from '@/components/icons/Tag';

import { Tag } from '@/types/Tags';

type TagButtonProps = {
  isLoading?: boolean;
  tag: Tag;
  selected: boolean;
} & React.ComponentPropsWithRef<'button'>;

const TagButton = React.forwardRef<HTMLButtonElement, TagButtonProps>(
  ({ className, isLoading, tag, selected, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={classNames(
          'filter-button group h-auto scale-90 rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 p-2 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
          selected &&
            'bg-gradient-radial scale-125 from-lime-700/90 to-lime-600/70',
          !selected && 'hover:scale-110'
        )}
        {...rest}
      >
        <TagComponent type={tag} />
      </button>
    );
  }
);

export default TagButton;
