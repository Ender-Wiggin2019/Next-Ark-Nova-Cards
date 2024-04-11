import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

import { cn } from '@/lib/utils';

import AppealIcon from '@/components/icons/tokens/AppealIcon';
import ConservationIcon from '@/components/icons/tokens/ConservationIcon';
import MoneyIcon from '@/components/icons/tokens/MoneyIcon';
import ReputationIcon from '@/components/icons/tokens/ReputationIcon';
import { Separator } from '@/components/ui/separator';

import { AnimalCardModel } from '@/types/AnimalCardModel';

interface ModelCardProps {
  id: string;
  model: AnimalCardModel;
  showLink: boolean;
  rating?: number | null;
  ratingCount?: number | null;
  readonly?: boolean;
}

export const AnimalModelCard: React.FC<ModelCardProps> = ({
  id,
  model,
  showLink,
  rating,
  ratingCount,
  readonly,
}) => {
  // const router = useRouter();
  const { t } = useTranslation('common');

  const handleRating = (rating: number) => {
    // check if
  };

  return (
    <div className='flex flex-col text-xs'>
      <div className='text-bold'>
        {t('Animal Value')}:&nbsp;
        <span
          className={cn(
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
            className={cn(
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
      {rating && (
        <div className='flex flex-row gap-1'>
          <Rating
            emptyStyle={{ display: 'flex' }}
            fillStyle={{ display: '-webkit-inline-box' }}
            className='-mt-1'
            readonly={readonly ?? true}
            initialValue={rating}
            allowFraction={true}
            size={16}
            onClick={handleRating}
          />
          {rating ? `${rating.toFixed(1)} (${ratingCount} ${t('users')})` : ''}
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
      {showLink && (
        <div className='flex flex-col items-center'>
          <Separator className='my-2 bg-zinc-300' />
          <Link
            href={'/card/' + id}
            rel='card-detail'
            target='_blank'
            className='w-15 group flex items-center justify-center space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-xs font-medium text-lime-600 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md hover:text-lime-700 focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'
          >
            {t('View More')}{' '}
          </Link>
        </div>
      )}
    </div>
  );
};
