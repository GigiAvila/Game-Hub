import React, { useState, useEffect } from 'react';
import Enemy from './Enemy';

const enemyList = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
  [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50;
const MAX_HORIZONTAL_DISTANCE = 50;

const EnemyController = () => {
  const [enemyRows, setEnemyRows] = useState([]);

  useEffect(() => {
    createEnemies();
    const moveInterval = setInterval(moveEnemies, 100);

    return () => {
      clearInterval(moveInterval);
    };
  }, []);

  const createEnemies = () => {
    const newEnemyRows = enemyList.map((row, rowIndex) => {
      return row.map((enemyNumber, enemyIndex) => {
        return (
          <Enemy
            key={`${rowIndex}-${enemyIndex}`}
            enemyNumber={enemyNumber}
            positionX={enemyIndex * ENEMY_WIDTH * 0.5} // reduzco gap entre enemies
            positionY={rowIndex * ENEMY_HEIGHT * 0.5}
          />
        );
      });
    });

    setEnemyRows(newEnemyRows);
  };

  const moveEnemies = () => {
    setEnemyRows((prevEnemyRows) => {
      const newEnemyRows = prevEnemyRows.map((row, rowIndex) => {
        return row.map((enemy) => {
          const newX = enemy.props.positionX + 1; // velocidad
          const newY = enemy.props.positionY;

          return React.cloneElement(enemy, { positionX: newX, positionY: newY });
        });
      });

      if (newEnemyRows[0][0].props.positionX >= MAX_HORIZONTAL_DISTANCE) {

        return newEnemyRows.map((row, rowIndex) => {
          return row.map((enemy) => {
            const newX = enemy.props.positionX - MAX_HORIZONTAL_DISTANCE;
            const newY = enemy.props.positionY + ENEMY_HEIGHT;

            return React.cloneElement(enemy, { positionX: newX, positionY: newY });
          });
        });
      }

      return newEnemyRows;
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {enemyRows.map((row, index) => (
        <div className="enemyRow" key={index} style={{ display: 'flex' }}>
          {row}
        </div>
      ))}
    </div>
  );
};

export default EnemyController;
