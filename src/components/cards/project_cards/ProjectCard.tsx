// ProjectCard.tsx
import { useTranslation } from 'next-i18next';
import React from 'react';

import { cn } from '@/lib/utils';

import ParseDescription from '@/components/abilities/ParseDescription';
import PartenerZoo from '@/components/icons/conservations/PartenerZoo';
import ReleaseAnimal from '@/components/icons/conservations/ReleaseAnimal';
import ConservationIcon from '@/components/icons/tokens/ConservationIcon';
import ReputationIcon from '@/components/icons/tokens/ReputationIcon';
import TagIcon from '@/components/icons/tokens/TagIcon';
import ProjectCardWrapper from '@/components/wrapper/ProjectWrapper';

import { BonusType } from '@/types/Bonus';
import {
  ProjectCard as ProjectCardType,
  ProjectCategory,
} from '@/types/ProjectCard';

interface ProjectCardProps {
  project: ProjectCardType;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation('common');

  const isWide = (type: ProjectCategory) => {
    return (
      type === ProjectCategory.RELEASE ||
      type === ProjectCategory.BREED ||
      type === ProjectCategory.MARINE
    );
  };

  // console.log('3333', project.tag);
  return (
    // <div>
    //     <h2>{project.name}</h2>
    //     <img src={project.image.toString()} alt={project.name} />
    //     <p>Price: {project.price}</p>
    //     {/* add other fields as needed */}
    // </div>
    <ProjectCardWrapper project={project}>
      <div className='ark-card-top'>
        <div className='ark-card-top-left'>
          <div
            className={cn('project-card-top-left-icon', {
              wide: isWide(project.type),
            })}
          >
            <TagIcon type={project.tag} />
            {project.type === ProjectCategory.RELEASE && <ReleaseAnimal />}
            {project.type === ProjectCategory.BREED && <PartenerZoo />}
          </div>
        </div>
        <div className='ark-card-top-right'></div>
      </div>
      <div className='ark-card-middle'>
        <div className='ark-card-number sf-hidden'>{project.id}</div>
        <div className='ark-card-title-wrapper'>
          <div className='ark-card-title'>{project.name}</div>
        </div>
      </div>
      <div className='ark-card-bottom'>
        <div className='project-card-description sf-hidden'>
          <ParseDescription desc={project.description} />
        </div>
        {project.type === ProjectCategory.RELEASE && (
          <div className='zoo-card-bonuses' data-size='1'>
            <div className='zoo-card-bonus reputation'>1</div>
          </div>
        )}
        <div
          className={cn(
            'project-card-slots-container',
            {
              release: project.type === ProjectCategory.RELEASE,
            },
            { breed: project.type === ProjectCategory.BREED }
          )}
        >
          {project.slots.map((slot, index) => (
            <div key={index} className='project-card-slot'>
              <div
                className={cn(
                  'project-card-slot-indicator',
                  {
                    release: project.type === ProjectCategory.RELEASE,
                  },
                  { breed: project.type === ProjectCategory.BREED }
                )}
              >
                {/*<SizeCard size='4' />*/}
                {slot.indicator}
                {project.type === ProjectCategory.RELEASE && (
                  <div className='icon-container icon-container-animal-size-3'>
                    <div
                      className={cn(
                        'arknova-icon',
                        { 'icon-animal-size-4': slot.position === 1 },
                        { 'icon-animal-size-3': slot.position === 2 },
                        { 'icon-animal-size-2': slot.position === 3 }
                      )}
                    ></div>
                  </div>
                )}
              </div>
              {/*<div*/}
              {/*  id='card-P121_ReleaseSeacave_0'*/}
              {/*  className='project-card-slot-cube-holder'*/}
              {/*  data-type='Reptile'*/}
              {/*></div>*/}
              {!isWide(project.type) && (
                <TagIcon type={project.tag} slotCubeHolder={true} />
              )}
              {(project.type === ProjectCategory.RELEASE ||
                project.type === ProjectCategory.BREED) && (
                <div
                  className='project-card-slot-cube-holder'
                  data-type='Primate'
                ></div>
              )}
              <div className='project-card-slot-reward'>
                {slot.bonuses.map((bonus, index) => {
                  if (bonus.bonusType === BonusType.CONSERVATION_POINT) {
                    return (
                      <ConservationIcon key={index} value={bonus.bonusValue} />
                    );
                  } else if (bonus.bonusType === BonusType.REPUTATION) {
                    return (
                      <ReputationIcon key={index} value={bonus.bonusValue} />
                    );
                  }
                })}
              </div>
            </div>
          ))}

          {/*<div className='project-card-slot'>*/}
          {/*  <div className='project-card-slot-indicator release'>*/}
          {/*    <div className='icon-container icon-container-animal-size-3'>*/}
          {/*      <div className='arknova-icon icon-animal-size-3'></div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div*/}
          {/*    id='card-P121_ReleaseSeacave_1'*/}
          {/*    className='project-card-slot-cube-holder'*/}
          {/*    data-type='Reptile'*/}
          {/*  ></div>*/}
          {/*  <div className='project-card-slot-reward'>*/}
          {/*    <div className='icon-container icon-container-conservation'>*/}
          {/*      <div className='arknova-icon icon-conservation'>*/}
          {/*        <span>4</span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className='project-card-slot'>*/}
          {/*  <div className='project-card-slot-indicator release'>*/}
          {/*    <div className='icon-container icon-container-animal-size-2'>*/}
          {/*      <div className='arknova-icon icon-animal-size-2'></div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div*/}
          {/*    id='card-P121_ReleaseSeacave_2'*/}
          {/*    className='project-card-slot-cube-holder'*/}
          {/*    data-type='Reptile'*/}
          {/*  ></div>*/}
          {/*  <div className='project-card-slot-reward'>*/}
          {/*    <div className='icon-container icon-container-conservation'>*/}
          {/*      <div className='arknova-icon icon-conservation'>*/}
          {/*        <span>3</span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </ProjectCardWrapper>
  );
};
