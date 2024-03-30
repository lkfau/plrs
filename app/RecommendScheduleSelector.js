import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { stylesScheduleselector } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';


const RecommendScheduleSelector = ({ schedules, onSelect }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  
  const selectScheduleHandler = (schedule_id) => {
    setSelectedSchedule(schedule_id);
    onSelect(schedule_id);
  }

  return (
    <LinearGradient
      colors={['#ae3b54', '#284b85']}
      style={stylesScheduleselector.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={stylesScheduleselector.dropdownContainer}>
        <Text style={stylesScheduleselector.txt}>Select saved schedule</Text>
        <Dropdown
        style={stylesScheduleselector.select}
        placeholderStyle={stylesScheduleselector.dropdownText}
        selectedTextStyle={stylesScheduleselector.dropdownText}
        inputSearchStyle={stylesScheduleselector.dropdownText}
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
    </LinearGradient>
  );
}
  
export default RecommendScheduleSelector