import React, { useState } from 'react';
import './TicTacToe.css';

const Square = ({ value, onClick, turn }) => {
  const [className, setClassName] = useState('square');

  const handleClick = () => {
    if (turn !== null && value === null) {
      onClick();
      setClassName(`square square--${turn}`);
    }
  };

  return (
    <div className={className} onClick={handleClick}></div>
  );
};

export default Square;
