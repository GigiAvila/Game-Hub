import React, { createContext, useContext, useState } from 'react';
import { usePlayer } from '../../hooks/SpaceInvaders/usePlayer.hook';
import { useEnemyPositions } from '../../hooks/SpaceInvaders/useEnemyPositions.hook';
import { useEnemiesBullets } from '../../hooks/SpaceInvaders/useEnemiesBullets.hook';
import { usePlayerBullets } from '../../hooks/SpaceInvaders/usePlayerBullets.hook';

const SpaceInvadersContext = createContext();

export const SpaceInvadersProvider = ({ children }) => {
  const { playerPosition, movePlayer } = usePlayer();
  const { enemyPositions, removeEnemyPosition, resetEnemyPositions, advanceEnemyPosition } = useEnemyPositions();
  const { playerBullets, playerBulletCount, playerShootBullet, movePlayerBullet } = usePlayerBullets();
  const { enemyBullets } = useEnemiesBullets();

  return (
    <SpaceInvadersContext.Provider
      value={{
        enemyBullets,
        playerPosition,
        movePlayer,
        playerBullets,
        playerBulletCount,
        playerShootBullet,
        movePlayerBullet,
        enemyPositions,
        removeEnemyPosition,
        resetEnemyPositions,
        advanceEnemyPosition,
      }}>
      {children}
    </SpaceInvadersContext.Provider>
  );
};

export const useSpaceInvadersContext = () => useContext(SpaceInvadersContext);

export default SpaceInvadersContext; 
