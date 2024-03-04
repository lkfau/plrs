import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ScheduleView = ({ schedule, onPress }) => {
  return (
    <View key={schedule.id}>
    <TouchableOpacity
      style={styles.schedule}
      onPress={() => onPress(schedule)}
    >
      <Text style={styles.title}>{schedule.name}</Text>
      {schedule.items.map((item, index) => (
        <View key={index}>
          <Text>Arrival Time: {item.arrival_time}</Text>
          <Text>Building ID: {item.building_id}</Text>
        </View>
      ))}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteSchedule(schedule.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  schedule: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black'
  },
});

export default ScheduleView;