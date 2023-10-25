import { EndGameCard, getCSSDataId } from '@/types/EndGameCard';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { IconFactory } from '@/components/icons/IconFactory';
import { IconName } from '@/types/IconName';
import ParseDescription from '@/components/abilities/ParseDescription';

type EndGameCardProps = {
  card: EndGameCard;
};

export const BaseEndGameCard: React.FC<EndGameCardProps> = ({ card }) => {
  const { t } = useTranslation('common');
  const dataId = getCSSDataId(card);
  return (
    <div
      id={`card-${dataId}`}
      data-id={dataId}
      className='ark-card zoo-card scoring-card'
    >
      <div className='ark-card-wrapper'>
        <div className='ark-card-top'>
          <div className='ark-card-top-left'>
            <div className='project-card-top-left-icon'>
              <div className='icon-container icon-container-endgame'>
                <div className='arknova-icon icon-endgame' />
              </div>
              <IconFactory {...card.topIcon} />
            </div>
          </div>
          <div className='ark-card-top-right' />
        </div>
        <div className='ark-card-middle'>
          <div className='ark-card-number sf-hidden'>{card.id}</div>
          <div className='ark-card-title-wrapper'>
            <div className='ark-card-title'>{card.name}</div>
          </div>
        </div>
        <div className='ark-card-bottom'>
          <div className='project-card-description'>
            <ParseDescription desc={card.description} />
            {/*<div className='icon-container icon-container-conservation'>*/}
            {/*  <div className='arknova-icon icon-conservation' />*/}
            {/*</div>*/}
            <table className='score-map'>
              <tbody>
                <tr>
                  <th>
                    <IconFactory {...card.bottomIcon} />
                  </th>
                  {card.scoreArray.map((obj) => {
                    return <td key={obj.requirement}>{obj.requirement}</td>;
                  })}
                </tr>
                <tr>
                  <th />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <th>
                    <IconFactory iconName={IconName.CONSERVATION_POINT} />
                  </th>
                  {card.scoreArray.map((obj) => {
                    return (
                      <td key={obj.conservationPoint}>
                        {obj.conservationPoint}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            <table></table>
          </div>
        </div>
      </div>
    </div>
  );
};
