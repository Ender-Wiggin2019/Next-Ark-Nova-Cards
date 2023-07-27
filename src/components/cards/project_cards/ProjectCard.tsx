// ProjectCard.tsx
import { useTranslation } from 'next-i18next';
import React from 'react';

import ProjectCardWrapper from '@/components/wrapper/ProjectWrapper';

import { ProjectCard as ProjectCardType } from '@/types/ProjectCard';

interface ProjectCardProps {
  project: ProjectCardType;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation('common');

  return (
    // <div>
    //     <h2>{project.name}</h2>
    //     <img src={project.image.toString()} alt={project.name} />
    //     <p>Price: {project.price}</p>
    //     {/* add other fields as needed */}
    // </div>
    <ProjectCardWrapper id={project.id}>
      <></>
    </ProjectCardWrapper>
  );
};
