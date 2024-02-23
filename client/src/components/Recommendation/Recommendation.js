import { useMemo, useState } from 'react';
import FeedbackModal from '../Feedback/FeedbackModal';
import Button from '../UI/Button/Button';
import { GoogleMap, useJsApiLoader, Marker  } from '@react-google-maps/api';
import styles from './Recommendation.module.css';

const libraries = ['places']

function Recommendation({ number, lot, buildingName, onDecline }) {
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const center = useMemo(() => ({
        lat: parseFloat(lot.latitude),
        lng: parseFloat(lot.longitude)
    }), [lot])
    const toggleFeedbackModal = () => setFeedbackOpen(f => !f);
    
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries
    });

    return (
        <>
            {feedbackOpen && <FeedbackModal lot={lot} onHide={toggleFeedbackModal} />}
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>{number}. <span className={styles.title}>{lot.lot_name}</span></h1>
                    <p><em>{lot.feet_to_destination} feet from {buildingName}</em></p>
                </div>
                <div className={styles.mapContainer}>
                    { (isLoaded && !loadError) && <GoogleMap
                        mapContainerClassName={styles.map}
                        zoom={17}
                        center={center}
                    >
                        <Marker position={center} />
                    </GoogleMap>}
                </div>
                <div className={styles.footer}>
                    <Button onClick={toggleFeedbackModal} color='success'>Park here</Button>
                    <Button onClick={onDecline} color='danger'>Park somewhere else</Button>
                </div>
            </div>
        </>

    );
}

export default Recommendation;
