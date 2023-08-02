import { BonusType } from '@/types/Bonus';
import { CardSource } from '@/types/CardSource';
import { EffectType } from '@/types/Effect';
import { ProjectCard, ProjectCategory } from '@/types/ProjectCard';
import { AnimalTag } from '@/types/Tags';

export const ProjectsData: ProjectCard[] = [
  {
    id: '1',
    name: '',
    type: ProjectCategory.BASE,
    tag: AnimalTag.SeaAnimal,
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
      },
      {
        position: 2,
        bonuses: [
          {
            bonusType: BonusType.CONSERVATION_POINT,
            bonusRequirement: AnimalTag.Reptile,
            bonusValue: 3,
          },
        ],
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
      },
    ],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: '将一个放归 {SeaAnimalTag} 野外。',
    },
    // meta data
    source: CardSource.BASE,
  },
];
