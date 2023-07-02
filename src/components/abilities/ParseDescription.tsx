import React from 'react';
import { useTranslation } from 'react-i18next';

import Snap from '@/components/icons/take_cards/Snap';
import TakeCardInRange from '@/components/icons/take_cards/TakeCardInRange';

import { Ability } from '@/types/KeyWords';

interface ParseDescriptionProps {
  ability: Ability;
}

const ParseDescription: React.FC<ParseDescriptionProps> = ({ ability }) => {
  const { t } = useTranslation();
  const translatedTemplate = t(ability.keyword.descriptionTemplate);
  const valueFilledTemplate = translatedTemplate.replace(
    '{}',
    String(ability.value)
  );

  // 根据关键字替换成对应的组件
  const pattern = /{(.*?)}/g;
  const parsedComponents = valueFilledTemplate.split(' ').map((word, index) => {
    const match = pattern.exec(word);
    if (match) {
      const keyword = match[1];
      if (keyword === 'TakeCardInRange') {
        return <TakeCardInRange key={index} />;
      } else if (keyword === 'Snap') {
        return <Snap key={index} />;
      }
    }
    return word;
  });

  return (
    <div>
      {parsedComponents.map((component, index) => (
        <React.Fragment key={index}>{component} </React.Fragment>
      ))}
    </div>
  );
};

export default ParseDescription;
