import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ScrollView, Modal, FlatList} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';

const Schedules = () => {
  const [locations, setLocations] = useState([]);
  const [locations2, setLocations2] = useState([]);
  const [locationsnames, setLocationsNames] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [editedLocation2, setEditedLocation2] = useState('');
  const [timeFirstLocationHour, setTimeFirstLocationHour] = useState('12');
  const [timeFirstLocationMinute, setTimeFirstLocationMinute] = useState('00');
  const [timeFirstLocationAmPm, setTimeFirstLocationAmPm] = useState('AM');
  const [modalVisible, setModalVisible] = useState(false);
  const [showFirstTimePicker, setShowFirstTimePicker] = useState(true);
  const [selectedFirstTime, setSelectedFirstTime] = useState('12:00 AM');
  const [selectedDays, setSelectedDays] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [buildingOptions, setBuildingOptions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch building data from backend
      const buildingResponse = await fetch('http://54.210.243.185/buildings');
      if (!buildingResponse.ok) {
        throw new Error('Network response was not ok');
      }
  
      const buildingData = await buildingResponse.json();
      const buildingIds = buildingData.map(building => building.building_id);
      const buildingNames = buildingData.map(building => building.building_name);
      const buildingOptions = buildingData.map(building => ({ id: building.building_id, name: building.building_name }));
  
      // Fetch schedules data from backend
      const schedulesResponse = await fetch('http://54.210.243.185/schedules?user_id=1&get_items=true');
      if (!schedulesResponse.ok) {
        throw new Error('Network response was not ok');
      }
  
      const schedulesData = await schedulesResponse.json();
  
      const transformedSchedules = schedulesData.map(schedule => ({
        id: schedule.schedule_id,
        title: schedule.name,
        items: schedule.items ? schedule.items.map(item => ({
          item_id: item.item_id,
          arrival_time: item.arrival_time,
          building_id: item.building_id
        })) : []
      }));      
  
      console.log('Transformed Schedules:', transformedSchedules);
  
      // Update state with fetched data
      setSchedules(transformedSchedules);
      setLocations(buildingIds);
      setLocations2(buildingIds);
      setLocationsNames(buildingNames);
      setBuildingOptions(buildingOptions);
  
      if (buildingNames.length > 0) {
        // Set initial location values to the first building
        setEditedLocation(buildingNames[0]);
        setEditedLocation2(buildingNames[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  const handleSchedulePress = (schedule) => {
    setSelectedSchedule(schedule);
    setEditedTitle(schedule.title);
  
    // Check if schedule.items is defined before accessing its properties
    if (schedule.items && schedule.items.length > 0) {
      setEditedLocation(schedule.items[0].building_id)
      setEditedLocation2(schedule.items[0].building_id)
    }
  
    // Check if schedule.time is defined before accessing its properties
    if (schedule.time && schedule.time.first) {
      setSelectedFirstTime(`${schedule.time.first.hour}:${schedule.time.first.minute} ${schedule.time.first.amPm}`);
      setTimeFirstLocationHour(schedule.time.first.hour);
      setTimeFirstLocationMinute(schedule.time.first.minute);
      setTimeFirstLocationAmPm(schedule.time.first.amPm);
    }
  
    // Check if schedule.selectedDays is defined before accessing its properties
    setSelectedDays(schedule.selectedDays || []);
    setModalVisible(true);
  };
  
  

  const saveScheduleToBackend = async (schedule) => {
    try {
      const response = await fetch('http://54.210.243.185/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule),
      });
      if (!response.ok) {
        throw new Error('Failed to save schedule');
      }
      const responseData = await response.text(); // Get the response as text
      console.log('Response from server:', responseData); // Log the response
      const data = JSON.parse(responseData); // Parse the response as JSON
      console.log('Schedule saved successfully:', data);
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };
  

  const deleteScheduleFromBackend = async (scheduleId) => {
    try {
      const response = await fetch(`http://54.210.243.185/schedules?schedule_id=${scheduleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete schedule: ', scheduleId);
      }
      console.log('Schedule deleted successfully. Deleting: ', scheduleId);
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };
  

  const deleteSchedule = async (scheduleId) => {
    try {
      await deleteScheduleFromBackend(scheduleId);
      setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const saveChanges = async () => {
    const militaryTimeFirstLocation = convertToMilitaryTime(timeFirstLocationHour, timeFirstLocationMinute, timeFirstLocationAmPm);
  
    const weekdaysMapping = {
      Sun: 0,
      M: 1,
      T: 2,
      W: 3,
      Th: 4,
      F: 5,
      Sat: 6,
    };
  
    const selectedWeekdays = selectedDays.map((day) => weekdaysMapping[day]);
  
    const scheduleData = 
    {
      "user_id": 1,
      "name": editedTitle,
      "items": [
        {
          "building_id": editedLocation,
          "arrival_weekdays": selectedWeekdays,
          "arrival_time": militaryTimeFirstLocation
        },
        {
          "building_id": editedLocation2,
          "arrival_weekdays": selectedWeekdays,
          "arrival_time": militaryTimeFirstLocation
        }
      ],
    };
  
    try {
      // Save the schedule to the backend
      await saveScheduleToBackend(scheduleData);
  
      // Update the schedules state after the backend call succeeds
      const newSchedules = [
        ...schedules,
        {
          "id": schedules.length + 1,
          "name": editedTitle,
          "items": [
            {
              "building_id": editedLocation,
              "arrival_weekdays": selectedWeekdays,
              "arrival_time": militaryTimeFirstLocation
            },
            {
              "building_id": editedLocation2,
              "arrival_weekdays": selectedWeekdays,
              "arrival_time": militaryTimeFirstLocation
            }
          ]
        }
      ];
  
      setSchedules(newSchedules);
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };
  

const convertToMilitaryTime = (hour, minute, amPm) => {
  let militaryHour = parseInt(hour, 10);
  if (amPm === 'PM' && militaryHour !== 12) {
    militaryHour += 12;
  } else if (amPm === 'AM' && militaryHour === 12) {
    militaryHour = 0;
  }
  const militaryTime = `${militaryHour.toString().padStart(2, '0')}:${minute}:00`;
  return militaryTime;
};

const toggleDaySelection = (day, scheduleId) => {
  setSchedules((prevSchedules) => {
    return prevSchedules.map((schedule) => {
      if (schedule.id === scheduleId) {
        const updatedSelectedDays = schedule.selectedDays?.includes(day)
          ? schedule.selectedDays.filter((selectedDay) => selectedDay !== day)
          : [...(schedule.selectedDays || []), day];
        setSelectedDays(updatedSelectedDays);
        return { ...schedule, selectedDays: updatedSelectedDays };
      }
      return schedule;
    });
  });
  setSelectedSchedule(schedules.find((schedule) => schedule.id === scheduleId));
};


  const daysOfWeek = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'Sat'];

  const renderCheckbox = (day, index) => {
    return (
      <Checkbox
        key={`${day}-${index}`} // Ensure each key is unique
        label={day}
        isChecked={selectedDays && selectedDays.includes(day)}
        onChange={() => toggleDaySelection(day, selectedSchedule.id)}
      />
    );
  };
  
  const Checkbox = ({ label, isChecked, onChange }) => {
    return (
      <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>{label}</Text>
        <View style={[styles.checkbox, isChecked && styles.checked]} />
      </TouchableOpacity>
    );
  };    

  const createSchedule = () => {
    const newSchedule = {
      id: schedules.length + 1,
      title: `Schedule ${schedules.length + 1}`,
      location: locations[0],
      location2: locations2[0],
      info: '',
      timeFirstLocationHour: '12',
      timeFirstLocationMinute: '00',
      timeFirstLocationAmPm: 'AM',
    };
    setSchedules([...schedules, newSchedule]);
  }; 

  return (
    <View>
      <Text style={{ textAlign: 'center', marginTop: 50, marginBottom:25, fontSize: 20, fontWeight: 'bold' }}>Schedules</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {schedules.map((schedule) => (
      <View key={schedule.id}>
        <TouchableOpacity
          style={styles.schedule}
          onPress={() => handleSchedulePress(schedule)}
        >
          <Text style={styles.title}>{schedule.title}</Text>
          {/* Render each schedule's items */}
          {schedule.items?.map((item, index) => (
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
      ))}
        <TouchableOpacity style={styles.addButton} onPress={createSchedule}>
          <Text style={styles.addButtonText}>Create Schedule</Text>
        </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
    <View style={styles.modalContainer}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.modalContent}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <TextInput
                style={styles.modalTextInput}
                placeholder="Enter title"
                value={editedTitle}
                onChangeText={setEditedTitle}
              />
              <View style={{ marginBottom: 8 }}>

              <View>
                <View style={styles.container}>
                  {daysOfWeek.map((day) => (
                    <View key={day} style={styles.columnContainer}>
                      {renderCheckbox(day)}
                    </View>
                  ))}
                </View>
              </View>
              </View>
              <View style={{ marginBottom: 8 }}>
              <Text style={{marginLeft: 8, marginBottom: 5}}>What is your first building? </Text>
              
                <ModalDropdown
                  options={locationsnames}
                  defaultValue={buildingOptions.find(option => option.id === editedLocation)?.name || 'Select Building'}
                  onSelect={(index) => setEditedLocation(buildingOptions[index].id)}
                  style={styles.dropdown}
                  dropdownStyle={styles.dropdownMenu}
                  textStyle={styles.dropdownText}
                  dropdownTextStyle={styles.dropdownOptionText}
                />              
              </View>
              {showFirstTimePicker && (
                <View>
                  <View style={styles.timePickerContainer}>
                    <Picker
                      style={styles.timePicker}
                      selectedValue={timeFirstLocationHour}
                      onValueChange={(itemValue) => setTimeFirstLocationHour(itemValue)}
                    >
                      {Array.from(Array(12).keys()).map((hour) => (
                        <Picker.Item key={hour} label={`${hour + 1}`} value={`${hour + 1}`} />
                      ))}
                    </Picker>
                    <Picker
                      style={styles.timePicker}
                      selectedValue={timeFirstLocationMinute}
                      onValueChange={(itemValue) => setTimeFirstLocationMinute(itemValue)}
                    >
                      {Array.from(Array(60).keys()).map((minute) => (
                        <Picker.Item key={minute} label={`${minute < 10 ? '0' + minute : minute}`} value={`${minute < 10 ? '0' + minute : minute}`} />
                      ))}
                    </Picker>
                    <Picker
                      style={styles.timePicker}
                      selectedValue={timeFirstLocationAmPm}
                      onValueChange={(itemValue) => setTimeFirstLocationAmPm(itemValue)}
                    >
                      <Picker.Item label="AM" value="AM" />
                      <Picker.Item label="PM" value="PM" />
                    </Picker>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={[styles.setButton, { padding: 8, width: 60, marginBottom: 8 }]}
                      onPress={() => {
                        setShowFirstTimePicker(false);
                        setSelectedFirstTime(`${timeFirstLocationHour}:${timeFirstLocationMinute} ${timeFirstLocationAmPm}`);
                      }}
                    >
                      <Text style={styles.setButtonText}>Set</Text>
                    </TouchableOpacity>
                  </View>              
                </View>
              )}
              {selectedFirstTime !== '' && (
                <Text style={{marginLeft: 8}}>Class Start Time: {selectedFirstTime}</Text>
              )}
              {!showFirstTimePicker && (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <TouchableOpacity
                    style={[styles.setButton, { padding: 8, width: 70, marginBottom: 10 }]}
                    onPress={() => setShowFirstTimePicker(true)}
                  >
                    <Text style={styles.setButtonText}>Change</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{ marginBottom: 8 }}>
              <Text style={{marginLeft: 8, marginBottom: 5}}>What is your last building? </Text>
                <ModalDropdown
                  options={locationsnames}
                  defaultValue={buildingOptions.find(option => option.id === editedLocation)?.name || 'Select Building'}
                  onSelect={(index) => setEditedLocation2(buildingOptions[index].id)}
                  style={styles.dropdown}
                  dropdownStyle={styles.dropdownMenu}
                  textStyle={styles.dropdownText}
                  dropdownTextStyle={styles.dropdownOptionText}
                />
              </View>
              <View>
                  <View>
                      <Text style={styles.setButtonText}>Set</Text>
                  </View>
              <TouchableOpacity style={styles.setButton} onPress={saveChanges}>
                <Text style={styles.setButtonText}>Save</Text>
              </TouchableOpacity>
            </View>         
            </ScrollView>
            </View>
        </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>
      </Modal> 
      </ScrollView>
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
    width: 350, // Adjust the width of the modalmarginTop: '10%', // Adjust the marginTop to move the modal down
    marginLeft: '50%',
    marginRight: '50%',
    marginTop: 50,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timePicker: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  dropdownMenu: {
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  setButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  setButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  checked: {
    backgroundColor: 'green',
  },
  columnContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dayText: {
    marginBottom: 5,
  },
});

export default Schedules;