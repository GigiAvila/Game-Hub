import React from 'react'
import PlayerImg from './assets/galaga.png'

const Player = ({ positionX, positionY, playerShootBullet }) => {

  const playerStyle = {
    position: 'absolute',
    left: positionX,
    top: positionY,
  };

  return (
    <div className='playerContainer' style={playerStyle}>
      <img className='playerImg' src={PlayerImg} alt="playerImg" />
    </div>
  )
}

export default Player