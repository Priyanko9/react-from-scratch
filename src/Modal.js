import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";



const Modal = ({ children }) => {
  //useRef is used to attach a reference to the div which will hold the contents of modal

  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  //useEffect in this case is required only when we want to do some initialization after the modal has been mounted and we have to clear the contents after the modal unmount.
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
