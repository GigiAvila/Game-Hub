import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import '../Styles/Memotest.css';
import blankImg from '../assets/blank.png';
import facebookImg from '../assets/icons8-facebook.png';
import githubImg from '../assets/icons8-github.png';
import instagramImg from '../assets/icons8-instagram.png';
import linkedinImg from '../assets/icons8-linkedin.png';
import tiktokImg from '../assets/icons8-tiktok.png';
import twitterImg from '../assets/icons8-twitter.png';
import whatsappImg from '../assets/icons8-whatsapp.png';
import youtubeImg from '../assets/icons8-youtube.png';

const Pagina3 = () => {
  const memotestItem = [
    {
      name: 'facebook',
      image: facebookImg,
    },
    {
      name: 'github',
      image: githubImg,
    },
    {
      name: 'instagram',
      image: instagramImg,
    },
    {
      name: 'linkedin',
      image: linkedinImg,
    },
    {
      name: 'tiktok',
      image: tiktokImg,
    },
    {
      name: 'twitter',
      image: twitterImg,
    },
    {
      name: 'whatsapp',
      image: whatsappImg,
    },
    {
      name: 'youtube',
      image: youtubeImg,
    },
    {
      name: 'facebook',
      image: facebookImg,
    },
    {
      name: 'github',
      image: githubImg,
    },
    {
      name: 'instagram',
      image: instagramImg,
    },
    {
      name: 'linkedin',
      image: linkedinImg,
    },
    {
      name: 'tiktok',
      image: tiktokImg,
    },
    {
      name: 'twitter',
      image: twitterImg,
    },
    {
      name: 'whatsapp',
      image: whatsappImg,
    },
    {
      name: 'youtube',
      image: youtubeImg,
    }
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [blankmemotestItem, setmMemotestItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);
  const [allMatchesFound, setAllMatchesFound] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const shuffledItems = shuffleArray(memotestItem);
      const updatedItems = shuffledItems.map((item, index) => ({
        ...item,
        originalImage: item.image,
        image: blankImg,
        id: index + 1
      }));
      setmMemotestItem(updatedItems);
      setIsLoading(false);
    }, 1500);
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
    if (matchedItems.includes(card) || isCheckingMatch) {
      return;
    }
    const itemsWithUpdatedImg = blankmemotestItem.map((item) => {
      if (item.id === card.id) {
        const newImage = item.image === blankImg ? item.originalImage : blankImg;
        return {
          ...item,
          image: newImage
        };
      }
      return item;
    });
    setmMemotestItem(itemsWithUpdatedImg);
    setSelectedItems((prevItems) => [...prevItems, card]);
  };

  useEffect(() => {
    if (selectedItems.length >= 2) {
      setIsCheckingMatch(true);
    }
  }, [selectedItems]);

  useEffect(() => {
    const checkForMatch = () => {
      const [firstItem, secondItem] = selectedItems.slice(-2);
      if (firstItem.name === secondItem.name) {
        setMatchedItems((prevItems) => [...prevItems, firstItem, secondItem]);
        setModalVisible(true);
      } else {
        setTimeout(() => {
          const updatedItems = blankmemotestItem.map((item) => {
            if (item.id === firstItem.id || item.id === secondItem.id) {
              return {
                ...item,
                image: blankImg
              };
            }
            return item;
          });
          setmMemotestItem(updatedItems);
        }, 1500);
      }
      setSelectedItems([]);
      setIsCheckingMatch(false);
    };

    if (isCheckingMatch) {
      checkForMatch();
    }
  }, [isCheckingMatch]);

  useEffect(() => {
    if (matchedItems.length === memotestItem.length) {
      setAllMatchesFound(true);
    }
  }, [matchedItems, memotestItem]);

  const handleResetGame = () => {
    setmMemotestItem([]);
    setSelectedItems([]);
    setMatchedItems([]);
    setModalVisible(false);
    setAllMatchesFound(false);
    setIsLoading(true);
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className='memotestBody'>
          <h3 className='memotestTitle'> MEMOTEST </h3>
          <button className="resetButton" onClick={handleResetGame}>
            Volver a jugar
          </button>
          <div className='grid'>
            {blankmemotestItem.map((card) => (
              <div key={card.id} onClick={() => flipCard(card)}>
                <img src={card.image} alt={card.name} />
              </div>
            ))}
          </div>
        </div>
      )}
      {modalVisible && <Modal message="¡Muy bien! Ya entendiste de que va sigue así!" />}
      {allMatchesFound && (
        <Modal message="¡Felicitaciones! ¡Encontraste todas las coincidencias!" />
      )}
    </>
  );
};

export default Pagina3;
