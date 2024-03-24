import { useContext, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DataContext from './context/data-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from './UI/Checkbox';
import weekdays from './data/weekdays.json';
import { stylesScheduleitem, buttonDelete } from './Styles';

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
      <View style={stylesScheduleitem.container}>
        <TouchableOpacity style={styles.delete} onPress={onDelete}>
          <Text style={styles.deleteIcon}><Ionicons name="close" size={16}/></Text>
        </TouchableOpacity>
        <View>
          <Dropdown
            style={[stylesScheduleitem.select]}
            placeholderStyle={stylesScheduleitem.dropdownText}
            selectedTextStyle={stylesScheduleitem.dropdownText}
            inputSearchStyle={stylesScheduleitem.dropdownText}
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
        
        <View style={stylesScheduleitem.flexContainer}>
          <TouchableOpacity
            style={[stylesScheduleitem.select, stylesScheduleitem.timeSelect]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>{displayTime(item.arrival_time)}</Text>
          </TouchableOpacity>
          <View style={stylesScheduleitem.weekdayContainer}>
            {weekdays.map((day, index) => (
              <View key={index} style={stylesScheduleitem.weekdayOption}>
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
};

const styles = StyleSheet.create({
  delete: {
    ...buttonDelete.container,
    transform: [
      { translateX: 10 },
      { translateY: -10 }
    ]
  },
  deleteIcon: buttonDelete.icon
});

export default ScheduleItem;