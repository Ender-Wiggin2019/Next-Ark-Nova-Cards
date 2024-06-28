import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma-client';

// import { generateSetUp } from '@/utils/GenerateRandomCards';

import { CardSource } from '@/types/CardSource';
// POST /api/comments/create/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const apiKey = req.headers['x-api-key'];

  console.log(apiKey, apiKey !== process.env.API_SECRET_KEY);

  let setUpType = req.body.setUpType;
  let cardSources;
  if (!setUpType) {
    return res.status(400).json({ error: 'Bad Request' });
  } else if (setUpType === 'BASE') {
    cardSources = [CardSource.BASE];
  } else {
    setUpType = 'ALL EXP';
    cardSources = [CardSource.BASE, CardSource.MARINE_WORLD, CardSource.PROMO];
  }
  //   if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }

  const seed = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  // const { cards, maps, finalScoring, conservations } =
  //   generateSetUp(seed, cardSources);
  // const result = await prisma.setUp.create({
  //   data: {
  //     total: 0,
  //     card_1: cards[0],
  //     card_2: cards[1],
  //     card_3: cards[2],
  //     card_4: cards[3],
  //     card_5: cards[4],
  //     card_6: cards[5],
  //     card_7: cards[6],
  //     card_8: cards[7],
  //     map_1: maps[0],
  //     map_2: maps[1],
  //     endgame_1: finalScoring[0],
  //     endgame_2: finalScoring[1],
  //     conservation_1: conservations[0],
  //     conservation_2: conservations[1],
  //     conservation_3: conservations[2],
  //     title: setUpType,
  //     content: '',
  //     game_setting: '',

  //     likes: 0,
  //   },
  // });
  // return res.status(201).json(result);
  return res.status(201).json('');
}
