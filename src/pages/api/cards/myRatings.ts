import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// GET /api/myRatings?cardId:=cardId&userId:=userId
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  const cardId = req.query.cardId ? (req.query.cardId as string) : null;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    let ratings;
    if (cardId) {
      ratings = await prisma.comment.findMany({
        where: {
          userid: userId,
          cardid: cardId,
        },
      });
    } else {
      ratings = await prisma.comment.findMany({
        where: {
          userid: userId,
        },
      });
    }
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
}
