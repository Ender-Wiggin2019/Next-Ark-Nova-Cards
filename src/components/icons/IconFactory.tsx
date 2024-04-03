import React from 'react';

import AbilityIcon from '@/components/icons/abilities/AbilityIcon';
import Boost from '@/components/icons/abilities/Boost';
import ExtraShift from '@/components/icons/abilities/ExtraShift';
import Mark from '@/components/icons/abilities/Mark';
import Posturing from '@/components/icons/abilities/Posturing';
import Trade from '@/components/icons/abilities/Trade';
import ActionCardIcon from '@/components/icons/actions/ActionCardIcon';
import Clever from '@/components/icons/actions/Clever';
import Determination from '@/components/icons/actions/Determination';
import Strength from '@/components/icons/actions/Strength';
import AllAnimalCategories from '@/components/icons/bonuses/AllAnimalCategories';
import AllContinentCategories from '@/components/icons/bonuses/AllContinentCategories';
import Condition from '@/components/icons/bonuses/Condition';
import Marketing from '@/components/icons/bonuses/Marketing';
import OneAnimalCategory from '@/components/icons/bonuses/OneAnimalCategory';
import OneContinentCategory from '@/components/icons/bonuses/OneContinentCategory';
import SponsorCard from '@/components/icons/bonuses/SponsorCard';
import AnimalSizeIcon from '@/components/icons/buildings/AnimalSizeIcon';
import DifferentShape from '@/components/icons/buildings/DifferentShape';
import EmptyEnclosure from '@/components/icons/buildings/EmptyEnclosure';
import EmptySizeIcon from '@/components/icons/buildings/EmptySizeIcon';
import EnclosureIcon from '@/components/icons/buildings/EnclosureIcon';
import Kiosk from '@/components/icons/buildings/Kiosk';
import KioskPavilionPair from '@/components/icons/buildings/KioskPavilionPair';
import LargeBirdAviary from '@/components/icons/buildings/LargeBirdAviary';
import PlaceCubeOnConservation from '@/components/icons/conservations/PlaceCubeOnConservation';
import Snap from '@/components/icons/take_cards/Snap';
import TakeCardInRange from '@/components/icons/take_cards/TakeCardInRange';
import AppealIcon from '@/components/icons/tokens/AppealIcon';
import ConservationIcon from '@/components/icons/tokens/ConservationIcon';
import MoneyIcon from '@/components/icons/tokens/MoneyIcon';
import MultiplierToken from '@/components/icons/tokens/MultiplierToken';
import ReputationIcon from '@/components/icons/tokens/ReputationIcon';
import TagIcon from '@/components/icons/tokens/TagIcon';
import XToken from '@/components/icons/tokens/XToken';

import { ActionCardType } from '@/types/ActionCard';
import { Icon } from '@/types/Icon';
import { IconName } from '@/types/IconName';
import { getTag, Tag } from '@/types/Tags';

export const IconFactory: React.FC<Icon> = ({
  iconName,
  params,
  notBadge,
  slotCubeHolder,
}) => {
  const value = params?.value || '';
  const type = params?.type || '';
  if (iconName === IconName.MONEY) return <MoneyIcon value={value} />;
  else if (iconName === IconName.REPUTATION)
    return <ReputationIcon value={value} />;
  else if (iconName === IconName.SHARK_ATTACK)
    return <AbilityIcon iconName={iconName} value={value.toString()} />;
  else if (iconName === IconName.DIGGING)
    return <AbilityIcon iconName={iconName} value={value.toString()} />;
  else if (iconName === IconName.TRADE) return <Trade />;
  else if (iconName === IconName.INVENTIVE) return <XToken />;
  else if (iconName === IconName.CLEVER) return <Clever />;
  else if (iconName === IconName.MARK) return <Mark />;
  else if (iconName === IconName.POSTURING) return <Posturing />;
  else if (iconName === IconName.BOOST_BUILDING)
    return <Boost actionType={ActionCardType.BUILD} />;
  else if (iconName === IconName.BOOST_ANIMAL)
    return <Boost actionType={ActionCardType.ANIMAL} />;
  else if (iconName === IconName.BOOST_CARD)
    return <Boost actionType={ActionCardType.CARDS} />;
  else if (iconName === IconName.BOOST_ASSOCIATION)
    return <Boost actionType={ActionCardType.ASSOCIATION} />;
  else if (iconName === IconName.BOOST_SPONSORS)
    return <Boost actionType={ActionCardType.SPONSORS} />;
  else if (iconName === IconName.EXTRA_SHIFT) return <ExtraShift />;
  else if (iconName === IconName.HELPFUL) return <></>;
  else if (iconName === IconName.TAKE_CARD_IN_RANGE) {
    return <TakeCardInRange />;
  } else if (iconName === IconName.SNAPPING) {
    // TODO: snapping 1 or 2?
    return <Snap />;
  } else if (iconName === IconName.SLOT) {
    return <Strength value={value} />;
  } else if (iconName === IconName.APPEAL) {
    return <AppealIcon value={value} />;
  } else if (iconName === IconName.CONSERVATION_POINT) {
    return <ConservationIcon value={value} />;
  } else if (iconName === IconName.X_TOKEN) {
    return <XToken />;
  } else if (iconName === IconName.MULTIPLIER_TOKEN) {
    return <MultiplierToken />;
  } else if (iconName === IconName.KIOSK) {
    return <Kiosk />;
  } else if (iconName === IconName.LARGE_BIRD_AVIARY) {
    return <LargeBirdAviary />;
  } else if (iconName === IconName.SIZE && type === 'Animal') {
    return <AnimalSizeIcon value={value} />;
  } else if (iconName === IconName.SIZE && type === 'Enclosure') {
    return <EnclosureIcon value={value} />;
  } else if (iconName === IconName.SIZE && type === 'X+') {
    return <EmptySizeIcon value={value + '+'} />;
  } else if (iconName === IconName.SIZE && type === 'Empty') {
    return <EmptySizeIcon value='' />;
  } else if (iconName === IconName.EMPTY_ENCLOSURE) {
    return <EmptyEnclosure />;
  } else if (iconName === IconName.CONSERVATION_PROJECT) {
    return <PlaceCubeOnConservation />;
    // } else if (iconName === IconName.HERBIVORE) {
    //   return <TagIcon type={AnimalTag.Herbivore} />;
    // } else if (iconName === IconName.REPTILE) {
    //   return <TagIcon type={AnimalTag.Reptile} />;
    // } else if (iconName === IconName.SEA_ANIMAL) {
    //   return <TagIcon type={AnimalTag.SeaAnimal} />;
    // } else if (iconName === IconName.PRIMATE) {
    //   return <TagIcon type={AnimalTag.Primate} />;
    // } else if (iconName === IconName.SCIENCE) {
    //   return <TagIcon type={OtherTag.Science} />;
  } else if (iconName === IconName.DETERMINATION) {
    return <Determination />;
  } else if (iconName === IconName.ANIMAL_ACTION_CARD) {
    return <ActionCardIcon actionType={ActionCardType.ANIMAL} />;
  } else if (iconName === IconName.ASSOCIATION_ACTION_CARD) {
    return <ActionCardIcon actionType={ActionCardType.ASSOCIATION} />;
  } else if (iconName === IconName.BUILD_ACTION_CARD) {
    return <ActionCardIcon actionType={ActionCardType.BUILD} />;
  } else if (iconName === IconName.CARDS_ACTION_CARD) {
    return <ActionCardIcon actionType={ActionCardType.CARDS} />;
  } else if (iconName === IconName.SPONSORS_ACTION_CARD) {
    return <ActionCardIcon actionType={ActionCardType.SPONSORS} />;
  } else if (iconName === IconName.ACTION_CARD) {
    return <ActionCardIcon />;
  } else if (iconName === IconName.MARKETING) {
    return <Marketing />;
  } else if (iconName === IconName.SPONSOR_CARD) {
    return <SponsorCard />;
  } else if (iconName === IconName.ANIMAL_CATEGORIES) {
    return <AllAnimalCategories />;
  } else if (iconName === IconName.CONTINENT_CATEGORIES) {
    return <AllContinentCategories />;
  } else if (iconName === IconName.ONE_ANIMAL_TAG) {
    return <OneAnimalCategory />;
  } else if (iconName === IconName.ONE_CONTINENT_TAG) {
    return <OneContinentCategory />;
  } else if (iconName === IconName.KIOSK_PAVILION_PAIR) {
    return <KioskPavilionPair />;
  } else if (iconName === IconName.DIFFERENT_SHAPE) {
    return <DifferentShape />;
  } else if (iconName === IconName.CONDITION) {
    return <Condition />;
  } else if (getTag(iconName) !== null) {
    return (
      <TagIcon
        type={getTag(iconName) as Tag}
        notBadge={notBadge}
        slotCubeHolder={slotCubeHolder}
      />
    );
  } else {
    return <div>{iconName + value}</div>; // 如果没有命中则显示纯文本
  }
};
