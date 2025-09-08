/*
 * @Author: Ender-Wiggin
 * @Date: 2024-10-07 00:33:52
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-09-08 17:16:08
 * @Description:
 */
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SponsorCardList } from '@/components/cards/sponsor_cards/SponsorCardList';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

type Props = {
  // Add custom props here
};

export default function EndGamePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { t } = useTranslation('common');

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo
        templateTitle='People Sponsors'
        description='Collection of all people sponsors in Ark Nova'
      />
      <main>
        <div className='relative flex gap-4 px-4 pt-2'>
          <div className='text-3xl font-bold text-lime-600'>
            {t('People Sponsors')}
          </div>
        </div>
        <div className='mb-2 md:mb-8'></div>
        <SponsorCardList
          onCardCountChange={() => {
            /**/
          }}
          showHumanSponsors={true}
        />
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
