import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { Check, Share2 } from 'lucide-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { Comments } from '@/components/quiz/comments/Comments';
import { PlayerArea } from '@/components/quiz/PlayerArea';
import { ICardPickMemo, ICommentMemo } from '@/components/quiz/types';
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

import { getQuizResult } from '@/services/quiz';
import { TProjectSlotPosition } from '@/types/ProjectCard';
import { GameConfig, IQuizComment } from '@/types/quiz';
import { GameSetupGenerator } from '@/utils/setup';

export type Props = {
  seed: string;
  gameConfig: GameConfig;
  isDailyQuiz: boolean;
};
export const QuizResult: React.FC<Props> = ({
  seed,
  gameConfig,
  isDailyQuiz,
}) => {
  const { user } = useUser();
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isCopied, setIsCopied] = useState(false);
  const gameSetupGenerator = new GameSetupGenerator(seed, gameConfig);
  const setup = gameSetupGenerator.generateGameSetup();

  const mainPlayerIndex = setup.playersData.findIndex((p) => p.isMainPlayer);

  const { data: resultFromAPI } = useQuery(
    ['quiz-result', seed],
    async () => {
      return await getQuizResult(seed);
    },
    {
      refetchInterval: 30000 * 60,
      initialData: [],
    },
  );

  const cardPickRes: ICardPickMemo = React.useMemo(() => {
    const cardPick: Map<string, number> = new Map();
    const userPick: string[] = [];
    let total = 0;
    resultFromAPI.forEach((res) => {
      total++;
      res.data?.cards.forEach((card: string) => {
        if (cardPick.has(card))
          cardPick.set(card, (cardPick.get(card) || 0) + 1);
        else cardPick.set(card, 1);
      });

      if (user && user.id === res.userid) {
        userPick.push(...res.data.cards);
      }
    });

    return { cardPick, total, userPick };
  }, [user, resultFromAPI]);

  const comments: ICommentMemo = React.useMemo(() => {
    const cardPickComments: Map<string, IQuizComment[]> = new Map();
    let userComment: IQuizComment | undefined;
    let total = 0;

    resultFromAPI.forEach((res) => {
      total++;
      const cardKey = JSON.stringify(res.data?.cards.sort());
      const commentsArray = cardPickComments.get(cardKey) || [];

      cardPickComments.set(cardKey, [...commentsArray, res]);

      if (user && user.id === res.userid) {
        userComment = res;
      }
    });

    return { cardPickComments, total, userComment };
  }, [user, resultFromAPI]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  return (
    <Card className='flex flex-col gap-4 bg-card/60 p-3 backdrop-blur-sm md:p-4'>
      <CardHeader className='pb-0'>
        <CardTitle>
          <div className='flex w-full items-center justify-between'>
            <span>{t('quiz.result')}</span>
            <Button
              variant='outline'
              size='icon'
              onClick={handleShare}
              aria-label={isCopied ? t('quiz.link_copied') : t('quiz.share')}
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

      <div className='flex flex-col gap-4'>
        <Carousel
          className='flex w-full flex-col'
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
                  pickRes={cardPickRes || undefined}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Card className='flex w-full flex-col items-center gap-4 bg-card/50 p-3'>
          {setup.display && setup.display.length > 0 && (
            <div className='grid w-full grid-cols-3 justify-items-center gap-2 lg:grid-cols-6'>
              {setup.display.map((id, idx) => (
                <div
                  key={'q_display_' + id}
                  className='preview relative w-min scale-90 rounded-lg bg-amber-500/40 p-2 xl:scale-100'
                >
                  <div className='absolute -top-2 left-1/2 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-md bg-amber-700 text-xs font-bold text-white shadow-sm'>
                    {idx + 1}
                  </div>
                  <CardWrapper
                    id={id}
                    index={(idx + 1) as TProjectSlotPosition}
                    canSelect={false}
                    disable={false}
                  />
                </div>
              ))}
            </div>
          )}

          <div className='flex w-full justify-center gap-6'>
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

          <Separator />

          <Comments
            seed={router.query.seed as string}
            initialComments={comments}
          />
        </Card>
      </div>
    </Card>
  );
};
