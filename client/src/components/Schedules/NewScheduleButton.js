import { useState } from 'react';
import styles from './SchedulePanel.module.css';
import AddEditScheduleModal from '../EditSchedule/AddEditScheduleModal';

const NewScheduleButton = ({ onSave }) => {
    const [addOpen, setAddOpen] = useState(false);
    const toggleEditModal = () => {
        setAddOpen(f => !f);
        onSave();
    }   
    return <>
        {addOpen && <AddEditScheduleModal onHide={toggleEditModal} />}
        <div className={`${styles.container} ${styles.addContainer}`} onClick={() => setAddOpen(true)}> 
            <h2>+</h2>
            <p>Add schedule</p>
        </div>
    </>

}

export default NewScheduleButton;