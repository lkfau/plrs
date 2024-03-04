import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DataContext from './context/data-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import Checkbox from './UI/Checkbox';
import weekdays from './data/weekdays.json';

const ScheduleModalItem = ({ item, onChange, onDelete }) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [testDate, setTestDate] = useState(new Date());
  const ctx = useContext(DataContext);
  const toggleWeekday = (weekdayIndex) => {
    onChange(prevItem => {
      let newWeekdays = prevItem.arrival_weekdays;

      if (newWeekdays.includes(weekdayIndex))
        newWeekdays.splice(newWeekdays.indexOf(weekdayIndex), 1);
      else
        newWeekdays.push(weekdayIndex);
      newWeekdays.sort();
      return {
        ...item,
        arrival_weekdays: newWeekdays
      }
    })
  }

  const setBuilding = (building_id) => {
    onChange(prevItem => ({
      ...prevItem,
      building: building_id
    }));
  }

  const setTime = (e, time) => {
    setShowTimePicker(false);
    if (e.type === 'set') {
      onChange(prevItem => ({
        ...prevItem,
        arrival_time: `${time.getHours()}:${time.getMinutes()}:00`
      }));
    }
    
  }

  const displayTime = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    return `${
        parseInt(hours) && parseInt(hours) != 12 ? parseInt(hours)%12 : 12
      }:${
        minutes.toString().padStart(2, '0')
      } ${
        hours >= 12 ? 'pm' : 'am'
      }`
  }

  const renderBuildingDropdownOption = (building) => <Text style={styles.dropdownOptionText}>{building.building_name}</Text>;

  
  return (
    <View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      />
      <View style={{ marginVertical: 8 }}>
        <ModalDropdown
          options={ctx.buildings}
          defaultIndex={0}
          renderRow={renderBuildingDropdownOption}
          renderButtonText={renderBuildingDropdownOption}
          defaultValue={ctx.buildings.find(building => building.building_id == item.building_id).building_name || "Select a building..."}
          onSelect={(value) => setBuilding(value.building_id)}
          style={styles.dropdown}
          textStyle={styles.controlText}
          adjustFrame={(obj) => ({...obj, width: 300})}
        />              
      </View>
      <View style={styles.flexContainer}>
        <TouchableOpacity
        style={styles.dropdown}
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
    paddingVertical: 16
  },
  dropdown: {
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    padding: 8,
    justifyContent: "center"
  },
  controlText: {
    fontSize: 16,
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdayOption: {
    alignItems: 'center',
    marginHorizontal: 1,
  },
  flexContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    marginBottom: 16
  }
})

export default ScheduleModalItem;