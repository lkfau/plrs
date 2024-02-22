import { useContext, useEffect, useState } from 'react';
import AuthContext from "../../context/auth-context";
import ScheduleItem from './ScheduleItem';
import Modal from '../UI/Modal/Modal';
import styles from './EditSchedule.module.css'

const AddEditScheduleModal = ({ schedule, onHide }) => {
    const [scheduleName, setScheduleName] = useState(schedule.name || "");
    const [scheduleItems, setScheduleItems] = useState(schedule.items);
    const [buildings, setBuildings] = useState(null);
    const [saveResult, setSaveResult] = useState(null);
    const ctx = useContext(AuthContext);

    const saveSchedule = async () => {       
        const response = await fetch('http://localhost:5000/schedules', {
            method: schedule.schedule_id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schedule.schedule_id ? {
                schedule_id: schedule.schedule_id,
                name: scheduleName,
                items: scheduleItems
            } : {
                user_id: ctx.user_id,
                name: scheduleName,
                items: scheduleItems
            })
        });
        setSaveResult(response.status);
    }

    const getBuildings = async () => {
        const response = await fetch("http://localhost:5000/buildings");
        let building_results = await response.json();
        building_results = building_results.map(building => ({ key: building.building_id, value: building.building_name }));
        setBuildings(building_results);
    }

    const addItem = () => {
        setScheduleItems((currentItems) => [
            ...currentItems,
            {
                building_id: null,
                arrival_time: "08:00:00",
                arrival_weekdays: []
            }
        ]);
    }

    const changeItem = (changedItem, changedIndex) => {
        setScheduleItems((currentItems) => {
            let newItems = [...currentItems];
            newItems[changedIndex] = changedItem;
            return newItems;
        });
    }

    const deleteItem = (index) => {
        setScheduleItems(currentItems => {
            let newItems = [...currentItems];
            newItems.splice(index, 1);
            return newItems;
        });
    }

    useEffect(() => { 
        getBuildings();
        if (schedule.schedule_id === undefined) {
            addItem();
        }
     }, [schedule.schedule_id])

    return <Modal onHide={onHide} hidden={saveResult} size='large' className={styles.main}>
        <h2>{schedule.schedule_id ? 'Edit' : 'Add'} Schedule</h2>
        <hr />
        <h3>General</h3>
        <div className={styles.container}>
            <p>Schedule Name:</p>
            <input type='text' value={scheduleName} onChange={(e) => setScheduleName(e.target.value)}></input>
        </div>
        <hr />
        <h3>Schedule Items</h3>
        <div>
            {scheduleItems.map((item, index) =>
                <ScheduleItem
                    key={index}
                    item={item}
                    onChange={(item) => changeItem(item, index)}
                    onDelete={() => deleteItem(index)}
                    buildings={buildings}
                />)}
            
        </div>
        <div className={`${styles.container} ${styles.options}`}>
            <button className={styles.button} onClick={addItem}>+ Add Item</button>
            <button onClick={saveSchedule}>Save</button>
        </div>

    </Modal>
}

export default AddEditScheduleModal;