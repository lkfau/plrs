import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.css'

const Modal = ({ onHide, children, className }) => {
  const [transitionClass, setTransitionClass] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style["overflow-y"] = "hidden";
    setTransitionClass(true);
    return () => {
      document.body.style["overflow-y"] = "auto";
    };
  }, []);

  const hideHandler = (e) => {
    if (!e || overlayRef.current.contains(e.target)) {
      setTransitionClass(false);
      setTimeout(onHide, 300);
    }
  };

  return ReactDOM.createPortal(
    <div className={`${styles.container} ${transitionClass ? styles['container-show'] : styles['container-hide']}`}
      style={{ top: `${window.scrollY}px` }}
      onClick={hideHandler}
    >
      <div
        ref={overlayRef}
        id="modal-bg"
        className={styles.overlay}
      ></div>
      <div className={`${styles.modal} ${className || ""}`}
        // className={mx-6 w-full max-w-4xl bg-white drop-shadow-2xl rounded-xl mt-10 overflow-y-auto transition-all duration-300 ${
        //   transitionClass ? "translate-y-0" : "-translate-y-10"
        // } ${className}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
