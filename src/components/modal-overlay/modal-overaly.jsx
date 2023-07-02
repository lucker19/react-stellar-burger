import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onClose }) {
  return (
      <div className={styles.modal_overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};