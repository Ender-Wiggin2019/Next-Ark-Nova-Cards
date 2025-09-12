import type { SetUp } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { enableDb } from '@/constant/env';
import { prisma } from '@/lib/prisma-client';

// GET /api/quiz/lists
export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<SetUp[] | { error: string }>,
) {
  if (!enableDb) {
    return res.status(503).json({ error: 'Database service is disabled' });
  }

  const data = await prisma.setUp.findMany({ orderBy: { createdat: 'desc' } });
  return res.json(data);
}
