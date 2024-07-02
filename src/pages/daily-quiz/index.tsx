'use client';

import { GetStaticProps } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import { Quiz } from '@/components/quiz/Quiz';
import { QuizResult } from '@/components/quiz/QuizResult';
import Seo from '@/components/Seo';

import { GameSetupGenerator } from '@/utils/GenerateRandomCards';

import { CardSource } from '@/types/CardSource';
import { GameConfig } from '@/types/IQuiz';
export default function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const seed = searchParams.get('seed');
  const result = searchParams.get('result');

  if (Array.isArray(seed)) {
    return null;
  }

  const gameConfig: GameConfig = {
    players: 2,
    cardSources: [CardSource.BASE, CardSource.MARINE_WORLD, CardSource.PROMO],
    mapSources: [CardSource.BASE, CardSource.ALTERNATIVE, CardSource.PROMO],
    mode: 'default',
  };

  const gameSetupGenerator = new GameSetupGenerator(seed || '', gameConfig);
  const setup = gameSetupGenerator.generateGameSetup();
  console.log(setup);

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
      <Seo templateTitle='Random Quiz' />

      <main>
        <section className='bg-white/0 px-2 py-4'>
          {/* {!seed && <RerollButton />} */}
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
