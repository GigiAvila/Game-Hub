import React from 'react';

const WordContainer = ({ selectedWord, usedLetters }) => {
  const wordLetters = selectedWord.split('');

  return (
    <div className="wordContainer">
      {wordLetters.map((letter, index) => (
        <span
          key={index}
          className={`letter ${usedLetters.includes(letter) ? '' : 'hidden'
            }`}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default WordContainer;
