import { toPng } from 'html-to-image';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import Effect from '@/components/abilities/Effect';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SponsorCardWrapper from '@/components/wrapper/SponsorWrapper';

import { CardSource } from '@/types/CardSource';
import { EffectType } from '@/types/Effect';
import { SponsorCard } from '@/types/SponsorCard';

const defaultVictoryColumnSponsor: SponsorCard = {
  id: '274',
  name: 'VICTORY COLUMN',
  strength: 3,
  rock: 0,
  water: 0,
  tags: [],
  requirements: [],
  effects: [
    {
      effectType: EffectType.INCOME,
      effectDesc: 'sponsors.s274_desc1',
      display: true,
      fontSize: 'lg',
    },
    {
      effectType: EffectType.ENDGAME,
      effectDesc: 'sponsors.s274_desc2',
      display: true,
      fontSize: 'lg',
    },
  ],
  appeal: 1,
  source: CardSource.MARINE_WORLD,
};

type EditableEffect = {
  id: string;
  effectType: EffectType;
  effectDesc: string;
};

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { t } = useTranslation('common');
  const downloadRef = useRef<HTMLDivElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showTopLabel, setShowTopLabel] = useState(true);
  const [topLabel, setTopLabel] = useState('');
  const [title, setTitle] = useState(defaultVictoryColumnSponsor.name);

  const defaultEffectItems = useMemo<EditableEffect[]>(
    () =>
      (defaultVictoryColumnSponsor.effects ?? []).map((effect, index) => ({
        id: `default-${index}`,
        effectType: effect.effectType,
        effectDesc: t(effect.effectDesc),
      })),
    [t],
  );

  const [effectItems, setEffectItems] =
    useState<EditableEffect[]>(defaultEffectItems);

  const previewEffects = useMemo(
    () =>
      effectItems
        .map((effect) => ({
          effectType: effect.effectType,
          effectDesc: effect.effectDesc,
          display: true,
          fontSize: 'lg' as const,
        }))
        .filter((effect) => effect.effectDesc.length > 0),
    [effectItems],
  );

  useEffect(() => {
    setEffectItems(defaultEffectItems);
  }, [defaultEffectItems]);

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }

    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    const objectUrl = URL.createObjectURL(file);
    setUploadedImage(objectUrl);
  };

  const handleDownloadImage = async () => {
    if (!downloadRef.current) {
      return;
    }

    toPng(downloadRef.current, { quality: 0.8, pixelRatio: 7 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${(title || 'victory_column').trim()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : 'Unknown error');
      });
  };

  const handleAddEffect = () => {
    setEffectItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        effectType: EffectType.IMMEDIATE,
        effectDesc: '',
      },
    ]);
  };

  const handleRemoveEffect = (id: string) => {
    setEffectItems((prev) => prev.filter((effect) => effect.id !== id));
  };

  const handleEffectTypeChange = (id: string, value: EffectType) => {
    setEffectItems((prev) =>
      prev.map((effect) =>
        effect.id === id ? { ...effect, effectType: value } : effect,
      ),
    );
  };

  const handleEffectDescChange = (id: string, value: string) => {
    setEffectItems((prev) =>
      prev.map((effect) =>
        effect.id === id ? { ...effect, effectDesc: value } : effect,
      ),
    );
  };

  return (
    <Layout>
      <Seo templateTitle='Victory Column DIY' />
      <div className='flex flex-col items-center gap-8 px-3 py-8 md:flex-row md:items-start md:justify-center md:gap-12 md:px-6 lg:gap-16'>
        <div className='mt-6 origin-top py-4 md:sticky md:top-24 md:mt-4'>
          <div ref={downloadRef} className='victory-column-preview'>
            <SponsorCardWrapper id={defaultVictoryColumnSponsor.id}>
              {uploadedImage ? (
                <img
                  className='victory-column-image-layer'
                  src={uploadedImage}
                  alt='Custom uploaded background'
                />
              ) : (
                <div className='victory-column-image-layer victory-column-image-fallback' />
              )}
              <Image
                src='/img/victory_column.png'
                alt='Victory column frame'
                fill
                priority
                className='victory-column-frame-layer'
              />

              <div className='ark-card-top'>
                <div className='ark-card-top-left sf-hidden'></div>
                <div className='ark-card-top-right'></div>
              </div>
              {showTopLabel && (
                <div className='victory-column-top-label'>
                  <span>{topLabel}</span>
                </div>
              )}
              <div className='ark-card-middle'>
                <div className='ark-card-number sf-hidden'>
                  {defaultVictoryColumnSponsor.id}
                </div>
                <div className='ark-card-title-wrapper'>
                  <div className='ark-card-title'>
                    {title || defaultVictoryColumnSponsor.name}
                  </div>
                </div>
              </div>
              <div className='ark-card-bottom text-start'>
                {previewEffects.map((effect, index) => {
                  if (effect.display === undefined || effect.display) {
                    return <Effect key={index} effect={effect} style='full' />;
                  }
                  return null;
                })}
              </div>
            </SponsorCardWrapper>
          </div>
        </div>

        <Card className='w-full max-w-[420px] bg-card/80 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle>Victory Column DIY</CardTitle>
            <CardDescription>
              Upload an image and customize sponsor title and description.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='victory-column-image'>Image</Label>
              <Input
                id='victory-column-image'
                type='file'
                accept='image/*'
                value=''
                onChange={handleFileChange}
              />
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='victory-column-title'>Card Title</Label>
              <Input
                id='victory-column-title'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label htmlFor='victory-column-top-label'>Top Label</Label>
              <Input
                id='victory-column-top-label'
                value={topLabel}
                onChange={(event) => setTopLabel(event.target.value)}
                placeholder='Text above title'
              />
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label>Top Label Visibility</Label>
              <Button
                type='button'
                variant='outline'
                onClick={() => setShowTopLabel((prev) => !prev)}
              >
                {showTopLabel ? 'Hide White Label' : 'Show White Label'}
              </Button>
            </div>

            <div className='grid w-full items-center gap-1.5'>
              <Label>Effects</Label>
              <div className='space-y-3'>
                {effectItems.map((effect, index) => (
                  <div key={effect.id} className='rounded-md border p-3'>
                    <div className='grid gap-2'>
                      <Label htmlFor={`effect-type-${effect.id}`}>
                        Effect {index + 1} Type
                      </Label>
                      <Select
                        value={effect.effectType}
                        onValueChange={(value) =>
                          handleEffectTypeChange(effect.id, value as EffectType)
                        }
                      >
                        <SelectTrigger id={`effect-type-${effect.id}`}>
                          <SelectValue placeholder='Select effect type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={EffectType.PASSIVE}>
                            Passive
                          </SelectItem>
                          <SelectItem value={EffectType.IMMEDIATE}>
                            Immediate
                          </SelectItem>
                          <SelectItem value={EffectType.INCOME}>
                            Income
                          </SelectItem>
                          <SelectItem value={EffectType.ENDGAME}>
                            Endgame
                          </SelectItem>
                          <SelectItem value={EffectType.CONSERVATION}>
                            Conservation
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Label htmlFor={`effect-desc-${effect.id}`}>
                        Effect {index + 1} Description
                      </Label>
                      <Input
                        id={`effect-desc-${effect.id}`}
                        value={effect.effectDesc}
                        onChange={(event) =>
                          handleEffectDescChange(effect.id, event.target.value)
                        }
                        placeholder='Effect description'
                      />

                      <Button
                        type='button'
                        variant='outline'
                        onClick={() => handleRemoveEffect(effect.id)}
                      >
                        Remove Effect
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type='button'
                  variant='secondary'
                  onClick={handleAddEffect}
                >
                  Add Effect
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              variant='nature'
              className='w-full sm:w-auto'
              onClick={handleDownloadImage}
            >
              {t('diy.Download')}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <style jsx global>{`
        .victory-column-preview .ark-card.zoo-card.sponsor-card {
          --arkNovaZooCardScale: 1;
          height: 522px;
          width: 375px;
        }

        .victory-column-preview .ark-card.zoo-card.sponsor-card .ark-card-wrapper {
          background-image: none !important;
          overflow: hidden;
          position: relative;
        }

        .victory-column-preview .victory-column-image-layer {
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
          height: auto;
          pointer-events: none;
          z-index: 0;
        }

        .victory-column-preview .victory-column-image-fallback {
          background-image: linear-gradient(to bottom, #d9e0e8, #bcc5d2, #a6afbe);
        }

        .victory-column-preview .victory-column-frame-layer {
          object-fit: cover;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        .victory-column-preview .ark-card-top,
        .victory-column-preview .ark-card-middle,
        .victory-column-preview .ark-card-bottom {
          position: relative;
          z-index: 2;
        }

        .victory-column-preview .victory-column-top-label {
          align-items: center;
          background: #fff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
          color: #111;
          display: flex;
          font-size: 12px;
          font-weight: 600;
          height: 18px;
          justify-content: center;
          left: 2px;
          max-width: 248px;
          overflow: hidden;
          padding: 0 8px;
          position: absolute;
          text-overflow: ellipsis;
          top: 263px;
          white-space: nowrap;
          width: 66.666667%;
          z-index: 2;
        }

        .victory-column-preview .victory-column-top-label span {
          display: block;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </Layout>
  );
}

type Props = {};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
