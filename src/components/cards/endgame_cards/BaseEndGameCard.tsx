import { useTranslation } from 'next-i18next';
import React from 'react';

import ParseDescription from '@/components/abilities/ParseDescription';
import { IconFactory } from '@/components/icons/IconFactory';

import { EffectType } from '@/types/Effect';
import { EndGameCard, getCSSDataId, isTableLayout } from '@/types/EndGameCard';
import { IconName } from '@/types/IconName';

type EndGameCardProps = {
  card: EndGameCard;
};

export const BaseEndGameCard: React.FC<EndGameCardProps> = ({ card }) => {
  const { t } = useTranslation('common');
  const dataId = getCSSDataId(card);
  const isTable = isTableLayout(card);
  const isText = card.scoreArray.length === 1;
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
            <div className='ark-card-title'>{t(card.name)}</div>
          </div>
        </div>
        <div className='ark-card-bottom'>
          <div className='project-card-description text-sm leading-none'>
            {!isText && <ParseDescription desc={card.description} />}
            {!isTable && <div className='mb-4' />}
            {/*<div className='icon-container icon-container-conservation'>*/}
            {/*  <div className='arknova-icon icon-conservation' />*/}
            {/*</div>*/}
            {isTable && (
              <>
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
              </>
            )}
            <div className='text-sm'>
              {!isTable &&
                !isText &&
                card.scoreArray.map((obj, idx) => (
                  <div key={idx} className='text-left'>
                    <ParseDescription
                      desc={{
                        effectType: EffectType.ENDGAME,
                        effectDesc: obj.requirement.toString() || '',
                      }}
                    />
                    <br />
                  </div>
                ))}
            </div>
            {isText && (
              <div className='-ml-4 flex items-center justify-between'>
                {/*<div className="flex-shrink-0 scale-[2.5] border-2">*/}
                {/*  <IconFactory {...card.bottomIcon} />*/}
                {/*</div>*/}
                <div className='w-10 shrink-0'>
                  <IconFactory {...card.bottomIcon} />
                </div>
                {/*<IconFactory {...card.bottomIcon} />*/}
                <div className='inline-block w-1/2 shrink-0'>
                  <ParseDescription
                    desc={{
                      effectType: EffectType.ENDGAME,
                      effectDesc:
                        card.scoreArray[0].requirement.toString() || '',
                    }}
                  />
                  <br />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
