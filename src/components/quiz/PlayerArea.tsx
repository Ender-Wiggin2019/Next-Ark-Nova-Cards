import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { MapBoard } from '@/components/map_boards/MapBoard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CardWrapper from '@/components/wrapper/CardWrapper';
import { v4 as uuidv4 } from 'uuid';

import {
  GameSetupGenerator,
  NUMBER_CONSERVATION,
  NUMBER_FINAL_SCORING,
  NUMBER_HAND,
} from '@/utils/GenerateRandomCards';
import { UserArrowLeftIcon } from '~/index';
import { usePathname } from 'next/navigation';
import { CardSource } from '@/types/CardSource';
import { GameConfig, IPlayerData } from '@/types/IQuiz';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { RerollButton } from './Reroll';
import { Check, Share2 } from 'lucide-react';
import { ActionIconCard } from '@/components/actions/icons/ActionIconCard';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
export type Props = {
  seed: string;
  playerData: IPlayerData;
  playerIndex: number;
  canSubmit: boolean;
};
export const PlayerArea: React.FC<Props> = ({
  seed,
  playerData,
  playerIndex,
  canSubmit,
}) => {
  const { t } = useTranslation('common');
  const [handList, setHandList] = useState<string[]>([]);
  const [disableHand, setDisableHand] = useState(false);
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
    console.log('handList', handList);

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-API-Key': 'c&wUxR5V8jV$hZnSMcsD%',
        },
        body: JSON.stringify({ seed: seed, cards: handList }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      return router.push('/daily-quiz/' + seed);

      // 处理结果...
    } catch (error) {
      console.error('An error occurred:', error);
    }

    // console.log('res', res);
  };

  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 p-2 xl:w-3/5'>
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
        {`You're ${playerIndex + 1} order.`}
      </Badge>
      {playerData.isMainPlayer && (
        <>
          <div className='-mt-8 grid scale-90 grid-cols-3 justify-items-center gap-x-10 gap-y-4 sm:mt-0 sm:grid-cols-4 md:grid-cols-5 lg:scale-100 lg:grid-cols-5 lg:gap-4 xl:grid-cols-4'>
            {playerData.cards.map((id) => (
              <CardWrapper
                key={'main_card_' + id}
                id={id}
                canSelect={true}
                disable={disableHand}
                onSelect={handleHandSelect}
              />
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
        </>
      )}
      <div className='w-full max-w-2xl'>
        <MapBoard id={playerData.maps[0]} />
      </div>
    </div>
  );
};
