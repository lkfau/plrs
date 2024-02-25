import { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button'
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ title, content, onConfirm, confirmText, cancelText }) => {
    const [userResponse, setUserResponse] = useState(null);
    const hideModalHandler = () => onConfirm(userResponse ?? false);

    return <Modal className={styles.container} onHide={hideModalHandler} hidden={userResponse}>
        <div className={styles.header}>
            <h2>{title}</h2>
            <button className={styles.closeButton} onClick={() => setUserResponse(false)}>X</button>
        </div>
        <hr style={{width: '100%', boxSizing: 'border-box'}}/>
        <div><p>{content}</p></div>
        <div className={styles.footer}>
            <Button onClick={() => setUserResponse(false)}>{cancelText ?? "Cancel"}</Button>
            <Button onClick={() => setUserResponse(true)}>{confirmText ?? "Ok"}</Button>
        </div>
    </Modal>
}

export default ConfirmModal;