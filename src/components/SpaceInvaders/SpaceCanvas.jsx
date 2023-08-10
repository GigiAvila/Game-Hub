import React, { useState, useEffect } from 'react';
import EnemyController from './EnemyController';
import PlayerController from './PlayerController';
import Lives from './Lives';

const SpaceCanvas = ({ isGameActive }) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if ((windowWidth >= 1023 && newWidth < 1023) || (windowWidth < 1023 && newWidth >= 1023)) {
        window.location.reload();
      }
      setWindowWidth(newWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return (
    <div className='spaceCanvas'>
      <EnemyController />
      <PlayerController />
      {!isGameActive &&
        <Lives isGameActive={isGameActive} />}

    </div>
  );
};

export default SpaceCanvas;
