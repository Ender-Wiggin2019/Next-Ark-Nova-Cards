import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { enableDb } from '@/constant/env';
import { prisma } from '@/lib/prisma-client';

// POST /api/quiz/submit/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  if (!enableDb) {
    return res.status(503).json({ error: 'Database service is disabled' });
  }

  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;

  const seed = req.body.seed;
  const name = req.body.name;
  const cardsSchema = z.array(z.string());
  const cards = cardsSchema.parse(req.body.cards);

  if (!cards || cards.length < 4) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  if (!seed) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  // 检查是否存在今天创建的记录
  const existingRecord = await prisma.userSetUp.findFirst({
    where: {
      userid: user?.id || name || 'Anonymous',
      seed: seed,
      // createdat: {
      //   gte: todayStart,
      //   lte: todayEnd,
      // },
    },
  });

  // biome-ignore lint/suspicious/noConsole: <>
  console.log('existingRecord', existingRecord?.userinfo, user, userId);

  // 如果存在，则不创建新记录，直接返回存在的记录
  if (
    existingRecord &&
    (JSON.stringify(cards) !== existingRecord.data?.toString() ||
      req.body.content)
  ) {
    const result3 = await prisma.userSetUp.updateMany({
      where: {
        userid: user?.id || name || 'Anonymous',
        seed: seed,
      },
      data: {
        data: {
          cards: cards,
        },
        content: req.body.content || '',
      },
    });
    return res.status(201).json(result3);
  } else if (existingRecord) {
    return res.status(400).json({ error: 'Has repeated name' });
  }

  const result = await prisma.userSetUp.create({
    data: {
      seed: seed,
      rating: 5,
      data: {
        cards: cards,
      },
      title: '',
      content: req.body.content || '',
      likes: 0,
      userid: user?.id || name,
      // user: { connect: { id: user.id, name: authorName } },
      userinfo: {
        username: user?.username || name || 'Anonymous',
        imageUrl: user?.imageUrl || '',
      },
    },
  });

  await prisma.setUp.updateMany({
    where: {
      seed: seed,
    },
    data: {
      total: {
        increment: 1,
      },
    },
  });

  return res.status(201).json(result);
}
