'use client';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

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
        body: JSON.stringify({ setUpType: 'ALL EXP' }),
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
      <Seo templateTitle='Quiz' />

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
