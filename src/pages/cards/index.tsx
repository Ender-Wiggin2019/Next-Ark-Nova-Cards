import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';

import { AnimalCardList } from '@/components/cards/animal_cards/AnimalCardList';
import { SponsorCardList } from '@/components/cards/sponsor_cards/SponsorCardList';
import { RequirementFilter } from '@/components/filters/RequirementFilter';
import { TagFilter } from '@/components/filters/TagFilter';
import { TextFilter } from '@/components/filters/TextFilter'; // make sure to import your TextFilter

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

  return (
    <div>
      <TagFilter onFilterChange={setSelectedTags} />
      <RequirementFilter onFilterChange={setSelectedRequirements} />
      <TextFilter onTextChange={setTextFilter} /> {/* add this line */}
      <div className='mb-48'></div>
      <AnimalCardList
        selectedTags={selectedTags}
        selectedRequirements={selectedRequirements}
        textFilter={textFilter}
      />
      <SponsorCardList
        selectedTags={selectedTags}
        selectedRequirements={selectedRequirements}
        textFilter={textFilter}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
