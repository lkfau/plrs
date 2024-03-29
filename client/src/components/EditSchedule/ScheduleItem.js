import styles from './EditSchedule.module.css'
import Dropdown from '../UI/Dropdown/Dropdown';
import WeekdayInput from '../UI/WeekdayInput/WeekdayInput';
import Button from '../UI/Button/Button';

const ScheduleItem = ({ item, onChange, onDelete, buildings }) => {
    const changeBuilding = (newBuilding) => {
        const newItem = { ...item, building_id: newBuilding }
        onChange(newItem);
    }

    const changeTime = (event) => {
        const newItem = { ...item, arrival_time: event.target.value + ":00"}
        onChange(newItem);
    }

    const changeWeekdays = (newWeekdays) => {
        const newItem = { ...item, arrival_weekdays: newWeekdays };
        onChange(newItem);
    }

    return  <div key={item.item_id} className={styles.item}>
        {buildings && <div className={styles.container}>
            <p>Building:</p>
            <Dropdown data={buildings} defaultValue={item.building_id} onSelect={changeBuilding} />
        </div>}
        <div className={styles.container}>
            <div className={styles.container}>
            <p>Time:</p>
            <input type="time" value={item.arrival_time} onChange={changeTime} ></input>
            </div>
            
            <div className={styles.weekdays}>
                <p>Weekdays:</p>
                <WeekdayInput value={item.arrival_weekdays} onChange={changeWeekdays}/>
              
            </div>
            <Button color="danger" style={{maxWidth: 'fit-content'}} onClick={onDelete}>X</Button>
        </div>
    </div>
}

export default ScheduleItem;