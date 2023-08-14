import React, { useState, useEffect } from 'react';
import { useSpaceInvadersContext } from './SpaceInvadersContext';
import Bullet from './Bullet';


const EnemyBulletController = ({ }) => {

  const { enemyBullets } = useSpaceInvadersContext()
  // console.log(enemyBullets) acá está ok enemyBullets

  return (
    <div>
      {enemyBullets && enemyBullets.map((bullet, index) => (
        <Bullet
          key={index}
          positionX={bullet.x}
          positionY={bullet.y}
        />
      ))}
    </div>
  );
};

export default EnemyBulletController;
