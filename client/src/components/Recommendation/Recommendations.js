import { useState } from 'react';
import Recommendation from './Recommendation';
import NoRecommendation from './NoRecommendation';

function Recommendations({ data }) {
    const [currentLot, setCurrentLot] = useState(0);

    const declineRecommendationHandler = () => {
        const numRecommendations = data.length;
        setCurrentLot(lot => (lot + 1) % (numRecommendations+1))
    }
    
    if (currentLot < data.length) {
        return <Recommendation number={currentLot + 1} lot={data[currentLot]} onDecline={declineRecommendationHandler} />
    } else {
        return <NoRecommendation onRestart={() => setCurrentLot(0)}></NoRecommendation>
    }
}

export default Recommendations;
