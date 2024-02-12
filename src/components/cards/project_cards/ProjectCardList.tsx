import React, { useEffect } from 'react';

import CardList from '@/components/cards/shared/CardList';

import { ProjectCard } from './ProjectCard';
import { useProjectData } from './useProjectData';

import { CardSource } from '@/types/CardSource';
import { ProjectCard as ProjectCardType } from '@/types/ProjectCard';
import { Tag } from '@/types/Tags';

interface ProjectCardListProps {
  selectedTags?: Tag[];
  selectedRequirements?: Tag[];
  selectedCardSources?: CardSource[];
  textFilter?: string;
  onCardCountChange: (count: number) => void;
}

const filterCards = (
  cards: ProjectCardType[],
  selectedCardSources: CardSource[] = [],
  textFilter = ''
) => {
  const lowercaseFilter = textFilter.toLowerCase();

  return cards.filter(
    (card) =>
      (selectedCardSources.length === 0 ||
        selectedCardSources.some((src) => card.source === src)) &&
      (textFilter === '' ||
        card.id.toLowerCase().includes(lowercaseFilter) ||
        card.name.toLowerCase().includes(lowercaseFilter))
  );
};

export const ProjectCardList: React.FC<ProjectCardListProps> = ({
  selectedCardSources = [],
  textFilter,
  onCardCountChange,
}) => {
  const projectsData = useProjectData();

  const filteredConservations = filterCards(
    projectsData,
    selectedCardSources,
    textFilter
  );

  useEffect(() => {
    onCardCountChange(filteredConservations.length);
  }, [projectsData, onCardCountChange, filteredConservations.length]);

  return (
    <CardList>
      {filteredConservations.map((project: ProjectCardType) => (
        <div
          key={project.id}
          className='-mb-8 -ml-6 scale-75 md:scale-100 lg:mb-2 lg:ml-8 xl:ml-0'
        >
          <ProjectCard key={project.id} project={project} />
        </div>
      ))}
    </CardList>
  );
};
