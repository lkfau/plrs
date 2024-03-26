import { useEffect, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import styles from './EditSchedule.module.css'
import ScheduleItem from './ScheduleItem';
const EditScheduleModal = ({ schedule, onHide }) => {
    const [scheduleName, setScheduleName] = useState(schedule.name);
    const [scheduleItems, setScheduleItems] = useState(schedule.items);
    const [buildings, setBuildings] = useState(null);

    const saveSchedule = async() => {
        const response = await fetch('http://localhost:5000/schedules', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                schedule_id: schedule.schedule_id,
                name: scheduleName,
                items: scheduleItems
            })
        });
        const result = await response.status;
        if (result === 200) onHide();
    }

    const getBuildings = async () => {
        const response = await fetch("http://localhost:5000/buildings");
        let building_results = await response.json();
        building_results = building_results.map(building => ({ key: building.building_id, value: building.building_name }));
        setBuildings(building_results);
    }

    const changeItem = (changedItem) => {
        console.log('c', changedItem);
        setScheduleItems((currentItems) => {
            const itemIndex = currentItems.findIndex(item => item.item_id === changedItem.item_id);
            let newItems = [...currentItems];
            newItems[itemIndex] = changedItem;
            return newItems;
        });
    }

    useEffect(() => { getBuildings() }, [])

    return <Modal onHide={onHide} size='large' className={styles.main}>
        <h2>Edit Schedule</h2>
        <hr />
        <h3>General</h3>
        <div className={styles.container}>
            <p>Schedule Name:</p>
            <input type='text' value={scheduleName} onChange={(e) => setScheduleName(e.target.value)}></input>
        </div>
        <hr />
        <h3>Schedule Items</h3>
        <div>
            {scheduleItems.map(item => <ScheduleItem key={item.item_id} item={item} onChange={changeItem} buildings={buildings} />)}
        </div>
        <div className={`${styles.container} ${styles.options}`}>
            <button onClick={saveSchedule}>Save</button>
        </div>
    </Modal>
}

export default EditScheduleModal;