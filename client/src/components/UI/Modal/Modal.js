import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.css'

const Modal = ({ onHide, hidden, size, className, children }) => {
    const [transitionClass, setTransitionClass] = useState(false);
    const overlayRef = useRef(null);
    const firstRender = useRef(true)

    const hideHandler = (e) => {
        if (!e || overlayRef.current.contains(e.target)) {
            setTransitionClass(false);
            setTimeout(onHide, 300);
        }
    };

    useEffect(() => {
        document.body.style["overflow-y"] = "hidden";
        setTransitionClass(true);
        return () => {
            document.body.style["overflow-y"] = "auto";
        };
    }, []);

    useEffect(() => {
        if (!firstRender.current) hideHandler();
        firstRender.current = false;
    }, [hidden]);

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
