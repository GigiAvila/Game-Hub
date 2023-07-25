import React from 'react';

const WordContainer = ({ selectedWord, usedLetters, newLetters }) => {
  const wordLetters = selectedWord.split('');

  const uniqueNewLetters = [...new Set(newLetters)];

  const filteredNewLetters = uniqueNewLetters.filter(
    (letter) => !usedLetters.includes(letter)
  );

  return (
    <div className="wordContainer">
      <h2 className="prevNewLetters">
        {filteredNewLetters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </h2>
      <div className="wordSelectedContainer">
        {wordLetters.map((letter, index) => (
          <span
            key={index}
            className={`letter ${usedLetters.includes(letter) ? '' : 'hidden'}`}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordContainer;



