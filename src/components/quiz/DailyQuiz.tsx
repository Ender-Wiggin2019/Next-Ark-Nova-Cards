import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { MapBoard } from '@/components/map_boards/MapBoard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CardWrapper from '@/components/wrapper/CardWrapper';

import {
  NUMBER_CONSERVATION,
  NUMBER_FINAL_SCORING,
  NUMBER_HAND,
} from '@/utils/GenerateRandomCards';
import { UserArrowLeftIcon } from '~/index';
import { usePathname } from 'next/navigation';

export const Quiz: React.FC<any> = (todayQuiz) => {
  const pathname = usePathname();

  const { t } = useTranslation('common');
  const [handList, setHandList] = useState<string[]>([]);
  const [disableHand, setDisableHand] = useState(false);

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
    const cardList = [
      todayQuiz.card_1,
      todayQuiz.card_2,
      todayQuiz.card_3,
      todayQuiz.card_4,
      todayQuiz.card_5,
      todayQuiz.card_6,
      todayQuiz.card_7,
      todayQuiz.card_8,
    ];
    const res: boolean[] = [];
    for (let i = 0; i < cardList.length; i++) {
      if (handList.includes(cardList[i])) {
        res.push(true);
      } else {
        res.push(false);
      }
    }

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-API-Key': 'c&wUxR5V8jV$hZnSMcsD%',
        },
        body: JSON.stringify({ setUpType: 'ALL EXP', cards: res }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);

      // 处理结果...
    } catch (error) {
      console.error('An error occurred:', error);
    }

    console.log('res', res);
  };

  return (
    <Card className='flex flex-col bg-white/50 p-2'>
      <CardHeader>
        <CardTitle>{t('quiz.today')}</CardTitle>
      </CardHeader>
      <div className='flex flex-col xl:flex-row'>
        <Card className='flex w-full flex-col items-center justify-center bg-white/50 p-2 xl:w-3/5'>
          <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-4'>
            {numArray(NUMBER_HAND).map((idx) => (
              <CardWrapper
                key={'q_' + todayQuiz.id + idx}
                id={todayQuiz[`card_${idx}`]}
                canSelect={true}
                disable={disableHand}
                onSelect={handleHandSelect}
              />
            ))}
            {numArray(NUMBER_FINAL_SCORING).map((idx) => (
              <CardWrapper
                key={'q_' + todayQuiz.id + idx}
                id={todayQuiz[`endgame_${idx}`]}
                canSelect={false}
                disable={false}
              />
            ))}
          </div>
          {handList.length === 4 && (
            <>
              <SignedOut>
                <SignInButton mode='modal' redirectUrl={pathname}>
                  <Button type='button'>
                    <UserArrowLeftIcon className='mr-1 h-5 w-5' />
                    {t('comment.login_to_comment')}
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Button
                  className='text-bold mt-2 w-24 bg-lime-500 text-lg text-white hover:bg-lime-600'
                  onClick={handleSubmit}
                >
                  {t('Submit')}
                </Button>
              </SignedIn>
            </>
          )}
        </Card>
        <Separator orientation='vertical' className='mx-2' />
        <Card className='flex w-full flex-col items-center justify-start bg-white/50 p-2 xl:w-2/5'>
          {/* <CardHeader>
              <CardTitle>{t('Game Set Up')}</CardTitle>
            </CardHeader> */}
          <MapBoard id={todayQuiz[`map_1`]} />
          <Separator orientation='horizontal' className='my-2 self-center' />

          <div className='flex w-2/3 flex-row justify-between xl:w-full'>
            {numArray(NUMBER_CONSERVATION).map((idx) => (
              <CardWrapper
                key={'q_' + todayQuiz.id + idx}
                id={todayQuiz[`conservation_${idx}`]}
                index={idx}
                canSelect={false}
                disable={false}
              />
            ))}
          </div>
        </Card>
      </div>
    </Card>
  );
};
