import React from 'react';

interface ProgressBarProps {
  pickNum: number;
  totalNum: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ pickNum, totalNum }) => {
  const percentage = totalNum > 0 ? pickNum / totalNum : 0;

  // 从白色(#ffffff)到目标绿色(#84cc24)
  const r = Math.round((1 - percentage) * 255 + percentage * 136); // 插值计算R值
  const g = Math.round((1 - percentage) * 255 + percentage * 204); // 插值计算G值
  const b = Math.round((1 - percentage) * 255 + percentage * 20); // 插值计算B值
  const backgroundColor = `rgb(${r}, ${g}, ${b})`;

  const containerStyles: React.CSSProperties = {
    height: '30px',
    width: '100px',
    backgroundColor: '#e0e0de',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const fillerStyles: React.CSSProperties = {
    height: '100%',
    width: `${percentage * 100}%`,
    backgroundColor,
    transition: 'width 1s ease-in-out',
    borderRadius: 'inherit',
    textAlign: 'center',
  };

  const labelStyles: React.CSSProperties = {
    padding: '5px',
    color: 'black', // 可以根据背景颜色亮度调整文字颜色
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${(percentage * 100).toFixed(0)}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
