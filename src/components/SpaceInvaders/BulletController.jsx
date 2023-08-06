import React, { useState, useEffect, useRef } from 'react';
import Bullet from './Bullet';

import shootSound from './assets/bullet.mp3';
import noBulletSound from './assets/noBullets.mp3';

const BulletController = ({ playerPosition }) => {
  const [playerBullets, setPlayerBullets] = useState([]);
  const [bulletCount, setBulletCount] = useState(0);

  const PLAYER_WIDTH = 84;
  const BULLET_SPEED = 10;
  const MAX_BULLETS = 20;
  const MAX_BULLET_INTERVAL = 20000;

  const shootAudioRef = useRef();
  const noBulletAudioRef = useRef();

  const playerShootBullet = () => {
    if (bulletCount < MAX_BULLETS) {
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
      return prevBullets.map((bullet) => ({
        ...bullet,
        y: bullet.y - BULLET_SPEED,
      }));
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
