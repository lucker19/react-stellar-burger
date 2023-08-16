import React, { useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overaly";
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import { FC } from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import { useNavigate } from "react-router";
import { ReactElement } from "react";

type TModalProps = {
  header?: string;
  children: ReactElement;
  handleClose: () => void;
}

const modalRoot = document.getElementById('modals') as HTMLElement;

const Modal = ({ header, children, handleClose } : TModalProps)  =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();



  React.useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) =>
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
