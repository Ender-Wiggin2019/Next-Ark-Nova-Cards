export type ActionCategory =
  | 'animals'
  | 'association'
  | 'build'
  | 'cards'
  | 'sponsors';

export type ActionLevel = 1 | 2;

export interface ActionCard {
  id: string;
  category: ActionCategory;
  level: ActionLevel;
  variant: number;
  name: string;
  image: string;
  isBase?: boolean;
}

export function getLocalizedActionCardImagePath(
  imagePath: string,
  isZhCN: boolean,
) {
  if (isZhCN || imagePath.startsWith('/img/actions/base/')) {
    return imagePath;
  }

  const match = imagePath.match(/^\/img\/actions\/([^/]+)\/(.+)\.(jpg|webp)$/i);
  if (!match) return imagePath;

  const [, category, filename] = match;
  const categoryMap: Record<string, string> = {
    animals: '英文animals',
    association: '英文association',
    build: '英文build',
    cards: '英文cards',
    sponsors: '英文sponsors',
  };

  const enCategory = categoryMap[category];
  if (!enCategory) return imagePath;

  return `/img/actions/en/${enCategory}/${filename}.webp`;
}

export const ACTION_CATEGORIES: { key: ActionCategory; label: string }[] = [
  { key: 'animals', label: '动物' },
  { key: 'association', label: '协会' },
  { key: 'build', label: '建造' },
  { key: 'cards', label: '卡牌' },
  { key: 'sponsors', label: '赞助' },
];

export const ACTION_CARDS: ActionCard[] = [
  {
    id: 'animals_1_1',
    category: 'animals',
    level: 1,
    variant: 1,
    name: '动物减条件（Ignore Animals）',
    image:
      '/img/actions/cn/animals/animals_1_1_动物减条件（Ignore Animals）.webp',
  },
  {
    id: 'animals_1_2',
    category: 'animals',
    level: 2,
    variant: 1,
    name: '动物减条件（Ignore Animals）',
    image:
      '/img/actions/cn/animals/animals_1_2_动物减条件（Ignore Animals）.webp',
  },
  {
    id: 'animals_2_1',
    category: 'animals',
    level: 1,
    variant: 2,
    name: '动物狩猎（Hunter Animals）',
    image:
      '/img/actions/cn/animals/animals_2_1_动物狩猎（Hunter Animals）.webp',
  },
  {
    id: 'animals_2_2',
    category: 'animals',
    level: 2,
    variant: 2,
    name: '动物狩猎（Hunter Animals）',
    image:
      '/img/actions/cn/animals/animals_2_2_动物狩猎（Hunter Animals）.webp',
  },
  {
    id: 'animals_3_1',
    category: 'animals',
    level: 1,
    variant: 3,
    name: '动物 -2C（Discount Animals）',
    image:
      '/img/actions/cn/animals/animals_3_1_动物 -2C（Discount Animals）.webp',
  },
  {
    id: 'animals_3_2',
    category: 'animals',
    level: 2,
    variant: 3,
    name: '动物 -2C（Discount Animals）',
    image:
      '/img/actions/cn/animals/animals_3_2_动物 -2C（Discount Animals）.webp',
  },
  {
    id: 'animals_4_1',
    category: 'animals',
    level: 1,
    variant: 4,
    name: '动物标记（Mark Animals）',
    image: '/img/actions/cn/animals/animals_4_1_动物标记（Mark Animals）.webp',
  },
  {
    id: 'animals_4_2',
    category: 'animals',
    level: 2,
    variant: 4,
    name: '动物标记（Mark Animals）',
    image: '/img/actions/cn/animals/animals_4_2_动物标记（Mark Animals）.webp',
  },
  {
    id: 'association_1_1',
    category: 'association',
    level: 1,
    variant: 1,
    name: '重复协（Supply Association）',
    image:
      '/img/actions/cn/association/association_1_1_重复协（Supply Association）.webp',
  },
  {
    id: 'association_1_2',
    category: 'association',
    level: 2,
    variant: 1,
    name: '重复协（Supply Association）',
    image:
      '/img/actions/cn/association/association_1_2_重复协（Supply Association）.webp',
  },
  {
    id: 'association_2_1',
    category: 'association',
    level: 1,
    variant: 2,
    name: '生人协（Hire Association）',
    image:
      '/img/actions/cn/association/association_2_1_生人协（Hire Association）.webp',
  },
  {
    id: 'association_2_2',
    category: 'association',
    level: 2,
    variant: 2,
    name: '生人协（Hire Association）',
    image:
      '/img/actions/cn/association/association_2_2_生人协（Hire Association）.webp',
  },
  {
    id: 'association_3_1',
    category: 'association',
    level: 1,
    variant: 3,
    name: '协 X（X Association）',
    image:
      '/img/actions/cn/association/association_3_1_协 X（X Association）.webp',
  },
  {
    id: 'association_3_2',
    category: 'association',
    level: 2,
    variant: 3,
    name: '协 X（X Association）',
    image:
      '/img/actions/cn/association/association_3_2_协 X（X Association）.webp',
  },
  {
    id: 'association_4_1',
    category: 'association',
    level: 1,
    variant: 4,
    name: '果断协（Self-clever Association）',
    image:
      '/img/actions/cn/association/association_4_1_果断协（Self-clever Association）.webp',
  },
  {
    id: 'association_4_2',
    category: 'association',
    level: 2,
    variant: 4,
    name: '果断协（Self-clever Association）',
    image:
      '/img/actions/cn/association/association_4_2_果断协（Self-clever Association）.webp',
  },
  {
    id: 'build_1_1',
    category: 'build',
    level: 1,
    variant: 1,
    name: '粉亭建（Pavillion Build）',
    image: '/img/actions/cn/build/build_1_1_粉亭建（Pavillion Build）.webp',
  },
  {
    id: 'build_1_2',
    category: 'build',
    level: 2,
    variant: 1,
    name: '粉亭建（Pavillion Build）',
    image: '/img/actions/cn/build/build_1_2_粉亭建（Pavillion Build）.webp',
  },
  {
    id: 'build_2_1',
    category: 'build',
    level: 1,
    variant: 2,
    name: '黑亭建（Kiosk Build）',
    image: '/img/actions/cn/build/build_2_1_黑亭建（Kiosk Build）.webp',
  },
  {
    id: 'build_2_2',
    category: 'build',
    level: 2,
    variant: 2,
    name: '黑亭建（Kiosk Build）',
    image: '/img/actions/cn/build/build_2_2_黑亭建（Kiosk Build）.webp',
  },
  {
    id: 'build_3_1',
    category: 'build',
    level: 1,
    variant: 3,
    name: '+1 建 （+1 Build）',
    image: '/img/actions/cn/build/build_3_1_+1 建 （+1 Build）.webp',
  },
  {
    id: 'build_3_2',
    category: 'build',
    level: 2,
    variant: 3,
    name: '+1 建 （+1 Build）',
    image: '/img/actions/cn/build/build_3_2_+1 建 （+1 Build）.webp',
  },
  {
    id: 'build_4_1',
    category: 'build',
    level: 1,
    variant: 4,
    name: '山水建（Terrain Build）',
    image: '/img/actions/cn/build/build_4_1_山水建（Terrain Build）.webp',
  },
  {
    id: 'build_4_2',
    category: 'build',
    level: 2,
    variant: 4,
    name: '山水建（Terrain Build）',
    image: '/img/actions/cn/build/build_4_2_山水建（Terrain Build）.webp',
  },
  {
    id: 'cards_1_1',
    category: 'cards',
    level: 1,
    variant: 1,
    name: '不弃牌（Keep Cards）',
    image: '/img/actions/cn/cards/cards_1_1_不弃牌（Keep Cards）.webp',
  },
  {
    id: 'cards_1_2',
    category: 'cards',
    level: 2,
    variant: 1,
    name: '不弃牌（Keep Cards）',
    image: '/img/actions/cn/cards/cards_1_2_不弃牌（Keep Cards）.webp',
  },
  {
    id: 'cards_2_1',
    category: 'cards',
    level: 1,
    variant: 2,
    name: '刨挖牌（Digging Cards）',
    image: '/img/actions/cn/cards/cards_2_1_刨挖牌（Digging Cards）.webp',
  },
  {
    id: 'cards_2_2',
    category: 'cards',
    level: 2,
    variant: 2,
    name: '刨挖牌（Digging Cards）',
    image: '/img/actions/cn/cards/cards_2_2_刨挖牌（Digging Cards）.webp',
  },
  {
    id: 'cards_3_1',
    category: 'cards',
    level: 1,
    variant: 3,
    name: '精选牌（Snap Cards）',
    image: '/img/actions/cn/cards/cards_3_1_精选牌（Snap Cards）.webp',
  },
  {
    id: 'cards_3_2',
    category: 'cards',
    level: 2,
    variant: 3,
    name: '精选牌（Snap Cards）',
    image: '/img/actions/cn/cards/cards_3_2_精选牌（Snap Cards）.webp',
  },
  {
    id: 'cards_4_1',
    category: 'cards',
    level: 1,
    variant: 4,
    name: '机灵牌（Clever Cards）',
    image: '/img/actions/cn/cards/cards_4_1_机灵牌（Clever Cards）.webp',
  },
  {
    id: 'cards_4_2',
    category: 'cards',
    level: 2,
    variant: 4,
    name: '机灵牌（Clever Cards）',
    image: '/img/actions/cn/cards/cards_4_2_机灵牌（Clever Cards）.webp',
  },
  {
    id: 'sponsors_1_1',
    category: 'sponsors',
    level: 1,
    variant: 1,
    name: '赞X 5C（Money Sponsors）',
    image:
      '/img/actions/cn/sponsors/sponsors_1_1_赞X 5C（Money Sponsors）.webp',
  },
  {
    id: 'sponsors_1_2',
    category: 'sponsors',
    level: 2,
    variant: 1,
    name: '赞X 5C（Money Sponsors）',
    image:
      '/img/actions/cn/sponsors/sponsors_1_2_赞X 5C（Money Sponsors）.webp',
  },
  {
    id: 'sponsors_2_1',
    category: 'sponsors',
    level: 1,
    variant: 2,
    name: '赞 3C（Money Sponsors）',
    image: '/img/actions/cn/sponsors/sponsors_2_1_赞 3C（Money Sponsors）.webp',
  },
  {
    id: 'sponsors_2_2',
    category: 'sponsors',
    level: 2,
    variant: 2,
    name: '赞 3C（Money Sponsors）',
    image: '/img/actions/cn/sponsors/sponsors_2_2_赞 3C（Money Sponsors）.webp',
  },
  {
    id: 'sponsors_3_1',
    category: 'sponsors',
    level: 1,
    variant: 3,
    name: '赞 4C（Sunbathing Sponsors）',
    image:
      '/img/actions/cn/sponsors/sponsors_3_1_赞 4C（Sunbathing Sponsors）.webp',
  },
  {
    id: 'sponsors_3_2',
    category: 'sponsors',
    level: 2,
    variant: 3,
    name: '赞 4C（Sunbathing Sponsors）',
    image:
      '/img/actions/cn/sponsors/sponsors_3_2_赞 4C（Sunbathing Sponsors）.webp',
  },
  {
    id: 'sponsors_4_1',
    category: 'sponsors',
    level: 1,
    variant: 4,
    name: '赞换赞（Snap Sponsors）',
    image: '/img/actions/cn/sponsors/sponsors_4_1_赞换赞（Snap Sponsors）.webp',
  },
  {
    id: 'sponsors_4_2',
    category: 'sponsors',
    level: 2,
    variant: 4,
    name: '赞换赞（Snap Sponsors）',
    image: '/img/actions/cn/sponsors/sponsors_4_2_赞换赞（Snap Sponsors）.webp',
  },
];

export const BASE_ACTION_CARDS: ActionCard[] = [
  {
    id: 'animals_0_1',
    category: 'animals',
    level: 1,
    variant: 0,
    name: '动物（Animals）',
    image: '/img/actions/en/animals/animals_0_1_动物（Animals）.webp',
    isBase: true,
  },
  {
    id: 'animals_0_2',
    category: 'animals',
    level: 2,
    variant: 0,
    name: '动物（Animals）',
    image: '/img/actions/en/animals/animals_0_2_动物（Animals）.webp',
    isBase: true,
  },
  {
    id: 'association_0_1',
    category: 'association',
    level: 1,
    variant: 0,
    name: '协会（Association）',
    image:
      '/img/actions/en/association/association_0_1_协会（Association）.webp',
    isBase: true,
  },
  {
    id: 'association_0_2',
    category: 'association',
    level: 2,
    variant: 0,
    name: '协会（Association）',
    image:
      '/img/actions/en/association/association_0_2_协会（Association）.webp',
    isBase: true,
  },
  {
    id: 'build_0_1',
    category: 'build',
    level: 1,
    variant: 0,
    name: '建造（Build）',
    image: '/img/actions/en/build/build_0_1_建造（Build）.webp',
    isBase: true,
  },
  {
    id: 'build_0_2',
    category: 'build',
    level: 2,
    variant: 0,
    name: '建造（Build）',
    image: '/img/actions/en/build/build_0_2_建造（Build）.webp',
    isBase: true,
  },
  {
    id: 'cards_0_1',
    category: 'cards',
    level: 1,
    variant: 0,
    name: '卡牌（Cards）',
    image: '/img/actions/en/cards/cards_0_1_卡牌（Cards）.webp',
    isBase: true,
  },
  {
    id: 'cards_0_2',
    category: 'cards',
    level: 2,
    variant: 0,
    name: '卡牌（Cards）',
    image: '/img/actions/en/cards/cards_0_2_卡牌（Cards）.webp',
    isBase: true,
  },
  {
    id: 'sponsors_0_1',
    category: 'sponsors',
    level: 1,
    variant: 0,
    name: '赞助商（Money Sponsors）',
    image:
      '/img/actions/en/sponsors/sponsors_0_1_赞助商（Money Sponsors）.webp',
    isBase: true,
  },
  {
    id: 'sponsors_0_2',
    category: 'sponsors',
    level: 2,
    variant: 0,
    name: '赞助商（Money Sponsors）',
    image:
      '/img/actions/en/sponsors/sponsors_0_2_赞助商（Money Sponsors）.webp',
    isBase: true,
  },
];

export const ALL_ACTION_CARDS: ActionCard[] = [
  ...ACTION_CARDS,
  ...BASE_ACTION_CARDS,
];

export function getLocalizedActionImagePath(
  imagePath: string,
  language: string,
  isBase = false,
) {
  const isZhCN = language === 'zh-CN' || language === 'zh';

  if (isBase) {
    if (!isZhCN) return imagePath;
    const filename = imagePath.split('/').at(-1) ?? '';
    const id = filename.split('_').slice(0, 3).join('_');
    return id ? `/img/actions/base/zh/${id}.webp` : imagePath;
  }

  return isZhCN
    ? imagePath
    : imagePath.replace('/img/actions/cn/', '/img/actions/en/');
}

export function getGroupedCards(cards: ActionCard[]) {
  const grouped: Record<string, ActionCard[]> = {};

  cards.forEach((card) => {
    const groupKey = `${card.category}_${card.variant}`;
    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(card);
  });

  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => a.level - b.level);
  });

  return grouped;
}
