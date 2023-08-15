import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { debounce } from 'lodash';
import { BaseAnimalCard } from '@/components/cards/animal_cards/BaseAnimalCard';
import { AnimalCardForm } from '@/components/forms/AnimalCardForm';
import Layout from '@/components/layout/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { AnimalCard, AnimalCardSchema } from '@/types/AnimalCard';
import { CardSource } from '@/types/CardSource';
import { Ability, KeyWord } from '@/types/KeyWords';
import {
  SpecialEnclosure,
  SpecialEnclosureType,
} from '@/types/SpecialEnclosure';
import { AnimalTag, OtherTag } from '@/types/Tags';

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const initialDiyAnimalCard = {
    id: '001',
    name: '',
    latinName: '',
    // image:
    //   'https://ender-picgo.oss-cn-shenzhen.aliyuncs.com/img/CleanShot%202023-08-13%20at%2021.54.00.png',
    size: 5,
    rock: 1,
    water: 1,
    price: 20,
    requirements: [],
    tags: [],
    specialEnclosures: [],
    abilities: [],
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

  const valuesToAnimalCard = (
    values: z.infer<typeof AnimalCardSchema>
  ): AnimalCard => {
    const transformedValues = {
      ...values,
      specialEnclosures: values.specialEnclosures?.map((se) =>
        SpecialEnclosure.fromObject(se)
      ),
      abilities: values.abilities?.map((ability) =>
        Ability.fromObject(ability)
      ),
      reefDwellerEffect: values.reefDwellerEffect?.map((effect) =>
        Ability.fromObject(effect)
      ),
      // ... add any other properties that need transformation here ...
    };

    return transformedValues as AnimalCard;
  };

  const handleValuesChange = (values: z.infer<typeof AnimalCardSchema>) => {
    const animalCard = valuesToAnimalCard(values);
    setDiyAnimalCard(animalCard);
    // console.log(animalCard);  // 这里可以实时获取到转换后的AnimalCard对象
  };
  const debouncedHandleValuesChange = debounce(handleValuesChange, 300);

  return (
    <Layout>
      <main>
        <section className='bg-white/0'>
          <div className='mt-10 flex min-h-screen flex-col items-center justify-center gap-10 text-start text-black md:flex-row md:items-start md:gap-20'>
            <div className='scale-125 py-8 md:mt-2 xl:mr-5 xl:mt-12 xl:scale-150'>
              <BaseAnimalCard animal={diyAnimalCard} />
            </div>
            <Card className='w-[370px] bg-white/75'>
              <CardHeader>
                <CardTitle>Card Maker</CardTitle>
                <CardDescription>Create your own animal card.</CardDescription>
              </CardHeader>
              <CardContent>
                <AnimalCardForm onValuesChange={debouncedHandleValuesChange} />
              </CardContent>
              {/*<CardFooter className="flex justify-between">*/}
              {/*  <Button variant="outline">Cancel</Button>*/}
              {/*  <Button>Deploy</Button>*/}
              {/*</CardFooter>*/}
            </Card>
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
