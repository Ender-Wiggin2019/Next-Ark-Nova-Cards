'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { UserArrowLeftIcon } from '../../../../public';

import { CommentDto } from '@/types/Comment';
import { CommentFeeds } from '@/components/quiz/comments/CommentFeeds';
import { ICommentMemo } from '@/components/quiz/types';
// import { commentState, setComments } from '@/components/comments/comments.state';

type CommentProps = {
  seed: string;
  initialComments: ICommentMemo;
};

export function Comments({ seed, initialComments }: CommentProps) {
  const { t } = useTranslation('common');
  const { user } = useUser();
  // const state = useSnapshot(commentState);
  const pathname = usePathname();

  // const { data: repliesFromAPI } = useQuery(
  //   ['replies', seed],
  //   async () => {
  //     const res = await fetch('/api/quiz/comments/replies?seed=' + seed);
  //     const data = await res.json();
  //     return data as CommentDto[];
  //   },
  //   {
  //     refetchInterval: 30000 * 1000,
  //     initialData: [],
  //     // onSuccess: (newComments) => {
  //     //     // 更新 Valtio 的状态
  //     //     setComments(newComments);
  //     // }
  //   }
  // );

  // 查找当前用户的评论
  // const userComment = React.useMemo(() => {
  //   if (user && repliesFromAPI) {
  //     console.log(
  //       repliesFromAPI,
  //       user,
  //       repliesFromAPI.find(
  //         (comment) =>
  //           comment.userid === user.id && comment.cardid.toString() === cardId
  //       )
  //     );
  //     return repliesFromAPI.find(
  //       (comment) =>
  //         comment.userid === user.id && comment.cardid.toString() === cardId
  //     );
  //   }
  //   return null;
  // }, [user, repliesFromAPI]);
  return (
    <section className='px-0 py-2'>
      <SignedOut>
        {/* <SignInButton mode='modal' redirectUrl={pathname}>
          <Button type='button'>
            <UserArrowLeftIcon className='mr-1 h-5 w-5' />
            {t('comment.login_to_comment')}
          </Button>
        </SignInButton> */}
      </SignedOut>

      <SignedIn>
        {/* <CommentInput seed={seed} comment={userComment} /> */}
      </SignedIn>
      {/* <Separator className='mt-2' /> */}
      <CommentFeeds seed={seed} comments={initialComments} replies={[]} />
    </section>
  );
}
