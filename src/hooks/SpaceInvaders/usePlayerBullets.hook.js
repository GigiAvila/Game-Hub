
import { useState, useEffect } from "react";
import { PLAYER_BULLET_SPEED, MAX_PLAYER_BULLETS_ALLOWED, MAX_PLAYER_BULLET_ALLOWED_INTERVAL } from "../../utils/SpaceInvidaders/playerBulletDefaultValues";
import { PLAYER_WIDTH } from "../../utils/SpaceInvidaders/playerDefaultValues";
import shootSound from "../../components/SpaceInvaders/assets/bullet.mp3";
import noBulletSound from "../../components/SpaceInvaders/assets/noBullets.mp3";
import { usePlayer } from "./usePlayer.hook";
import { useSpaceInvadersContext } from "../../components/SpaceInvaders/SpaceInvadersContext";


export const usePlayerBullets = () => {
  const [playerBullets, setPlayerBullets] = useState([]);
  const [playerBulletCount, setPlayerBulletCount] = useState(0);
  const [isShooting, setIsShooting] = useState(false);

  const { playerPosition } = usePlayer();
  console.log(playerPosition);



  const playShootSound = () => {
    const audio = new Audio(shootSound);
    audio.play();
  };

  const playNoBulletSound = () => {
    const audio = new Audio(noBulletSound);
    audio.play();
  };

  const playerShootBullet = () => {
    if (playerBulletCount < MAX_PLAYER_BULLETS_ALLOWED && playerPosition) {
      // console.log(playerPosition);
      const newPlayerBullet = {
        x: playerPosition.x + PLAYER_WIDTH / 2,
        y: playerPosition.y,
      };

      setPlayerBullets((prevPlayerBullets) => [
        ...prevPlayerBullets,
        newPlayerBullet,
      ]);
      setPlayerBulletCount((prevCount) => prevCount + 1);
      setIsShooting(true);
    } else {
      playNoBulletSound()
    }
  };

  const movePlayerBullet = () => {
    setPlayerBullets((prevBullets) =>
      prevBullets.map((bullet) => ({
        ...bullet,
        x: bullet.x,
        y: bullet.y - PLAYER_BULLET_SPEED,
      }))
    );
  };

  useEffect(() => {
    const playerBulletInterval = setInterval(movePlayerBullet, 100);

    return () => {
      clearInterval(playerBulletInterval);
    };
  }, []);

  useEffect(() => {
    const intervalPlayerBulletsTimer = setInterval(() => {
      setPlayerBulletCount(0);
    }, MAX_PLAYER_BULLET_ALLOWED_INTERVAL);

    return () => {
      clearInterval(intervalPlayerBulletsTimer);
    };
  }, []);

  useEffect(() => {
    if (isShooting) {
      playShootSound();
      setIsShooting(false);
    }
  }, [isShooting]);



  return {
    playerBullets,
    playerBulletCount,
    playerShootBullet,
    movePlayerBullet,
  };
};
