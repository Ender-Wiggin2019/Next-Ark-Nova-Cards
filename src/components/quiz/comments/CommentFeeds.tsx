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
import { IQuizComment } from '@/types/quiz';

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
    <li className='relative'>
      <div className='relative flex items-start gap-3'>
        <Image
          src={
            comment.userinfo?.imageUrl ||
            `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
          }
          alt={`${comment.userinfo?.username ?? 'Anonymous'} avatar`}
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
            <time
              dateTime={comment.updatedat.toString()}
              className='select-none text-xs text-muted-foreground'
            >
              {dayjs(comment.updatedat).locale('zh-cn').fromNow()}
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
  seed: string;
  comments: ICommentMemo;
  replies: CommentDto[];
}) {
  const sortedCommentsArray = Array.from(props.comments.cardPickComments).sort(
    (a, b) => {
      const COMMENT_WEIGHT = 5;
      const SUBMIT_WEIGHT = 1;
      const weightA = a[1].reduce((acc, comment) => {
        const len = comment?.content?.length || 0;
        return acc + (len > 0 ? COMMENT_WEIGHT : SUBMIT_WEIGHT);
      }, 0);

      const weightB = b[1].reduce((acc, comment) => {
        const len = comment?.content?.length || 0;
        return acc + (len > 0 ? COMMENT_WEIGHT : SUBMIT_WEIGHT);
      }, 0);

      // 根据计算出的权重进行降序排序
      return weightB - weightA;
    },
  );
  // const { averageRating, numberOfRatings } = getAvgRatings(props.comments);
  // const withContentComments = props.comments.filter(
  //   (comment) => comment.content.length > 0
  // );
  return (
    <div className='mt-3 w-full'>
      <ul role='list' className='mt-2 flex flex-col gap-3 px-1 md:px-4'>
        {sortedCommentsArray.map(([key, comments]) => (
          <li
            key={key}
            className='relative flex flex-col gap-2 rounded-lg border border-border/70 bg-card/70 p-3 shadow-sm ring-1 ring-border/40'
          >
            {/* {true && (
        <span className='absolute left-0 top-14 -ml-px h-[calc(100%-4.5rem)] w-0.5 rounded bg-zinc-200 dark:bg-zinc-800'
          aria-hidden='true'
        />
      )} */}
            <div className='flex justify-start gap-2'>
              {(JSON.parse(key) as string[]).map((cardId) => (
                <TitleWrapper id={cardId} key={cardId} />
              ))}
              <Badge
                variant='nature'
                className='flex w-12 items-center justify-center'
              >
                {comments.length}
              </Badge>
            </div>
            <ul role='list' className='ml-4 flex flex-col gap-2'>
              {comments
                .filter((c) => c?.content?.length && c.content.length > 0)
                .map((comment, idx) => (
                  <CommentBlock
                    key={key + idx}
                    comment={comment}
                    // idx={idx}
                    // length={withContentComments.length}
                  />
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
