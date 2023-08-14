import { INITIAL_ENEMY_LIST } from "./enemyList";
import { ENEMY_GAP, ENEMY_HEIGHT } from "./enemyDefaultValues";

export const INITIAL_ENEMY_POSITION = INITIAL_ENEMY_LIST.flatMap((row, rowIndex) => {
  return row.map((enemyNumber, enemyIndex) => ({
    x: enemyIndex * ENEMY_GAP,
    y: rowIndex * ENEMY_HEIGHT,
  }));
});