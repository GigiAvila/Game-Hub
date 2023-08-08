import React, { useState, useEffect } from 'react';
import heartImg from './assets/heart.png';

const initialLives = [heartImg, heartImg, heartImg, heartImg, heartImg];

const Lives = ({ gameOver, looseLife }) => {
  const [lives, setLives] = useState(initialLives);

  useEffect(() => {
    if (gameOver) {
      setLives([]);
    }
  }, [gameOver]);

  useEffect(() => {
    if (looseLife) {
      setLives(prevLives => prevLives.slice(0, prevLives.length - 1));
    }
  }, [looseLife]);

  return (
    <div className='livesContainer'>
      {lives.map((lifeImg, index) => (
        <img key={index} className='lifeImg' src={lifeImg} alt={`life-${index}`} />
      ))}
    </div>
  );
};

export default Lives;
