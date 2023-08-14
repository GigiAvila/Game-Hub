
import React, { useEffect, useState } from 'react';
import { useSpaceInvadersContext } from './SpaceInvadersContext';
import { ENEMY_WIDTH, ENEMY_HEIGHT } from '../../utils/SpaceInvidaders/enemyDefaultValues';


const CollisionWithEnemy = () => {

  const { enemyPositions, playerBullets, removeEnemyPosition } = useSpaceInvadersContext();

  // console.log(playerBullets) //  está ok 
  // console.log(enemyPositions) //  está ok 

  const checkCollisionsWithEnemies = () => {
    // console.log('checking Collisions....'); // está ok
    // console.log('enemyPositions en checkCollisions:', enemyPositions) // solo el valor inicial
    // console.log('playerBullets en checkCollisions:', playerBullets) // array vacio
    if (enemyPositions) {
      playerBullets.forEach((bullet, bulletIndex) => {
        enemyPositions.forEach((enemy, enemyIndex) => {
          const enemyTop = enemy.y;
          const enemyBottom = enemy.y + ENEMY_HEIGHT;
          const enemyLeft = enemy.x;
          const enemyRight = enemy.x + ENEMY_WIDTH;

          const bulletTop = bullet.y;
          const bulletBottom = bullet.y;
          const bulletLeft = bullet.x;
          const bulletRight = bullet.x;

          if (
            bulletTop <= enemyBottom &&
            bulletBottom >= enemyTop &&
            bulletLeft <= enemyRight &&
            bulletRight >= enemyLeft
          ) {
            console.log('KILL ENEMY ');


            removeEnemyPosition(enemyIndex);
          }
        });
      }
      )
    };

  }

  useEffect(() => {
    const collisionWithEnemyCheckInterval = setInterval(checkCollisionsWithEnemies, 1000);

    return () => {
      clearInterval(collisionWithEnemyCheckInterval);
    };
  }, []);

  return (
    <>

    </>
  )
}

export default CollisionWithEnemy
