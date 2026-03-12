import { type LucideIcon } from 'lucide-react';
import * as React from 'react';
import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import { cn } from '@/lib/utils';

const IconLinkVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;

type IconLinkProps = {
  isDarkBg?: boolean;
  variant?: (typeof IconLinkVariant)[number];
  icon?: LucideIcon;
  iconClassName?: string;
} & Omit<UnstyledLinkProps, 'children'>;

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'outline',
      isDarkBg = false,
      iconClassName,
      ...rest
    },
    ref,
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        type='button'
        className={cn(
          'inline-flex items-center justify-center rounded font-medium',
          'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
          'shadow-sm',
          'transition-colors duration-75',
          'min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border-primary-600 border',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-700',
              'disabled:bg-primary-700',
            ],
            variant === 'outline' && [
              'text-primary-500',
              'border-primary-500 border',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-background/20 active:bg-background/30 disabled:bg-background/30',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-background/20 active:bg-background/30 disabled:bg-background/30',
            ],
            variant === 'light' && [
              'bg-background text-foreground',
              'border border-border',
              'hover:bg-muted',
              'active:bg-muted/80 disabled:bg-muted/60',
            ],
            variant === 'dark' && [
              'bg-foreground text-background',
              'border border-border',
              'hover:bg-foreground/90 active:bg-foreground/80 disabled:bg-foreground/70',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          className,
        )}
        {...rest}
      >
        {Icon && <Icon className={cn(iconClassName)} />}
      </UnstyledLink>
    );
  },
);

export default IconLink;
