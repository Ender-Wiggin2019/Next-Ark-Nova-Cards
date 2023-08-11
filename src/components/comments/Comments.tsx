'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';

import { CommentFeeds } from '@/components/comments/CommentFeeds';
import CommentInput from '@/components/comments/CommentInput';
import { Button } from '@/components/ui/Button';

import { UserArrowLeftIcon } from '../../../public';

import { CommentDto } from '@/types/Comment';
// import { type GuestbookDto } from '~/db/dto/guestbook.dto'

// import { GuestbookFeeds } from './GuestbookFeeds'
// import { GuestbookInput } from './GuestbookInput'

// const comment: CommentDto = {
//     id: '1',
//     cardId: 1,
//     rating: 2,
//     title: 'title',
//     content: 'content',
//     userId: '1',
//     userInfo: {
//         firstName: 'firstName',
//         lastName: 'lastName',
//         imageUrl: 'imageUrl',
//     }
// }

type CommentProps = {
  cardId: string;
  comments?: CommentDto[];
};
export function Comments({ cardId, comments }: CommentProps) {
  const pathname = usePathname();

  return (
    <section className='max-w-2xl'>
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
