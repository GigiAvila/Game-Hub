import React from 'react';
import enemy1Img from './assets/enemy1.png';
import enemy2Img from './assets/enemy2.png';
import enemy3Img from './assets/enemy3.png';

const imageMap = {
  1: enemy1Img,
  2: enemy2Img,
  3: enemy3Img,
};

const Enemy = ({ enemyNumber, positionX, positionY }) => {
  const enemyImage = imageMap[enemyNumber];

  const enemyStyle = {
    position: 'absolute',
    left: positionX,
    top: positionY,
  };

  return (
    <div className="enemyContainer" style={enemyStyle}>
      <img className='enemyImg' src={enemyImage} alt={`Enemy ${enemyNumber}`} />
    </div>
  );
};
export default Enemy;