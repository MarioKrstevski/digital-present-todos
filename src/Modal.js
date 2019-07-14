import { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal");
const el = document.createElement("div");

function Modal({ children }) {
  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
}

export default Modal;
