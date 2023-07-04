import React from 'react';
import { useTranslation } from 'react-i18next';

import Strength from '@/components/icons/actions/Strength';
import AnimalSizeIcon from '@/components/icons/buildings/AnimalSizeIcon';
import EmptySizeIcon from '@/components/icons/buildings/EmptySizeIcon';
import EnclosureIcon from '@/components/icons/buildings/EnclosureIcon';
import LargeBirdAviary from '@/components/icons/buildings/LargeBirdAviary';
import Snap from '@/components/icons/take_cards/Snap';
import TakeCardInRange from '@/components/icons/take_cards/TakeCardInRange';
import AppealIcon from '@/components/icons/tokens/AppealIcon';
import ConservationIcon from '@/components/icons/tokens/ConservationIcon';
import MoneyIcon from '@/components/icons/tokens/MoneyIcon';
import MultiplierToken from '@/components/icons/tokens/MultiplierToken';
import TagIcon from '@/components/icons/tokens/TagIcon';
import XToken from '@/components/icons/tokens/XToken';

import { Ability } from '@/types/KeyWords';
import { AnimalTag } from '@/types/Tags';

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
    // console.log(word);
    const match = pattern.exec(word);
    if (match) {
      const keywordAndParam = match[1].split('-');
      const keyword = keywordAndParam[0];
      const param = keywordAndParam.length > 1 ? keywordAndParam[1] : undefined;
      if (keyword === 'TakeCardInRange') {
        return <TakeCardInRange key={index} />;
      } else if (keyword === 'Snap') {
        return <Snap key={index} />;
      } else if (keyword === 'Slot') {
        return <Strength key={index} value={param || ''} />;
      } else if (keyword === 'Money') {
        return <MoneyIcon key={index} value={param || ''} />;
      } else if (keyword === 'Appeal') {
        return <AppealIcon key={index} value={param || ''} />;
      } else if (keyword === 'ConservationPoint') {
        return <ConservationIcon key={index} value={param || ''} />;
      } else if (keyword === 'XToken') {
        return <XToken key={index} />;
      } else if (keyword === 'MultiplierToken') {
        return <MultiplierToken key={index} />;
      } else if (keyword === 'LargeBirdAviary') {
        return <LargeBirdAviary key={index} />;
      } else if (keyword === 'Size' && param === 'Animal') {
        return <AnimalSizeIcon key={index} value={ability.value} />;
      } else if (keyword === 'Size' && param === 'Enclosure') {
        return <EnclosureIcon key={index} value={ability.value} />;
      } else if (keyword === 'Size' && param === 'X+') {
        return <EmptySizeIcon key={index} value={ability.value + '+'} />;
      } else if (keyword === 'HerbivoreTag') {
        return <TagIcon key={index} type={AnimalTag.Herbivore} />;
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
