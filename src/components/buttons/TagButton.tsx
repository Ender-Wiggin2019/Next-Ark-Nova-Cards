// TagButton.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

import TagComponent from '@/components/icons/Tag';

import { Tag } from '@/types/Tags';

type TagButtonProps = {
  isLoading?: boolean;
  tag: Tag;
  selected: boolean;
  onTagClick?: (tag: Tag) => void;
} & React.ComponentPropsWithRef<'button'>;

const TagButton = React.forwardRef<HTMLButtonElement, TagButtonProps>(
  ({ className, isLoading, tag, selected, onTagClick, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        onClick={() => onTagClick && onTagClick(tag)}
        className={cn(
          'filter-button h-min w-min rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 p-2 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition',
          selected &&
            'bg-gradient-radial scale-90 from-lime-700/90 to-lime-600/70',
          !selected && 'scale-90 hover:scale-110'
        )}
        {...rest}
      >
        <TagComponent type={tag} />
      </button>
    );
  }
);

export default TagButton;
