import { endOfDay, startOfDay } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '@/lib/prisma-client';

import { GameSetupGenerator } from '@/utils/GenerateRandomCards';

// import { generateSetUp } from '@/utils/GenerateRandomCards';
// POST /api/comments/create/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const apiKey = req.headers['x-api-key'];

  console.log(apiKey, apiKey !== process.env.API_SECRET_KEY, req);

  const gameConfig = req.body.gameConfig;

  if (!gameConfig) {
    return res.status(400).json({ error: 'Need to provide game config' });
  }
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return res
      .status(401)
      .json({ error: 'Unauthorized due to invalid API key' });
  }

  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  // 检查是否存在今天创建的记录
  const existingRecord = await prisma.setUp.findFirst({
    where: {
      createdat: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  // 如果存在，则不创建新记录，直接返回存在的记录
  if (existingRecord) {
    return res.status(200).json(existingRecord);
  }

  const seed =
    new Date().toISOString().slice(0, 10) + '-' + uuidv4().slice(0, 4);

  const gameSetupGenerator = new GameSetupGenerator(seed, gameConfig);
  const setup = gameSetupGenerator.generateGameSetup();

  const setupJson = JSON.parse(JSON.stringify(setup));
  const result = await prisma.setUp.create({
    data: {
      total: 0,
      seed: seed,
      gameconfig: gameConfig,
      setup: setupJson,
      title: '',
      content: '',
      likes: 0,
    },
  });
  return res.status(201).json(result);
  // return res.status(201).json('');
}
