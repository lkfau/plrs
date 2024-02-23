import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown'; // Import the dropdown component
import { useNavigation } from '@react-navigation/native';

const Schedules = () => {
  const navigation = useNavigation();

  const [locations, setLocations] = useState([]);
  const [locations2, setLocations2] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedLocation, setEditedLocation] = useState(locations[0]);
  const [editedLocation2, setEditedLocation2] = useState(locations2[0]);

  useEffect(() => {
    // Add initial schedule when component mounts
    setSchedules([{ id: 1, title: 'Schedule 1', location: locations[0], location2: locations2[0], info: '' }]);
    fetchData();
  }, []);

  async function fetchData() {
    try {
        const response = await fetch('http://54.210.243.185/buildings');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const buildingNames = data.map(building => building.building_name);
        // Update the state with fetched building names
        setLocations(buildingNames);
        setLocations2(buildingNames); // Assuming locations2 is also fetched similarly

        // Set default values for editedLocation and editedLocation2 once data is fetched
        if (buildingNames.length > 0) {
          setEditedLocation(buildingNames[0]);
          setEditedLocation2(buildingNames[0]);
        }

        return data; // Return the result if you need to further manipulate it    
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error if needed
    }
}


  const handleSchedulePress = (schedule) => {
    setSelectedSchedule(schedule);
    setEditedTitle(schedule.title);
    setEditedLocation(schedule.location);
    setEditedLocation2(schedule.location2);
  };

  const saveChanges = () => {
    setSchedules(schedules.map(schedule =>
      schedule.id === selectedSchedule.id
        ? { ...schedule, title: editedTitle, location: editedLocation, location2: editedLocation2 }
        : schedule
    ));
    setSelectedSchedule(null);
  };

  const createSchedule = () => {
    const newSchedule = {
      id: schedules.length + 1,
      title: `Schedule ${schedules.length + 1}`,
      location: locations[0], // Default location
      location2: locations2[0],
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
                <ModalDropdown
                  options={locations2}
                  defaultValue={editedLocation2}
                  onSelect={(index, value) => setEditedLocation2(value)}
                />
                <TouchableOpacity onPress={saveChanges}>
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.title}>{schedule.title}</Text>
                <Text>{schedule.location}</Text>
                <Text>{schedule.location2}</Text>
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
