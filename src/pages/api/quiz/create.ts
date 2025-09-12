import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { enableDb } from '@/constant/env';
import { prisma } from '@/lib/prisma-client';

import { GameSetupGenerator } from '@/utils/setup';

// import { generateSetUp } from '@/utils/GenerateRandomCards';
// POST /api/comments/create/
export default async function post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  if (!enableDb) {
    return res.status(503).json({ error: 'Database service is disabled' });
  }

  const apiKey = req.headers['x-api-key'];

  const gameConfig = req.body.gameConfig;
  let seed = req.body.seed;

  if (!gameConfig) {
    return res.status(400).json({ error: 'Need to provide game config' });
  }
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return res
      .status(401)
      .json({ error: 'Unauthorized due to invalid API key' });
  }

  if (!seed)
    seed = new Date().toISOString().slice(0, 10) + '-' + uuidv4().slice(0, 4);

  if (gameConfig.mode === 'arena') {
    seed = 'a-' + seed;
  }

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
}
