import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// GET /api/comments/lists?cardId:=cardId
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.setUp.findMany({ orderBy: { createdat: 'desc' } });
  return res.json(data);
}
