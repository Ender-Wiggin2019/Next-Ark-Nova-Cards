import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';
// POST /api/comments/create/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { cardId, rating, title, content } = req.body;
  console.log('req.body', cardId, rating, title, content);
  const { userId } = getAuth(req);
  // console.log('userId', userId);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log(
    JSON.stringify({
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
    })
  );
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
