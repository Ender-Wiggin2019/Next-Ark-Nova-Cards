import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// GET /api/ratings
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const comments = await prisma.comment.groupBy({
    by: ['cardid'],
    where: {
      rating: {
        gte: 1,
      },
    },
    _avg: { rating: true },
    _count: true,
  });
  return res.json(comments);
}
