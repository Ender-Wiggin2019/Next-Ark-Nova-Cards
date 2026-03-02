export interface ProjectBonusI18n {
  zhCN: string;
  en: string;
}

export interface ProjectBonusItem {
  id: string;
  title: ProjectBonusI18n;
  description: ProjectBonusI18n;
  image: string;
}

export const PROJECT_BONUSES: ProjectBonusItem[] = [
  {
    id: 'upgrade',
    title: { zhCN: '升级', en: 'Upgrade' },
    description: {
      zhCN: '升级你的任意一张行动卡牌。将一张行动卡牌从等级 I 翻面至等级 II。卡牌维持原有的卡牌槽位不变。',
      en: 'Upgrade any one of your action cards by flipping it from Level I to Level II. The card stays in the same action slot.',
    },
    image: '/img/project-bonuses/upgrade.webp',
  },
  {
    id: 'call-worker',
    title: { zhCN: '呼唤', en: 'Call Worker' },
    description: {
      zhCN: '雇佣 1个 协会事务员。',
      en: 'Hire 1 Association worker.',
    },
    image: '/img/project-bonuses/call-worker.webp',
  },
  {
    id: 'reputation-2',
    title: { zhCN: '2声望', en: '2 Reputation' },
    description: {
      zhCN: '你的声望提升 2 点。',
      en: 'Advance your reputation by 2.',
    },
    image: '/img/project-bonuses/reputation-2.webp',
  },
  {
    id: 'x-3',
    title: { zhCN: '3X', en: '3 X-Tokens' },
    description: {
      zhCN: '获得 3 枚 X 标记。',
      en: 'Gain 3 X-tokens.',
    },
    image: '/img/project-bonuses/x-3.webp',
  },
  {
    id: 'build-size-3',
    title: { zhCN: '3格', en: 'Size 3 Enclosure' },
    description: {
      zhCN: '你可以立刻免费建造一个 3格 的标准饲养区。',
      en: 'Immediately build one size-3 standard enclosure for free.',
    },
    image: '/img/project-bonuses/build-size-3.webp',
  },
  {
    id: 'draw-3',
    title: { zhCN: '3张', en: 'Draw 3 Cards' },
    description: {
      zhCN: '执行 3次：在声望范围内拿取一张卡牌，或者从牌库中抽取一张卡牌。',
      en: 'Perform 3 times: take one card from within reputation range, or draw one card from the deck.',
    },
    image: '/img/project-bonuses/draw-3.webp',
  },
  {
    id: 'money-5',
    title: { zhCN: '5元', en: '5 Money' },
    description: {
      zhCN: '获得 5元。',
      en: 'Gain 5 money.',
    },
    image: '/img/project-bonuses/money-5.webp',
  },
  {
    id: 'money-10',
    title: { zhCN: '10元', en: '10 Money' },
    description: {
      zhCN: '获得 10元。',
      en: 'Gain 10 money.',
    },
    image: '/img/project-bonuses/money-10.webp',
  },
  {
    id: 'double-token',
    title: { zhCN: 'X2', en: 'Double Token' },
    description: {
      zhCN: '将一个双重标记放置在你的一张行动卡牌上。',
      en: 'Place one double token on one of your action cards.',
    },
    image: '/img/project-bonuses/double-token.webp',
  },
  {
    id: 'university',
    title: { zhCN: '大学', en: 'University' },
    description: {
      zhCN: '从协会板图选择一个可用的大学。',
      en: 'Take one available university from the association board.',
    },
    image: '/img/project-bonuses/university.webp',
  },
  {
    id: 'partner-zoo',
    title: { zhCN: '大洲', en: 'Partner Zoo' },
    description: {
      zhCN: '从协会板图中选择一个可用的合作动物园。如果你的协会行动卡还没有升级，那么你不能拿取你的第三个合作动物园。',
      en: 'Take one available partner zoo from the association board. If your Association action card is not upgraded, you cannot take your third partner zoo.',
    },
    image: '/img/project-bonuses/partner-zoo.webp',
  },
  {
    id: 'ignore-3-requirements',
    title: { zhCN: '忽略3条件', en: 'Ignore 3 Requirements' },
    description: {
      zhCN: '限用一次：当你打出一张动物牌时，你最多可以忽略 3 个条件。',
      en: 'One-time use: when you play an animal card, you may ignore up to 3 requirements.',
    },
    image: '/img/project-bonuses/ignore-3-requirements.webp',
  },
  {
    id: 'base-project-icon-plus-1',
    title: { zhCN: '基础保护图标+1', en: 'Base Project Icon +1' },
    description: {
      zhCN: '限用一次：当支持基础保护项目时，你可以弃除本标记以代表任意图标。',
      en: 'One-time use: when supporting a base conservation project, discard this token to represent any icon.',
    },
    image: '/img/project-bonuses/base-project-icon-plus-1.webp',
  },
  {
    id: 'overtime',
    title: { zhCN: '加班', en: 'Overtime' },
    description: {
      zhCN: '限用一次：从协会板图上放回一个你的事务员。',
      en: 'One-time use: return one of your workers from the association board.',
    },
    image: '/img/project-bonuses/overtime.webp',
  },
  {
    id: 'snap-and-hand-limit-plus-1',
    title: { zhCN: '精选和手牌+1', en: 'Snap + Hand Limit +1' },
    description: {
      zhCN: '立即且一次：精选 1 张卡牌。持续效果：你的手牌上限加 1。（4 或 6 张，取决于你是否拥有增加手牌上限的大学。）',
      en: 'Immediate one-time effect: snap 1 card. Ongoing effect: your hand limit increases by 1 (to 4 or 6, depending on your university).',
    },
    image: '/img/project-bonuses/snap-and-hand-limit-plus-1.webp',
  },
  {
    id: 'sponsor-money',
    title: { zhCN: '钱赞', en: 'Sponsor with Money' },
    description: {
      zhCN: '限用一次：你可以花费和赞助商等级相等的钱打出一张赞助商，不能忽略打出条件。你的赞助商强度仍然保留在原位。',
      en: 'One-time use: play a sponsor card by paying money equal to your Sponsors action strength, without ignoring requirements. Your Sponsors action card stays in place.',
    },
    image: '/img/project-bonuses/sponsor-money.webp',
  },
  {
    id: 'adaptation-3',
    title: { zhCN: '适应3', en: 'Adaptation 3' },
    description: {
      zhCN: '抓取 3 张终局计分卡牌，然后弃除 3 张终局计分卡牌。',
      en: 'Draw 3 final scoring cards, then discard 3 final scoring cards.',
    },
    image: '/img/project-bonuses/adaptation-3.webp',
  },
  {
    id: 'posture-3',
    title: { zhCN: '姿态3', en: 'Posture 3' },
    description: {
      zhCN: '以任意组合，免费放置 3 个贩售亭/休憩亭。',
      en: 'Place 3 kiosks and/or pavilions for free in any combination.',
    },
    image: '/img/project-bonuses/posture-3.webp',
  },
];
