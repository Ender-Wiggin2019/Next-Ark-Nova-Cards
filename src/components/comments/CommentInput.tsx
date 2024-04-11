'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

import { Textarea } from '@/components/ui/textarea';

import { CommentDto } from '@/types/Comment';

type FormState = {
  userName: string;
  rating: number;
  content: string;
};

const CommentInput = ({
  cardId,
  comment,
}: {
  cardId: string;
  comment?: CommentDto | null;
}) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const router = useRouter();
  const shouldUpdate = !!comment;
  const [formState, setFormState] = useState<FormState>({
    userName: '',
    rating: comment?.rating || 0,
    content: comment?.content || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const createMutation = useMutation(
    async (formData: FormState) => {
      const response = await fetch('/api/comments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          title: '',
          cardId,
        }),
      });
      if (!response.ok) throw new Error('Failed to create comment.');
      return response.json();
    },
    {
      onSuccess: () => {
        // 使评论列表查询失效
        queryClient.invalidateQueries(['comments', cardId]);
      },
    }
  );

  const updateMutation = useMutation(
    async (formData: FormState) => {
      if (!comment?.id) throw new Error('No comment ID provided for update.');
      const response = await fetch(`/api/comments/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cardId,
          commentId: comment.id,
        }),
      });
      if (!response.ok) throw new Error('Failed to update comment.');
      return response.json();
    },
    {
      onSuccess: () => {
        // 使评论列表查询失效
        queryClient.invalidateQueries(['comments', cardId]);
      },
    }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (shouldUpdate) {
        await updateMutation.mutateAsync(formState);
      } else {
        await createMutation.mutateAsync(formState);
      }
      router.reload();
      // setFormState({ userName: '', rating: comment?.rating || 0, content: comment?.content || '' });
      // upToDateCommentsQuery.refetch();
    } catch (error) {
      console.error('Failed to submit the comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setFormState({
      userName: '',
      rating: comment?.rating || 0,
      content: comment?.content || '',
    });
  }, [comment]);
  return (
    <>
      <h2 className='mb-4 text-xl font-bold text-zinc-900 lg:text-2xl'>
        {t('Welcome to share your idea')}
      </h2>
      <CommentForm
        onSubmit={onSubmit}
        formState={formState}
        setFormState={setFormState}
        submitting={submitting}
        shouldUpdate={shouldUpdate}
      />
      {/*<CommentList comments={upToDateCommentsQuery.data || []} />*/}
    </>
  );
};

const CommentForm = ({
  onSubmit,
  formState,
  setFormState,
  submitting,
  shouldUpdate,
}: {
  onSubmit: (e: React.FormEvent) => void;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  submitting: boolean;
  shouldUpdate: boolean;
}) => {
  const { t } = useTranslation();
  const handleRating = (rating: number) => {
    setFormState((prev) => ({ ...prev, rating: rating }));

    // other logic
  };
  return (
    <form
      onSubmit={onSubmit}
      className='mb-4 flex flex-col items-start gap-2 lg:w-[70%]'
    >
      <Rating
        emptyStyle={{ display: 'flex' }}
        fillStyle={{ display: '-webkit-inline-box' }}
        onClick={handleRating}
        size={24}
        initialValue={formState.rating}
      />
      <Textarea
        className='w-full rounded-lg bg-white/80 px-4 py-2'
        placeholder='Comment'
        rows={4}
        name='content'
        value={formState.content}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, content: e.target.value }))
        }
      ></Textarea>

      <button
        disabled={submitting}
        className='group flex w-24 items-center justify-center space-x-2 rounded-full bg-lime-500 px-4 py-2 text-xs font-medium text-zinc-900 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md hover:text-lime-700 focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'
        type='submit'
      >
        {submitting
          ? t('Submitting')
          : shouldUpdate
          ? t('Update')
          : t('Submit')}
      </button>
    </form>
  );
};

export default CommentInput;
