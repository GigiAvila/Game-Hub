import React, { useState, useEffect, useRef } from 'react';
import Bullet from './Bullet';

import shootSound from './assets/bullet.mp3';
import noBulletSound from './assets/noBullets.mp3';

const BulletController = ({ playerPosition, enemyPositions, setEnemyPositions }) => {
  const [playerBullets, setPlayerBullets] = useState([]);
  const [bulletCount, setBulletCount] = useState(0);

  // console.log('recibiendo enemyPositions...', enemyPositions)
  const ENEMY_WIDTH = 50;
  const ENEMY_HEIGHT = 20;
  const PLAYER_WIDTH = 84;
  const BULLET_SPEED = 10;
  const MAX_BULLETS = 20;
  const MAX_BULLET_INTERVAL = 20000;

  const shootAudioRef = useRef();
  const noBulletAudioRef = useRef();

  const playerShootBullet = () => {
    if (bulletCount < MAX_BULLETS && playerPosition) {
      const newBullet = {
        x: playerPosition.x + PLAYER_WIDTH / 2,
        y: playerPosition.y,
      };
      shootAudioRef.current.currentTime = 0;
      shootAudioRef.current.play();

      setPlayerBullets((prevPlayerBullets) => [...prevPlayerBullets, newBullet]);
      setBulletCount((prevCount) => prevCount + 1);
    } else {
      noBulletAudioRef.current.currentTime = 0;
      noBulletAudioRef.current.play();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        playerShootBullet();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition, bulletCount]);

  const moveBullet = () => {
    setPlayerBullets((prevBullets) => {
      const newBullets = prevBullets.map((bullet) => ({
        ...bullet,
        y: bullet.y - BULLET_SPEED,
      }));


      if (enemyPositions) {  // PROBLEMA EN EL FLUJO DE DATOS AQUÍ 
        console.log("enemyPositions en moveBullet", enemyPositions)
        checkCollisions(newBullets, enemyPositions);
      }

      return newBullets;
    });
  };


  useEffect(() => {
    const bulletInterval = setInterval(moveBullet, 100);

    return () => {
      clearInterval(bulletInterval);
    };
  }, []);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setBulletCount(0);
    }, MAX_BULLET_INTERVAL);

    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  const checkCollisions = (bullets, enemyPositions) => {
    // console.log('checking Collisions....');
    console.log('enemyPositions in checkCollisions:', enemyPositions);
    bullets.forEach((bullet, bulletIndex) => {
      if (!enemyPositions) {
        console.log('Enemy positions are undefined');
        return;
      }

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
          console.log('Collision detected with bullet and enemy');

          // Eliminar la bala
          setPlayerBullets((prevBullets) => {
            const newBullets = [...prevBullets];
            newBullets.splice(bulletIndex, 1);
            return newBullets;
          });

          // Eliminar el enemigo
          setEnemyPositions((prevPositions) => {
            const newPositions = [...prevPositions];
            newPositions.splice(enemyIndex, 1);
            return newPositions;
          });
        }
      });
    });
  };

  return (
    <div>
      <audio ref={shootAudioRef} src={shootSound}></audio>
      <audio ref={noBulletAudioRef} src={noBulletSound}></audio>
      {playerBullets.map((bullet, index) => (
        <Bullet
          key={index}
          positionX={bullet.x}
          positionY={bullet.y}
        />
      ))}
    </div>
  );
};

export default BulletController;
