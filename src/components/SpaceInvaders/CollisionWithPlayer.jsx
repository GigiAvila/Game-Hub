
import React, { useEffect, useState } from 'react';
import { useSpaceInvadersContext } from './SpaceInvadersContext';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../../utils/SpaceInvidaders/playerDefaultValues';
import { BULLET_HEIGHT } from '../../utils/SpaceInvidaders/bulletDefaultValues';

const CollisionWithPlayer = () => {

  const { enemyBullets, playerPosition, enemyPositions, playerBullets, removeEnemyPosition } = useSpaceInvadersContext();

  // console.log(enemyBullets);// está ok
  // console.log(enemyPositions); // está ok
  // console.log(playerPosition) // está ok
  // console.log(playerBullets) // tiene la posicion inicial del playerPosition. arrastra error desde el usePlayerBullets



  const checkCollisionsWithPlayer = () => {
    // console.log('checkingCollisionsWithPlayer...'); // está ok

    enemyBullets.forEach((bullet, bulletIndex) => {
      // console.log('bullet.y:', bullet.y)
      // console.log('playerPosition.y:', playerPosition.y)
      if (
        playerPosition &&
        bullet.y + BULLET_HEIGHT >= playerPosition.y &&
        bullet.y <= playerPosition.y + PLAYER_HEIGHT &&
        bullet.x >= playerPosition.x &&
        bullet.x <= playerPosition.x + PLAYER_WIDTH
      ) {
        console.log('Bullet collided with player');
      }
    });
  };

  useEffect(() => {
    const collisionWithPlayerCheckInterval = setInterval(checkCollisionsWithPlayer, 1000);

    return () => {
      clearInterval(collisionWithPlayerCheckInterval);
    };
  }, []);


  return (
    <>

    </>
  )
}

export default CollisionWithPlayer
