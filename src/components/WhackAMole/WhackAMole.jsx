import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import Modal from '../Modal/Modal';
import './WhackAMole.css';

const Pagina8 = () => {
  const squaresRef = useRef([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [moleMoving, setMoleMoving] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(countdownInterval);
          setShowModal(true);
          setMoleMoving(false);
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (!moleMoving) return;

    const moleInterval = setInterval(moveMoleRandomly, 500);

    return () => clearInterval(moleInterval);
  }, [moleMoving]);

  const moveMoleRandomly = () => {
    const squares = squaresRef.current;
    squares.forEach((square) => {
      square.classList.remove('mole');
    });
    const randomSquareIndex = Math.floor(Math.random() * squares.length);
    squares[randomSquareIndex].classList.add('mole');
  };

  const hitPosition = (e) => {
    const targetSquare = e.target;
    if (targetSquare.classList.contains('mole')) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setShowModal(false);
    setMoleMoving(true);
  };

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      {!isLoading && (
        <div className='WaMBody'>
          <div className='titleScoreTimeContainer'>
            <h1>Whack a mole!</h1>
            <h2>
              Puntaje: <span>{score}</span>
            </h2>
            <h2>
              Tiempo restante: <span>{timeLeft}</span>
            </h2>
            <button className='resetButton' onClick={resetGame}>
              Volver a jugar
            </button>
          </div>

          <div className='WaMGrid'>
            <div ref={(el) => (squaresRef.current[0] = el)} className='WaMsquare' id='1' onMouseUp={hitPosition}></div>
            <div ref={(el) => (squaresRef.current[1] = el)} className='WaMsquare' id='2' onMouseUp={hitPosition}></div>
            <div ref={(el) => (squaresRef.current[2] = el)} className='WaMsquare' id='3' onMouseUp={hitPosition}></div>
            <div ref={(el) => (squaresRef.current[3] = el)} className='WaMsquare' id='4' onMouseUp={hitPosition}></div>
            <div ref={(el) => (squaresRef.current[4] = el)} className='WaMsquare' id='5' onMouseUp={hitPosition}></div>
            <div ref={(el) => (squaresRef.current[5] = el)} className='WaMsquare' id='6' onMouseUp={hitPosition}></div>
            <div ref={(el) => (squaresRef.current[6] = el)} className='WaMsquare' id='7' onMouseUp={hitPosition}></div>
            <div ref={(el) => (squaresRef.current[7] = el)} className='WaMsquare' id='8' onMouseUp={hitPosition}></div>
            <div ref={(el) => (squaresRef.current[8] = el)} className='WaMsquare' id='9' onMouseUp={hitPosition}></div>
          </div>
        </div>
      )}
      {showModal && (
        <Modal message={`¡Se acabó el tiempo! Tu puntaje es: ${score}`} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Pagina8;
