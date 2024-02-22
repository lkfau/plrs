import { useState } from 'react';
import styles from './SchedulePanel.module.css';
import AddEditScheduleModal from '../EditSchedule/AddEditScheduleModal';
import ScheduleDisplay from '../UI/ScheduleDisplay/ScheduleDisplay';

const SchedulePanel = ({ schedule, onSave, onDelete }) => {
    const [editOpen, setEditOpen] = useState(false);
    const toggleEditModal = () => {
        setEditOpen(f => !f);
        onSave();
    }

    return <>
        {editOpen && <AddEditScheduleModal schedule={schedule} onHide={toggleEditModal} />}
        <div className={styles.container}>
            <h2>{schedule.name}</h2>
            <ScheduleDisplay schedule={schedule} />
            <div className={styles.options}>
                <button onClick={toggleEditModal}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    </>

}

export default SchedulePanel;