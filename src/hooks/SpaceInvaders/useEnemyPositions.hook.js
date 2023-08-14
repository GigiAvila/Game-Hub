import { useState } from "react";
import { INITIAL_ENEMY_POSITION } from "../../utils/SpaceInvidaders/initialEnemyPosition";
import { ENEMY_HEIGHT, MAX_HORIZONTAL_ENEMY_DISTANCE } from "../../utils/SpaceInvidaders/enemyDefaultValues";


export const useEnemyPositions = () => {
  const [enemyPositions, setEnemyPositions] = useState(INITIAL_ENEMY_POSITION);

  const removeEnemyPosition = (enemyPositionsIndex) => {
    setEnemyPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions.splice(enemyPositionsIndex, 1);
      return newPositions;
    });
  }

  const resetEnemyPositions = () => {
    setEnemyPositions(INITIAL_ENEMY_POSITION);
  }

  const advanceEnemyPosition = () => {
    setEnemyPositions((prevPositions) => {

      const newPositions = prevPositions.map((position) => ({
        x: position.x,
        y: position.y,
        direction: position.direction,
      }));

      if (prevPositions[0].direction === 1) {
        if (prevPositions[0].x >= MAX_HORIZONTAL_ENEMY_DISTANCE) {
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
  }

  return {
    enemyPositions,
    removeEnemyPosition,
    resetEnemyPositions,
    advanceEnemyPosition
  }
}