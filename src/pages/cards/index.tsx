import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { FiRotateCcw } from 'react-icons/fi';

import { SortButton } from '@/components/buttons/SortButton';
import { EndGameCardList } from '@/components/cards/endgame_cards/EndGameCardList';
import { ProjectCardList } from '@/components/cards/project_cards/ProjectCardList';
import { CardSourceFilter } from '@/components/filters/CardSourceFilter';
import { CardTypeFilter } from '@/components/filters/CardTypeFilter';
import { TextFilter } from '@/components/filters/TextFilter';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { CardOdometer } from '@/components/ui/CardOdometer';
import { Separator } from '@/components/ui/separator';

import { CardType } from '@/types/Card';
import { CardSource } from '@/types/CardSource';
import { SortOrder } from '@/types/Order';

type Props = {
  // Add custom props here
};

export default function EndGamePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common');
  const [conservationCount, setConservationCount] = useState<number>(0);
  const [endGameCardsCount, setEndGameCardsCount] = useState<number>(0);
  const [reset, setReset] = useState<boolean>(false);
  const [textFilter, setTextFilter] = useState<string>(''); // add this line
  const [selectedCardTypes, setSelectedCardTypes] = useState<CardType[]>([]);
  const [selectedCardSources, setSelectedCardSources] = useState<CardSource[]>(
    []
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ID_ASC);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const resetAll = () => {
    setTextFilter('');
    setSelectedCardTypes([]);
    setSelectedCardSources([]);
    setConservationCount(0);
    setEndGameCardsCount(0);
    setSortOrder(SortOrder.ID_ASC);

    setReset(true);
  };
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='Cards' />

      <main>
        <div className='flex flex-col space-y-4 px-2 py-2 md:px-4'>
          <div className='flex flex-col md:flex-row'>
            <CardTypeFilter
              cardTypes={[CardType.CONSERVATION_CARD, CardType.END_GAME_CARD]}
              onFilterChange={setSelectedCardTypes}
              reset={reset}
            />
            <Separator orientation='vertical' className='mr-5 bg-zinc-900' />
            <CardSourceFilter
              onFilterChange={setSelectedCardSources}
              reset={reset}
            />
          </div>
          <div className='flex flex-row space-x-4'>
            <TextFilter onTextChange={setTextFilter} reset={reset} />
            <div
              onClick={resetAll}
              className='group flex w-auto items-center justify-between space-x-2 rounded-2xl rounded-md bg-zinc-600 px-4 py-2 text-lg font-medium text-zinc-100 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md hover:bg-zinc-500 hover:text-lime-400 focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'
            >
              <FiRotateCcw className='' />
            </div>
          </div>
          <div className='flex flex-row space-x-4'>
            <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
          <div className='flex flex-row space-x-4'>
            <CardOdometer
              value={conservationCount}
              name={t('Conservation')}
              className='text-lime-500 hover:text-lime-600'
            />
            <CardOdometer
              value={endGameCardsCount}
              name={t('Endgame')}
              className='text-amber-500 hover:text-amber-600'
            />
          </div>
        </div>
        <div className='mb-2 md:mb-8'></div>
        {(selectedCardTypes.includes(CardType.CONSERVATION_CARD) ||
          selectedCardTypes.length === 0) && (
          <ProjectCardList
            selectedCardSources={selectedCardSources}
            textFilter={textFilter}
            // sortOrder={sortOrder}
            onCardCountChange={setConservationCount}
          />
        )}
        {(selectedCardTypes.includes(CardType.END_GAME_CARD) ||
          selectedCardTypes.length === 0) && (
          <EndGameCardList
            selectedCardSources={selectedCardSources}
            textFilter={textFilter}
            sortOrder={sortOrder}
            onCardCountChange={setEndGameCardsCount}
          />
        )}
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
