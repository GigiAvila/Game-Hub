import React, { useEffect } from 'react';
import { useSpaceInvadersContext } from './SpaceInvadersContext';
import Bullet from './Bullet';


const PlayerBulletController = () => {
  const { playerPosition, playerBulletCount, playerShootBullet, playerBullets } = useSpaceInvadersContext();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        playerShootBullet();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [playerPosition, playerBulletCount]);


  return (
    <div>
      {playerBullets && playerBullets.map((bullet, index) => (
        <Bullet
          key={index}
          positionX={bullet.x}
          positionY={bullet.y}
        />
      ))}

    </div>
  );
};

export default PlayerBulletController;
