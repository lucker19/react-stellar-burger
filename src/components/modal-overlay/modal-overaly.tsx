import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { FC } from "react";

type TModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ onClose, children }) => {
  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
