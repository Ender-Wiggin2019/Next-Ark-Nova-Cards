'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import 'dayjs/locale/en-gb';

import { getAvgRatings } from '@/utils/GetAvgRatings';

// import { commentState, setComments } from './comments.state';
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
            comment.userinfo.imageUrl ?? `/avatars/avatar_${(idx % 8) + 1}.png`
          }
          alt=''
          width={40}
          height={40}
          className='h-10 w-10 flex-shrink-0 rounded-full bg-zinc-200 ring-2 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-800'
          unoptimized
        />
        <div className='-mt-1 flex min-w-0 flex-1 items-center gap-3'>
          <b className='text-sm font-bold dark:text-zinc-100'>
            {comment.userinfo.username ?? 'Anonymous'}
          </b>
          <Rating
            emptyStyle={{ display: 'flex' }}
            fillStyle={{ display: '-webkit-inline-box' }}
            className='-mt-1'
            readonly={true}
            initialValue={comment.rating}
            size={16}
          />
          <time
            dateTime={comment.createdat.toString()}
            className='inline-flex select-none text-[12px] font-medium opacity-40'
          >
            {dayjs(comment.createdat).locale('zh-cn').fromNow()}
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
  comments: CommentDto[];
}) {
  const { averageRating, numberOfRatings } = getAvgRatings(props.comments);
  const withContentComments = props.comments.filter(
    (comment) => comment.content.length > 0
  );
  return (
    <div className='relative mt-2'>
      <div
        className='absolute inset-0 flex flex-row items-center gap-2'
        aria-hidden='true'
      />

      <div className='group mb-2 flex w-72 items-center justify-center gap-2 space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'>
        <Rating
          emptyStyle={{ display: 'flex' }}
          fillStyle={{ display: '-webkit-inline-box' }}
          className='-mt-1'
          readonly={true}
          initialValue={averageRating}
          size={22}
        />
        {averageRating.toFixed(2)} / 5 ({numberOfRatings} users)
      </div>
      <ul role='list' className='-mb-8 mt-2 px-1 md:px-4'>
        {withContentComments.map((comment, idx) => (
          <CommentBlock
            key={comment.id}
            comment={comment}
            idx={idx}
            length={withContentComments.length}
          />
        ))}
      </ul>
    </div>
  );
}
