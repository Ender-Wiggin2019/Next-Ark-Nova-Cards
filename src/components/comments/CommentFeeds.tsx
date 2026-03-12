'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import React from 'react';
import { ClientRating as Rating } from '@/components/ui/ClientRating';
import 'dayjs/locale/en-gb';

// import { commentState, setComments } from './comments.state';
import { type CommentDto } from '@/types/Comment';
import { getAvgRatings } from '@/utils/rating';

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
    <li className='relative pb-6'>
      {idx !== length - 1 && (
        <span
          className='absolute left-5 top-12 -ml-px h-[calc(100%-3.5rem)] w-0.5 rounded bg-primary/30'
          aria-hidden='true'
        />
      )}
      <div className='relative flex items-start gap-3'>
        <Image
          src={
            comment.userinfo.imageUrl ?? `/avatars/avatar_${(idx % 8) + 1}.png`
          }
          alt=''
          width={40}
          height={40}
          className='h-10 w-10 shrink-0 rounded-full bg-muted ring-2 ring-border'
          unoptimized
        />
        <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <div className='flex items-center gap-2'>
            <b className='text-sm font-semibold text-foreground'>
              {comment.userinfo.username ?? 'Anonymous'}
            </b>
            <Rating
              emptyStyle={{ display: 'flex' }}
              fillStyle={{ display: '-webkit-inline-box' }}
              readonly={true}
              initialValue={comment.rating}
              size={14}
            />
            <time
              dateTime={comment.createdat.toString()}
              className='select-none text-xs text-muted-foreground'
            >
              {dayjs(comment.createdat).locale('zh-cn').fromNow()}
            </time>
          </div>
          <p className='text-sm leading-relaxed text-foreground/80'>
            {comment.content}
          </p>
        </div>
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
    (comment) => comment.content.length > 0,
  );
  return (
    <div className='mt-3'>
      <div className='mb-4 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-card via-card to-secondary/50 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm ring-1 ring-border/60'>
        <Rating
          emptyStyle={{ display: 'flex' }}
          fillStyle={{ display: '-webkit-inline-box' }}
          readonly={true}
          initialValue={averageRating}
          size={20}
        />
        <span>
          {averageRating.toFixed(2)} / 5
          <span className='ml-1 text-muted-foreground'>
            ({numberOfRatings} users)
          </span>
        </span>
      </div>
      <ul role='list' className='px-1 md:px-4'>
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
