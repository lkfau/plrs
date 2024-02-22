import { useState } from 'react';
import FeedbackModal from '../Feedback/FeedbackModal';
import styles from './Recommendation.module.css'

function Recommendation({ number, parkingLot }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const toggleFeedbackModal = () => setFeedbackOpen(f => !f);
  return (
    <>
      {feedbackOpen && <FeedbackModal lot={parkingLot} onHide={toggleFeedbackModal} />}
      <div className={styles.container}>
        <div>
          <h2>{number}. <span className={styles.title}>{parkingLot.lot_name}</span></h2>
          <p><em>{parkingLot.feet_to_destination} feet from your destination</em></p>
          
        </div>
        <div className={styles.parked}>
          <button onClick={toggleFeedbackModal}>Park here</button>
        </div>
      </div>
    </>
    
  );
}

export default Recommendation;
