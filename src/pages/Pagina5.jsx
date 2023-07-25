import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import Modal from '../components/Modal/Modal';
import Canvas from '../components/Hangman/Canvas';
import '../components/Hangman/Hangman.css';
import wordsArray from '../components/Hangman/HangmanData';
import WordContainer from '../components/Hangman/WordContainer';

const Pagina5 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState('');
  const [usedLetters, setUsedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [hits, setHits] = useState(0);
  const [newLetters, setNewLetters] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [showModalMessage, setShowModalMessage] = useState('Cuando quieras comenzar el juego presiona start');
  const maxMistakes = 6;
  const canvasRef = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);

  const wrongLetter = () => {
    setMistakes((prevMistakes) => prevMistakes + 1);
  };


  const checkLetter = (letter) => {
    if (selectedWord.includes(letter)) {
      const occurrences = selectedWord.split(letter).length - 1;
      setUsedLetters((prevUsedLetters) => [...prevUsedLetters, letter]);
      setHits((prevHits) => prevHits + occurrences);
    } else {
      wrongLetter();
    }
  };


  const isGameFinished = () => {
    return mistakes >= maxMistakes || hits === selectedWord.length;
  };

  const handleKeyDown = (event) => {
    if (!isGameFinished()) {
      const newLetter = event.key.toUpperCase();
      if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        setNewLetters((prevNewLetters) => [...prevNewLetters, newLetter]);
        checkLetter(newLetter);
      }
    }
  };

  const startGame = () => {
    setUsedLetters([]);
    setMistakes(0);
    setHits(0);
    selectRandomWord();
    setNewLetters([]);
    setGameStarted(true);
    setShowModal(false);
  };

  const selectRandomWord = () => {
    const word =
      wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
    setSelectedWord(word);
  };
  const endGame = () => {
    setShowModalMessage(
      hits === selectedWord.length
        ? '¡Felicitaciones! Has encontrado la palabra.'
        : 'Lo siento, has perdido.'
    );
    setShowModal(true);
    setGameStarted(false);
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      console.log('MODAL START');
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isLoading && !isGameFinished() && !gameStarted && showModal) {
      console.log('Show modal is set to true.');
    }
  }, [isLoading, isGameFinished, gameStarted, showModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [usedLetters]);

  useEffect(() => {
    console.log('Hits:', hits);
    console.log('Mistakes:', mistakes);
    console.log('Selected word length:', selectedWord.length);
    if (hits === selectedWord.length || mistakes >= maxMistakes) {
      if (gameStarted) {
        console.log('MODAL ');
        endGame();
      }
    }
  }, [hits, mistakes, selectedWord, gameStarted]);

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
              <Canvas mistakes={mistakes} />
              <div className="usedLetters"></div>
            </div>
            <WordContainer
              selectedWord={selectedWord}
              usedLetters={usedLetters}
              newLetters={newLetters}
            />
            <div className="buttonsContainer">
              <button
                className="startButton"
                onClick={startGame}
                disabled={gameStarted}
              >
                START
              </button>
            </div>
          </div>
          {showModal && (
            <Modal
              message={showModalMessage}
              onClose={gameStarted ? undefined : startGame}
            />
          )}
        </>
      )}
    </>
  );
};

export default Pagina5;
