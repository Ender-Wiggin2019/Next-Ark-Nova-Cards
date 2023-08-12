import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// GET /api/comments/lists?cardId:=cardId
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const comments = await prisma.comment.groupBy({
    by: ['cardId'],
    _avg: { rating: true },
    _count: true,
  });
  return res.json(comments);
}
