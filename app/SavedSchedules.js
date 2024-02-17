import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'; // Import the dropdown component
import { useNavigation } from '@react-navigation/native';

const locations = [
  "Administration Building",
  "Alexander D. Henderson University School",
  "Alexander D. Henderson Classroom 2",
  "Alexander D. Henderson University School Gymnasium",
  // Add more locations here...
];

const Schedules = () => {
  const navigation = useNavigation();

  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedLocation, setEditedLocation] = useState(locations[0]);

  useEffect(() => {
    // Add initial schedule when component mounts
    setSchedules([{ id: 1, title: 'Schedule 1', location: locations[0], info: '' }]);
  }, []);

  const handleSchedulePress = (schedule) => {
    setSelectedSchedule(schedule);
    setEditedTitle(schedule.title);
    setEditedLocation(schedule.location);
  };

  const saveChanges = () => {
    setSchedules(schedules.map(schedule =>
      schedule.id === selectedSchedule.id
        ? { ...schedule, title: editedTitle, location: editedLocation }
        : schedule
    ));
    setSelectedSchedule(null);
  };

  const createSchedule = () => {
    const newSchedule = {
      id: schedules.length + 1,
      title: `Schedule ${schedules.length + 1}`,
      location: locations[0], // Default location
      info: '',
    };
    setSchedules([...schedules, newSchedule]);
  };

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
    },
    addButton: {
      backgroundColor: 'blue',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      width: 200,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
    },
    modalTextInput: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
    },
  });

  return (
    <View>
      <Text style={{ textAlign: 'center', marginTop: 50, marginBottom:25, fontSize: 20, fontWeight: 'bold' }}>Schedules</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {schedules.map((schedule) => (
          <TouchableOpacity
            key={schedule.id}
            style={styles.schedule}
            onPress={() => handleSchedulePress(schedule)}
          >
            {selectedSchedule && selectedSchedule.id === schedule.id ? (
              <View>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="Enter title"
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                />
                <ModalDropdown
                  options={locations}
                  defaultValue={editedLocation}
                  onSelect={(index, value) => setEditedLocation(value)}
                />
                <TouchableOpacity onPress={saveChanges}>
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.title}>{schedule.title}</Text>
                <Text>{schedule.location}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={createSchedule}>
          <Text style={styles.addButtonText}>Create Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default Schedules;
