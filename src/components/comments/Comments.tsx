'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';

import { CommentFeeds } from '@/components/comments/CommentFeeds';
import CommentInput from '@/components/comments/CommentInput';
import { Button } from '@/components/ui/Button';

import { UserArrowLeftIcon } from '../../../public';

import { CommentDto } from '@/types/Comment';

type CommentProps = {
  cardId: string;
  comments?: CommentDto[];
};
export function Comments({ cardId, comments }: CommentProps) {
  const pathname = usePathname();

  return (
    <section className='px-4 md:px-2'>
      <SignedOut>
        <SignInButton mode='modal' redirectUrl={pathname}>
          <Button type='button'>
            <UserArrowLeftIcon className='mr-1 h-5 w-5' />
            login to comment
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <CommentInput cardId={cardId} />
      </SignedIn>

      <CommentFeeds cardId={cardId} comments={comments} />
    </section>
  );
}
