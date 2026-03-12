import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import debounce from 'lodash/debounce';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ActionIconCard } from '@/components/actions/icons/ActionIconCard';
import { MapBoard } from '@/components/map_boards/MapBoard';
import ProgressBar from '@/components/quiz/ProgressBar';
import { ICardPickMemo } from '@/components/quiz/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CardWrapper from '@/components/wrapper/CardWrapper';
import { cn } from '@/lib/utils';

import { submitQuiz } from '@/services/quiz';

import { IPlayerData } from '@/types/quiz';

import { UserArrowLeftIcon } from '~/index';
export type Props = {
  seed: string;
  playerData: IPlayerData;
  playerIndex: number;
  canSubmit: boolean;
  pickRes?: ICardPickMemo;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleHandSelect = (id: string, add: boolean) => {
    if (handList.length < 4 && add) setHandList([...handList, id]);
    if (!add) setHandList(handList.filter((i) => i !== id));
    if (add && handList.length >= 3) setDisableHand(true);
    else if (!add && handList.length >= 4) setDisableHand(false);
  };

  useEffect(() => {
    setHandList([]);
    setDisableHand(false);
  }, [seed]);

  const handleSubmitDebounced = debounce(async () => {
    setIsSubmitting(true); // 开始提交时禁用按钮

    try {
      await submitQuiz({
        seed,
        name: userName,
        content: comment,
        cards: handList,
      });

      toast.success('Submit successfully!');
      return router.push(`/daily-quiz?seed=${seed}&result=true`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unknown error');
    }

    setIsSubmitting(false); // 完成提交后启用按钮
  }, 2000); // 2000毫秒内最多执行一次

  return (
    <div className='flex w-full flex-col items-center gap-3 rounded-xl border border-border/70 bg-gradient-to-br from-card/85 via-card/75 to-accent/50 p-2 shadow-sm shadow-primary/10 ring-1 ring-border/50'>
      <div className='flex max-w-3xl justify-between gap-2 rounded-lg bg-secondary/50 px-2 py-1 ring-1 ring-border/60 md:gap-4'>
        {playerData.actionCards.map((actionCard) => (
          <ActionIconCard key={actionCard} action={actionCard} />
        ))}
      </div>
      <Badge
        className={cn('text-sm', {
          'bg-primary text-primary-foreground': playerData.isMainPlayer,
          'border-border bg-secondary text-secondary-foreground':
            !playerData.isMainPlayer,
        })}
      >
        {playerData.isMainPlayer
          ? `You're Player ${playerIndex + 1}`
          : `Player ${playerIndex + 1}`}
      </Badge>
      {(playerData.isMainPlayer || (!playerData.isMainPlayer && pickRes)) && (
        <>
          <div
            className={cn(
              'grid scale-90 grid-cols-3 justify-items-center gap-x-10 gap-y-4 sm:grid-cols-4 md:grid-cols-5 lg:scale-100 lg:grid-cols-5 lg:gap-4 xl:grid-cols-4',
              { 'xl:scale-100 xl:grid-cols-5': pickRes },
            )}
          >
            {!pickRes &&
              playerData.cards.map((id) => (
                <div key={'main_card_' + id} className='preview'>
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
                <div key={'main_card_div_' + id} className='preview relative'>
                  {playerData.isMainPlayer && (
                    <div className='absolute left-1/2 top-8 z-10 -translate-x-1/2 cursor-pointer transition-opacity duration-300 hover:opacity-0'>
                      <ProgressBar
                        pickNum={pickRes.cardPick.get(id) || 0}
                        totalNum={pickRes.total}
                      />
                    </div>
                  )}
                  <div className='brightness-[65%]'>
                    <CardWrapper
                      key={'main_card_' + id}
                      id={id}
                      canSelect={false}
                      disable={disableHand}
                      onSelect={handleHandSelect}
                      initSelect={pickRes.userPick.includes(id)}
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
                preview={true}
              />
            ))}
          </div>
          {handList.length === 4 && canSubmit && (
            <div className='flex w-full max-w-md flex-col items-center gap-3 rounded-lg border border-border/70 bg-card/80 p-4 shadow-sm'>
              <SignedOut>
                <SignInButton mode='modal' forceRedirectUrl={pathname}>
                  <Button type='button'>
                    <UserArrowLeftIcon className='mr-1.5 h-4 w-4' />
                    {t('comment.login_to_pick')}
                  </Button>
                </SignInButton>
                <Input
                  className='w-full'
                  placeholder={t('Enter your name to submit')}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <Button
                  disabled={!userName}
                  variant='nature'
                  onClick={handleSubmitDebounced}
                >
                  {t('Submit')}
                </Button>
              </SignedOut>

              <SignedIn>
                <Textarea
                  className='w-full rounded-lg bg-card px-4 py-2.5 ring-1 ring-border/60 focus-visible:ring-primary/40'
                  placeholder='Comment'
                  rows={3}
                  name='content'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant='nature'
                  disabled={isSubmitting}
                  onClick={handleSubmitDebounced}
                >
                  {t(isSubmitting ? 'Submitting' : 'Submit')}
                </Button>
              </SignedIn>
            </div>
          )}
        </>
      )}
      <div className='w-full max-w-2xl rounded-lg border border-border/70 bg-card/70 p-2 shadow-sm'>
        <MapBoard id={playerData.maps[0]} />
      </div>
    </div>
  );
};
