import type { SetUp } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// GET /api/quiz/lists
export default async function get(
  req: NextApiRequest,
  res: NextApiResponse<SetUp[]>
) {
  const data = await prisma.setUp.findMany({ orderBy: { createdat: 'desc' } });
  return res.json(data);
}
