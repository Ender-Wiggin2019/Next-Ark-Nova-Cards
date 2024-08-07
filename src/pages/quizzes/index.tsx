import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import { QuizList } from '@/components/quiz/QuizList';
import Seo from '@/components/Seo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <Seo templateTitle='Quizzes' />
      <Seo />

      <main>
        <Tabs defaultValue='default' className='mt-6 w-full'>
          <TabsList>
            <TabsTrigger value='default'>
              {t('All Expansions Mode')}
            </TabsTrigger>
            <TabsTrigger value='arena'>{t('BGA Arena Mode')}</TabsTrigger>
          </TabsList>
          <TabsContent value='default' className='w-full'>
            <div>
              <QuizList mode='default' />
            </div>
          </TabsContent>
          <TabsContent value='arena'>
            {' '}
            <div>
              <QuizList mode='arena' />
            </div>
          </TabsContent>
        </Tabs>
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
