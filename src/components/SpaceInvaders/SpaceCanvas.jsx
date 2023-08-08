import React, { useState, useEffect } from 'react';
import EnemyController from './EnemyController';
import PlayerController from './PlayerController';
import Lives from './Lives';

const SpaceCanvas = ({ isGameActive }) => {

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
