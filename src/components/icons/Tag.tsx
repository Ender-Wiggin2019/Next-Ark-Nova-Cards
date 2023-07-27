import React from 'react';

import { AnimalTag, ContinentTag, OtherTag, Tag } from '@/types/Tags';

interface TagProps {
  type: Tag;
}

// key is the same as the css class name
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

const TagComponent: React.FC<TagProps> = ({ type }) => {
  const dataType = formatDataType(type);
  // special render rules
  if (dataType === 'Reputation_3') {
    return (
      <div className='badge-icon' data-type='Reputation'>
        3
      </div>
    );
  } else {
    return <div className='badge-icon' data-type={dataType}></div>;
  }
};

export default TagComponent;
