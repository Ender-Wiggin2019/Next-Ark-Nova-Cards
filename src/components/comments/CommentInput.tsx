'use client';

import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type FormState = {
  userName: string;
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
        rating: '5',
        title: '',
        content: formData.content,
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
      setFormState({ userName: '', content: '' });
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
  return (
    <form onSubmit={onSubmit} className='flex flex-col items-start lg:w-[50%]'>
      <label className='mb-2 flex flex-col' htmlFor='userName'>
        Author
      </label>
      <input
        className='w-full rounded-lg border-2 border-secondary bg-white px-4 py-2'
        placeholder='Author'
        name='userName'
        required
        value={formState.userName}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, userName: e.target.value }))
        }
      />
      <label className='mb-2 mt-4 flex flex-col' htmlFor='content'>
        Comment
      </label>
      <textarea
        className='w-full rounded-lg border-2 border-secondary bg-white px-4 py-2'
        placeholder='Comment'
        required
        rows={4}
        name='content'
        value={formState.content}
        onChange={(e) =>
          setFormState((prev) => ({ ...prev, content: e.target.value }))
        }
      ></textarea>
      <button
        disabled={submitting}
        className='mt-4 rounded-lg bg-secondary px-8 py-4 text-white transition-transform disabled:opacity-50 lg:hover:scale-[1.04] '
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
