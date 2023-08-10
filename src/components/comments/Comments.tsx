import type { Comment } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useRef, useState } from 'react';
const Comments = ({
  initialComments,
  cardId,
}: {
  initialComments?: Comment[];
  cardId: string;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle' | 'loading'>('idle');
  const upToDateCommentsQuery = useQuery({
    queryKey: [`comments-${cardId}`],
    queryFn: async () => {
      const allCommentsInDb = await fetch(
        `/api/comments/list?cardId=${cardId}`
      );
      const allCommentsInDbJson = await allCommentsInDb.json();
      return allCommentsInDbJson as Comment[];
    },
    initialData: initialComments,
  });
  const onSubmit = async (e: React.FormEvent) => {
    setFormState('loading');
    e.preventDefault();
    if (e.currentTarget) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formData.set('cardId', cardId);
      await fetch('/api/comments/create', {
        method: 'POST',
        body: formData,
      });
      formRef.current?.reset();
      upToDateCommentsQuery.refetch();
    }
    setFormState('idle');
  };
  return (
    <Fragment>
      <h2 className='mb-4 text-xl font-bold lg:text-2xl'>Add a comment</h2>
      <form
        onSubmit={onSubmit}
        ref={formRef}
        className='flex flex-col items-start lg:w-[50%]'
      >
        <label className='mb-2 flex flex-col' htmlFor='author'>
          Author
        </label>
        <input
          className='w-full rounded-lg border-2 border-secondary bg-white px-4 py-2'
          placeholder='Author'
          name='author'
          required
        />
        <label className='mb-2 mt-4 flex flex-col' htmlFor='comment'>
          Comment
        </label>
        <textarea
          className='w-full rounded-lg border-2 border-secondary bg-white px-4 py-2'
          placeholder='Comment'
          required
          rows={4}
          name='comment'
        ></textarea>
        <button
          disabled={formState === 'loading'}
          className='mt-4 rounded-lg bg-secondary px-8 py-4 text-white transition-transform disabled:opacity-50 lg:hover:scale-[1.04] '
          type='submit'
        >
          {formState === 'loading' ? 'Submitting' : 'Submit comment'}
        </button>
      </form>

      <h2 className='mb-4 text-xl font-bold lg:text-2xl'>Comments</h2>
      {upToDateCommentsQuery?.data && upToDateCommentsQuery?.data.length > 0 ? (
        <div className='flex flex-col gap-y-4'>
          {upToDateCommentsQuery?.data?.map((comment) => (
            <div key={comment.id} className='flex flex-col'>
              <h3 className='font-bold'>{comment.authorId}</h3>
              <div>{comment.rating}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-4'>No comments yet. Be the first to add one!</div>
      )}
    </Fragment>
  );
};

export default Comments;
