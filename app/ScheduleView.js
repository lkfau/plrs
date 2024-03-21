import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { stylesScheduleview } from './Styles';

const ScheduleView = ({ schedule, onPress, onDelete }) => {
  return (
    <View key={schedule.id}>
    <TouchableOpacity
      style={stylesScheduleview.schedule}
      onPress={() => onPress(schedule)}
    >
      <Text style={stylesScheduleview.title}>{schedule.name}</Text>
      {schedule.items.map((item, index) => (
        <View key={index}>
          <Text>Arrival Time: {item.arrival_time}</Text>
          <Text>Building ID: {item.building_id}</Text>
        </View>
      ))}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(schedule.schedule_id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleView;