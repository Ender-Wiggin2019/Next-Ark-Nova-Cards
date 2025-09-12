import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';

import { enableDb } from '@/constant/env';
import { prisma } from '@/lib/prisma-client';
// POST /api/comments/create/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  if (!enableDb) {
    return res.status(503).json({ error: 'Database service is disabled' });
  }

  const { cardId, rating, title, content } = req.body;
  const { userId } = getAuth(req);
  // console.log('userId', userId);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const result = await prisma.comment.create({
    data: {
      cardid: cardId,
      rating: parseInt(rating),
      title: title,
      content: content,
      userid: user.id,
      // user: { connect: { id: user.id, name: authorName } },
      userinfo: {
        username: user.username,
        imageUrl: user.imageUrl,
      },
    },
  });
  return res.status(201).json(result);
}
