import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const RecommendScheduleSelector = ({ schedules, onSelect }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  
  const selectScheduleHandler = (schedule_id) => {
    setSelectedSchedule(schedule_id);
    onSelect(schedule_id);
  }

  return (
    <View>
      <Text style={{ textAlign: 'center', padding: 25 }}>Select saved schedule</Text>
      <Dropdown
        style={styles.select}
        placeholderStyle={styles.dropdownText}
        selectedTextStyle={styles.dropdownText}
        inputSearchStyle={styles.dropdownText}
        data={schedules}
        search
        maxHeight={300}
        labelField="name"
        valueField="schedule_id"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={selectedSchedule}
        onChange={item => selectScheduleHandler(item.schedule_id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  select: {
    borderColor: 'gray',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    padding: 8,
  },
  dropdownText: {
    fontSize: 16,
  }
});
  
export default RecommendScheduleSelector
