import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { IconFactory } from '@/components/icons/IconFactory';
import { IconName } from '@/types/IconName';
import { BaseEndGameCard } from '@/components/cards/endgame_cards/BasedEndGameCard';
import { EndGameCard } from '@/types/EndGameCard';

type Props = {
  // Add custom props here
};

export default function EndGamePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common');
  const endgame: EndGameCard = {
    id: '1',
    dataId: 'F001_LargeAnimalZoo',
    name: 'sss',
    image: '',
    description: '111',
    topIcon: { iconName: IconName.INVENTIVE },
    bottomIcon: { iconName: IconName.APPEAL },
    scoreArray: [
      { requirement: 4, conservationPoint: 1 },
      { requirement: 4, conservationPoint: 2 },
      { requirement: 5, conservationPoint: 3 },
      { requirement: 5, conservationPoint: 4 },
    ],
  };
  return (
    <Layout>
      <Seo templateTitle='Ark Nova Maps' />

      <div className='flex flex-col px-2 py-2 md:px-4'>
        <BaseEndGameCard card={endgame} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
