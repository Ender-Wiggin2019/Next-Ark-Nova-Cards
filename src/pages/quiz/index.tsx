'use client';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { CardSource } from '@/types/CardSource';

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  // 处理表单提交
  const handleSubmit = async () => {
    // return;
    try {
      const response = await fetch('/api/quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-API-Key': 'c&wUxR5V8jV$hZnSMcsD%',
        },
        body: JSON.stringify({
          gameConfig: {
            cardSources: [
              CardSource.BASE,
              CardSource.MARINE_WORLD,
              CardSource.PROMO,
            ],
            mapSources: [
              CardSource.BASE,
              CardSource.ALTERNATIVE,
              CardSource.PROMO,
            ],
            mode: 'default',
            players: 4,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);

      // 处理结果...
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Layout>
      <Seo
        templateTitle='Daily Quiz'
        description='Sharpen your gaming skills and deepen your understanding with Daily Quiz! Dive into fresh challenges every day, answer questions, and compare your stats with fellow quiz enthusiasts. Perfect for gamers looking to level up their strategy and knowledge in a fun, engaging way.'
      />

      <main>
        <section className='bg-white/0'>
          <button
            onClick={handleSubmit}
            className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            Submit Data
          </button>
        </section>
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
