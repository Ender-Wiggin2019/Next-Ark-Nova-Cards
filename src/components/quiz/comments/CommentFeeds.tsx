'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import React from 'react';
import 'dayjs/locale/en-gb';

import { ICommentMemo } from '@/components/quiz/types';
import { Badge } from '@/components/ui/badge';
import TitleWrapper from '@/components/wrapper/TitleWrapper';

// import { commentState, setComments } from './comments.state';
import { type CommentDto } from '@/types/Comment';
import { IQuizComment } from '@/types/IQuiz';

dayjs.extend(relativeTime);

function Comment({
  comment,
}: // idx,
// length,
{
  comment: IQuizComment;
  // idx: number;
  // length: number;
}) {
  return (
    <li className='relative pb-8'>
      {true && (
        <span
          className='absolute left-5 top-14 -ml-px h-[calc(100%-4.5rem)] w-0.5 rounded bg-zinc-200 dark:bg-zinc-800'
          aria-hidden='true'
        />
      )}
      <div className='relative flex items-start space-x-3'>
        <Image
          src={
            comment.userinfo?.imageUrl ||
            `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
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
          {/* <Rating
            emptyStyle={{ display: 'flex' }}
            fillStyle={{ display: '-webkit-inline-box' }} className='-mt-1'
            readonly={true}
            initialValue={comment.rating}
            size={16}
          /> */}
          <time
            dateTime={comment.updatedat.toString()}
            className='inline-flex select-none text-[12px] font-medium opacity-40'
          >
            {dayjs(comment.updatedat).locale('zh-cn').fromNow()}
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
  seed: string;
  comments: ICommentMemo;
  replies: CommentDto[];
}) {
  console.log('test2', props.comments);
  const sortedCommentsArray = Array.from(props.comments.cardPickComments).sort(
    (a, b) => {
      // 比较数组长度，进行倒序排序
      return b[1].length - a[1].length;
    }
  );
  // const { averageRating, numberOfRatings } = getAvgRatings(props.comments);
  // const withContentComments = props.comments.filter(
  //   (comment) => comment.content.length > 0
  // );
  return (
    <div className='relative mt-2 w-full'>
      <div
        className='absolute inset-0 flex flex-row items-center gap-2'
        aria-hidden='true'
      />

      {/* <div className='group mb-2 flex w-72 items-center justify-center gap-2 space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'>
        <Rating
          emptyStyle={{ display: 'flex' }}
          fillStyle={{ display: '-webkit-inline-box' }} className='-mt-1'
          readonly={true}
          initialValue={averageRating}
          size={22}
        />
        {averageRating.toFixed(2)} / 5 ({numberOfRatings} users)
      </div> */}
      <ul role='list' className='-mb-8 mt-2 flex flex-col gap-2 px-1 md:px-4'>
        {sortedCommentsArray.map(([key, comments]) => (
          <div key={key} className='flex flex-col gap-2'>
            <div className='flex justify-start gap-2'>
              {(JSON.parse(key) as string[]).map((cardId) => (
                <TitleWrapper id={cardId} key={cardId} />
              ))}
              <Badge className='flex w-12 items-center justify-center'>
                {comments.length}
              </Badge>
            </div>
            {comments
              .filter((c) => c.content.length > 0)
              .map((comment, idx) => (
                <CommentBlock
                  key={key}
                  comment={comment}
                  // idx={idx}
                  // length={withContentComments.length}
                />
              ))}
          </div>
        ))}
      </ul>
    </div>
  );
}
