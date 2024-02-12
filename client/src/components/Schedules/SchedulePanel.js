import { useState } from 'react';
import styles from './SchedulePanel.module.css';
import EditScheduleModal from '../EditSchedule/EditScheduleModal';
import ScheduleDisplay from '../UI/ScheduleDisplay/ScheduleDisplay';

const SchedulePanel = ({ schedule, onSave }) => {
    const [editOpen, setEditOpen] = useState(false);
    const toggleEditModal = () => {
        setEditOpen(f => !f);
        onSave();
    }

    return <>
        {editOpen && <EditScheduleModal schedule={schedule} onHide={toggleEditModal} />}
        <div className={styles.container}>
            <h1>{schedule.name}</h1>
            <ScheduleDisplay schedule={schedule} />
            <div className={styles.options}>
                <button onClick={toggleEditModal}>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    </>

}

export default SchedulePanel;