import React from 'react';
import videoGame from '../Header/assets-header/videogame1.mp4'
import './Header.css'
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <>
      <Link to="/">
        <header className="header">
          <video autoPlay muted loop className="header-video">
            <source src={videoGame} type="video/mp4" />
          </video>
          <div className="header-content">
            <h1>Games Hub</h1>
          </div>
        </header>
      </Link>
    </>
  );
};
export default Header;