import React, { useState, useEffect } from 'react';
import Player from './Player';
import BulletController from './BulletController';

export const PlayerController = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 120, y: 600 });
  const PLAYER_WIDTH = 50;
  const PLAYER_MAX_LEFT = 5;
  const PLAYER_MAX_RIGHT = 90 * window.innerWidth / 100 - PLAYER_WIDTH;;

  const movePlayer = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        setPlayerPosition((prevPosition) => ({
          ...prevPosition,
          x: Math.max(prevPosition.x - 5, PLAYER_MAX_LEFT),
        }));
        break;
      case 'ArrowRight':
        setPlayerPosition((prevPosition) => ({
          ...prevPosition,
          x: Math.min(prevPosition.x + 5, PLAYER_MAX_RIGHT),
        }));
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    window.addEventListener('keydown', movePlayer);

    return () => {
      window.removeEventListener('keydown', movePlayer);
    };
  }, []);

  return <>
    <Player positionX={playerPosition.x} positionY={playerPosition.y} />;
    <BulletController playerPosition={playerPosition} />
  </>
};

export default PlayerController;
