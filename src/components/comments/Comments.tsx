'use client';

import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { CommentFeeds } from '@/components/comments/CommentFeeds';
import CommentInput from '@/components/comments/CommentInput';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommentDto } from '@/types/Comment';
import { UserArrowLeftIcon } from '../../../public';

// import { commentState, setComments } from '@/components/comments/comments.state';

type CommentProps = {
  cardId: string;
  initialComments?: CommentDto[];
};

export function Comments({ cardId, initialComments }: CommentProps) {
  const { t } = useTranslation('common');
  const { user } = useUser();
  // const state = useSnapshot(commentState);
  const pathname = usePathname();

  const { data: commentsFromAPI } = useQuery(
    ['comments', cardId],
    async () => {
      const res = await fetch('/api/comments/lists?cardId=' + cardId);
      const data = await res.json();
      return data as CommentDto[];
    },
    {
      refetchInterval: 30000,
      initialData: initialComments ?? [],
      // onSuccess: (newComments) => {
      //     // 更新 Valtio 的状态
      //     setComments(newComments);
      // }
    },
  );

  // 查找当前用户的评论
  const userComment = React.useMemo(() => {
    if (user && commentsFromAPI) {
      return commentsFromAPI.find(
        (comment) =>
          comment.userid === user.id && comment.cardid.toString() === cardId,
      );
    }
    return null;
  }, [user, commentsFromAPI, cardId]);
  return (
    <section className='flex flex-col gap-4 rounded-lg border border-border/70 bg-gradient-to-b from-card/85 to-secondary/40 p-4 shadow-sm shadow-primary/5 ring-1 ring-border/50'>
      <SignedOut>
        <SignInButton mode='modal' forceRedirectUrl={pathname}>
          <Button type='button'>
            <UserArrowLeftIcon className='mr-1.5 h-4 w-4' />
            {t('comment.login_to_comment')}
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <CommentInput cardId={cardId} comment={userComment} />
      </SignedIn>
      <Separator />
      <CommentFeeds cardId={cardId} comments={commentsFromAPI} />
    </section>
  );
}
