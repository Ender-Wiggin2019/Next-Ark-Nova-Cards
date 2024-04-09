import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';
// PUT /api/comments/update/
export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rating, title, content, commentId } = req.body;

  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const existingComment = await prisma.comment.findUnique({
    where: { id: Number(commentId) },
  });

  if (!existingComment || existingComment.userid !== user.id) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to edit this comment' });
  }

  const updatedComment = await prisma.comment.update({
    where: { id: Number(commentId) },
    data: {
      rating: parseInt(rating),
      title: title,
      content: content,
      userinfo: {
        username: user.username,
        imageUrl: user.imageUrl,
      },
    },
  });

  return res.status(200).json(updatedComment);
}
