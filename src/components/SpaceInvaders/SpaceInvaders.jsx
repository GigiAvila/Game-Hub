
import { useState, useEffect } from 'react';
import React from 'react'
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import SpaceCanvas from './SpaceCanvas';

import './SpaceInvaders.css'



const SpaceInvaders = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimer);
  }, []);



  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className='spaceInvadersContainer'>
          <h1 className='titleSpaceInvanders'>Space Invaders</h1>
          <SpaceCanvas />
        </div>
      )}
    </>
  )
}

export default SpaceInvaders