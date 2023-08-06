import React from 'react';

const Bullet = ({ positionX, positionY }) => {
  const bulletStyle = {
    position: 'absolute',
    left: positionX,
    top: positionY,
    width: '2px',
    height: '10px',
    backgroundColor: 'white',
  };

  return <div className='bullet' style={bulletStyle}></div>;
};

export default Bullet;