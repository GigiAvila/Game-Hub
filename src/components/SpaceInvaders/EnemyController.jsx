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
const ENEMY_GAP = 25;
const ENEMY_HEIGHT = 20;
const MAX_HORIZONTAL_DISTANCE = 50;
const MAX_VERTICAL_DISTANCE = 350;
const ENEMY_VELOCITY = 30;



const ENEMY_WIDTH_DESKTOP = 50;
const ENEMY_GAP_DESKTOP = 40;
const ENEMY_HEIGHT_DESKTOP = 50;
const MAX_HORIZONTAL_DISTANCE_DESKTOP = 300;
const MAX_VERTICAL_DISTANCE_DESKTOP = 550;
const ENEMY_VELOCITY_DESKTOP = 20;


const screenWidth = window.innerWidth;

const enemyWidth = screenWidth >= 1023 ? ENEMY_WIDTH_DESKTOP : ENEMY_WIDTH;
const enemyGap = screenWidth >= 1023 ? ENEMY_GAP_DESKTOP : ENEMY_GAP;
const enemyHeight = screenWidth >= 1023 ? ENEMY_HEIGHT_DESKTOP : ENEMY_HEIGHT;
const maxHorizontalDistance = screenWidth >= 1023 ? MAX_HORIZONTAL_DISTANCE_DESKTOP : MAX_HORIZONTAL_DISTANCE;
const maxVerticalDistance = screenWidth >= 1023 ? MAX_VERTICAL_DISTANCE_DESKTOP : MAX_VERTICAL_DISTANCE;
const enemyVelocity = screenWidth >= 1023 ? ENEMY_VELOCITY_DESKTOP : ENEMY_VELOCITY;

const EnemyController = () => {
  const initialEnemyPositions = enemyList.flatMap((row, rowIndex) => {
    return row.map((enemyNumber, enemyIndex) => ({
      x: enemyIndex * enemyGap,
      y: rowIndex * enemyHeight,
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
    const moveInterval = setInterval(moveEnemies, enemyVelocity);

    return () => {
      clearInterval(moveInterval);
    };
  }, []);

  const createEnemies = () => {
    const newEnemyPositions = enemyList.flatMap((row, rowIndex) => {
      return row.map((enemyNumber, enemyIndex) => ({
        x: enemyIndex * enemyWidth,
        y: rowIndex * enemyHeight,
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

      const enemyReachedBottom = newPositions.some((position) => position.y >= maxVerticalDistance);

      if (enemyReachedBottom) {
        endGame();

      }

      if (prevPositions[0].direction === 1) {
        if (prevPositions[0].x >= maxHorizontalDistance) {
          return prevPositions.map((position) => ({
            x: position.x - 1,
            y: position.y + enemyHeight,
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
            y: position.y + enemyHeight,
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
      {!isGameActive && (
        <button className='resetSpaceInvadersButton' onClick={() => resetGame()} >
          Volver a jugar
        </button>
      )}
      <div className='enemyGrid' style={{ position: 'relative', width: '100%', height: '60vh' }}>
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

    </>
  );
};

export default EnemyController;