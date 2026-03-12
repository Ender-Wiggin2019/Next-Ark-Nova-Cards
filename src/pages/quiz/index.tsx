/** biome-ignore-all lint/suspicious/noConsole: <> */
'use client';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';

import { CardSource } from '@/types/CardSource';

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  // 处理表单提交
  const handleSubmit = async () => {
    // return;
    try {
      const response = await fetch('/api/quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

      <div className='flex flex-col items-center px-3 py-8 md:px-6'>
        <Button onClick={handleSubmit} variant='nature' size='lg'>
          Submit Data
        </Button>
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
