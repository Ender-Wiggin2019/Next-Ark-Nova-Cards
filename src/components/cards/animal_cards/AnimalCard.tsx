// AnimalCard.tsx
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Ability from '@/components/abilities/Ability';
import AbilityComponent from '@/components/abilities/Ability';
import { AnimalModelCard } from '@/components/cards/animal_cards/models/AnimalModelCard';
import Constriction from '@/components/icons/abilities/Constriction';
import Hypnosis from '@/components/icons/abilities/Hypnosis';
import Venom from '@/components/icons/abilities/Venom';
import Enclosures from '@/components/icons/Enclosures';
import Pilfering from '@/components/icons/interaction/Pilfering';
import ReefEffect from '@/components/icons/marine_world/ReefEffect';
import WaveIcon from '@/components/icons/marine_world/WaveIcon';
import Money from '@/components/icons/Money';
import Tag from '@/components/icons/Tag';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import AnimalCardWrapper from '@/components/wrapper/AnimalWrapper';

import { getAnimalCardModel } from '@/utils/GetAnimalCardModel';

import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';
import { KeyWord } from '@/types/KeyWords';

interface AnimalCardProps {
  animal: AnimalCardType;
  showLink: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, showLink }) => {
  const { t } = useTranslation('common');

  let dataSize = 1;
  if (animal.reputation !== undefined) dataSize += 1;
  if (animal.conservationPoint !== undefined) dataSize += 1;

  return (
    // <div>
    //     <h2>{animal.name}</h2>
    //     <img src={animal.image.toString()} alt={animal.name} />
    //     <p>Price: {animal.price}</p>
    //     {/* add other fields as needed */}
    // </div>
    <>
      <HoverCard>
        <HoverCardTrigger>
          <AnimalCardWrapper id={animal.id}>
            <div className='ark-card-top'>
              {/*<AnimalModelHover model={getAnimalCardModel(animal)} />*/}
              {animal.abilities?.map((ability, index) =>
                // TODO: refactor this to use Ability component
                ability.keyword === KeyWord.CONSTRICTION ? (
                  <Constriction key={index} />
                ) : ability.keyword === KeyWord.HYPNOSIS ? (
                  <Hypnosis key={index} />
                ) : ability.keyword === KeyWord.VENOM ? (
                  <Venom key={index} />
                ) : ability.keyword === KeyWord.PILFERING_1 ||
                  ability.keyword === KeyWord.PILFERING_2 ? (
                  <Pilfering key={index} />
                ) : null
              )}
              {animal.reefDwellerEffect !== undefined &&
                animal.reefDwellerEffect.length > 0 && (
                  <ReefEffect>
                    <AbilityComponent
                      ability={animal.reefDwellerEffect[0]}
                      style='icon'
                    />
                  </ReefEffect>
                )}
              <div className='ark-card-top-left'>
                <Enclosures
                  size={animal.size}
                  rock={animal.rock}
                  water={animal.water}
                  specialEnclosures={animal.specialEnclosures}
                  canBeInStandardEnclosure={animal.canBeInStandardEnclosure}
                />
                <div className='animal-card-cost'>
                  <Money value={animal.price} />
                </div>

                <div className='zoo-card-prerequisites'>
                  {animal.requirements &&
                    animal.requirements.map((tag, index) => (
                      <div key={index} className='zoo-card-badge'>
                        <Tag type={tag} />
                      </div>
                    ))}
                </div>
              </div>
              <div className='ark-card-top-right'>
                {animal.tags.map((tag, index) => (
                  <div key={index} className='zoo-card-badge'>
                    <Tag type={tag} />
                  </div>
                ))}
              </div>
            </div>

            <div className='ark-card-middle'>
              <div className='ark-card-number'>{animal.id}</div>
              <div className='ark-card-title-wrapper'>
                <div
                  className={classNames('ark-card-title pt-1', {
                    'scale-90 text-xs': t(animal.name).length > 28,
                  })}
                >
                  {t(animal.name)}
                </div>
                <div className='ark-card-subtitle sf-hidden -mt-2'>
                  {animal.latinName}
                </div>
              </div>
            </div>
            <div className='ark-card-bottom'>
              {animal.wave !== undefined && animal.wave && <WaveIcon />}
              <div className='zoo-card-bonuses' data-size={dataSize.toString()}>
                {animal.reputation !== undefined && animal.reputation > 0 && (
                  <div className='zoo-card-bonus reputation'>
                    {animal.reputation}
                  </div>
                )}
                {animal.conservationPoint !== undefined &&
                  animal.conservationPoint > 0 && (
                    <div className='zoo-card-bonus conservation'>
                      {animal.conservationPoint}
                    </div>
                  )}
                <div className='zoo-card-bonus appeal'>{animal.appeal}</div>
              </div>
              {animal.abilities && (
                <div className='animal-ability'>
                  {animal.abilities.map((ability, index) => {
                    const isReefDweller =
                      animal.reefDwellerEffect !== undefined &&
                      animal.reefDwellerEffect.some(
                        (reefDwellerAbility) =>
                          reefDwellerAbility.keyword === ability.keyword
                      );
                    return (
                      <Ability
                        key={index}
                        ability={ability}
                        isReefDweller={isReefDweller}
                        style='full'
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </AnimalCardWrapper>
        </HoverCardTrigger>
        <HoverCardContent className='z-20 -mt-52 w-36 bg-zinc-50/90 p-2 text-xs'>
          <AnimalModelCard
            id={animal.id}
            model={getAnimalCardModel(animal)}
            showLink={showLink}
          />
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
