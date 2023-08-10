import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// POST /api/comments/create/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { cardId, rating, title, content, authorName, authorId } = req.body;
  const result = await prisma.comment.create({
    data: {
      cardId: cardId,
      rating: rating,
      title: title,
      content: content,
      authorId: authorId,
      author: { connect: { id: authorId, name: authorName } },
    },
  });
  return res.status(201).json(result);
}
