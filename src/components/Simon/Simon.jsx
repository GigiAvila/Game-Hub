import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import Colors from './Colors';
import Modal from '../Modal/Modal';
import './Simon.css';

import colorSound from './assets/color.mp3';
import correctSecuenceSound from './assets/correctSecuence.mp3';
import gameOverSound from './assets/gameOver.mp3';

const Pagina6 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [flashColor, setFlashColor] = useState("");
  const [play, setPlay] = useState({
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  });

  const [roundTime, setRoundTime] = useState(1000); // Tiempo inicial entre cada color (1 segundo)

  const colorList = ["green", "red", "yellow", "blue"];

  const colorAudioRef = useRef(new Audio(colorSound));
  const correctSecuenceAudioRef = useRef(new Audio(correctSecuenceSound));
  const gameOverAudioRef = useRef(new Audio(gameOverSound));

  const playSound = (audioRef) => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  function handleStart() {
    setIsOn(true);
  }

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (isOn) {
      setPlay({ ...play, isDisplay: true, colors: [] });
      setRoundTime(1000);
    } else {
      setPlay({
        isDisplay: false,
        colors: [],
        score: 0,
        userPlay: false,
        userColors: [],
      });
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];
      console.log("el prox color para hacer clic es", newColor);

      setPlay((prevPlay) => ({ ...prevPlay, colors: [...prevPlay.colors, newColor] }));
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function displayColors() {
    console.log("el acumulado de colores es", play.colors);

    const colorsToFlash = [...play.colors];

    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(colorsToFlash[i]);
      playSound(colorAudioRef);
      await wait(roundTime); // Usamos el tiempo de la ronda actual
      setFlashColor("");
      await wait(1000); // Tiempo fijo de 1 segundo entre cada color
    }

    // Reducimos el tiempo de la ronda en 100ms en cada ronda completada
    setRoundTime((prevRoundTime) => prevRoundTime - 100);

    setPlay((prevPlay) => ({
      ...prevPlay,
      isDisplay: false,
      userPlay: true,
      userColors: [...prevPlay.colors].reverse(),
    }));
  }

  async function handleCardClick(color) {
    if (!play.isDisplay && play.userPlay) {
      const remindingColors = [...play.userColors];
      const lastColor = remindingColors.pop();
      setFlashColor(lastColor);
      console.log("he clickeado", lastColor);
      console.log("colores restantes antes de pasar a la proxima ronda", remindingColors)

      if (color === lastColor) {
        if (remindingColors.length) {
          setPlay((prevPlay) => ({ ...prevPlay, userColors: remindingColors }));
        } else {
          const score = play.colors.length;
          playSound(correctSecuenceAudioRef);
          await wait(1000); // proximo nivel
          setPlay((prevPlay) => ({
            ...prevPlay,
            isDisplay: true,
            userPlay: false,
            score: score,
            userColors: [],
          }));
        }
      } else { // si pierde
        playSound(gameOverAudioRef);
        await wait(1000);
        setPlay({ ...play, score: play.colors.length, isDisplay: false, userPlay: false, userColors: [] });
      }
      setFlashColor("");
    }
  }
  function handleResetGame() {
    setIsOn(false);
    setPlay({
      isDisplay: false,
      colors: [],
      score: 0,
      userPlay: false,
      userColors: [],
    });
    setRoundTime(1000);
    setFlashColor("");
  }

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className='simonGameContainer'>
          <h1 className='simonTitle'>Simon says</h1>
          <div className='resetButtonContainer'>
            <button onClick={handleResetGame}>Volver a jugar</button>
          </div>
          <div className='Simonboard'>
            {colorList &&
              colorList.map((v, i) => (
                <Colors
                  key={i}
                  onClick={() => {
                    handleCardClick(v);
                    setFlashColor(v);
                    setTimeout(() => setFlashColor(""), 300);
                  }}
                  flash={flashColor === v}
                  color={v}
                />
              ))}
          </div>
          {!isOn && play.score === 0 && (
            <div className='startButtonContainer'>
              <button onClick={handleStart} className='SimonstartButton'>
                START
              </button>
            </div>
          )}
          {isOn && (play.isDisplay || play.userPlay) && (
            <div className='score'>{play.score}</div>
          )}
          {isOn && !play.isDisplay && !play.userPlay && play.score && (
            <Modal
              message={`Ups! Has perdido 😢. Tu puntaje ha sido ${play.score - 1}`}
              onClick={() => {
                setIsOn(false);
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Pagina6;
