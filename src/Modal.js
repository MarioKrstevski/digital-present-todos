import { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal");
function Modal({ children }) {
  const el = document.createElement("div");
  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(children, el);
}

export default Modal;
