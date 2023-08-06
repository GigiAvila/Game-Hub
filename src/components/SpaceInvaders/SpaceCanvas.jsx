import React from 'react';
import EnemyController from './EnemyController';
import PlayerController from './PlayerController';

const SpaceCanvas = () => {
  return (
    <div className='spaceCanvas'>
      <EnemyController />
      <PlayerController />
    </div>
  );
};

export default SpaceCanvas;
