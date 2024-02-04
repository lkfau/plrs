import weekdays from '../../../assets/weekdays.json';
import styles from './WeekdayInput.module.css';

const WeekdayInput = ({ value, onChange }) => {
    const toggleWeekday = (weekday) => {
        let newWeekdays = [...value];
            
        if (newWeekdays.includes(weekday))
            newWeekdays.splice(newWeekdays.indexOf(weekday), 1);
        else
            newWeekdays.push(weekday);
        onChange(newWeekdays);
    }

    return <div className={styles.container}>
        {weekdays.map((weekday, index) => 
            <div key={index} className={value.includes(index) ? styles.selected : ""} onClick={() => toggleWeekday(index)}>
                {weekday[0]}
            </div>
        )}
    </div>
}

export default WeekdayInput;