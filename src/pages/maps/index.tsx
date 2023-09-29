import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';

import { MapBoards } from '@/data/MapBoards';

import TextButton from '@/components/buttons/TextButton';
import { Comments } from '@/components/comments/Comments';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { MapBoard } from '@/types/MapBoard';
type Props = {
  // Add custom props here
};

export default function HomePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const queryMapBoard = getMapFromQuery();
  const [selectedMap, setSelectedMap] = React.useState<MapBoard>(queryMapBoard);
  function handleSelectMap(map: MapBoard) {
    setSelectedMap(map);
    router.push('/maps/?map=' + map.id, undefined, { shallow: true });
  }

  useEffect(() => {
    const map = getMapFromQuery();
    setSelectedMap(map || MapBoards[0]);
  }, [router.query.map]);

  function getMapFromQuery(): MapBoard {
    const id = router.query.map ? router.query.map : MapBoards[0].id;
    const map = MapBoards.find((map) => map.id === id);
    return map || MapBoards[0];
  }
  return (
    <Layout>
      <Seo templateTitle='Ark Nova Maps' />

      <div className='flex flex-col px-2 py-2 md:px-4'>
        <div className='grid grid-cols-3 justify-center gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {MapBoards.map((mapBoard) => (
            <div key={mapBoard.id} className='w-min justify-self-center'>
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
        <div className='mt-4 flex w-full flex-col items-start justify-center rounded-lg bg-white/80 p-2 shadow-lg lg:p-4'>
          <Image
            alt={selectedMap.name}
            priority={true}
            src={`/img/maps/${selectedMap.image}.jpg`}
            className='w-full rounded-md object-contain shadow-lg'
            quality={85}
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
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
