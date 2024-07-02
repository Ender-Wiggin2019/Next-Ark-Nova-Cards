import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { MapBoard } from '@/components/map_boards/MapBoard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CardWrapper from '@/components/wrapper/CardWrapper';
import { v4 as uuidv4 } from 'uuid';

import { GameSetupGenerator } from '@/utils/GenerateRandomCards';
import { usePathname } from 'next/navigation';
import { GameConfig } from '@/types/IQuiz';
import { RerollButton } from './Reroll';
import { Check, Share2 } from 'lucide-react';
import { PlayerArea } from '@/components/quiz/PlayerArea';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useQuery } from '@tanstack/react-query';

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

  const { t } = useTranslation('common');
  const [isCopied, setIsCopied] = useState(false);
  const [handList, setHandList] = useState<string[]>([]);
  const [disableHand, setDisableHand] = useState(false);
  const pathname = usePathname();
  const gameSetupGenerator = new GameSetupGenerator(seed, gameConfig);
  const setup = gameSetupGenerator.generateGameSetup();
  console.log(setup);

  const mainPlayerIndex = setup.playersData.findIndex((p) => p.isMainPlayer);
  const mainPlayerData = setup.playersData[mainPlayerIndex];
  const otherPlayerData = setup.playersData.filter((p) => !p.isMainPlayer);

  const { data: resultFromAPI } = useQuery(
    ['quiz-result', seed],
    async () => {
      const res = await fetch('/api/quiz/result?seed=' + seed);
      const data = await res.json();
      return data as any[];
    },
    {
      refetchInterval: 30000,
      initialData: [],
      // onSuccess: (newsingleSubmits) => {
      //     // 更新 Valtio 的状态
      //     setsingleSubmits(newsingleSubmits);
      // }
    }
  );

  const cardPickRes = React.useMemo(() => {
    // if (user && resultFromAPI) {
    //   console.log(
    //     resultFromAPI,
    //     user,
    //     resultFromAPI.find(
    //       (singleSubmit) =>
    //         singleSubmit.userid === user.id && singleSubmit.cardid.toString() === cardId
    //     )
    //   );
    //   return resultFromAPI.find(
    //     (singleSubmit) =>
    //       singleSubmit.userid === user.id && singleSubmit.cardid.toString() === cardId
    //   );
    // }
    const cardPick: Map<string, number> = new Map();
    let total = 0;
    resultFromAPI.forEach((res) => {
      total++;
      res.data.cards.forEach((card: string) => {
        if (cardPick.has(card)) cardPick.set(card, cardPick.get(card)! + 1);
        else cardPick.set(card, 1);
      });
    });

    return { cardPick, total };
    return null;
  }, [user, resultFromAPI]);
  // const [endGameList, setEndGameList] = useState<string[]>([]);
  // const [disableEndGame, setDisableEndGame] = useState(false);

  function numArray(n: number) {
    return Array.from({ length: n }, (_, index) => index + 1);
  }
  // const handList = Array.from({ length: NUMBER_HAND }, (_, index) => index + 1);
  // const mapList = Array.from({ length: NUMBER_MAP }, (_, index) => index + 1);

  const handleHandSelect = (id: string, add: boolean) => {
    if (handList.length < 4 && add) setHandList([...handList, id]);
    if (!add) setHandList(handList.filter((i) => i !== id));
    if (add && handList.length >= 3) setDisableHand(true);
    else if (!add && handList.length >= 4) setDisableHand(false);
    // console.log('5555', handList, disableHand);
  };

  const handleSubmit = async () => {
    console.log('handList', handList);
    // const cardList = [
    //   todayQuiz.card_1,
    //   todayQuiz.card_2,
    //   todayQuiz.card_3,
    //   todayQuiz.card_4,
    //   todayQuiz.card_5,
    //   todayQuiz.card_6,
    //   todayQuiz.card_7,
    //   todayQuiz.card_8,
    // ];
    // const res: boolean[] = [];
    // for (let i = 0; i < cardList.length; i++) {
    //   if (handList.includes(cardList[i])) {
    //     res.push(true);
    //   } else {
    //     res.push(false);
    //   }
    // }

    // try {
    //   const response = await fetch('/api/quiz/submit', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'X-API-Key': 'c&wUxR5V8jV$hZnSMcsD%',
    //     },
    //     body: JSON.stringify({ setUpType: 'ALL EXP', cards: res }),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.status}`);
    //   }

    //   const result = await response.json();
    //   console.log('Success:', result);

    //   // 处理结果...
    // } catch (error) {
    //   console.error('An error occurred:', error);
    // }

    // console.log('res', res);
  };

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
            <div>{t('quiz.result')}</div>
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
                    pickRes={cardPickRes || undefined}
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

          <div className='flex w-full flex-row justify-between xl:w-full'>
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

          <Separator
            orientation='horizontal'
            className='text-md my-2 self-center'
          />
          <div className='flex flex-col items-start justify-center gap-1'>
            <div className='text-lg font-bold'>Want to play more?</div>
            <div className=''>You can wait for next day challenge, or</div>
            <div className='flex items-center justify-start gap-2'>
              try random seed for practice
              <RerollButton />
            </div>
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
