import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { MapBoards } from '@/data/MapBoards';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import TextButton from '@/components/buttons/TextButton';
import { Comments } from '@/components/comments/Comments';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { MapBoard } from '@/types/MapBoard';
import Link from 'next/link';
type Props = {
  // Add custom props here
};

export default function HomePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common');
  const [selectedMap, setSelectedMap] = React.useState<MapBoard>(MapBoards[0]);

  function handleSelectMap(map: MapBoard) {
    setSelectedMap(map);
  }
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='flex flex-col space-y-4 px-2 py-2 md:px-4'>
        <div className='grid grid-cols-3 justify-center gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {MapBoards.map((mapBoard) => (
            <div key={mapBoard.id} className='justify-self-center'>
              <TextButton
                selected={selectedMap === mapBoard}
                className='h-12 hover:text-lime-600'
                selectClassName='text-lime-600 ring-lime-600/90 ring-2'
                onClick={() => handleSelectMap(mapBoard)}
              >
                {t(mapBoard.name)}
              </TextButton>
            </div>
          ))}
        </div>
        <div className='mt-24 flex w-full flex-col items-start justify-center rounded-lg bg-white/80 p-2 shadow-lg lg:p-4'>
          <Image
            alt='aaa'
            src={`/img/maps/${selectedMap.image}.jpg`}
            className='w-full rounded-md object-contain shadow-lg'
            width={1000}
            height={1000}
          />
          <h1 className='scroll-m-20 pt-4 text-2xl font-extrabold tracking-tight text-lime-700 lg:text-4xl'>
            {t(selectedMap.name)}
          </h1>
          {selectedMap.description.length > 0 && (
            <p className='self-start leading-7 [&:not(:first-child)]:mt-6'>
              {t(selectedMap.description[0])}
            </p>
          )}
          {selectedMap.description.length > 1 && (
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>{t('maps.tips')}</AccordionTrigger>
                <AccordionContent>
                  <ul className='my-6 ml-6 list-disc'>
                    {selectedMap.description
                      .slice(1)
                      .map((description, index) => (
                        <li key={index}>{t(description)}</li>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
        <Comments cardId={selectedMap.id} />
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
