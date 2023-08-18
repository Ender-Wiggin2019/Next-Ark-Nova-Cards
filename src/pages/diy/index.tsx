import { toPng } from 'html-to-image';
import { debounce } from 'lodash';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { BaseAnimalCard } from '@/components/cards/animal_cards/BaseAnimalCard';
import { AnimalCardForm } from '@/components/forms/AnimalCardForm';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  AnimalCard,
  AnimalCardSchema,
  AnimalCardSchemaDto,
} from '@/types/AnimalCard';
import { CardSource } from '@/types/CardSource';
import { Ability } from '@/types/KeyWords';
import { SpecialEnclosure } from '@/types/SpecialEnclosure';

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common');
  const downloadRef = React.useRef<HTMLDivElement>(null);
  const initialDiyAnimalCard = {
    id: 'FAN',
    name: '',
    latinName: '',
    // image:
    //   'https://ender-picgo.oss-cn-shenzhen.aliyuncs.com/img/CleanShot%202023-08-13%20at%2021.54.00.png',
    size: 1,
    rock: 0,
    water: 0,
    price: 0,
    requirements: [],
    tags: [],
    specialEnclosures: [],
    abilities: [],
    description: '',
    reefDwellerEffect: [],
    soloEffect: [],
    reputation: 0,
    appeal: 0,
    conservationPoint: 0,
    wave: false,
    canBeInStandardEnclosure: true,
    source: CardSource.FAN_MADE,
  } as AnimalCardSchemaDto;

  const [isResetting, setIsResetting] = useState(false);
  const [diyAnimalCard, setDiyAnimalCard] = useState(initialDiyAnimalCard);
  useEffect(() => {
    if (isResetting) {
      setIsResetting(false);
    }
  }, [isResetting]);
  const handleDownloadImage = async () => {
    if (downloadRef.current === null) {
      return;
    }

    toPng(downloadRef.current, { quality: 1 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = diyAnimalCard.name + '.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const valuesToAnimalCard = (values: AnimalCardSchemaDto): AnimalCard => {
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

  const handleValuesChange = (values: AnimalCardSchemaDto) => {
    // const animalCard = valuesToAnimalCard(values);
    setDiyAnimalCard(values);
    // console.log(animalCard);  // 这里可以实时获取到转换后的AnimalCard对象
  };
  const handleJsonImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (!e.target.files) {
      return;
    }
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (event) => {
      if (!event.target) {
        return;
      }
      try {
        const parsedData = JSON.parse(event.target.result as string);

        // Validate against the AnimalCardSchema
        const result = AnimalCardSchema.safeParse(parsedData);
        if (!result.success) {
          alert(
            'The parsed JSON does not match the expected Animal Card structure.'
          );
          return;
        }

        setDiyAnimalCard(parsedData);
        setIsResetting(true);
      } catch (error) {
        alert("Failed to parse the JSON. Please ensure it's a valid JSON.");
      }
    };
  };

  const debouncedHandleValuesChange = debounce(handleValuesChange, 300);

  return (
    <Layout>
      <Seo templateTitle='Ark Nova Card Maker' />
      <section className='bg-white/0'>
        <div className='mt-10 flex min-h-screen flex-col items-center justify-center gap-10 text-start text-black md:flex-row md:items-start md:gap-20'>
          <div className='scale-125 py-8 md:mt-2 xl:mr-5 xl:mt-12 xl:scale-150'>
            <div ref={downloadRef} className=''>
              <BaseAnimalCard animal={valuesToAnimalCard(diyAnimalCard)} />
            </div>
          </div>
          <Card className='w-[370px] bg-white/75'>
            <CardHeader>
              <CardTitle>{t('diy.card_maker')}</CardTitle>
              <CardDescription>
                {t('diy.create_your_own_animal_card')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimalCardForm
                defaultValues={diyAnimalCard}
                onValuesChange={debouncedHandleValuesChange}
                isResetting={isResetting}
              />
            </CardContent>
            <CardFooter className='flex flex-col justify-start gap-4'>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='animal-json-import'>
                  {t('diy.import_json')}
                </Label>
                <Input
                  id='animal-json-import'
                  type='file'
                  value=''
                  className=''
                  onChange={handleJsonImport}
                />
              </div>
              {/*<Button variant="outline">*/}
              {/*  {t('diy.import_json')}*/}
              {/*</Button>*/}
              <Button
                className='w-36 bg-lime-500 hover:bg-lime-400'
                onClick={handleDownloadImage}
              >
                {t('diy.Download')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
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
