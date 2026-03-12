import { RotateCcw } from 'lucide-react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { SortButton } from '@/components/buttons/SortButton';
import { AnimalCardList } from '@/components/cards/animal_cards/AnimalCardList';
import { SponsorCardList } from '@/components/cards/sponsor_cards/SponsorCardList';
import { CardSourceFilter } from '@/components/filters/CardSourceFilter';
import { CardTypeFilter } from '@/components/filters/CardTypeFilter';
import { RequirementFilter } from '@/components/filters/RequirementFilter';
import { SizeFilter } from '@/components/filters/SizeFilter';
import { StrengthFilter } from '@/components/filters/StrengthFilter';
import { TagFilter } from '@/components/filters/TagFilter';
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
import { Tag } from '@/types/Tags';

type Props = {
  // Add custom props here
};

export default function HomePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [reset, setReset] = useState<boolean>(false);

  const includeFanMade = router.query.fan === '1';

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<Tag[]>([]);
  const [textFilter, setTextFilter] = useState<string>('');
  const [selectedCardTypes, setSelectedCardTypes] = useState<CardType[]>([]);
  const [selectedCardSources, setSelectedCardSources] = useState<CardSource[]>(
    [],
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ID_ASC);
  const [size, setSize] = useState<number[]>([0]);
  const [strength, setStrength] = useState<number[]>([0]);

  const [animalCardsCount, setAnimalCardsCount] = useState<number>(0);
  const [sponsorCardsCount, setSponsorCardsCount] = useState<number>(0);

  useEffect(() => {
    if (
      selectedCardTypes.length !== 0 &&
      !selectedCardTypes.includes(CardType.ANIMAL_CARD)
    ) {
      setAnimalCardsCount(0);
    }
    if (
      selectedCardTypes.length !== 0 &&
      !selectedCardTypes.includes(CardType.SPONSOR_CARD)
    ) {
      setSponsorCardsCount(0);
    }
  }, [selectedCardTypes]);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const resetAll = () => {
    setSelectedTags([]);
    setSelectedRequirements([]);
    setTextFilter('');
    setSelectedCardTypes([]);
    setSelectedCardSources([]);
    setSortOrder(SortOrder.ID_ASC);
    setSize([0]);
    setStrength([0]);
    setReset(true);
  };

  return (
    <Layout>
      <Seo />

      {includeFanMade && <FanModeBanner />}

      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4 px-3 py-3 md:px-6'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <CardTypeFilter
              cardTypes={[CardType.ANIMAL_CARD, CardType.SPONSOR_CARD]}
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
          <TagFilter
            onFilterChange={setSelectedTags}
            reset={reset}
            includeFanMade={includeFanMade}
          />
          <RequirementFilter
            onFilterChange={setSelectedRequirements}
            reset={reset}
          />
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
          <div className='flex flex-wrap items-center gap-2 md:gap-3'>
            <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <SizeFilter onFilterChange={setSize} reset={reset} />
            <StrengthFilter onFilterChange={setStrength} reset={reset} />
          </div>
          <div className='flex flex-wrap items-center gap-2 md:gap-3'>
            <CardOdometer
              value={animalCardsCount}
              name={t('Animal')}
              className='text-amber-500 hover:text-amber-600'
            />
            <CardOdometer
              value={sponsorCardsCount}
              name={t('Sponsor')}
              className='text-sky-600 hover:text-sky-700'
            />
          </div>
        </div>
        <div className='relative'>
          {(selectedCardTypes.length === 0 ||
            selectedCardTypes.includes(CardType.ANIMAL_CARD)) && (
            <AnimalCardList
              selectedTags={selectedTags}
              selectedRequirements={selectedRequirements}
              selectedCardSources={selectedCardSources}
              textFilter={textFilter}
              sortOrder={sortOrder}
              onCardCountChange={setAnimalCardsCount}
              size={size}
              includeFanMade={includeFanMade}
            />
          )}
          {(selectedCardTypes.length === 0 ||
            selectedCardTypes.includes(CardType.SPONSOR_CARD)) && (
            <SponsorCardList
              selectedTags={selectedTags}
              selectedRequirements={selectedRequirements}
              selectedCardSources={selectedCardSources}
              textFilter={textFilter}
              sortOrder={sortOrder}
              onCardCountChange={setSponsorCardsCount}
              strength={strength}
              includeFanMade={includeFanMade}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
