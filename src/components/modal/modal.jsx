import React, { useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overaly";
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";

function Modal({ handleClose, children, header }) {
  const modalRoot = document.getElementById("modals");
  React.useEffect(() => {
    const closeOnEscape = (e) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
  }, [handleClose]);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={"text text_type_main-large"}>{header}</p>
          <button className={styles.close_button}>
            <CloseIcon type="primary" onClick={handleClose} />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={handleClose} />
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.object.isRequired,
  ]),
  handleClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
