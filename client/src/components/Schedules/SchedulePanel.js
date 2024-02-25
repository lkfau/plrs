import { useState } from 'react';
import AddEditScheduleModal from '../EditSchedule/AddEditScheduleModal';
import ScheduleDisplay from '../UI/ScheduleDisplay/ScheduleDisplay';
import Button from '../UI/Button/Button';
import styles from './SchedulePanel.module.css';

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
                <Button onClick={toggleEditModal}>Edit</Button>
                <Button onClick={onDelete}>Delete</Button>
            </div>
        </div>
    </>

}

export default SchedulePanel;