import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useState } from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import { BaseAnimalCard } from '@/components/cards/animal_cards/BaseAnimalCard';
import Layout from '@/components/layout/Layout';

import { AnimalCard } from '@/types/AnimalCard';
import { CardSource } from '@/types/CardSource';
import { Ability, KeyWord } from '@/types/KeyWords';
import {
  SpecialEnclosure,
  SpecialEnclosureType,
} from '@/types/SpecialEnclosure';
import { AnimalTag, OtherTag } from '@/types/Tags';

export default function NotFoundPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const initialDiyAnimalCard = {
    id: '305',
    name: 'FENNECFOX',
    latinName: 'Heteractis magnifica',
    image:
      'https://ender-picgo.oss-cn-shenzhen.aliyuncs.com/img/CleanShot%202023-08-13%20at%2021.54.00.png',
    size: 5,
    rock: 1,
    water: 1,
    price: 20,
    requirements: [OtherTag.AnimalsII, OtherTag.Science],
    tags: [AnimalTag.SeaAnimal, AnimalTag.Bird],
    specialEnclosures: [new SpecialEnclosure(SpecialEnclosureType.Aquarium, 3)],
    abilities: [new Ability(KeyWord.POSTURING, 3)],
    description: '',
    reefDwellerEffect: [new Ability(KeyWord.MARK, 1)],
    soloEffect: [],
    reputation: 4,
    appeal: 3,
    conservationPoint: 10,
    wave: true,
    canBeInStandardEnclosure: false,
    source: CardSource.MARINE_WORLD,
  } as AnimalCard;

  const [diyAnimalCard, setDiyAnimalCard] = useState(initialDiyAnimalCard);
  return (
    <Layout>
      <main>
        <section className='bg-white/0'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <div>
              <label>
                Name:
                <input
                  type='text'
                  value={diyAnimalCard.name}
                  onChange={(e) =>
                    setDiyAnimalCard((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Image:
                <input
                  type='text'
                  value={diyAnimalCard.image}
                  onChange={(e) =>
                    setDiyAnimalCard((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                />
              </label>
              {/* Add other input fields for the remaining attributes */}
            </div>
            <BaseAnimalCard animal={diyAnimalCard} />
          </div>
        </section>
      </main>
    </Layout>
  );
}

type Props = {
  // Add custom props here
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
