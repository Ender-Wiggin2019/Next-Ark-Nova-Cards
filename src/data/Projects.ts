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
    slots: [],
    placeBonuses: [],
    description: {
      effectType: EffectType.CONSERVATION,
      effectDesc: '将一个放归 {SeaAnimalTag} 野外。',
    },
    // meta data
    source: CardSource.BASE,
  },
];
