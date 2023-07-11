import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import Canvas from '../components/Hangman/Canvas';
import Modal from '../components/Modal/Modal';
import '../components/Hangman/Hangman.css';
import wordsArray from '../components/Hangman/HangmanData';
import WordContainer from '../components/Hangman/WordContainer';

const Pagina5 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState('');
  const [usedLetters, setUsedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [hits, setHits] = useState(0);
  const [showStartButton, setShowStartButton] = useState(false);
  const [newLetter, setNewLetter] = useState('');

  const handleKeyDown = (event) => {
    const newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
      setNewLetter(newLetter);
      checkLetter(newLetter);
    }
  };

  const checkLetter = (letter) => {
    if (selectedWord.includes(letter)) {
      setUsedLetters((prevUsedLetters) => [...prevUsedLetters, letter]);
      setHits((prevHits) => prevHits + 1);
    } else {
      setMistakes((prevMistakes) => prevMistakes + 1);
    }
  };

  const startGame = () => {
    setUsedLetters([]);
    setMistakes(0);
    setHits(0);
    setShowStartButton(false);
    selectRandomWord();
  };

  const selectRandomWord = () => {
    const word =
      wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
    setSelectedWord(word);
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [usedLetters]);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="hangmanContainer">
            <h1>Ahorcado</h1>
            <div>
              <Canvas />
              <div className="usedLetters"></div>
            </div>
            <WordContainer
              selectedWord={selectedWord}
              usedLetters={usedLetters}
            />
            <div className="buttonsContainer">
              <button className="startButton" onClick={startGame}>
                START
              </button>
              <button className="resetHangmanButton">RESET</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pagina5;
