import React, { useState, useEffect, useRef } from 'react';
import Enemy from './Enemy';
import BulletController from './BulletController';
import Modal from '../Modal/Modal';



const enemyList = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
  [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 20;
const MAX_HORIZONTAL_DISTANCE = 50;



const EnemyController = () => {
  const initialEnemyPositions = enemyList.flatMap((row, rowIndex) => {
    return row.map((enemyNumber, enemyIndex) => ({
      x: enemyIndex * ENEMY_WIDTH * 0.5,
      y: rowIndex * ENEMY_HEIGHT,
    }));
  });
  const [isGameActive, setIsGameActive] = useState(true);
  const [enemyPositions, setEnemyPositions] = useState(initialEnemyPositions);
  const [modalVisible, setModalVisible] = useState(false);


  const startGame = () => {
    setIsGameActive(true);
    createEnemies();
    setEnemyPositions(initialEnemyPositions)
    setModalVisible(false);
  };

  const resetGame = () => {

    setIsGameActive(true);
    setEnemyPositions(initialEnemyPositions)
    setModalVisible(false);
    console.log('reset')
  };

  const endGame = () => {
    setIsGameActive(false);
    setModalVisible(true);
  };



  useEffect(() => {
    startGame();
    const moveInterval = setInterval(moveEnemies, 50);

    return () => {
      clearInterval(moveInterval);
    };
  }, []);

  const createEnemies = () => {
    const newEnemyPositions = enemyList.flatMap((row, rowIndex) => {
      return row.map((enemyNumber, enemyIndex) => ({
        x: enemyIndex * ENEMY_WIDTH * 0.5,
        y: rowIndex * ENEMY_HEIGHT,
      }));
    });

    setEnemyPositions(newEnemyPositions);
  };

  const moveEnemies = () => {
    if (!isGameActive) {
      return;
    }

    setEnemyPositions((prevPositions) => {
      const newPositions = prevPositions.map((position) => ({
        x: position.x,
        y: position.y,
        direction: position.direction,
      }));

      const enemyReachedBottom = newPositions.some((position) => position.y >= 410);

      if (enemyReachedBottom) {
        endGame();
      }

      if (prevPositions[0].direction === 1) {
        if (prevPositions[0].x >= MAX_HORIZONTAL_DISTANCE) {
          return prevPositions.map((position) => ({
            x: position.x - 1,
            y: position.y + ENEMY_HEIGHT,
            direction: -1,
          }));
        } else {
          return newPositions.map((position) => ({
            x: position.x + 1,
            y: position.y,
            direction: 1,
          }));
        }
      } else {
        if (prevPositions[0].x === 0) {
          return prevPositions.map((position) => ({
            x: position.x + 1,
            y: position.y + ENEMY_HEIGHT,
            direction: 1,
          }));
        } else {
          return newPositions.map((position) => ({
            x: position.x - 1,
            y: position.y,
            direction: -1,
          }));
        }
      }
    });
  };

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '60vh' }}>
        {enemyPositions.map((position, index) => (
          <Enemy
            key={index}
            enemyNumber={enemyList[Math.floor(index / 10)][index % 10]}
            positionX={position.x}
            positionY={position.y}
          />
        ))}
        <BulletController
          enemyPositions={enemyPositions}
          setEnemy
          setEnemyPositions={setEnemyPositions}
        />
        {!isGameActive && (
          <Modal
            message="☠️☠️☠️¡Lo siento! Haz perdido "
          />
        )}
      </div>
      <button className='resetSpaceInvadersButton' onClick={() => resetGame()} >
        Volver a jugar
      </button>
    </>
  );
};

export default EnemyController;
