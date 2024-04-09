import { clerkClient, getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prisma-client';

// POST /api/quiz/submit/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  // console.log('userId', userId);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const apiKey = req.headers['x-api-key'];

  console.log(apiKey, apiKey !== process.env.API_SECRET_KEY);

  const set_up_id = req.body.set_up_id;
  const cardsSchema = z.array(z.boolean());
  const cards = cardsSchema.parse(req.body.cards);

  if (!cards) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  if (!set_up_id) {
    return res.status(400).json({ error: 'Bad Request' });
  }
  //   if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }

  const result = await prisma.userSetUp.create({
    data: {
      set_up_id: set_up_id,
      rating: 5,
      card_1: cards[0],
      card_2: cards[1],
      card_3: cards[2],
      card_4: cards[3],
      card_5: cards[4],
      card_6: cards[5],
      card_7: cards[6],
      card_8: cards[7],
      map_1: true,
      map_2: false,
      endgame_1: true,
      endgame_2: true,
      title: '',
      content: '',
      likes: 0,
      userid: user.id,
      // user: { connect: { id: user.id, name: authorName } },
      userinfo: {
        username: user.username,
        imageUrl: user.imageUrl,
      },
    },
  });

  // total += 1
  const result2 = await prisma.setUp.update({
    where: {
      id: set_up_id,
    },
    data: {
      total: {
        increment: 1,
      },
    },
  });
  return res.status(201).json(result);
}
