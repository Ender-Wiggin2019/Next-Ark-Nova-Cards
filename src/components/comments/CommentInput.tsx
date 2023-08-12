'use client';

import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

import { Textarea } from '@/components/ui/textarea';
type FormState = {
  userName: string;
  rating: number;
  content: string;
};

const CommentInput = ({
  // initialComment,
  cardId,
}: {
  // initialComment: Comment;
  cardId: string;
}) => {
  const { user } = useUser();
  const [formState, setFormState] = useState<FormState>({
    userName: '',
    rating: 0,
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // const upToDateCommentsQuery = useQuery<Comment[], Error>({
  //   queryKey: [`comments-${cardId}`],
  //   queryFn: async () => {
  //     const response = await fetch(`/api/comments/list?cardId=${cardId}`);
  //     if (!response.ok) throw new Error('Failed to fetch comments.');
  //     return response.json();
  //   },
  // });

  const mutation = useMutation(async (formData: FormState) => {
    const response = await fetch('/api/comments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        cardId,
        // rating: formData.rating,
        title: '',
        // content: formData.content,
      }),
    });
    if (!response.ok) throw new Error('Failed to create comment.');
    console.log('response', response);
    return response.json();
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await mutation.mutateAsync(formState);
      setFormState({ userName: '', rating: 0, content: '' });
      // upToDateCommentsQuery.refetch();
    } catch (error) {
      console.error('Failed to submit the comment:', error);
    }

    setSubmitting(false);
  };

  return (
    <>
      <h2 className='mb-4 text-xl font-bold lg:text-2xl'>Add a comment</h2>
      <CommentForm
        onSubmit={onSubmit}
        formState={formState}
        setFormState={setFormState}
        submitting={submitting}
      />

      <h2 className='mb-4 text-xl font-bold lg:text-2xl'>Comments</h2>
      {/*<CommentList comments={upToDateCommentsQuery.data || []} />*/}
    </>
  );
};

const CommentForm = ({
  onSubmit,
  formState,
  setFormState,
  submitting,
}: {
  onSubmit: (e: React.FormEvent) => void;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  submitting: boolean;
}) => {
  const handleRating = (rating: number) => {
    setFormState((prev) => ({ ...prev, rating: rating }));

    // other logic
  };
  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col items-start gap-2 lg:w-[70%]'
    >
      <Rating
        emptyStyle={{ display: 'flex' }}
        fillStyle={{ display: '-webkit-inline-box' }}
        onClick={handleRating}
      />
      {/*<label className='mb-2 mt-4 flex flex-col' htmlFor='content'>*/}
      {/*  Comment*/}
      {/*</label>*/}
      <Textarea
        className='w-full rounded-lg bg-white/80 px-4 py-2'
        placeholder='Comment'
        required
        rows={4}
        name='content'
        value={formState.content}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, content: e.target.value }))
        }
      ></Textarea>

      <button
        disabled={submitting}
        className='w-15 group flex items-center justify-center space-x-2 rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-xs font-medium text-zinc-900 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md hover:text-lime-700 focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'
        type='submit'
      >
        {submitting ? 'Submitting' : 'Submit comment'}
      </button>
    </form>
  );
};

// const CommentList = ({ comments }: { comments: Comment[] }) => {
//   if (comments.length === 0)
//     return (
//       <div className='mt-4'>No comments yet. Be the first to add one!</div>
//     );
//
//   return (
//     <div className='flex flex-col gap-y-4'>
//       {comments.map((comment) => (
//         <div key={comment.id} className='flex flex-col'>
//           <h3 className='font-bold'>{comment.userId}</h3>
//           <div>{comment.rating}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

export default CommentInput;
