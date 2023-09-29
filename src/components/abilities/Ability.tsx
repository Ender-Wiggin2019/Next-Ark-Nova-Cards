import { useTranslation } from 'next-i18next';
import React from 'react';

import { cn } from '@/lib/utils';

import ParseDescription from '@/components/abilities/ParseDescription';
import AbilityIcon from '@/components/icons/abilities/AbilityIcon';
import Boost from '@/components/icons/abilities/Boost';
import ExtraShift from '@/components/icons/abilities/ExtraShift';
import Mark from '@/components/icons/abilities/Mark';
import Posturing from '@/components/icons/abilities/Posturing';
import ReefDwellerIcon from '@/components/icons/abilities/ReefDwellerIcon';
import Trade from '@/components/icons/abilities/Trade';
import Clever from '@/components/icons/actions/Clever';
import TakeCardInRange from '@/components/icons/take_cards/TakeCardInRange';
import AppealIcon from '@/components/icons/tokens/AppealIcon';
import ConservationIcon from '@/components/icons/tokens/ConservationIcon';
import MoneyIcon from '@/components/icons/tokens/MoneyIcon';
import ReputationIcon from '@/components/icons/tokens/ReputationIcon';
import XToken from '@/components/icons/tokens/XToken';

import { ActionCardType } from '@/types/ActionCard';
import { Ability, KeyWord } from '@/types/KeyWords';

interface AbilityProps {
  ability: Ability;
  style: 'full' | 'short' | 'icon';
  isReefDweller?: boolean;
}

const AbilityComponent: React.FC<AbilityProps> = ({
  ability,
  style,
  isReefDweller,
}) => {
  // const { t } = useTranslation();
  const { t } = useTranslation('common');
  const keyword = ability.keyword;
  if (style == 'icon') {
    if (keyword === KeyWord.REEF_MONEY)
      return <MoneyIcon value={ability.value} />;
    else if (keyword === KeyWord.CONSERVATION_POINT)
      return <ConservationIcon value={ability.value} />;
    else if (keyword === KeyWord.REPUTATION)
      return <ReputationIcon value={ability.value} />;
    else if (keyword === KeyWord.APPEAL)
      return <AppealIcon value={ability.value} />;
    else if (keyword === KeyWord.SHARK_ATTACK)
      return <AbilityIcon keyWord={keyword} value={ability.value.toString()} />;
    else if (keyword === KeyWord.DIGGING)
      return <AbilityIcon keyWord={keyword} value={ability.value.toString()} />;
    else if (keyword === KeyWord.TRADE) return <Trade />;
    else if (keyword === KeyWord.TAKE_CARD_IN_RANGE) return <TakeCardInRange />;
    else if (keyword === KeyWord.INVENTIVE) return <XToken />;
    else if (keyword === KeyWord.CLEVER) return <Clever />;
    else if (keyword === KeyWord.MARK) return <Mark />;
    else if (keyword === KeyWord.POSTURING) return <Posturing />;
    else if (keyword === KeyWord.BOOST_BUILDING)
      return <Boost actionType={ActionCardType.BUILD} />;
    else if (keyword === KeyWord.BOOST_ANIMAL)
      return <Boost actionType={ActionCardType.ANIMAL} />;
    else if (keyword === KeyWord.BOOST_CARD)
      return <Boost actionType={ActionCardType.CARDS} />;
    else if (keyword === KeyWord.BOOST_ASSOCIATION)
      return <Boost actionType={ActionCardType.ASSOCIATION} />;
    else if (keyword === KeyWord.BOOST_SPONSORS)
      return <Boost actionType={ActionCardType.SPONSORS} />;
    else if (keyword === KeyWord.EXTRA_SHIFT) return <ExtraShift />;
    else if (keyword === KeyWord.HELPFUL) return <></>;

    // else if (keyword === KeyWord.APPEAL) return <AppealIcon value={ability.value} />;
  }

  // FIXME: it's a temporary solution, need to be refactored
  const keyWord =
    ability.value.toString().length > 1
      ? t(ability.keyword.name) + ':' + t(ability.value.toString())
      : ability.value.toString().length === 1
      ? t(ability.keyword.name) + ' ' + t(ability.value.toString())
      : t(ability.keyword.name);
  return (
    <div
      className={cn({
        flex: isReefDweller !== undefined && isReefDweller,
      })}
    >
      {isReefDweller !== undefined && isReefDweller && (
        <div className='-ml-1 -mt-1'>
          <ReefDwellerIcon />
        </div>
      )}
      <div className='text-left'>
        <h6 className='animal-ability-title'>{keyWord}</h6>
        {style == 'full' && (
          <div className='animal-ability-desc'>
            <ParseDescription desc={ability} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AbilityComponent;
