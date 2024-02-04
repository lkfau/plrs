import { useEffect, useState } from 'react';
import styles from './Recommend.module.css';
import Recommendations from '../components/Recommendation/Recommendations';
import Dropdown from "../components/UI/Dropdown/Dropdown";

function Recommend() {
  const [buildings, setBuildings] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  const getBuildings = async() => {
    const response = await fetch("http://localhost:5000/buildings");
    let building_results = await response.json();
    building_results = building_results.map(building => ({ key: building.building_id, value: building.building_name }))
    setSelectedBuilding(building_results[0].key)
    setBuildings(building_results);
  }

  const getRecommendations = async() => {
    const response = await fetch(`http://localhost:5000/recommend?building_id=${selectedBuilding}`);
    let recommendation_results = await response.json();
    setRecommendations(recommendation_results);
  }

  useEffect(() => {
    getBuildings();
  }, []);

  return (
    <>
      <p>Choose your building.</p>
      {buildings && <div style={{display: "flex"}}>
        <Dropdown data={buildings} onSelect={setSelectedBuilding}/>
        <div>
          <button className={styles.recommendationButton} onClick={getRecommendations}>Get Recommendation</button>
        </div>
      </div>}
      {recommendations && <Recommendations data={recommendations} />}
    </>
  );
}

export default Recommend;
