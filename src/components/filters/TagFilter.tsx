// TagFilter.tsx
import React, { useState } from 'react';

import TagButton from '@/components/buttons/TagButton';

import { AnimalTag, ContinentTag, OtherTag, Tag } from '@/types/Tags';

type TagFilterProps = {
  onFilterChange: (tags: Tag[]) => void;
  reset: boolean;
};
export const TagFilter: React.FC<TagFilterProps> = ({
  onFilterChange,
  reset,
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  React.useEffect(() => {
    if (reset) {
      setSelectedTags([]);
    }
  }, [reset]);

  const otherTagRequirements: OtherTag[] = [OtherTag.Science];

  // logic: and, or

  React.useEffect(() => {
    onFilterChange(selectedTags);
  }, [selectedTags]);

  return (
    <>
      <div className=''>
        {Object.values(AnimalTag).map((tag, index) => (
          <TagButton
            key={index}
            tag={tag}
            onClick={() => toggleTag(tag)}
            selected={selectedTags.includes(tag)}
          />
        ))}
        {/*</div>*/}
        {/*  <div>*/}
        {/*<LogicButton logic={} selected={} />*/}
        {Object.values(ContinentTag).map((tag, index) => (
          <TagButton
            key={index}
            tag={tag}
            onClick={() => toggleTag(tag)}
            selected={selectedTags.includes(tag)}
          />
        ))}

        {otherTagRequirements.map((tag, index) => (
          <TagButton
            key={index}
            tag={tag}
            onClick={() => toggleTag(tag)}
            selected={selectedTags.includes(tag)}
          />
        ))}
      </div>
    </>
  );
};
