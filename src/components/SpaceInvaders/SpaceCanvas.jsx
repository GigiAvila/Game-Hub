import React, { useState, useEffect } from 'react';
import EnemyController from './EnemyController';
import PlayerController from './PlayerController';
import Modal from '../Modal/Modal'

const SpaceCanvas = ({ }) => {


  return (
    <div className='spaceCanvas'>
      <EnemyController />
      <PlayerController />
    </div>
  );
};

export default SpaceCanvas;
