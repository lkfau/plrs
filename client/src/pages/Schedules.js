import { useEffect, useState } from 'react';
import styles from './Schedules.module.css';
import SchedulePanel from '../components/Schedules/SchedulePanel';
import NewScheduleButton from '../components/Schedules/NewScheduleButton';
import ConfirmModal from '../components/UI/ConfirmModal/ConfirmModal';

function Schedules() {
    const [schedules, setSchedules] = useState(null);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);
    const getSchedules = async () => {
        const response = await fetch(`http://localhost:5000/schedules?user_id=1&get_items=true`);
        let schedule_results = await response.json();
        setSchedules(schedule_results);
    }

    const confirmDeleteModalHandler = async (confirm) => {
        if (confirm && scheduleToDelete != null) {
            const response = await fetch(`http://localhost:5000/schedules?schedule_id=${scheduleToDelete.schedule_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(response) {
                if (response.status == 200) getSchedules();
                setScheduleToDelete(null);
            }          
        } else {
            setScheduleToDelete(null);
        }
    }


    useEffect(() => {
        getSchedules();
    }, []);

    return <>
        {scheduleToDelete != null && <ConfirmModal
            title={'Delete Schedule'}
            content={'Are you sure you want to delete the schedule' + scheduleToDelete.name + '?'}
            onConfirm={confirmDeleteModalHandler} />}
        <div className={styles.flex}>
            {schedules && schedules.map(schedule => 
                <SchedulePanel key={schedule.schedule_id} schedule={schedule} onSave={getSchedules} onDelete={() => setScheduleToDelete(schedule)} />
            )}
            <NewScheduleButton onSave={getSchedules} />
        </div>
    </>;
}

export default Schedules;
