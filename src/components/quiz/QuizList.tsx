import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';

import CardList from '@/components/cards/shared/CardList';

import { fetchAllQuizs, fetchCardRatings } from '@/utils/fetch';

import { CardSource } from '@/types/CardSource';
import { IRating } from '@/types/IRating';
import { ISponsorCard } from '@/types/ISponsorCard';
import { SortOrder } from '@/types/Order';
import { SponsorCard as SponsorCardType } from '@/types/SponsorCard';
import { SponsorCard } from '@/types/SponsorCard';
import {
  isAnimalTag,
  isContinentTag,
  isOtherTag,
  OtherTag,
  Tag,
} from '@/types/Tags';

import {
  NUMBER_CONSERVATION,
  NUMBER_FINAL_SCORING,
  NUMBER_HAND,
  NUMBER_MAP,
} from '@/utils/GenerateRandomCards';
import CardWrapper from '@/components/wrapper/CardWrapper';
import { MapBoard } from '@/components/map_boards/MapBoard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'next-i18next';

export const QuizList: React.FC = () => {
  const { t } = useTranslation('common');
  const shouldFetchRatings = true;
  const { data: allQuizs } = useQuery(['allQuizs'], fetchAllQuizs, {
    enabled: shouldFetchRatings,
    // staleTime: 60 * 1000,
  });
  const todayQuiz = allQuizs ? allQuizs[0] : null;
  const [handList, setHandList] = useState<string[]>([]);
  const [disableHand, setDisableHand] = useState(false);

  // const [endGameList, setEndGameList] = useState<string[]>([]);
  // const [disableEndGame, setDisableEndGame] = useState(false);
  console.log('5555', allQuizs);

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
    console.log('5555', handList, disableHand);
  };

  return (
    <div className=''>
      {!allQuizs && 'loading'}
      {todayQuiz && (
        <Card className='flex-col bg-white/50 p-2 xl:flex'>
          <Card className='flex w-full justify-center bg-white/50 p-2 xl:w-3/5'>
            {/* <CardHeader>
        <CardTitle>{t('Starting Hand')}</CardTitle>
      </CardHeader> */}
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
          </Card>
          {/* <Separator orientation='vertical' className='mx-2'/> */}
          <Card className='w-full flex-col justify-center bg-white/50 p-2 xl:w-2/5'>
            <CardHeader>
              <CardTitle>{t('Game Set Up')}</CardTitle>
              {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <MapBoard id={todayQuiz[`map_1`]} />
            <Separator orientation='horizontal' className='my-2 self-center' />

            <div className='flex justify-between'>
              {numArray(NUMBER_CONSERVATION).map((idx) => (
                <CardWrapper
                  key={'q_' + todayQuiz.id + idx}
                  id={todayQuiz[`conservation_${idx}`]}
                  canSelect={false}
                  disable={false}
                />
              ))}
            </div>
          </Card>
        </Card>
      )}
      {/* {allQuizs &&
        allQuizs.map(
          (quiz: any) => {
            return <>
            <div className='grid grid-cols-4 lg:grid-cols-6 gap-4'>
            {numArray(NUMBER_HAND).map((idx) => (
              <CardWrapper
                key={'q_' + quiz.id + idx}
                id={quiz[`card_${idx}`]}

              />
              ))};
              </div>

              <div className='grid grid-cols-4 lg:grid-cols-6 gap-4'>
            {numArray(NUMBER_MAP).map((idx) => (
              <MapBoard
                key={'q_' + quiz.id + idx}
                id={quiz[`map_${idx}`]}
              />
              ))};
              </div>

              <div className='grid grid-cols-4 lg:grid-cols-6 gap-4'>
            {numArray(NUMBER_CONSERVATION).map((idx) => (
              <CardWrapper
                key={'q_' + quiz.id + idx}
                id={quiz[`conservation_${idx}`]}
              />
              ))};
              </div>

              <div className='grid grid-cols-4 lg:grid-cols-6 gap-4'>
            {numArray(NUMBER_FINAL_SCORING).map((idx) => (
              <CardWrapper
                key={'q_' + quiz.id + idx}
                id={quiz[`endgame_${idx}`]}
              />
              ))};
              </div>
            </>
          }
        )} */}
    </div>
  );
};
