'use client';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { Quiz } from '@/components/quiz/Quiz';
import { GameConfig } from '@/types/IQuiz';
import { CardSource } from '@/types/CardSource';
import { GameSetupGenerator } from '@/utils/GenerateRandomCards';
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RerollButton } from '@/components/quiz/Reroll';
export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const searchParams = useSearchParams();
  const seed = searchParams.get('seed');

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
      <Seo templateTitle='Random Quiz' />

      <main>
        <section className='bg-white/0 px-2 py-4'>
          {!seed && <RerollButton />}
          {seed && <Quiz seed={seed} gameConfig={gameConfig} />}
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
