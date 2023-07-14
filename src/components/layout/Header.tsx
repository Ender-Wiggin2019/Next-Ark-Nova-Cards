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
    <header className='sticky top-0 z-50 bg-white/75 backdrop-blur-md backdrop-filter'>
      <div className='layout flex h-14 items-center justify-between p-4'>
        <div className='flex hidden w-60 justify-start md:contents'>
          <UnstyledLink href='/' className='font-bold hover:text-lime-600'>
            Ark Nova Unofficial Website
          </UnstyledLink>
        </div>
        <div className='flex flex-1 grow justify-end md:justify-center'>
          <NavigationBar.Mobile className='pointer-events-auto relative z-50 md:hidden' />
          <NavigationBar.Desktop className='pointer-events-auto relative z-50 hidden md:block' />
        </div>
        <div className='flex w-48 justify-end'>
          <LocaleSelector />
        </div>
      </div>
    </header>
  );
}
