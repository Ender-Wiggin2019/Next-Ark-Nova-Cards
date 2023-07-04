import React, { useState } from 'react';

import { AnimalCardList } from '@/components/cards/animalCards/AnimalCardList';
import { RequirementFilter } from '@/components/filters/RequirementFilter';
import { TagFilter } from '@/components/filters/TagFilter';
import { TextFilter } from '@/components/filters/TextFilter'; // make sure to import your TextFilter

import { Tag } from '@/types/Tags';

export default function HomePage() {
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
    </div>
  );
}
