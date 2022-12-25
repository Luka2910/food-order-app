import React from "react";
import styles from "./Modal.module.css";
import ReactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClickBackdrop}/>;
};
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop onClickBackdrop={props.onClickBackdrop} />, document.getElementById("backdrop"))}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("modal-overlay")
      )}
    </React.Fragment>
  );
};

export default Modal;
