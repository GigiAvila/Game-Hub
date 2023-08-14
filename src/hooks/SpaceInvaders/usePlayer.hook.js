import { useState } from "react";
import { initialPlayerPositionX, initialPlayerPositionY, maxPlayerAllowedPositionRight, maxPlayerAllowedPositionLeft } from "../../utils/SpaceInvidaders/playerDefaultValues";

export const usePlayer = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: initialPlayerPositionX, y: initialPlayerPositionY });

  const movePlayer = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        setPlayerPosition((prevPosition) => ({
          ...prevPosition,
          x: Math.max(prevPosition.x - 5, maxPlayerAllowedPositionLeft),
        }));
        break;
      case 'ArrowRight':
        setPlayerPosition((prevPosition) => ({
          ...prevPosition,
          x: Math.min(prevPosition.x + 5, maxPlayerAllowedPositionRight),
        }));
        break;
      default:
        break;
    }
  };

  return {
    playerPosition,
    movePlayer
  }
}