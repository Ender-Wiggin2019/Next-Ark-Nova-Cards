import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// GET /api/comments/lists?cardId:=cardId
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const { cardId } = req.query;
  const comments = await prisma.comment.findMany({
    where: {
      cardid: cardId as string,
    },
  });
  return res.json(comments);
}
