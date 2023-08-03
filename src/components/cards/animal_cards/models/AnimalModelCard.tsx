import { Separator } from '@/components/ui/separator';

interface ModelCardProps {
  model: AnimalCardModel;
}
import { useTranslation } from 'next-i18next';
import React from 'react';

import clsxm from '@/lib/clsxm';

import AppealIcon from '@/components/icons/tokens/AppealIcon';
import ConservationIcon from '@/components/icons/tokens/ConservationIcon';
import MoneyIcon from '@/components/icons/tokens/MoneyIcon';
import ReputationIcon from '@/components/icons/tokens/ReputationIcon';

import { AnimalCardModel } from '@/types/AnimalCardModel';

export const AnimalModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const { t } = useTranslation('common');
  return (
    <div className='flex-col text-xs'>
      <div className='text-bold'>
        {t('Animal Value')}:&nbsp;
        <span
          className={clsxm(
            'text-bold',
            { 'text-lime-600': model.cost >= 0 },
            { 'text-red-600': model.diff < 0 }
          )}
        >
          {model.diff}
          {/*<MoneyIcon value={model.diff} />*/}
        </span>
      </div>
      {model.diff !== model.diffWithSpecialEnclosure && (
        <div className='text-bold'>
          {t('With SE')}:&nbsp;
          <span
            className={clsxm(
              'text-bold',
              { 'text-lime-600': model.diffWithSpecialEnclosure >= 0 },
              { 'text-red-600': model.diffWithSpecialEnclosure < 0 }
            )}
          >
            {model.diffWithSpecialEnclosure}
            {/*<MoneyIcon value={model.diff} />*/}
          </span>
        </div>
      )}
      <Separator className='my-2 bg-zinc-300' />

      {model.appeal > 0 && (
        <div className='item-center flex'>
          <div className='w-6'>
            <AppealIcon value='' />
          </div>
          :&nbsp;
          <div className='flex justify-end'>
            <MoneyIcon value={model.appeal} />
          </div>
        </div>
      )}
      {model.reputation > 0 && (
        <div className='item-center flex'>
          <div className='w-6'>
            <ReputationIcon value='' />
          </div>
          :&nbsp;
          <MoneyIcon value={model.reputation} />
        </div>
      )}
      {model.conservationPoint > 0 && (
        <div className='item-center flex'>
          <div className='w-6'>
            <ConservationIcon value='' />
          </div>
          :&nbsp;
          <MoneyIcon value={model.conservationPoint} />
        </div>
      )}

      {model.abilities &&
        model.abilities.map((abilityModel, index) => {
          if (abilityModel.value > 0) {
            const ability = abilityModel.ability;

            // FIXME: it's a temporary solution, need to be refactored
            const keyWord =
              ability.value.toString().length > 1
                ? t(ability.keyword.name) + ':' + t(ability.value.toString())
                : ability.value.toString().length === 1
                ? t(ability.keyword.name) + ' ' + t(ability.value.toString())
                : t(ability.keyword.name);
            return (
              <div key={index} className='item-center flex'>
                {keyWord}
                <div>:&nbsp;</div>

                <div className=''>
                  <MoneyIcon value={abilityModel.value} />
                </div>
              </div>
            );
          }
        })}
      <Separator className='my-2 bg-zinc-300' />
      <div className='item-center flex'>
        {t('Cost')}
        <div>:&nbsp;</div>

        <div className=''>
          <MoneyIcon value={'-' + model.cost} color='text-red-400' />
        </div>
      </div>
    </div>
  );
};
