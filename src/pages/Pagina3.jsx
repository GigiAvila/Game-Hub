import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Modal from '../components/Modal/Modal';
import Loading from '../components/Loading/Loading';
import '../components/Memotest/Memotest.css';
import blankImg from '../components/Memotest/assets-memotest/blank.png';
import memotestArray from '../components/Memotest/MemotestData';

const Pagina3 = () => {
  const memotestItem = memotestArray;

  const [isLoading, setIsLoading] = useState(true);
  const [memotestItems, setMemotestItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);
  const [allMatchesFound, setAllMatchesFound] = useState(false);


  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const shuffledItems = shuffleArray(memotestItem);
    const initialItems = shuffledItems.map((item, index) => ({
      ...item,
      originalImage: item.image,
      image: blankImg,
      id: index + 1
    }));
    setMemotestItems(initialItems);
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const flipCard = (card) => {
    if (matchedItems.includes(card) || selectedItems.length >= 2) {
      return;
    }

    const updatedItems = memotestItems.map((item) => {
      if (item.id === card.id) {
        const newImage = item.image === blankImg ? item.originalImage : blankImg;
        return {
          ...item,
          image: newImage
        };
      }
      return item;
    });

    setMemotestItems(updatedItems);

    const updatedSelectedItems = [...selectedItems, card];
    setSelectedItems(updatedSelectedItems);

    if (updatedSelectedItems.length === 2) {
      setIsCheckingMatch(true);
    }
  };

  useEffect(() => {
    const checkForMatch = () => {
      const [firstItem, secondItem] = selectedItems;

      if (firstItem && secondItem && firstItem.name === secondItem.name) {
        setMatchedItems((prevItems) => [...prevItems, firstItem, secondItem]);
        setModalVisible(true);

        const updatedItems = memotestItems.map((item) => {
          if (item.id === firstItem.id || item.id === secondItem.id) {
            return {
              ...item,
              image: item.originalImage // Aquí asignamos la imagen original en lugar de blankImg
            };
          }
          return item;
        });

        setMemotestItems(updatedItems);
        setSelectedItems([]);
      } else {
        setTimeout(() => {
          const updatedItems = memotestItems.map((item) => {
            if (item.id === firstItem.id || item.id === secondItem.id) {
              return {
                ...item,
                image: blankImg
              };
            }
            return item;
          });

          setMemotestItems(updatedItems);
          setSelectedItems([]);
        }, 1500);
      }
    };

    if (isCheckingMatch) {
      checkForMatch();
      setIsCheckingMatch(false);
    }
  }, [isCheckingMatch, selectedItems]);


  useEffect(() => {
    if (matchedItems.length === memotestItem.length) {
      setAllMatchesFound(true);
    }
  }, [matchedItems, memotestItem]);

  const handleResetGame = () => {
    const shuffledItems = shuffleArray(memotestItem);
    const updatedItems = shuffledItems.map((item, index) => ({
      ...item,
      originalImage: item.image,
      image: blankImg,
      id: index + 1
    }));
    setMemotestItems(updatedItems);
    setSelectedItems([]);
    setMatchedItems([]);
    setModalVisible(false);
    setAllMatchesFound(false);
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="memotestBody">
          <h3 className="memotestTitle"> MEMOTEST </h3>
          <button className="resetButton" onClick={handleResetGame}>
            Volver a jugar
          </button>
          <div className="grid">
            {memotestItems.map((card) => (
              <div key={card.id} onClick={() => flipCard(card)}>
                <img src={card.image} alt={card.name} />
              </div>
            ))}
          </div>
        </div>
      )}
      {modalVisible && <Modal message="¡Muy bien! Ya entendiste de qué va, ¡sigue así!" />}
      {allMatchesFound && <Modal message="¡Felicitaciones! ¡Encontraste todas las coincidencias!" />}
    </>
  );
};

export default Pagina3;
