import { Check, Info, Share2 } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { GameConfigCard } from '@/components/quiz/game/GameConfigCard';
import { PlayerArea } from '@/components/quiz/PlayerArea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import CardWrapper from '@/components/wrapper/CardWrapper';
import { TProjectSlotPosition } from '@/types/ProjectCard';
import { GameConfig } from '@/types/quiz';
import { GameSetupGenerator } from '@/utils/setup';

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
    <Card className='flex flex-col gap-4 bg-gradient-to-br from-background/95 via-card/90 to-secondary/60 p-3 shadow-lg shadow-primary/10 ring-1 ring-border/70 backdrop-blur-md md:p-4'>
      <CardHeader className='pb-0'>
        <CardTitle>
          <div className='flex w-full items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <span>{t(header || 'quiz.today')}</span>
              {isDailyQuiz && (
                <Badge
                  variant='secondary'
                  className='rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wide'
                >
                  BETA
                </Badge>
              )}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    aria-label={t('quiz.game_config')}
                    className='text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  >
                    <Info className='h-5 w-5' />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className='w-full border-border/70 bg-gradient-to-br from-card/95 to-secondary/60 backdrop-blur-md'>
                  <GameConfigCard gameConfig={gameConfig} />
                </HoverCardContent>
              </HoverCard>
            </div>
            <Button
              variant='outline'
              size='icon'
              onClick={handleShare}
              aria-label={isCopied ? t('quiz.link_copied') : t('quiz.share')}
              className='border-primary/30 bg-primary/5 text-primary hover:bg-primary/15 hover:text-primary'
            >
              {isCopied ? (
                <Check className='h-4 w-4' />
              ) : (
                <Share2 className='h-4 w-4' />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <div className='flex flex-col gap-4 xl:flex-row'>
        <Carousel
          className='flex w-full flex-col xl:w-3/5'
          opts={{ loop: true, dragFree: true, startIndex: mainPlayerIndex }}
        >
          <div className='flex items-center justify-between px-6'>
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <CarouselContent className='mt-2 w-full'>
            {setup.playersData.map((playerData, index) => (
              <CarouselItem key={index}>
                <PlayerArea
                  seed={seed}
                  playerData={playerData}
                  playerIndex={index}
                  canSubmit={playerData.isMainPlayer && isDailyQuiz}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Separator orientation='vertical' className='hidden xl:block' />

        <Card className='flex w-full flex-col items-center gap-4 bg-gradient-to-br from-card/85 via-card/75 to-accent/60 p-3 ring-1 ring-border/70'>
          <div className='flex w-full max-w-2xl justify-between xl:w-full'>
            {setup.conservations.map((id, idx) => (
              <CardWrapper
                key={'q_conservation_' + id}
                id={id}
                index={(idx + 1) as TProjectSlotPosition}
                canSelect={false}
                disable={false}
                preview={true}
              />
            ))}
          </div>
        </Card>
      </div>
    </Card>
  );
};
