import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import tictactoeImg from './NavbarAssets/tictactoe.jpg';
import sudokuImg from './NavbarAssets/sudoku.jpg';
import memotestImg from './NavbarAssets/memotest.jpg';
import tetrisImg from './NavbarAssets/tetris1.jpg';
import hangmanImg from './NavbarAssets/hangman.png';
import simonImg from './NavbarAssets/simon.jpg';
import snakeImg from './NavbarAssets/snake.jpg';
import whackAMoleImg from './NavbarAssets/whackamole.jpg';
import spaceInvadersImg from './NavbarAssets/spaceinvaders.png';
import arrowLeftImg from './NavbarAssets/arrowleft.png';
import arrowRightImg from './NavbarAssets/arrowright.png';

const Navbar = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLeftClick = () => {
    setActiveIndex((prevIndex) => {
      const lastIndex = carouselItems.length - 1;
      const newActiveIndex = prevIndex === 0 ? lastIndex : prevIndex - 1;

      return newActiveIndex;
    });
  };

  const handleRightClick = () => {
    setActiveIndex((prevIndex) => {
      const lastIndex = carouselItems.length - 1;
      const newActiveIndex = prevIndex === lastIndex ? 0 : prevIndex + 1;

      return newActiveIndex;
    });
  };

  const carouselItems = [
    { id: 1, image: tictactoeImg },
    { id: 2, image: sudokuImg },
    { id: 3, image: memotestImg },
    { id: 4, image: tetrisImg },
    { id: 5, image: hangmanImg },
    { id: 6, image: simonImg },
    { id: 7, image: snakeImg },
    { id: 8, image: whackAMoleImg },
    { id: 9, image: spaceInvadersImg },
  ];

  const startIndex = activeIndex - 2 < 0 ? carouselItems.length + (activeIndex - 2) : activeIndex - 2;
  const endIndex = (activeIndex + 1) % carouselItems.length;
  const visibleItems = [
    carouselItems[(startIndex + carouselItems.length) % carouselItems.length],
    carouselItems[(startIndex + carouselItems.length + 1) % carouselItems.length],
    carouselItems[(startIndex + carouselItems.length + 2) % carouselItems.length],
    carouselItems[(endIndex + carouselItems.length) % carouselItems.length]
  ];

  return (
    <>
      <div className="arrow arrow-left" onClick={handleLeftClick}>
        <img className="arrow-left" src={arrowLeftImg} alt="Arrow Left" />
      </div>
      <div id="carousel" ref={carouselRef}>
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className={`carousel-item ${item.id === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <Link to={`/Pagina${item.id}`}>
              <img src={item.image} alt={`item ${item.id}`} />
            </Link>
          </div>
        ))}
      </div>
      <div className="arrow arrow-right" onClick={handleRightClick}>
        <img className="arrow-right" src={arrowRightImg} alt="Arrow Right" />
      </div>
    </>
  );
};

export default Navbar;
