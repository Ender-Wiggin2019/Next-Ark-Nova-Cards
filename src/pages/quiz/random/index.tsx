/*
 * @Author: Ender-Wiggin
 * @Date: 2024-07-07 17:11:51
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-09-08 17:12:45
 * @Description:
 */
'use client';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  // const gameSetupGenerator = new GameSetupGenerator(seed || '', gameConfig);

  return (
    <Layout>
      <Seo templateTitle='Random Quiz' />

      <div className='px-3 py-8 md:px-6'>
        <p className='text-center text-muted-foreground'>
          Due to the Server pressure, this page is temporarily disabled.
        </p>
      </div>
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
