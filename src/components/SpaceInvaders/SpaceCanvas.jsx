import React, { useState, useEffect } from 'react';
import EnemyController from './EnemyController';
import PlayerController from './PlayerController';
import CollisionWithEnemy from './CollisionWithEnemy';
import CollisionWithPlayer from './CollisionWithPlayer';
import Lives from './Lives';
import Modal from '../Modal/Modal';
import { useSpaceInvadersContext } from './SpaceInvadersContext';






const SpaceCanvas = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isGameActive, setIsGameActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { resetEnemyPositions } = useSpaceInvadersContext();

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if ((windowWidth >= 1023 && newWidth < 1023) || (windowWidth < 1023 && newWidth >= 1023)) {
        window.location.reload();
      }
      setWindowWidth(newWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);


  const resetGame = () => {
    setIsGameActive(true);
    resetEnemyPositions;
    setModalVisible(false);
  };



  const startGame = () => {
    setIsGameActive(true);
    setModalVisible(false);
  };



  const endGame = () => {
    setIsGameActive(false);
    setModalVisible(true);
  };


  return (
    <div className='spaceCanvas'>
      {!isGameActive && (
        <button className='resetSpaceInvadersButton' onClick={() => resetGame()} >
          Volver a jugar
        </button>
      )}
      <EnemyController isGameActive={isGameActive} startGame={startGame} endGame={endGame} />
      <PlayerController />
      {isGameActive &&
        <Lives
        />}
      {!isGameActive && (
        <Modal
          message="☠️☠️☠️¡Lo siento! Haz perdido "
        />
      )}
      <CollisionWithEnemy />
      <CollisionWithPlayer />

    </div>
  );
};

export default SpaceCanvas;
