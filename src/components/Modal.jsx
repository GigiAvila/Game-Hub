import React, { useState } from 'react';
import '../Styles/Modal.css';

const Modal = ({ message }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible && (
        <div className='modal-container'>
          <div className='modal-body'>
            <div className='close-icon' onClick={handleCloseModal}><span>X</span></div>
            <h3>{message} <br />🎊</h3>
            <button className='modal-button' onClick={handleCloseModal}>Aceptar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
