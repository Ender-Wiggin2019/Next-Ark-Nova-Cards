import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { ActionIconCard } from '@/components/actions/icons/ActionIconCard';
import { MapBoard } from '@/components/map_boards/MapBoard';
import ProgressBar from '@/components/quiz/ProgressBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CardWrapper from '@/components/wrapper/CardWrapper';

import { IPlayerData } from '@/types/IQuiz';

import { UserArrowLeftIcon } from '~/index';
export type Props = {
  seed: string;
  playerData: IPlayerData;
  playerIndex: number;
  canSubmit: boolean;
  pickRes?: {
    cardPick: Map<string, number>;
    total: number;
  };
};
export const PlayerArea: React.FC<Props> = ({
  seed,
  playerData,
  playerIndex,
  canSubmit,
  pickRes,
}) => {
  const { t } = useTranslation('common');
  const [handList, setHandList] = useState<string[]>([]);
  const [disableHand, setDisableHand] = useState(false);
  const [userName, setUserName] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const handleHandSelect = (id: string, add: boolean) => {
    if (handList.length < 4 && add) setHandList([...handList, id]);
    if (!add) setHandList(handList.filter((i) => i !== id));
    if (add && handList.length >= 3) setDisableHand(true);
    else if (!add && handList.length >= 4) setDisableHand(false);
    // console.log('5555', handList, disableHand);
  };

  const handleSubmit = async () => {
    const sortedHandList = [...handList].sort();
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-API-Key': 'c&wUxR5V8jV$hZnSMcsD%',
        },
        body: JSON.stringify({
          seed: seed,
          name: userName,
          cards: sortedHandList,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      return router.push(`/daily-quiz?seed=${seed}&result=true`);

      // 处理结果...
    } catch (error) {
      console.error('An error occurred:', error);
    }

    // console.log('res', res);
  };

  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 p-2'>
      <div className='flex max-w-3xl justify-between gap-2 md:gap-4'>
        {playerData.actionCards.map((actionCard) => (
          <ActionIconCard key={actionCard} action={actionCard} />
        ))}
      </div>
      <Badge
        className={cn('text-md max-w-3xl bg-zinc-900', {
          'bg-lime-500': playerData.isMainPlayer,
        })}
      >
        {playerData.isMainPlayer && `You're Player ${playerIndex + 1}`}
        {!playerData.isMainPlayer && `Player ${playerIndex + 1}`}
      </Badge>
      {playerData.isMainPlayer && (
        <>
          <div className='-mt-8 grid scale-90 grid-cols-3 justify-items-center gap-x-10 gap-y-4 sm:mt-0 sm:grid-cols-4 md:grid-cols-5 lg:scale-100 lg:grid-cols-5 lg:gap-4 xl:grid-cols-4'>
            {!pickRes &&
              playerData.cards.map((id) => (
                <div
                  key={'main_card_' + id}
                  className='duration-300 hover:z-10 hover:scale-125'
                >
                  <CardWrapper
                    id={id}
                    canSelect={true}
                    disable={disableHand}
                    onSelect={handleHandSelect}
                  />
                </div>
              ))}
            {pickRes &&
              playerData.cards.map((id) => (
                <div key={'main_card_div_' + id} className='relative'>
                  <div className='absolute left-1/2 top-8 z-10 -translate-x-1/2 transform cursor-pointer duration-300 hover:opacity-0'>
                    <ProgressBar
                      pickNum={pickRes.cardPick.get(id) || 0}
                      totalNum={pickRes.total}
                    />
                  </div>
                  {/* <div>{pickRes.cardPick.get(id)}</div> */}
                  <div className='brightness-[65%]'>
                    <CardWrapper
                      key={'main_card_' + id}
                      id={id}
                      canSelect={false}
                      disable={disableHand}
                      onSelect={handleHandSelect}
                    />
                  </div>
                </div>
              ))}
            {playerData.finalScoring.map((id) => (
              <CardWrapper
                key={'main_final_' + id}
                id={id}
                canSelect={false}
                disable={false}
              />
            ))}
          </div>
          {handList.length === 4 && canSubmit && (
            <>
              <SignedOut>
                <SignInButton mode='modal' redirectUrl={pathname}>
                  <Button type='button'>
                    <UserArrowLeftIcon className='mr-1 h-5 w-5' />
                    {t('comment.login_to_pick')}
                  </Button>
                </SignInButton>
                <Input
                  className='mt-2 max-w-2xl'
                  placeholder={t('Enter your name to submit')}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <Button
                  disabled={!userName}
                  className='text-bold mt-2 w-24 bg-lime-500 text-lg text-white hover:bg-lime-600'
                  onClick={handleSubmit}
                >
                  {t('Submit')}
                </Button>
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
        </>
      )}
      <div className='w-full max-w-2xl'>
        <MapBoard id={playerData.maps[0]} />
      </div>
    </div>
  );
};
