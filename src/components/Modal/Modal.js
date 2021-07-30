import  { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, modalImg: {modalImg} })  {

  useEffect(() => {
     const handleKeyPress = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    }
  }, [onClose]);

   const onOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal (
      <div className="Overlay" onClick={onOverlayClick}>
        <div className="Modal">
          <img src={modalImg} alt="" />
        </div>
      </div>,
      modalRoot,
    );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImg: PropTypes.object.isRequired,
};
