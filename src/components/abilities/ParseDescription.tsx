import { useTranslation } from 'next-i18next';
import React from 'react';

import ActionCardIcon from '@/components/icons/actions/ActionCardIcon';
import Determination from '@/components/icons/actions/Determination';
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

import { ActionCardType } from '@/types/ActionCard';
import { Effect } from '@/types/Effect';
import { Ability } from '@/types/KeyWords';
import { AnimalTag } from '@/types/Tags';

interface ParseDescriptionProps {
  desc: Ability | Effect;
}

const ParseDescription: React.FC<ParseDescriptionProps> = ({ desc }) => {
  const { t } = useTranslation('common');

  // console.log(desc);
  const translatedTemplate =
    desc instanceof Ability
      ? t(desc.keyword.descriptionTemplate)
      : desc.effectDesc;
  const valueFilledTemplate =
    desc instanceof Ability
      ? translatedTemplate.replace('{}', String(desc.value))
      : translatedTemplate;

  // 根据关键字替换成对应的组件
  const pattern = /{(.*?)}/g;
  const parsedComponents = valueFilledTemplate.split(' ').map((word, index) => {
    // console.log(word);
    const match = pattern.exec(word);
    if (match) {
      const keywordAndParam = match[1].split('-');
      const keyword = keywordAndParam[0];
      const param = keywordAndParam.length > 1 ? keywordAndParam[1] : undefined;
      const value = desc instanceof Ability ? desc.value : '';
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
        return <AnimalSizeIcon key={index} value={value} />;
      } else if (keyword === 'Size' && param === 'Enclosure') {
        return <EnclosureIcon key={index} value={value} />;
      } else if (keyword === 'Size' && param === 'X+') {
        return <EmptySizeIcon key={index} value={value + '+'} />;
      } else if (keyword === 'HerbivoreTag') {
        return <TagIcon key={index} type={AnimalTag.Herbivore} />;
      } else if (keyword === 'Determination') {
        return <Determination key={index} />;
      } else if (keyword === 'AnimalActionCard') {
        return (
          <ActionCardIcon key={index} actionType={ActionCardType.ANIMAL} />
        );
      } else if (keyword === 'AssociationActionCard') {
        return (
          <ActionCardIcon key={index} actionType={ActionCardType.ASSOCIATION} />
        );
      } else if (keyword === 'BuildActionCard') {
        return <ActionCardIcon key={index} actionType={ActionCardType.BUILD} />;
      } else if (keyword === 'CardsActionCard') {
        return <ActionCardIcon key={index} actionType={ActionCardType.CARDS} />;
      } else if (keyword === 'SponsorsActionCard') {
        return (
          <ActionCardIcon key={index} actionType={ActionCardType.SPONSORS} />
        );
      } else if (keyword === 'ActionCard') {
        return <ActionCardIcon key={index} />;
      }
    }
    return word;
  });

  return (
    <>
      {parsedComponents.map((component, index) => (
        <React.Fragment key={index}>{component} </React.Fragment>
      ))}
    </>
  );
};

export default ParseDescription;
