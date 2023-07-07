import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';

import { AnimalCardList } from '@/components/cards/animal_cards/AnimalCardList';
import { SponsorCardList } from '@/components/cards/sponsor_cards/SponsorCardList';
import { CardTypeFilter } from '@/components/filters/CardTypeFilter';
import { RequirementFilter } from '@/components/filters/RequirementFilter';
import { TagFilter } from '@/components/filters/TagFilter';
import { TextFilter } from '@/components/filters/TextFilter'; // make sure to import your TextFilter
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { CardType } from '@/types/Card';
import { Tag } from '@/types/Tags';

type Props = {
  // Add custom props here
};

export default function HomePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<Tag[]>([]);
  const [textFilter, setTextFilter] = useState<string>(''); // add this line
  const [selectedCardTypes, setSelectedCardTypes] = useState<CardType[]>([]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div className=''>
          <div className='flex flex-col space-y-4 p-2'>
            <CardTypeFilter onFilterChange={setSelectedCardTypes} />
            <TagFilter onFilterChange={setSelectedTags} />
            <RequirementFilter onFilterChange={setSelectedRequirements} />
            <TextFilter onTextChange={setTextFilter} />
          </div>
          <div className='mb-36'></div>
          {(selectedCardTypes.length === 0 ||
            selectedCardTypes.includes(CardType.ANIMAL_CARD)) && (
            <AnimalCardList
              selectedTags={selectedTags}
              selectedRequirements={selectedRequirements}
              textFilter={textFilter}
            />
          )}
          {(selectedCardTypes.length === 0 ||
            selectedCardTypes.includes(CardType.SPONSOR_CARD)) && (
            <SponsorCardList
              selectedTags={selectedTags}
              selectedRequirements={selectedRequirements}
              textFilter={textFilter}
            />
          )}
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
