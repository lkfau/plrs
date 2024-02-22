import { useState, useEffect } from 'react';

import weekdays from '../../../assets/weekdays.json';
import colors from '../../../assets/colors.json';
import styles from './ScheduleDisplay.module.css';

const ScheduleDisplay = ({ schedule }) => {
    const [scheduleInterval, setScheduleInterval] = useState([0, 235959]);

    const itemPosition = (item) => {
        const time = parseInt(item.arrival_time.replaceAll(':', '')), minTime = scheduleInterval[0], maxTime = scheduleInterval[1];
        return ((time - minTime) / (maxTime - minTime) * 100).toString() + '%';
    }

    const scheduleItemsOnLine = (weekday) => {
        return schedule.items.filter(item => item.arrival_weekdays.includes(weekday))
    }

    const formatTime = (time) => {
        const [hours, minutes, seconds] = time.split(':');
        const am = hours <= 12;
        return `${hours%12}:${minutes}${seconds !== '00' ? (':' + seconds) : ''} ${am ? 'a.m.' : 'p.m.'}`

    }
    useEffect(() => {
        const calculateInterval = () => {
            let minTime = 240000, maxTime = 0;
            schedule.items.forEach((item) => {
                let arrivalTimeInteger = parseInt(item.arrival_time.replaceAll(':', ''))
                minTime = Math.min(minTime, arrivalTimeInteger);
                maxTime = Math.max(maxTime, arrivalTimeInteger);
            })
            minTime -= Math.max((maxTime - minTime) / 8, 1)
            maxTime += Math.max((maxTime - minTime) / 8, 1)
            if (maxTime > minTime) setScheduleInterval([minTime, maxTime]);
        }
    
        const attachColors = () => {
            schedule.items = schedule.items.map((item, index) => ({
                ...item, 
                color: colors[index]
            }));
        }

        calculateInterval();
        attachColors();
    }, [schedule])

    return <div>
        {weekdays.map((weekday, index) => <div key={weekday} className={styles.row}>
            <div className={styles.initial}><p>{weekday[0]}</p></div>
            <div className={styles.display}>
                <div className={styles.line}></div>
                {scheduleItemsOnLine(index).map(item => 
                    <div key={item.item_id} 
                         style={{ left: itemPosition(item), backgroundColor: item.color }} 
                         className={styles.lineItem}>
                        <div style={{ backgroundColor: item.color }} className={styles.lineItemDetailed}>{formatTime(item.arrival_time)}</div>
                    </div>)}
            </div>
        </div>)}
    </div>
}

export default ScheduleDisplay;