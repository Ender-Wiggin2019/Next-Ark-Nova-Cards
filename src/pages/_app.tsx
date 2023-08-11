import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import '@/styles/ark.css';
import '@/styles/arknova.css';
import '@/styles/odometer.css';
import '@/styles/clerk.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default appWithTranslation(MyApp);
