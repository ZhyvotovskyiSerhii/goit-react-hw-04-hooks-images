import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css";

const modalEl = document.querySelector("#modal");

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalEl
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
