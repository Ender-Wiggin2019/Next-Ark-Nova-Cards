import React from 'react';

import { toCamelCase } from '@/lib/utils'; // Assuming the json file is named ProjectData.json

import { ProjectCard, ProjectCategory } from '@/types/ProjectCard';

interface ProjectCardWrapperProps {
  project: ProjectCard;
  children: React.ReactNode;
}

const ProjectCardWrapper: React.FC<ProjectCardWrapperProps> = ({
  project,
  children,
}) => {
  const { id, name } = project;

  // use project data instead of card name for decoupling
  let projectName = `P${id}_${toCamelCase(name)}`;
  if (project.type === ProjectCategory.BREED) {
    const targetName = name.split(' ')[0];
    projectName = `P${id}_${toCamelCase(targetName)}Breeding`;
  } else if (project.type === ProjectCategory.RELEASE) {
    const targetName = name.replace(' NATIONAL PARK', '');
    projectName = `P${id}_Release${toCamelCase(targetName)}`;
  }

  return (
    <div
      id={`card-${projectName}`}
      data-id={projectName}
      className='ark-card zoo-card project-card tooltipable'
      draggable={false}
    >
      <div className='ark-card-wrapper'>{children}</div>
    </div>
  );
};

export default ProjectCardWrapper;
