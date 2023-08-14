'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { CommentFeeds } from '@/components/comments/CommentFeeds';
import CommentInput from '@/components/comments/CommentInput';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';

import { UserArrowLeftIcon } from '../../../public';

import { CommentDto } from '@/types/Comment';
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
    }
  );

  // 查找当前用户的评论
  const userComment = React.useMemo(() => {
    if (user && commentsFromAPI) {
      return commentsFromAPI.find(
        (comment) =>
          comment.userId === user.id && comment.cardId.toString() === cardId
      );
    }
    return null;
  }, [user, commentsFromAPI]);
  return (
    <section className='px-4 md:px-2'>
      <SignedOut>
        <SignInButton mode='modal' redirectUrl={pathname}>
          <Button type='button'>
            <UserArrowLeftIcon className='mr-1 h-5 w-5' />
            {t('comment.login_to_comment')}
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <CommentInput cardId={cardId} comment={userComment} />
      </SignedIn>
      <Separator className='mt-2' />
      <CommentFeeds cardId={cardId} comments={commentsFromAPI} />
    </section>
  );
}
