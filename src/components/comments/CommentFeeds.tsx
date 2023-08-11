'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import React from 'react';
import { useSnapshot } from 'valtio';
import 'dayjs/locale/en-gb';

import { commentState, setComments } from './comments.state';

import { type CommentDto } from '@/types/Comment';

dayjs.extend(relativeTime);

function Comment({
  comment,
  idx,
  length,
}: {
  comment: CommentDto;
  idx: number;
  length: number;
}) {
  return (
    <li className='relative pb-8'>
      {idx !== length - 1 && (
        <span
          className='absolute left-5 top-14 -ml-px h-[calc(100%-4.5rem)] w-0.5 rounded bg-zinc-200 dark:bg-zinc-800'
          aria-hidden='true'
        />
      )}
      <div className='relative flex items-start space-x-3'>
        <Image
          src={
            comment.userInfo.imageUrl ?? `/avatars/avatar_${(idx % 8) + 1}.png`
          }
          alt=''
          width={40}
          height={40}
          className='h-10 w-10 flex-shrink-0 rounded-full bg-zinc-200 ring-2 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-800'
          unoptimized
        />
        <div className='-mt-1 flex min-w-0 flex-1 items-center gap-3'>
          <b className='text-sm font-bold dark:text-zinc-100'>
            {comment.userInfo.username ?? 'Anonymous'}
          </b>
          <time
            dateTime={comment.createdAt.toString()}
            className='inline-flex select-none text-[12px] font-medium opacity-40'
          >
            {dayjs(comment.createdAt).locale('zh-cn').fromNow()}
          </time>
        </div>
      </div>
      <div className='comment__comment -mt-4 mb-1 pl-[3.25rem] text-sm'>
        {comment.content}
      </div>
    </li>
  );
}
const CommentBlock = React.memo(Comment);

export function CommentFeeds(props: {
  cardId: string;
  comments?: CommentDto[];
}) {
  const { data: feed } = useQuery(
    ['guestbook'],
    async () => {
      const res = await fetch('/api/comments/lists?cardId=' + props.cardId);
      const data = await res.json();
      return data as CommentDto[];
    },
    {
      refetchInterval: 30000,
      initialData: props.comments ?? [],
    }
  );
  const { comments } = useSnapshot(commentState);
  React.useEffect(() => {
    setComments(feed ?? []);
  }, [feed]);

  return (
    <div className='relative mt-12'>
      <div className='absolute inset-0 flex items-center' aria-hidden='true' />

      <ul role='list' className='-mb-8 px-1 md:px-4'>
        {comments.map((comment, idx) => (
          <CommentBlock
            key={comment.id}
            comment={comment}
            idx={idx}
            length={comments.length}
          />
        ))}
      </ul>
    </div>
  );
}
