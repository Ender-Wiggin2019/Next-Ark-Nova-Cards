import { Head, Html, Main, NextScript } from 'next/document';

import { Toaster } from '@/components/ui/sonner';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <Toaster />
        <NextScript />
      </body>
    </Html>
  );
}
