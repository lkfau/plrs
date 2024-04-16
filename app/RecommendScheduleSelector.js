import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { recommendButtons } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { stylesRecommend } from './Styles';

const RecommendScheduleSelector = ({ schedules, setSchedule, firstOrLastLocation, setFirstOrLastLocation }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  
  const selectScheduleHandler = (schedule_id) => {
    setSelectedSchedule(schedule_id);
    setSchedule(schedule_id);
  }

  return (
    <LinearGradient
      colors={['#ae3b54', '#284b85']}
      style={recommendButtons.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={recommendButtons.dropdownContainer}>
        <Text style={recommendButtons.txt}>Select saved schedule</Text>
        <Dropdown
        style={recommendButtons.select}
        placeholderStyle={recommendButtons.dropdownText}
        selectedTextStyle={recommendButtons.dropdownText}
        inputSearchStyle={recommendButtons.dropdownText}
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
    <Text style={recommendButtons.txt}>Would you like to park near your first or last location?</Text>
      <View style={stylesRecommend.container}>
        <TouchableOpacity
          style={[
            stylesRecommend.button,
            firstOrLastLocation === false && stylesRecommend.buttonSelected,
          ]}
          onPress={() => setFirstOrLastLocation(false)}
        >
          <Text
            style={[
              stylesRecommend.buttonText,
              firstOrLastLocation === false && stylesRecommend.buttonTextSelected,
            ]}
          >
            First Location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            stylesRecommend.button,
            firstOrLastLocation === true && stylesRecommend.buttonSelected,
          ]}
          onPress={() => setFirstOrLastLocation(true)}
        >
          <Text
            style={[
              stylesRecommend.buttonText,
              firstOrLastLocation === true && stylesRecommend.buttonTextSelected,
            ]}
          >
            Last Location
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
  
export default RecommendScheduleSelector