import { useContext, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DataContext from './context/data-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from './UI/Checkbox';
import weekdays from './data/weekdays.json';

const ScheduleItem = ({ item, onChange, onDelete }) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const testDate = useMemo(() => new Date(), []);
  const ctx = useContext(DataContext);

  const toggleWeekday = (weekdayIndex) => {
    onChange(prevItem => {
      let newWeekdays = [...prevItem.arrival_weekdays];

      if (newWeekdays.includes(weekdayIndex))
        newWeekdays.splice(newWeekdays.indexOf(weekdayIndex), 1);
      else
        newWeekdays.push(weekdayIndex);
      newWeekdays.sort();
      return {
        ...prevItem,
        arrival_weekdays: newWeekdays
      }
    })
  }

  const setBuilding = (building_id) => {
    onChange(prevItem => ({
      ...prevItem,
      building_id: building_id
    }));
  }

  const setTime = (e, time) => {
    setShowTimePicker(false);
    if (e.type === 'set') {
      onChange(prevItem => ({
        ...prevItem,
        arrival_time: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:00`
      }));
    }
  }

  const displayTime = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    return `${parseInt(hours) && parseInt(hours) != 12 ? parseInt(hours) % 12 : 12
      }:${minutes.toString().padStart(2, '0')
      } ${hours >= 12 ? 'pm' : 'am'
      }`
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}><Ionicons name="close" size={16}/></Text>
        </TouchableOpacity>
        <View>
          <Dropdown
            style={[styles.select]}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            inputSearchStyle={styles.dropdownText}
            data={ctx.buildings}
            search
            maxHeight={300}
            labelField="building_name"
            valueField="building_id"
            placeholder={'Select item'}
            searchPlaceholder="Search..."
            value={item.building_id}
            onChange={item => setBuilding(item.building_id)}
          />
        </View>
        
        <View style={styles.flexContainer}>
          <TouchableOpacity
            style={[styles.select, styles.timeSelect]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>{displayTime(item.arrival_time)}</Text>
          </TouchableOpacity>
          <View style={styles.weekdayContainer}>
            {weekdays.map((day, index) => (
              <View key={index} style={styles.weekdayOption}>
                <Checkbox
                  key={index} // Ensure each key is unique
                  label={day[0]}
                  isChecked={item.arrival_weekdays.includes(index)}
                  onChange={() => toggleWeekday(index)}
                />
              </View>
            ))}
          </View>
        </View>
        {showTimePicker && <DateTimePicker
          value={testDate}
          mode="time"
          onChange={setTime}
        />}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  weekdayContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekdayOption: {
    alignItems: 'center',
    marginHorizontal: 1
  },
  flexContainer: {
    flexDirection: "row",
    gap: 20,
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    transform: [
      { translateX: 10 },
      { translateY: -10 }
    ],
    zIndex: 1,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#f44',
  },
  deleteButtonText: {
    color: 'white'
  },
  select: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    padding: 8,
  },
  timeSelect: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
})

export default ScheduleItem;