import { useState, useEffect } from "react";
import { ENEMY_BULLET_SPEED, ENEMY_SHOOT_INTERVAL } from "../../utils/SpaceInvidaders/enemyBulletDefaultValues";
import { ENEMY_WIDTH, ENEMY_HEIGHT } from "../../utils/SpaceInvidaders/enemyDefaultValues";
import { useEnemyPositions } from "./useEnemyPositions.hook";

export const useEnemiesBullets = () => {
  const [enemyBullets, setEnemyBullets] = useState([]);

  const { enemyPositions } = useEnemyPositions();


  const moveEnemyBullets = () => {
    setEnemyBullets((prevBullets) =>
      prevBullets.map((bullet) => ({
        ...bullet,
        x: bullet.x,
        y: bullet.y + ENEMY_BULLET_SPEED,
      }))
    );
  };

  useEffect(() => {
    if (enemyPositions) {
      const enemyBulletInterval = setInterval(moveEnemyBullets, 100);

      return () => {
        clearInterval(enemyBulletInterval);
      };
    }
  }, [enemyPositions]);

  const shootEnemyBullet = () => {
    if (enemyPositions) {
      const randomEnemyIndex = Math.floor(Math.random() * enemyPositions.length);
      const randomEnemy = enemyPositions[randomEnemyIndex];
      const newEnemyBullet = {
        x: randomEnemy.x + ENEMY_WIDTH / 2,
        y: randomEnemy.y + ENEMY_HEIGHT,
      };
      setEnemyBullets((prevBullets) => [...prevBullets, newEnemyBullet]);
    }
  };

  useEffect(() => {
    const enemyShootInterval = setInterval(shootEnemyBullet, ENEMY_SHOOT_INTERVAL);

    return () => {
      clearInterval(enemyShootInterval);
    };
  }, []);

  return {
    enemyBullets,
  };
};
