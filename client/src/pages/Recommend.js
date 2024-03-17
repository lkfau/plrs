import { useEffect, useState } from 'react';
import styles from './Recommend.module.css';
import Recommendations from '../components/Recommendation/Recommendations';
import Dropdown from "../components/UI/Dropdown/Dropdown";
import PillCheckbox from '../components/UI/PillCheckbox/PillCheckbox';


const firstOrLastOptions = ['Arriving', 'Departing'];

const Recommend = () => {
    const [buildings, setBuildings] = useState(null);
    const [schedules, setSchedules] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [firstOrLastLocation, setFirstOrLastLocation] = useState(0);
    const [recommendations, setRecommendations] = useState(null);

    const getBuildings = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/buildings`);
        let building_results = await response.json();
        building_results = building_results.map(building => ({ key: building.building_id, value: building.building_name }))
        setSelectedBuilding(building_results[0].key)
        setBuildings(building_results);
    }

    const getSchedules = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/schedules?user_id=1`);
        let schedule_results = await response.json();
        schedule_results = schedule_results.map(schedule => ({ key: schedule.schedule_id, value: schedule.name }))
        setSelectedSchedule(schedule_results[0].key)
        setSchedules(schedule_results);
    }

    const getRecommendations = async (searchType) => {
        let response;
        if (searchType === 'building') {
            response = await fetch(`${process.env.REACT_APP_SERVER_URL}/recommend?building_id=${selectedBuilding}`);
        } else {
            response = await fetch(`${process.env.REACT_APP_SERVER_URL}/recommend?schedule_id=${selectedSchedule}&first_or_last_location=${firstOrLastLocation ? 'last' : 'first'}`);
        }
        let recommendation_results = await response.json();
        setRecommendations(recommendation_results);
    }

    useEffect(() => {
        getBuildings();
        getSchedules();
    }, []);

    if (recommendations?.length) {
        return <Recommendations data={recommendations} buildingName={buildings.find(building => building.key === selectedBuilding).value} />
    } else {
        return <div className={styles.container}>
            <p>Choose your building.</p>
            {buildings && <div className={styles.method}>
                <Dropdown data={buildings} onSelect={setSelectedBuilding} />
                <button className={styles.recommendationButton} onClick={() => getRecommendations('building')}>Get Recommendation</button>
                
            </div>}

            <h2>OR</h2>
            <p>Choose your schedule.</p>
            {schedules && <div className={styles.method}>
                <Dropdown data={schedules} onSelect={setSelectedSchedule} />
                <p>Would you like to park closest to your arriving or departing building?</p>
                <PillCheckbox options={firstOrLastOptions} onSelect={setFirstOrLastLocation} selectedOption={firstOrLastOptions[firstOrLastLocation]} />
                <button className={styles.recommendationButton} onClick={() => getRecommendations('schedule')}>Get Recommendation</button>
                
            </div>}
        </div>
    }
}

export default Recommend;
