import { Check, Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { PlayerArea } from '@/components/quiz/PlayerArea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import CardWrapper from '@/components/wrapper/CardWrapper';

import { GameSetupGenerator } from '@/utils/GenerateRandomCards';

import { RerollButton } from './Reroll';

import { GameConfig } from '@/types/IQuiz';

export type Props = {
  seed: string;
  gameConfig: GameConfig;
  isDailyQuiz: boolean;
  header?: string;
};
export const Quiz: React.FC<Props> = ({
  seed,
  gameConfig,
  isDailyQuiz,
  header,
}) => {
  const { t } = useTranslation('common');
  const [isCopied, setIsCopied] = useState(false);
  const pathname = usePathname();
  const gameSetupGenerator = new GameSetupGenerator(seed, gameConfig);
  const setup = gameSetupGenerator.generateGameSetup();

  const mainPlayerIndex = setup.playersData.findIndex((p) => p.isMainPlayer);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  return (
    <Card className='flex flex-col bg-white/50 p-2'>
      <CardHeader>
        <CardTitle>
          <div className='flex w-full items-center justify-between gap-4'>
            <div className='flex items-start justify-start'>
              <div>{t(header || 'quiz.today')}</div>
              {isDailyQuiz && (
                <Alert className='w-30 -mt-4 bg-yellow-200/50 py-1 text-xs'>
                  {/* <Terminal className='h-4 w-4' /> */}
                  {/* <AlertTitle>Notice</AlertTitle> */}
                  <AlertDescription>BETA</AlertDescription>
                </Alert>
              )}
            </div>
            {!isDailyQuiz && (
              <div className='flex-1'>
                <RerollButton />
              </div>
            )}
            <Button onClick={handleShare}>
              {isCopied ? <Check /> : <Share2 />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <div className='flex flex-col gap-2 xl:flex-row'>
        <Carousel
          className='flex w-full flex-col xl:w-3/5'
          opts={{ loop: true, dragFree: true, startIndex: mainPlayerIndex }}
        >
          <div className='flex items-center justify-between px-6'>
            <CarouselPrevious />
            {/* <div className="flex justify-center items-center">

<Badge className=""></Badge>
        </div> */}
            <CarouselNext />
          </div>
          <CarouselContent className='mt-2 w-full'>
            {setup.playersData.map((playerData, index) => (
              <CarouselItem key={index}>
                <div className=''>
                  <PlayerArea
                    seed={seed}
                    playerData={playerData}
                    playerIndex={index}
                    canSubmit={playerData.isMainPlayer && isDailyQuiz}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Separator orientation='vertical' className='mx-2' />
        <Card className='flex w-full flex-col items-center justify-start gap-4 bg-white/50 p-2'>
          {/* <CardHeader>
              <CardTitle>{t('Game Set Up')}</CardTitle>
            </CardHeader> */}
          {/* <Separator orientation='horizontal' className='my-2 self-center' /> */}

          <div className='flex w-full max-w-2xl flex-row justify-between xl:w-full'>
            {setup.conservations.map((id, idx) => (
              <CardWrapper
                key={'q_conservation_' + id}
                id={id}
                index={idx + 1}
                canSelect={false}
                disable={false}
              />
            ))}
          </div>

          {/* <Separator orientation='horizontal' className='my-2 self-center' />
          <div className='text-lg'>Another player</div>
          <div className='flex max-w-2xl justify-between gap-2'>
            {otherPlayerData[0].actionCards.map((actionCard) => (
              <Badge key={actionCard}>{t(actionCard)}</Badge>
            ))}
          </div>

          <MapBoard id={otherPlayerData[0].maps[0]} /> */}
        </Card>
      </div>
    </Card>
  );
};
