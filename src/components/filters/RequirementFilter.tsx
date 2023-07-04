// RequirementFilter.tsx
import React, { useState } from 'react';

import TagButton from '@/components/buttons/TagButton';

import { AnimalTag, ContinentTag, OtherTag, Tag } from '@/types/Tags';

export const RequirementFilter: React.FC<{
  onFilterChange: (tags: Tag[]) => void;
}> = ({ onFilterChange }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // console.log(selectedTags);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const otherTagRequirements: OtherTag[] = [
    OtherTag.Science,
    OtherTag.AnimalsII,
    OtherTag.SponsorsII,
    OtherTag.Appeal,
    OtherTag.Partner_Zoo,
    OtherTag.Reputation,
    OtherTag.Rock,
    OtherTag.Water,
    OtherTag.University,
  ];

  // logic: and, or

  React.useEffect(() => {
    onFilterChange(selectedTags);
  }, [selectedTags]);

  return (
    <div>
      {Object.values(AnimalTag).map((tag, index) => (
        <TagButton
          key={index}
          tag={tag}
          onClick={() => toggleTag(tag)}
          selected={selectedTags.includes(tag)}
        />
      ))}

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
  );
};
