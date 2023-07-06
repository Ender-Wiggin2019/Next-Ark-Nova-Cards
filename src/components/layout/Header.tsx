import * as React from 'react';

import LocaleSelector from '@/components/layout/LocaleSelector';
import UnstyledLink from '@/components/links/UnstyledLink';

import { NavigationBar } from './NavigationBar';

const links = [
  { href: '/', label: 'Route 1' },
  { href: '/', label: 'Route 2' },
];

export function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink>
        <div className='flex flex-1 justify-end md:justify-center'>
          <NavigationBar.Mobile className='pointer-events-auto relative z-50 md:hidden' />
          <NavigationBar.Desktop className='pointer-events-auto relative z-50 hidden md:block' />
        </div>
        <LocaleSelector />
      </div>
    </header>
  );
}
