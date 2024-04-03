import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import { QuizList } from '@/components/quiz/QuizList';
import Seo from '@/components/Seo';

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div>
          <QuizList />
        </div>
      </main>
    </Layout>
  );
}

type Props = {
  // Add custom props here
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
