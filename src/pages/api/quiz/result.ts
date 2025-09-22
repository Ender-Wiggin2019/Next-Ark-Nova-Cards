import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// GET /api/comments/lists?cardId:=cardId
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const { seed } = req.query;
  const result = await prisma.userSetUp.findMany({
    where: {
      seed: seed as string,
    },
  });
  return res.json(result);
}
