import { RotateCcw } from 'lucide-react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { SortButton } from '@/components/buttons/SortButton';
import { EndGameCardList } from '@/components/cards/endgame_cards/EndGameCardList';
import { ProjectCardList } from '@/components/cards/project_cards/ProjectCardList';
import { CardSourceFilter } from '@/components/filters/CardSourceFilter';
import { CardTypeFilter } from '@/components/filters/CardTypeFilter';
import { TextFilter } from '@/components/filters/TextFilter';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { CardOdometer } from '@/components/ui/CardOdometer';
import { FanModeBanner } from '@/components/ui/FanModeBanner';
import { Separator } from '@/components/ui/separator';

import { CardType } from '@/types/Card';
import { CardSource } from '@/types/CardSource';
import { SortOrder } from '@/types/Order';

type Props = {
  // Add custom props here
};

export default function EndGamePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [conservationCount, setConservationCount] = useState<number>(0);
  const [endGameCardsCount, setEndGameCardsCount] = useState<number>(0);
  const [reset, setReset] = useState<boolean>(false);
  const [textFilter, setTextFilter] = useState<string>(''); // add this line
  const [selectedCardTypes, setSelectedCardTypes] = useState<CardType[]>([]);
  const [selectedCardSources, setSelectedCardSources] = useState<CardSource[]>(
    [],
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ID_ASC);

  const includeFanMade = router.query.fan === '1';

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

      {includeFanMade && <FanModeBanner />}

      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4 px-3 py-3 md:px-6'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <CardTypeFilter
              cardTypes={[CardType.CONSERVATION_CARD, CardType.END_GAME_CARD]}
              onFilterChange={setSelectedCardTypes}
              reset={reset}
            />
            <Separator
              orientation='vertical'
              className='hidden bg-border md:block'
            />
            <CardSourceFilter
              onFilterChange={setSelectedCardSources}
              reset={reset}
              includeFanMade={includeFanMade}
            />
          </div>
          <div className='flex items-center gap-3'>
            <TextFilter onTextChange={setTextFilter} reset={reset} />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={resetAll}
              aria-label={t('Reset filters')}
              className='shrink-0 bg-sage-700 text-white hover:bg-sage-600 hover:text-white dark:bg-sage-800 dark:hover:bg-sage-700'
            >
              <RotateCcw className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex items-center gap-3'>
            <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
          <div className='flex items-center gap-4'>
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
        {(selectedCardTypes.includes(CardType.CONSERVATION_CARD) ||
          selectedCardTypes.length === 0) && (
          <ProjectCardList
            selectedCardSources={selectedCardSources}
            textFilter={textFilter}
            onCardCountChange={setConservationCount}
            includeFanMade={includeFanMade}
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
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
