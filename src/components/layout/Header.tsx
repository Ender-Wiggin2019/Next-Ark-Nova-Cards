'use client';

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

// import { url } from '~/lib'
import { clamp } from '@/lib/math';
import { cn } from '@/lib/utils';

import LocaleSelector from '@/components/layout/LocaleSelector';
import { Container } from '@/components/ui/Container';
import { Tooltip } from '@/components/ui/Tooltip';

import { NavigationBar } from './NavigationBar';
import {
  GitHubBrandIcon,
  GoogleBrandIcon,
  MailIcon,
  UserArrowLeftIcon,
} from '../../../public';

export function Header() {
  const isHomePage = usePathname() === '/';

  const headerRef = React.useRef<HTMLDivElement>(null);
  const avatarRef = React.useRef<HTMLDivElement>(null);
  const isInitial = React.useRef(true);

  React.useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0;
    const upDelay = 64;

    function setProperty(property: string, value: string | null) {
      document.documentElement.style.setProperty(property, value);
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property);
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return;
      }

      const { top, height } = headerRef.current.getBoundingClientRect();
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial.current) {
        setProperty('--header-position', 'sticky');
      }

      setProperty('--content-offset', `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`);
        setProperty('--header-mb', `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);
        setProperty('--header-height', `${offset}px`);
        setProperty('--header-mb', `${height - offset}px`);
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`);
        setProperty('--header-mb', `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed');
        removeProperty('--header-top');
        removeProperty('--avatar-top');
      } else {
        removeProperty('--header-inner-position');
        setProperty('--header-top', '0px');
        setProperty('--avatar-top', '0px');
      }
    }

    function updateStyles() {
      updateHeaderStyles();
      isInitial.current = false;
    }

    updateStyles();
    window.addEventListener('scroll', updateStyles, { passive: true });
    window.addEventListener('resize', updateStyles);

    return () => {
      window.removeEventListener('scroll', updateStyles);
      window.removeEventListener('resize', updateStyles);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHomePage]);

  return (
    <>
      <motion.header
        className={cn(
          'mb-var(--header-mb mb-[0px])flex pointer-events-none relative z-50 flex-col',
          isHomePage
            ? 'h-var(--header-height h-[180px])'
            : 'h-var(--header-height h-[64px])'
        )}
        layout
        layoutRoot
      >
        <div
          ref={headerRef}
          className='top-0 z-10 h-16 pt-6'
          style={{
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className='top-[var(--header-top,theme(spacing.6))] w-full'
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className='relative flex gap-4'>
              <motion.div
                className='flex flex-1'
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 200,
                }}
              ></motion.div>
              <div className='flex flex-1 justify-end md:justify-center'>
                <NavigationBar.Mobile className='pointer-events-auto relative z-50 md:hidden' />
                <NavigationBar.Desktop className='pointer-events-auto relative z-50 hidden md:block' />
              </div>
              <motion.div
                className='flex justify-end gap-3 md:flex-1'
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              >
                <UserInfo />
                <div className='pointer-events-auto'>
                  <LocaleSelector />
                </div>
              </motion.div>
            </div>
          </Container>
        </div>
      </motion.header>
      {isHomePage && <div className='h-[--content-offset]' />}
    </>
  );
}

function UserInfo() {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const { user } = useUser();
  const StrategyIcon = React.useMemo(() => {
    const strategy = user?.primaryEmailAddress?.verification.strategy;
    if (!strategy) {
      return null;
    }

    switch (strategy) {
      case 'from_oauth_github':
        return GitHubBrandIcon as (
          props: React.ComponentProps<'svg'>
        ) => JSX.Element;
      case 'from_oauth_google':
        return GoogleBrandIcon;
      default:
        return MailIcon;
    }
  }, [user?.primaryEmailAddress?.verification.strategy]);

  return (
    <AnimatePresence>
      <SignedIn key='user-info'>
        <motion.div
          className='pointer-events-auto relative flex h-10 items-center'
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 25 }}
        >
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9 ring-2 ring-white/20',
              },
            }}
          />
          {StrategyIcon && (
            <span className='pointer-events-none absolute -bottom-1 -right-1 flex h-4 w-4 select-none items-center justify-center rounded-full bg-white dark:bg-zinc-900'>
              <StrategyIcon className='h-3 w-3' />
            </span>
          )}
        </motion.div>
      </SignedIn>
      <SignedOut key='sign-in'>
        <motion.div
          className='pointer-events-auto'
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 25 }}
        >
          <Tooltip.Provider disableHoverableContent>
            <Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <SignInButton mode='modal' redirectUrl='/'>
                <Tooltip.Trigger asChild>
                  <button
                    type='button'
                    className='group h-10 rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
                  >
                    <UserArrowLeftIcon className='h-5 w-5' />
                  </button>
                </Tooltip.Trigger>
              </SignInButton>

              <AnimatePresence>
                {tooltipOpen && (
                  <Tooltip.Portal forceMount>
                    <Tooltip.Content asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        Login
                      </motion.div>
                    </Tooltip.Content>
                  </Tooltip.Portal>
                )}
              </AnimatePresence>
            </Tooltip.Root>
          </Tooltip.Provider>
        </motion.div>
      </SignedOut>
    </AnimatePresence>
  );
}
