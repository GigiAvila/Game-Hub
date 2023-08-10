import React, { useState, useEffect } from 'react';
import Player from './Player';
import BulletController from './BulletController';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;


const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 60;

const PLAYER_MAX_LEFT = 5;
const PLAYER_MAX_RIGHT = 90 * window.innerWidth / 100 - PLAYER_WIDTH;

const PLAYER_MAX_LEFT_DESKTOP = 100;
const PLAYER_MAX_RIGHT_DESKTOP = 72 * window.innerWidth / 100 - PLAYER_WIDTH;


const maxRight = screenWidth >= 1023 ? PLAYER_MAX_RIGHT_DESKTOP : PLAYER_MAX_RIGHT;
const maxLeft = screenWidth >= 1023 ? PLAYER_MAX_LEFT_DESKTOP : PLAYER_MAX_LEFT;
const initialX = screenWidth / 2 - PLAYER_WIDTH / 2;
const initialY = screenHeight - PLAYER_HEIGHT - 70;

export const PlayerController = () => {

  const [playerPosition, setPlayerPosition] = useState({ x: initialX, y: initialY });


  const movePlayer = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        setPlayerPosition((prevPosition) => ({
          ...prevPosition,
          x: Math.max(prevPosition.x - 5, maxLeft),
        }));
        break;
      case 'ArrowRight':
        setPlayerPosition((prevPosition) => ({
          ...prevPosition,
          x: Math.min(prevPosition.x + 5, maxRight),
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
