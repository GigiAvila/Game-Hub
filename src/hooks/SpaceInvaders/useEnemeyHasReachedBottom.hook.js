import { useEffect } from "react"
import { useSpaceInvadersContext } from '../../components/SpaceInvaders/SpaceInvadersContext.jsx'
import { MAX_VERTICAL_ENEMY_DISTANCE } from '../../utils/SpaceInvidaders/enemyDefaultValues.js';

export const useEnemyHasReachedBottom = ({ onEnemyHasReachedBottom }) => {
  const { enemyPositions } = useSpaceInvadersContext()

  useEffect(() => {
    const hasReachedBottom = enemyPositions.some((position) => position.y >= MAX_VERTICAL_ENEMY_DISTANCE)
    if (hasReachedBottom && onEnemyHasReachedBottom) {
      onEnemyHasReachedBottom();
    }

  }, [enemyPositions, onEnemyHasReachedBottom, MAX_VERTICAL_ENEMY_DISTANCE])
}