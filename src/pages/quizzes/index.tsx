import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/layout/Layout';
import { QuizList } from '@/components/quiz/QuizList';
import Seo from '@/components/Seo';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { enableDb } from '@/constant/env';

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <Seo templateTitle='Quizzes' />
      <Seo />

      <main>
        <div className='mt-4 p-2'>
          {!enableDb && (
            <Alert className='bg-orange-500/90 border-orange-400'>
              <AlertDescription>
                <div className='flex items-center justify-start gap-4'>
                  <div className='h-6 w-6 rounded-full bg-orange-600 flex items-center justify-center'>
                    <span className='text-white text-sm font-bold'>!</span>
                  </div>
                  <div className='max-w-2xl text-white'>
                    <p className='font-semibold'>
                      {t('quiz.maintenance.title')}
                    </p>
                    <p className='text-sm mt-1'>
                      {t('quiz.maintenance.description')}
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
          {/* <Alert className='bg-[#5765f2]/90'>
            <AlertDescription>
              <div className='flex items-center justify-start gap-4'>
                <FaDiscord className='h-6 w-6 text-white' />
                <div className='max-w-2xl text-white'>
                  <Trans i18nKey='quiz.banner_desc'>
                    Join the
                    <Link
                      className='font-medium text-white underline underline-offset-4'
                      href='https://discord.gg/8ffMZATB'
                    >
                      Discord Group
                    </Link>
                    to discuss daily quizzes and any stuff about Ark Nova.
                  </Trans>
                </div>
              </div>
            </AlertDescription>
          </Alert> */}
        </div>
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
