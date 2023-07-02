import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { Tag } from '@/types/Tags';

type TagButtonProps = {
  isLoading?: boolean;
  tag: Tag;
} & React.ComponentPropsWithRef<'button'>;

const TagButton = React.forwardRef<HTMLButtonElement, TagButtonProps>(
  ({ className, isLoading, tag, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={clsxm('button btn3', `icon-${tag}`, className)}
        {...rest}
      ></button>
    );
  }
);

export default TagButton;
