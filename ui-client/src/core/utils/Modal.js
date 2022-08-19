import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

const modalElement = document.getElementById("modal-container");

const Modal = React.forwardRef(({ children, type, backdrop = true }, ref) => {
  const [show, setShow] = React.useState(false);
  React.useImperativeHandle(ref, () => {
    return { open, close };
  });
  // define open and close functions
  const open = useCallback(() => setShow(true), []);
  const close = useCallback(() => setShow(false), []);

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (show) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, show]);

  if (!modalElement) return null;
  return createPortal(
    show ? (
      <div className="modal-wrapper">
        {backdrop && (
          <div onClick={close} className="fixed inset-0 bg-dark-blue-70" />
        )}
        <div className={`modal-box ${type}`}>{children}</div>
      </div>
    ) : null,
    modalElement
  );
});
export default Modal;
