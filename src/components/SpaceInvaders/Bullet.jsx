import React from 'react';
import { BULLET_WIDTH, BULLET_HEIGHT } from '../../utils/SpaceInvidaders/bulletDefaultValues';

const Bullet = ({ positionX, positionY }) => {
  const bulletStyle = {
    position: 'absolute',
    left: positionX,
    top: positionY,
    width: BULLET_WIDTH,
    height: BULLET_HEIGHT,
    backgroundColor: 'white',
  };

  return <div className='bullet' style={bulletStyle}></div>;
};

export default Bullet;