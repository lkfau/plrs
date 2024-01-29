import Modal from '../UI/Modal/Modal';
import styles from './FeedbackModal.module.css'
const FeedbackModal = ({ lot, onHide }) => {
    const submitFeedback = async(lotIsFull) => {
        const response = await fetch("http://localhost:5000/feedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lot_id: lot.lot_id,
                user_id: 1,
                lot_is_full: lotIsFull
            }),
        });
    }
    
    return <Modal onHide={onHide}>
        <h3>Parking Feedback</h3>
        <p>When you parked, approximately how full was {lot.lot_name}?</p>
        <div className={styles.choice}>
            <button onClick={() => submitFeedback(0)}><span>Not full</span></button>
            <button onClick={() => submitFeedback(1)}><span>Nearly full</span></button>
            <button onClick={() => submitFeedback(1)}><span>Completely full</span></button>
        </div> 
    </Modal>
}

export default FeedbackModal;