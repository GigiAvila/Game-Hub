import React, { useState, useEffect, useRef } from 'react';
import Bullet from './Bullet';

import shootSound from './assets/bullet.mp3';
import noBulletSound from './assets/noBullets.mp3';

const BulletController = ({ playerPosition, enemyPositions, setEnemyPositions }) => {
  const [playerBullets, setPlayerBullets] = useState([]);
  const [playerBulletCount, setplayerBulletCount] = useState(0);
  const [enemyBullets, setEnemyBullets] = useState([]);

  // console.log('recibiendo enemyPositions...', enemyPositions)
  const ENEMY_WIDTH = 50;
  const ENEMY_HEIGHT = 20;
  const ENEMY_SHOOT_INTERVAL = 3000; // Intervalo de tiempo para disparar (3 segundos)
  const BULLET_SPEED_ENEMY = 15; // Velocidad de la bala enemiga

  const PLAYER_WIDTH = 84;
  const BULLET_SPEED = 10;
  const MAX_BULLETS = 20;
  const MAX_BULLET_INTERVAL = 20000;

  const shootAudioRef = useRef();
  const noBulletAudioRef = useRef();


  // PLAYER BULLETS LOGIC 
  const playerShootBullet = () => {
    if (playerBulletCount < MAX_BULLETS && playerPosition) {
      const newPlayerBullet = {
        x: playerPosition.x + PLAYER_WIDTH / 2,
        y: playerPosition.y,
      };
      shootAudioRef.current.currentTime = 0;
      shootAudioRef.current.play();

      setPlayerBullets((prevPlayerBullets) => [...prevPlayerBullets, newPlayerBullet]);
      setplayerBulletCount((prevCount) => prevCount + 1);
    } else {
      noBulletAudioRef.current.currentTime = 0;
      noBulletAudioRef.current.play();
    }
  };

  const movePlayerBullet = () => {
    setPlayerBullets((prevBullets) => {
      const newPlayerBullets = prevBullets.map((bullet) => ({
        ...bullet,
        y: bullet.y - BULLET_SPEED,
      }));


      if (enemyPositions) {
        // console.log("enemyPositions en movePlayerBullet", enemyPositions)
        checkCollisions(newPlayerBullets, enemyPositions);
      }

      return newPlayerBullets;
    });
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
  }, [playerPosition, playerBulletCount]);


  useEffect(() => {
    const playerBulletInterval = setInterval(movePlayerBullet, 100);

    return () => {
      clearInterval(playerBulletInterval);
    };
  }, []);

  useEffect(() => {
    const intervalPlayerBulletsTimer = setInterval(() => {
      setplayerBulletCount(0);
    }, MAX_BULLET_INTERVAL);

    return () => {
      clearInterval(intervalPlayerBulletsTimer);
    };
  }, []);

  // ENEMIES BULLETS LOGIC

  const enemyShootBullet = (enemyIndex) => {
    if (enemyPositions && enemyPositions[enemyIndex]) {
      const enemyThatShoot = enemyPositions[enemyIndex];
      const newEnemyBullet = {
        x: enemyThatShoot.x + ENEMY_WIDTH / 2,
        y: enemyThatShoot.y + ENEMY_HEIGHT,
        isEnemyBullet: true,
      };
      shootAudioRef.current.currentTime = 0;
      shootAudioRef.current.play();

      setEnemyBullets((prevEnemyBullets) => [...prevEnemyBullets, newEnemyBullet]);
    }
  };

  const moveEnemyBullet = () => {
    setEnemyBullets((prevEnemyBullets) => {
      const newEnemyBullets = prevEnemyBullets.map((bullet) => ({
        ...bullet,
        y: bullet.y + BULLET_SPEED_ENEMY,
      }));

      return newEnemyBullets;
    });
  };

  useEffect(() => {
    const enemyBulletInterval = setInterval(moveEnemyBullet, 100);

    return () => {
      clearInterval(enemyBulletInterval);
    };
  }, []);

  useEffect(() => {
    const intervalEnemyBulletsTimer = setInterval(enemyShootBullet, ENEMY_SHOOT_INTERVAL)

    return () => {
      clearInterval(intervalEnemyBulletsTimer);
    };
  }, []);



  // COLLISIONS - KILL ENEMY


  const checkCollisions = (bullets, enemyPositions) => {
    // console.log('checking Collisions....');
    // console.log('enemyPositions en checkCollisions:', enemyPositions);
    bullets.forEach((bullet, bulletIndex) => {
      if (!enemyPositions) {
        // console.log('enemyPositions es undefined');
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
          // console.log('Collision playerBullet - enemy ');

          // Eliminar la bala
          setPlayerBullets((prevBullets) => {
            const newPlayerBullets = [...prevBullets];
            newPlayerBullets.splice(bulletIndex, 1);
            return newPlayerBullets;
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
      {enemyBullets.map((bullet, index) => (
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
