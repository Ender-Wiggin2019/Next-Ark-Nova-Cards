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
  // ... any other filters
}

export const ProjectCardList: React.FC<ProjectCardListProps> = ({
  selectedTags,
  selectedRequirements,
  selectedCardSources = [],
  textFilter,
  onCardCountChange,
}) => {
  const projectsData = useProjectData();

  useEffect(() => {
    onCardCountChange(projectsData.length);
  }, [projectsData, onCardCountChange]);

  return (
    <CardList>
      {projectsData.map((project: ProjectCardType) => (
        <div key={project.id} className='scale-110 pb-10 md:scale-150 md:pb-36'>
          <ProjectCard key={project.id} project={project} />
        </div>
      ))}
    </CardList>
  );
};
