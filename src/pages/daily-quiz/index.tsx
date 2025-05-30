'use client';

import { GetStaticProps } from 'next';
import { useSearchParams } from 'next/navigation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import { Quiz } from '@/components/quiz/Quiz';
import { QuizResult } from '@/components/quiz/QuizResult';
import Seo from '@/components/Seo';

import { BGA_CONFIG, DEFAULT_CONFIG, GameConfig } from '@/types/IQuiz';

export default function Page() {
  const searchParams = useSearchParams();
  const seed = searchParams.get('seed');
  const result = searchParams.get('result');
  const mode = seed?.[0] === 'a' ? 'arena' : 'default';
  if (Array.isArray(seed)) {
    return null;
  }

  const gameConfig: GameConfig = mode === 'arena' ? BGA_CONFIG : DEFAULT_CONFIG;

  return (
    <Layout>
      <Seo templateTitle='Daily Quiz' />

      <main>
        <section className='bg-white/0 px-2 py-4'>
          {seed && !result && (
            <Quiz seed={seed} gameConfig={gameConfig} isDailyQuiz={true} />
          )}
          {seed && result && (
            <QuizResult
              seed={seed}
              gameConfig={gameConfig}
              isDailyQuiz={true}
            />
          )}
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
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
