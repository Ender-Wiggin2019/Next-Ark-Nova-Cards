import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';

import { MapBoards } from '@/data/MapBoards';
import { AlternativeMapBoards } from '@/data/AlternativeMapBoards';

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
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
type Props = {
  // Add custom props here
};

export default function HomePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [alternativeMaps, setAlternativeMaps] = useState(false);
  const maps = alternativeMaps ? AlternativeMapBoards : MapBoards;
  const queryMapBoard = getMapFromQuery();
  const [selectedMap, setSelectedMap] = useState<MapBoard>(queryMapBoard);
  function handleSelectMap(map: MapBoard) {
    setSelectedMap(map);
    router.push('/maps/?map=' + map.id, undefined, { shallow: true });
  }

  useEffect(() => {
    const map = getMapFromQuery();
    setSelectedMap(map || maps[0]);
  }, [router.query.map, alternativeMaps]);

  function getMapFromQuery(): MapBoard {
    const id = router.query.map ? router.query.map : maps[0].id;
    const map = maps.find((map) => map.id === id);
    return map || maps[0];
  }

  function handleMapChange() {
    setAlternativeMaps(!alternativeMaps);
  }
  return (
    <Layout>
      <Seo templateTitle='Ark Nova Maps & Alternatives' />

      <div className='flex flex-col gap-4 px-2 py-2 md:px-4'>
        <Alert className='bg-lime-500/40'>
          <Sparkles className='h-4 w-4' />
          <AlertTitle>{t('maps.alternative_title')}</AlertTitle>
          <AlertDescription>
            <div className='flex justify-start gap-4'>
              <div className='max-w-2xl'>
                <Trans i18nKey='maps.alternative_desc'>
                  Check the
                  <Link
                    className='font-medium text-primary underline underline-offset-4'
                    href='https://github.com/Ender-Wiggin2019/Next-Ark-Nova-Cards/tree/main#help-to-translate'
                  >
                    post
                  </Link>
                  for more information. You can now switch between the original
                  and alternative maps.
                </Trans>
              </div>
              <Switch
                checked={alternativeMaps}
                onCheckedChange={handleMapChange}
              />
            </div>
          </AlertDescription>
        </Alert>

        <div className='grid grid-cols-3 justify-center gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {maps.map((mapBoard, index) => (
            <div key={mapBoard.name} className='w-min justify-self-center'>
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
        <div className='flex w-full flex-col items-start justify-center rounded-lg bg-white/80 p-2 shadow-lg lg:p-4'>
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
