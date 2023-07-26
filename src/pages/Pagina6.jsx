import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';
import Colors from '../components/Simon/Colors';
import '../components/Simon/Simon.css';

const Pagina6 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className='simonContainer'>
          <h1 className='title'>Simon says</h1>
          <div className='board'>
            <Colors color="green" />
            <Colors color="red" />
            <Colors color="blue" />
            <Colors color="yellow" />
            {/* Agregamos el contenedor para el botón START */}
            <div className="startButtonContainer">
              <button className='startButton'>START</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagina6;
