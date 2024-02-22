import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import styles from './FeedbackModal.module.css'

const FeedbackModal = ({ lot, onHide }) => {
    const submitFeedback = async(lotIsFull) => {
        await fetch('http://localhost:5000/feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lot_id: lot.lot_id,
                user_id: 1,
                lot_is_full: lotIsFull
            }),
        });
    }
    
    return <Modal onHide={onHide} size='small'>
        <h3>Parking Feedback</h3>
        <p>When you parked, approximately how full was {lot.lot_name}?</p>
        <div className={styles.choice}>
            <Button onClick={() => submitFeedback(0)} color='success'><span>Not full</span></Button>
            <Button onClick={() => submitFeedback(1)} color='warning'><span>Nearly full</span></Button>
            <Button onClick={() => submitFeedback(1)} color='danger'><span>Completely full</span></Button>
        </div> 
    </Modal>
}

export default FeedbackModal;