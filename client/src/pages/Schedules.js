import { useEffect, useState } from 'react';
import styles from './Schedules.module.css';
import SchedulePanel from '../components/SchedulePanel';

function Schedules() {
  const [schedules, setSchedules] = useState(null)

  const getSchedules = async() => {
    const response = await fetch(`http://localhost:5000/schedules?user_id=1&get_items=true`);
    let schedule_results = await response.json();
    setSchedules(schedule_results);
  }

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <div className={styles.flex}>
      {schedules && schedules.map(schedule => <SchedulePanel key={schedule.schedule_id} schedule={schedule} onSave={getSchedules}/>)}
    </div>
  );
}

export default Schedules;
