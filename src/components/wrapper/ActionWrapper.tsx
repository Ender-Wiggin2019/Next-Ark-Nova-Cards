import React from 'react';

// Assuming the json file is named animalData.json

interface ActionCardWrapperProps {
  id: string;
  children: React.ReactNode;
}

const ActionCardWrapper: React.FC<ActionCardWrapperProps> = ({
  id,
  children,
}) => {
  // const animalName = cardNames[id];

  return (
    // <div className='player-board-hand' style={{ order: 4 }}>
    //   <div
    //     id={`card-${animalName}`}
    //     data-id={animalName}
    //     className='ark-card zoo-card animal-card tooltipable'
    //     draggable={false}
    //   >
    //     <div className='ark-card-wrapper'>{children}</div>
    //   </div>
    // </div>
    <div className=''>
      <div className=''>
        <div className='action-card-slot'>
          <div
            id='action-card-10'
            data-id='10'
            data-lvl='1'
            data-type='Sponsors'
            data-status='0'
            className='ark-card zoo-card action-card tooltipable'
          >
            <div className='meeples-container' />
            <div className='action-card-perspective'>
              <div className='ark-card-wrapper recto'>
                <div className='ark-card-top'>
                  <div className='ark-card-top-left'>
                    <div className='arknova-icon icon-action-sponsors'></div>I
                  </div>
                </div>
                <div className='ark-card-middle'>
                  <div className='ark-card-title-wrapper'>
                    <div className='ark-card-title'>赞助商</div>
                  </div>
                </div>
                <div className='ark-card-bottom'>
                  <div>
                    从你的手牌中打出<b>1</b>张赞助商卡牌，最高等级为
                    <div className='icon-container icon-container-strength'>
                      <div className='arknova-icon icon-strength'>
                        <span>
                          <span>X</span>
                        </span>
                      </div>
                    </div>
                    。
                  </div>
                  <div className='separator'>
                    <hr />或
                    <hr />
                  </div>
                  <div>
                    休息
                    <div className='icon-container icon-container-strbreak'>
                      <div className='arknova-icon icon-strbreak'>
                        <span>
                          <span>X</span>
                        </span>
                      </div>
                    </div>
                    ，获得
                    <div className='icon-container icon-container-money'>
                      <div className='arknova-icon icon-money'>
                        <span>
                          <span>X</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ark-card-wrapper verso'>
                <div className='ark-card-top'>
                  <div className='ark-card-top-left'>
                    <div className='arknova-icon icon-action-sponsors'></div>
                    II
                  </div>
                </div>
                <div className='ark-card-middle'>
                  <div className='ark-card-title-wrapper'>
                    <div className='ark-card-title'>赞助商</div>
                  </div>
                </div>
                <div className='ark-card-bottom'>
                  <div>
                    从你的<b>手牌</b>或<b>声望范围内</b>（支付额外花费）打出
                    <b>1张或多张</b>赞助商卡牌，最高等级总和为
                    <div className='icon-container icon-container-strength'>
                      <div className='arknova-icon icon-strength'>
                        <span>
                          <span>X</span>
                        </span>
                      </div>
                    </div>
                    <b>+1</b>。
                  </div>
                  <div className='separator'>
                    <hr />或
                    <hr />
                  </div>
                  <div>
                    休息
                    <div className='icon-container icon-container-strbreak'>
                      <div className='arknova-icon icon-strbreak'>
                        <span>
                          <span>X</span>
                        </span>
                      </div>
                    </div>
                    ，获得<b>2x</b>
                    <div className='icon-container icon-container-money'>
                      <div className='arknova-icon icon-money'>
                        <span>
                          <span>X</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionCardWrapper;
