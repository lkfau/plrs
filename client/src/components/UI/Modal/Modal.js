import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.css'

const Modal = ({ onHide, hidden, size, className, children }) => {
    const [transitionClass, setTransitionClass] = useState(false);
    const overlayRef = useRef(null);
    const initialHiddenValue = useRef(hidden)

    const hideHandler = useCallback((e) => {
        if (!e || overlayRef.current.contains(e.target)) {
            setTransitionClass(false);
            setTimeout(onHide, 300);
        }
    }, [onHide]);

    useEffect(() => {
        document.body.style["overflow-y"] = "hidden";
        setTransitionClass(true);
        return () => {
            document.body.style["overflow-y"] = "auto";
        };
    }, []);

    useEffect(() => {
        if (hidden !== initialHiddenValue.current) hideHandler();
    }, [hidden, initialHiddenValue, hideHandler]);

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
            <div className={`${styles.modal} ${size ? styles[size] : styles.small} ${className}`}>
                {children}
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default Modal;
