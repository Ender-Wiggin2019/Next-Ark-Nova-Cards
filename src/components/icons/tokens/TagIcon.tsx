import React from 'react';

import { AnimalTag, ContinentTag, OtherTag, Tag } from '@/types/Tags';

interface TagProps {
  type: Tag;
}

const getKeyByValue = (enumObject: any, value: string): string => {
  for (const enumMember in enumObject) {
    if (enumObject[enumMember] === value) {
      return enumMember;
    }
  }
  return '';
};

const formatDataType = (tag: Tag): string => {
  // The keys are combined enum objects
  const keys = { ...AnimalTag, ...ContinentTag, ...OtherTag };
  // eslint-disable-next-line no-console
  return getKeyByValue(keys, tag);
};

const TagIcon: React.FC<TagProps> = ({ type }) => {
  return (
    <div className={`icon-container icon-container-${formatDataType(type)}`}>
      <div
        className='arknova-icon badge-icon'
        data-type={formatDataType(type)}
      ></div>
    </div>
  );
};

export default TagIcon;
