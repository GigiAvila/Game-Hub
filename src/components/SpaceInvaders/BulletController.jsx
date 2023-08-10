import React, { useState, useEffect, useRef } from 'react';
import Bullet from './Bullet';

import shootSound from './assets/bullet.mp3';
import noBulletSound from './assets/noBullets.mp3';

const BulletController = ({ playerPosition, enemyPositions, setEnemyPositions }) => {
  const [playerBullets, setPlayerBullets] = useState([]);
  const [playerBulletCount, setplayerBulletCount] = useState(0);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [enemyBulletCount, setEnemyBulletCount] = useState(0);
  const [updatedPlayerBullets, setUpdatedPlayerBullets] = useState([]);

  // console.log('recibiendo playerPosition...', playerPosition)
  // console.log('recibiendo enemyPositions...', enemyPositions)
  const ENEMY_WIDTH = 50;
  const ENEMY_HEIGHT = 20;
  const ENEMY_SHOOT_INTERVAL = 2000;
  const BULLET_SPEED_ENEMY = 15;

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
        x: bullet.x,
        y: bullet.y - BULLET_SPEED,
      }));
      // console.log('Balas antes de verificar colisiones', newPlayerBullets);
      setUpdatedPlayerBullets(newPlayerBullets);
      checkCollisionsWithEnemies(newPlayerBullets);
      return newPlayerBullets;
    });
  };

  const checkCollisionsWithEnemies = (newPlayerBullets) => {
    if (enemyPositions) {
      // console.log('checkingCollisionWithEnemies...')
      setEnemyPositions((prevPositions) => {
        if (prevPositions !== enemyPositions) {
          // console.log('Balas del jugador para verificar colisiones:', newPlayerBullets);
          checkCollisions(newPlayerBullets, prevPositions);
        }
        return prevPositions;
      });
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

  const moveEnemyBullets = () => {
    setEnemyBullets((prevBullets) => {
      const newEnemyBullets = prevBullets.map((bullet) => ({
        ...bullet,
        x: bullet.x,
        y: bullet.y + BULLET_SPEED_ENEMY,
      }));
      return newEnemyBullets;
    });
  };

  useEffect(() => {
    const enemyBulletInterval = setInterval(moveEnemyBullets, 100);

    const enemyShootInterval = setInterval(() => {
      if (enemyPositions) {
        setEnemyPositions((prevPositions) => {
          if (prevPositions !== enemyPositions) {
            const randomEnemyIndex = Math.floor(Math.random() * prevPositions.length);
            const randomEnemy = prevPositions[randomEnemyIndex];
            const newEnemyBullet = {
              x: randomEnemy.x + ENEMY_WIDTH / 2,
              y: randomEnemy.y + ENEMY_HEIGHT,
            };
            setEnemyBullets((prevBullets) => [...prevBullets, newEnemyBullet]);
          }
          return prevPositions;
        });
      }
    }, ENEMY_SHOOT_INTERVAL);

    return () => {
      clearInterval(enemyBulletInterval);
      clearInterval(enemyShootInterval);
    };
  }, []);


  // COLLISIONS - KILL PLAYER

  useEffect(() => {
    const checkCollisionsWithPlayer = () => {
      console.log('Player position1:', playerPosition);
      enemyBullets.forEach((bullet, bulletIndex) => {
        if (
          bullet.y >= 600 &&
          playerPosition &&
          bullet.x >= playerPosition.x &&
          bullet.x <= playerPosition.x + PLAYER_WIDTH
        ) {
          console.log('Collision detected: Enemy bullet hit player');
          console.log('Player position2:', playerPosition);

          // Eliminar la bala utilizando un callback en setEnemyBullets
          setEnemyBullets((prevBullets) => {
            console.log('Removing enemy bullet at index', bulletIndex);
            const newEnemyBullets = [...prevBullets];
            newEnemyBullets.splice(bulletIndex, 1);
            return newEnemyBullets;
          });
        }
      });
    };

    const enemyBulletCheckInterval = setInterval(checkCollisionsWithPlayer, 100);

    return () => {
      clearInterval(enemyBulletCheckInterval);
    };
  }, [enemyBullets]);




  // COLLISIONS - KILL ENEMY


  const checkCollisions = (newPlayerBullets, prevPositions) => {
    // console.log('checking Collisions....'); 
    // console.log('enemyPositions en checkCollisions:', prevPositions);
    // console.log('Bullets en checkCollisions:', newPlayerBullets);
    newPlayerBullets.forEach((bullet, bulletIndex) => {
      prevPositions.forEach((enemy, enemyIndex) => {
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
          console.log('Collision playerBullet - enemy ');

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
