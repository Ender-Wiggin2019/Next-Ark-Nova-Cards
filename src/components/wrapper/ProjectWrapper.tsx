import React from 'react';

import { cardNames } from '@/data/CardNames'; // Assuming the json file is named ProjectData.json

interface ProjectCardWrapperProps {
  id: string;
  children: React.ReactNode;
}

const ProjectCardWrapper: React.FC<ProjectCardWrapperProps> = ({
  id,
  children,
}) => {
  const projectName = cardNames[id];

  return (
    <div className='player-board-hand' style={{ order: 4 }}>
      <div
        id={`card-${projectName}`}
        data-id={projectName}
        className='ark-card zoo-card project-card tooltipable'
        draggable={false}
      >
        <div className='ark-card-wrapper'>{children}</div>
      </div>
    </div>
  );
};

export default ProjectCardWrapper;
