import type { NextApiRequest, NextApiResponse } from 'next';

import { enableDb } from '@/constant/env';
import { prisma } from '@/lib/prisma-client';

// GET /api/comments/lists?cardId:=cardId
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  if (!enableDb) {
    return res.status(503).json({ error: 'Database service is disabled' });
  }

  const { seed } = req.query;
  const result = await prisma.userSetUp.findMany({
    where: {
      seed: seed as string,
    },
  });
  return res.json(result);
}
