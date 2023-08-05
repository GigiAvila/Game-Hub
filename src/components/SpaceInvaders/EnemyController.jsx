
import React, { useState, useEffect } from 'react';
import Enemy from './Enemy';

const EnemyController = () => {
  const [enemyMap, setEnemyMap] = useState([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ]);
  const [enemyRows, setEnemyRows] = useState([]);

  useEffect(() => {
    createEnemies();
  }, []);

  const createEnemies = () => {
    const newEnemyRows = enemyMap.map((row, rowIndex) => {
      return row.map((enemyNumber, enemyIndex) => {
        return <Enemy key={`${rowIndex}-${enemyIndex}`} enemyNumber={enemyNumber} />;
      });
    });

    setEnemyRows(newEnemyRows);
  };

  return (
    <>
      <div className="enemyGrid">{enemyRows.map((row, index) => <div className='enemyRow' key={index}>{row}</div>)}</div>
    </>
  );
};

export default EnemyController;