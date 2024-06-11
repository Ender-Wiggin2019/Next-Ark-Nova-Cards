import { BonusType } from '@/types/Bonus';
import { CardSource } from '@/types/CardSource';
import { EffectType } from '@/types/Effect';
import { ProjectCard, ProjectCategory } from '@/types/ProjectCard';
import { AnimalTag, ContinentTag, OtherTag } from '@/types/Tags';

export const ProjectsData: ProjectCard[] = [
  {
    id: '101',
    name: 'SPECIES DIVERSITY',
    type: ProjectCategory.BASE,
    tag: OtherTag.ALL_ANIMALS,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ALL_ANIMALS,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ALL_ANIMALS,
            bonusValue: 3,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ALL_ANIMALS,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_101',
    },
    // meta data
    source: CardSource.BASE,
  },

  {
    id: '102',
    name: 'HABITAT DIVERSITY',
    type: ProjectCategory.BASE,
    tag: OtherTag.ALL_CONTINENTS,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ALL_ANIMALS,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ALL_ANIMALS,
            bonusValue: 3,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ALL_ANIMALS,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_102',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '103',
    name: 'AFRICA',
    type: ProjectCategory.BASE,
    tag: ContinentTag.Africa,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Africa,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Africa,
            bonusValue: 3,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Africa,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_103',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '104',
    name: 'AMERICAS',
    type: ProjectCategory.BASE,
    tag: ContinentTag.Americas,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Americas,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Americas,
            bonusValue: 3,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Americas,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_104',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '105',
    name: 'AUSTRALIA',
    type: ProjectCategory.BASE,
    tag: ContinentTag.Australia,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Australia,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Australia,
            bonusValue: 4,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Australia,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_105',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '106',
    name: 'ASIA',
    type: ProjectCategory.BASE,
    tag: ContinentTag.Asia,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Asia,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Asia,
            bonusValue: 3,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Asia,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_106',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '107',
    name: 'EUROPE',
    type: ProjectCategory.BASE,
    tag: ContinentTag.Europe,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Europe,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Europe,
            bonusValue: 4,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: ContinentTag.Europe,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_107',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '108',
    name: 'PRIMATES',
    type: ProjectCategory.BASE,
    tag: AnimalTag.Primate,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Primate,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Primate,
            bonusValue: 4,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Primate,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_108',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '109',
    name: 'REPTILES',
    type: ProjectCategory.BASE,
    tag: AnimalTag.Reptile,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Reptile,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Reptile,
            bonusValue: 4,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Reptile,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_109',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '110',
    name: 'PREDATORS',
    type: ProjectCategory.BASE,
    tag: AnimalTag.Predator,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Predator,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Predator,
            bonusValue: 4,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Predator,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_110',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '111',
    name: 'HERBIVORES',
    type: ProjectCategory.BASE,
    tag: AnimalTag.Herbivore,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Herbivore,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Herbivore,
            bonusValue: 4,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Herbivore,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_110',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '112',
    name: 'BIRDS',
    type: ProjectCategory.BASE,
    tag: AnimalTag.Bird,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Bird,
            bonusValue: 5,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Bird,
            bonusValue: 4,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Bird,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_112',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '113',
    name: 'BAVARIAN FOREST NATIONAL PARK',
    type: ProjectCategory.RELEASE,
    tag: ContinentTag.Europe,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_113',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '114',
    name: 'YOSEMITE NATIONAL PARK',
    type: ProjectCategory.RELEASE,
    tag: ContinentTag.Americas,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_114',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '115',
    name: 'ANGTHONG NATIONAL PARK',
    type: ProjectCategory.RELEASE,
    tag: ContinentTag.Asia,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_115',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '116',
    name: 'SERENGETI NATIONAL PARK',
    type: ProjectCategory.RELEASE,
    tag: ContinentTag.Africa,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_116',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '117',
    name: 'BLUE MOUNTAINS NATIONAL PARK',
    type: ProjectCategory.RELEASE,
    tag: ContinentTag.Australia,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_117',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '118',
    name: 'SAVANNA',
    type: ProjectCategory.RELEASE,
    tag: AnimalTag.Predator,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_118',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '119',
    name: 'LOW MOUNTAIN RANGE',
    type: ProjectCategory.RELEASE,
    tag: AnimalTag.Bird,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_119',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '120',
    name: 'BAMBOO FOREST',
    type: ProjectCategory.RELEASE,
    tag: AnimalTag.Herbivore,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_120',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '121',
    name: 'SEA CAVE',
    type: ProjectCategory.RELEASE,
    tag: AnimalTag.Reptile,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_121',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '122',
    name: 'JUNGLE',
    type: ProjectCategory.RELEASE,
    tag: AnimalTag.Primate,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 5,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 4,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: 'release',
            bonusValue: 3,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_122',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '123',
    name: 'BIRD BREEDING PROGRAM',
    type: ProjectCategory.BREED,
    tag: AnimalTag.Bird,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 1,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_123',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '124',
    name: 'PREDATOR BREEDING PROGRAM',
    type: ProjectCategory.BREED,
    tag: AnimalTag.Predator,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 1,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_124',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '125',
    name: 'REPTILE BREEDING PROGRAM',
    type: ProjectCategory.BREED,
    tag: AnimalTag.Reptile,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 1,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_125',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '126',
    name: 'HERBIVORE BREEDING PROGRAM',
    type: ProjectCategory.BREED,
    tag: AnimalTag.Herbivore,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 1,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_126',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '127',
    name: 'PRIMATE BREEDING PROGRAM',
    type: ProjectCategory.BREED,
    tag: AnimalTag.Primate,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 1,
          },
          {
            bonusType: BonusType.REPUTATION,
            bonusValue: 2,
          },
        ],
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusValue: 2,
          },
        ],
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_127',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '128',
    name: 'AQUATIC',
    type: ProjectCategory.NORMAL,
    tag: OtherTag.Water,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Water,
            bonusValue: 4,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Water,
            bonusValue: 3,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Water,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_129',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '129',
    name: 'GEOLOGICAL',
    type: ProjectCategory.NORMAL,
    tag: OtherTag.Rock,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Rock,
            bonusValue: 4,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Rock,
            bonusValue: 3,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Rock,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_129',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '130',
    name: 'SMALL ANIMALS',
    type: ProjectCategory.NORMAL,
    tag: OtherTag.ANIMAL_SIZE_2,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ANIMAL_SIZE_2,
            bonusValue: 4,
          },
        ],
        indicator: 8,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ANIMAL_SIZE_2,
            bonusValue: 3,
          },
        ],
        indicator: 5,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.ANIMAL_SIZE_2,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_130',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '131',
    name: 'LARGE ANIMALS',
    type: ProjectCategory.NORMAL,
    tag: OtherTag.ANIMAL_SIZE_4,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Water,
            bonusValue: 4,
          },
        ],
        indicator: 4,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Water,
            bonusValue: 3,
          },
        ],
        indicator: 3,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Water,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_131',
    },
    // meta data
    source: CardSource.BASE,
  },
  {
    id: '132',
    name: 'RESEARCH',
    type: ProjectCategory.NORMAL,
    tag: OtherTag.Science,
    slots: [
      {
        position: 1,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Science,
            bonusValue: 4,
          },
        ],
        indicator: 5,
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Science,
            bonusValue: 3,
          },
        ],
        indicator: 4,
      },
      {
        position: 3,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: OtherTag.Science,
            bonusValue: 2,
          },
        ],
        indicator: 2,
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: 'project.desc_131',
    },
    // meta data
    source: CardSource.BASE,
  },
];
