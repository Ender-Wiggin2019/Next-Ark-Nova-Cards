import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';

import '@/styles/globals.css';
import '@/styles/arknova.css';
import '@/styles/odometer.css';
import '@/styles/clerk.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        async
        src='https://umami.ender-wiggin.com/script.js'
        data-website-id='f2a10fa7-5a6f-4329-9bdf-c239f51b6c52'
      ></Script>
      <Script
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/gtag/js?id=G-49MVJ63XFT'
      ></Script>
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-49MVJ63XFT', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
