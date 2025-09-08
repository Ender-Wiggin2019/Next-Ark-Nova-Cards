'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';

import { CommentFeeds } from '@/components/quiz/comments/CommentFeeds';
import { ICommentMemo } from '@/components/quiz/types';

type CommentProps = {
  seed: string;
  initialComments: ICommentMemo;
};

export function Comments({ seed, initialComments }: CommentProps) {
  return (
    <section className='px-0 py-2'>
      <SignedOut></SignedOut>

      <SignedIn></SignedIn>
      <CommentFeeds seed={seed} comments={initialComments} replies={[]} />
    </section>
  );
}
