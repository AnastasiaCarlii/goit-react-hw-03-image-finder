import React, { Component } from 'react';

import css from './Modal.module.css';

class Modal extends Component {
  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
      // console.log('закриваю на "esc"');
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    // console.log('монтується');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    // console.log('розмонтується');
  }

  render() {
    const { showModalWindow, onClose } = this.props;
    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img className={css.modalImg} src={showModalWindow} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
