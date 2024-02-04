import { useState } from 'react';
import styles from './SchedulePanel.module.css';
import EditScheduleModal from './EditSchedule/EditScheduleModal';
import weekdays from '../assets/weekdays.json'

const SchedulePanel = ({ schedule, onSave }) => {
    const [editOpen, setEditOpen] = useState(false);
    const toggleEditModal = () => {
        setEditOpen(f => !f);
        onSave();
    }

    function getNumWeekdayItems(weekday_index) {
        return schedule.items.filter(item => item.arrival_weekdays.includes(weekday_index)).length
    }

    return <>
        {editOpen && <EditScheduleModal schedule={schedule} onHide={toggleEditModal} />}
        <div className={styles.container}>
            <h3>{schedule.name}</h3>
            <hr />
            <ul className={styles.weekdays}>
                {weekdays.map((day, index) => <li key={index} className={getNumWeekdayItems(index) ? '' : styles.muted}>
                    {day}: {getNumWeekdayItems(index)} place{getNumWeekdayItems(index) !== 1 ? 's' : ''}
                </li>
                )}
            </ul>
            <div className={styles.options}>
                <button onClick={toggleEditModal}>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    </>

}

export default SchedulePanel;