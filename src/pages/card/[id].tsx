import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { BaseAnimalCard } from '@/components/cards/animal_cards/BaseAnimalCard';
import { AnimalModelCard } from '@/components/cards/animal_cards/models/AnimalModelCard';
import { BaseEndGameCard } from '@/components/cards/endgame_cards/BaseEndGameCard';
import { EndGameHoverCard } from '@/components/cards/endgame_cards/EndGameHoverCard';
import { BaseSponsorCard } from '@/components/cards/sponsor_cards/BaseSponsorCard';
import { Comments } from '@/components/comments/Comments';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimalCard as AnimalCardType } from '@/types/AnimalCard';
import { CardType } from '@/types/Card';
import { EndGameCard as EndGameCardType } from '@/types/EndGameCard';
import { SponsorCard as SponsorCardType } from '@/types/SponsorCard';
import { getAnimalCardModel } from '@/utils/GetAnimalCardModel';
import { getCardById, getCardTypeById } from '@/utils/GetCardById';

type Props = {
  // Add custom props here
};

function CardDetailSkeleton() {
  return (
    <div className='mb-24 flex flex-col'>
      <div className='flex flex-col items-center py-24 md:py-36 lg:pb-48 lg:pt-36'>
        <div className='flex gap-6'>
          <Skeleton className='h-[280px] w-[200px] rounded-xl' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-px w-full' />
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-4 w-20' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page(
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();

  if (router.isFallback) {
    return <CardDetailSkeleton />;
  }

  if (typeof router.query.id !== 'string') return null;
  const card = getCardById(router.query.id);
  if (typeof card !== 'object') return null;
  return (
    <Layout>
      <Seo templateTitle={`Ark Nova Card #${card.id} ${card.name}`} />
      <div className='mb-24 flex flex-col'>
        <div className='flex flex-col items-center py-24 md:py-36 lg:pb-48 lg:pt-36'>
          {getCardTypeById(router.query.id) === CardType.ANIMAL_CARD ? (
            <div className='flex flex-col items-center gap-4 md:flex-row md:gap-0 md:scale-125 lg:scale-150'>
              <div className='flex-initial md:mr-10 lg:mr-20'>
                <BaseAnimalCard animal={card as AnimalCardType} />
              </div>
              <AnimalModelCard
                id={card.id}
                model={getAnimalCardModel(card as AnimalCardType)}
                showLink={false}
              />
            </div>
          ) : null}

          {getCardTypeById(router.query.id) === CardType.SPONSOR_CARD ? (
            <div className='flex flex-col items-center gap-4 md:flex-row md:gap-0 md:scale-125 lg:scale-150'>
              <div className='flex-initial md:mr-10 lg:mr-20'>
                <BaseSponsorCard sponsor={card as SponsorCardType} />
              </div>
            </div>
          ) : null}

          {getCardTypeById(router.query.id) === CardType.END_GAME_CARD ? (
            <div className='flex flex-col items-center gap-4 md:flex-row md:gap-0 md:scale-125 lg:scale-150'>
              <div className='flex-initial md:mr-10 lg:mr-20'>
                <BaseEndGameCard card={card as EndGameCardType} />
              </div>
              <EndGameHoverCard
                id={card.id}
                showLink={false}
                card={card as EndGameCardType}
              />
            </div>
          ) : null}
        </div>

        <Comments cardId={router.query.id} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
  revalidate: 86400,
});

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
