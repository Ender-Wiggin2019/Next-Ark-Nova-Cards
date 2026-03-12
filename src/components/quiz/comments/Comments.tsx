'use client';

import { CommentFeeds } from '@/components/quiz/comments/CommentFeeds';
import { ICommentMemo } from '@/components/quiz/types';

type CommentProps = {
  seed: string;
  initialComments: ICommentMemo;
};

export function Comments({ seed, initialComments }: CommentProps) {
  return (
    <section className='w-full rounded-lg border border-border/70 bg-gradient-to-b from-card/85 to-secondary/40 px-2 py-3 shadow-sm shadow-primary/5 ring-1 ring-border/50'>
      <CommentFeeds seed={seed} comments={initialComments} replies={[]} />
    </section>
  );
}
