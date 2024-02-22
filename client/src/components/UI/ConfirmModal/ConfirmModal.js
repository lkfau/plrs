import { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './ConfirmModal.module.css';
const ConfirmModal = ({ title, content, onConfirm, confirmText, cancelText }) => {
    const [userResponse, setUserResponse] = useState(null);
    const hideModalHandler = () => onConfirm(userResponse ?? false);

    return <Modal className={styles.container} onHide={hideModalHandler} hidden={userResponse}>
        <div className={styles.header}>
            <h2>{title}</h2>
            <button className={styles.closeButton} onClick={() => setUserResponse(false)}>X</button>
        </div>
        <div>
            <p>{content}</p>
        </div>
        <div className={styles.footer}>
            <button onClick={() => setUserResponse(false)}>{cancelText ?? "Cancel"}</button>
            <button onClick={() => setUserResponse(true)}>{confirmText ?? "Ok"}</button>
        </div>
    </Modal>
}

export default ConfirmModal;