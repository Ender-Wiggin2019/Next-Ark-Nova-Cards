import type { NextApiRequest, NextApiResponse } from 'next';

import { enableDb } from '@/constant/env';
import { prisma } from '@/lib/prisma-client';

// GET /api/comments/lists?cardId:=cardId
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  if (!enableDb) {
    return res.status(503).json({ error: 'Database service is disabled' });
  }

  const { cardId } = req.query;
  const comments = await prisma.comment.findMany({
    where: {
      cardid: cardId as string,
    },
  });
  return res.json(comments);
}
