import React from 'react';

import { AnimalTag, ContinentTag, OtherTag, Tag } from '@/types/Tags';
import { cn } from '@/lib/utils';

interface TagProps {
  type: Tag;
  notBadge?: boolean;
  slotCubeHolder?: boolean;
}

const getKeyByValue = (enumObject: any, value: string): string => {
  for (const enumMember in enumObject) {
    if (enumObject[enumMember] === value) {
      return enumMember;
    }
  }
  return '';
};

const notBadgeList: Tag[] = [OtherTag.ANIMAL_SIZE_4, OtherTag.ANIMAL_SIZE_2];
const formatDataType = (tag: Tag): string => {
  // The keys are combined enum objects
  const keys = { ...AnimalTag, ...ContinentTag, ...OtherTag };
  // eslint-disable-next-line no-console
  return getKeyByValue(keys, tag);
};

/**
 * TagIcon component
 * @param type
 * @param notBadge
 * @constructor
 */
const TagIcon: React.FC<TagProps> = ({ type, notBadge, slotCubeHolder }) => {
  if (notBadgeList.includes(type)) {
    notBadge = true;
  }
  if (slotCubeHolder) {
    return (
      // <div className={`icon-container icon-container-${formatDataType(type)}`}>
      <div
        className={cn('project-card-slot-cube-holder badge-icon')}
        data-type={formatDataType(type)}
      ></div>
      // </div>
    );
  } else if (notBadge) {
    // not badge, can be a normal card
    // console.log('')
    return (
      <div className={`icon-container icon-container-${type}`}>
        <div className={`arknova-icon icon-${type}`}></div>
      </div>
    );
  } else {
    return (
      <div className={`icon-container icon-container-${formatDataType(type)}`}>
        <div
          className={cn('arknova-icon badge-icon')}
          data-type={formatDataType(type)}
        ></div>
      </div>
    );
  }
};

export default TagIcon;
