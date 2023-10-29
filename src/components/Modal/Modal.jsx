import React from 'react';

import css from './Modal.module.css';

const Modal = ({ showModalWindow, onClose }) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img className={css.modalImg} src={showModalWindow} alt="" />
      </div>
    </div>
  );
};

export default Modal;
