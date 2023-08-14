import React, { useEffect } from 'react';
import Player from './Player';
import PlayerBulletController from './PlayerBulletController';
import { useSpaceInvadersContext } from './SpaceInvadersContext';



export const PlayerController = () => {

  const { playerPosition, movePlayer } = useSpaceInvadersContext();

  useEffect(() => {
    window.addEventListener('keydown', movePlayer);

    return () => {
      window.removeEventListener('keydown', movePlayer);
    };
  }, []);

  return (
    <>
      <Player positionX={playerPosition.x} positionY={playerPosition.y} />
      <PlayerBulletController />
    </>
  );
};

export default PlayerController;
