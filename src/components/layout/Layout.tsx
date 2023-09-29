// import { Analytics } from '@vercel/analytics/react';
import React, { Suspense } from 'react';

import { Header } from '@/components/layout/Header';
import { QueryProvider } from '@/components/layout/QueryProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 select-none bg-[url('/svg/ark_nova_bg.svg')] bg-top bg-repeat dark:bg-[url('/grid.svg')]" />
      <span className='pointer-events-none fixed top-0 block h-[800px] w-full select-none bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(5,5,5,0.045)_0%,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(103.72%_46.58%_at_50%_0%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_100%)]' />

      <div className='fixed inset-0 flex justify-center sm:px-8'>
        <div className='flex w-full max-w-7xl lg:px-8'>
          <div className='w-full bg-zinc-50/80 ring-1 ring-lime-500 dark:bg-zinc-900/80 dark:ring-zinc-400/20' />
        </div>
      </div>

      <Header />
      <QueryProvider>
        <div className='relative text-zinc-800 dark:text-zinc-800'>
          <main className='flex flex-col items-center'>
            {/* <-- Add styles here */}
            <div className='w-full sm:px-8 sm:md:max-w-3xl md:max-w-4xl lg:max-w-4xl xl:max-w-6xl'>
              {/* <-- Add this div */}
              {children}
            </div>
          </main>
          <Suspense>{/*<Footer />*/}</Suspense>
        </div>
      </QueryProvider>
      {/*<Analytics />*/}
    </>
  );
}
