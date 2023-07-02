import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { AnimalCardList } from '@/components/cards/animalCards/AnimalCardList';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { getStaticPropsTranslations } from '@/utils/i18n';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <AnimalCardList />
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
    },
  };
}
