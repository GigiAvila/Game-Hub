import React, { useState, useEffect, useRef } from 'react';
import Enemy from './Enemy';
import EnemyBulletController from './EnemyBulletController';

import { useSpaceInvadersContext } from './SpaceInvadersContext'
import { useEnemyHasReachedBottom } from '../../hooks/SpaceInvaders/useEnemeyHasReachedBottom.hook'
import { INITIAL_ENEMY_LIST } from '../../utils/SpaceInvidaders/enemyList';
import { ENEMY_VELOCITY } from '../../utils/SpaceInvidaders/enemyDefaultValues';


const EnemyController = ({ isGameActive, startGame, endGame }) => {

  const { advanceEnemyPosition, enemyPositions } = useSpaceInvadersContext();

  useEnemyHasReachedBottom({ onEnemyHasReachedBottom: () => endGame() })


  useEffect(() => {
    startGame();
    const moveInterval = setInterval(moveEnemies, ENEMY_VELOCITY);

    return () => {
      clearInterval(moveInterval);
    };
  }, []);

  const moveEnemies = () => {
    if (!isGameActive) {
      return;
    }
    advanceEnemyPosition()
  };


  return (
    <>
      <div className='enemyGrid' style={{ position: 'relative', width: '100%', height: '60vh' }}>
        {enemyPositions.map((position, index) => (
          <Enemy
            key={index}
            enemyNumber={INITIAL_ENEMY_LIST[Math.floor(index / 10)][index % 10]}
            positionX={position.x}
            positionY={position.y}
          />
        ))}
        <EnemyBulletController />
      </div>

    </>
  );
};

export default EnemyController;