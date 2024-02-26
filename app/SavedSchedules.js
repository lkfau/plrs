import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Picker} from '@react-native-picker/picker';


const Schedules = () => {
  const [locations, setLocations] = useState([]);
  const [locations2, setLocations2] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedLocation, setEditedLocation] = useState(locations[0]);
  const [editedLocation2, setEditedLocation2] = useState(locations2[0]);
  const [timeFirstLocationHour, setTimeFirstLocationHour] = useState('12');
  const [timeFirstLocationMinute, setTimeFirstLocationMinute] = useState('00');
  const [timeFirstLocationAmPm, setTimeFirstLocationAmPm] = useState('AM');
  const [timeSecondLocationHour, setTimeSecondLocationHour] = useState('12');
  const [timeSecondLocationMinute, setTimeSecondLocationMinute] = useState('00');
  const [timeSecondLocationAmPm, setTimeSecondLocationAmPm] = useState('AM');
  const [modalVisible, setModalVisible] = useState(false);
  const [showFirstTimePicker, setShowFirstTimePicker] = useState(true);
  const [showSecondTimePicker, setShowSecondTimePicker] = useState(true);
  const [selectedFirstTime, setSelectedFirstTime] = useState('12:00 AM');
  const [selectedSecondTime, setSelectedSecondTime] = useState('12:00 AM');
  const [selectedDays, setSelectedDays] = useState([]);
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: 'Schedule 1',
      location: locations[0],
      location2: locations2[0],
      info: '',
      time: {
        first: {
          hour: '12',
          minute: '00',
          amPm: 'AM',
        },
        second: {
          hour: '12',
          minute: '00',
          amPm: 'AM',
        },
      },
      selectedFirstTime: '12:00 AM',
      selectedSecondTime: '12:00 AM',
      selectedDays: [],
    },
  ]);

  useEffect(() => {
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
        setLocations(buildingNames);
        setLocations2(buildingNames);

        if (buildingNames.length > 0) {
          setEditedLocation(buildingNames[0]);
          setEditedLocation2(buildingNames[0]);
        }

        setSchedules([{ 
          id: 1, 
          title: 'Schedule 1', 
          location: buildingNames[0], 
          location2: buildingNames[0], 
          info: '', 
          timeFirstLocationHour: '12',
          timeFirstLocationMinute: '00',
          timeFirstLocationAmPm: 'AM',
          timeSecondLocationHour: '12',
          timeSecondLocationMinute: '00',
          timeSecondLocationAmPm: 'AM',
        }]);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const handleSchedulePress = (schedule) => {
  setSelectedSchedule(schedule);
  setEditedTitle(schedule.title);
  setEditedLocation(schedule.location);
  setEditedLocation2(schedule.location2);
  setSelectedDays(schedule.setSelectedDays);
  if (schedule.time && schedule.time.first) {
    setSelectedFirstTime(`${schedule.time.first.hour}:${schedule.time.first.minute} ${schedule.time.first.amPm}`);
    setTimeFirstLocationHour(schedule.time.first.hour);
    setTimeFirstLocationMinute(schedule.time.first.minute);
    setTimeFirstLocationAmPm(schedule.time.first.amPm);    
  }
  if (schedule.time && schedule.time.second) {    
    setSelectedSecondTime(`${schedule.time.second.hour}:${schedule.time.second.minute} ${schedule.time.second.amPm}`);
    setTimeSecondLocationHour(schedule.time.second.hour);
    setTimeSecondLocationMinute(schedule.time.second.minute);
    setTimeSecondLocationAmPm(schedule.time.second.amPm);
  }

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

const saveChanges = async () => {

  const militaryTimeFirstLocation = convertToMilitaryTime(timeFirstLocationHour, timeFirstLocationMinute, timeFirstLocationAmPm);
  // Convert second location time to military time
  const militaryTimeSecondLocation = convertToMilitaryTime(timeSecondLocationHour, timeSecondLocationMinute, timeSecondLocationAmPm);

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

  const scheduleData = {
    user_id: 1,
    name: editedTitle,
    items: [
      {
        building_id: editedLocation,
        arrival_weekdays: selectedWeekdays,
        arrival_time: militaryTimeFirstLocation
      }
    ]
  };

  try {
    // Save the schedule to the backend
    await saveScheduleToBackend(scheduleData);

    // Update the schedules state after the backend call succeeds
    const newSchedules = [
      ...schedules,
      {
        id: schedules.length + 1,
        title: editedTitle,
        location: editedLocation,
        location2: editedLocation2,
        time: {
          first: {
            hour: timeFirstLocationHour,
            minute: timeFirstLocationMinute,
            amPm: timeFirstLocationAmPm
          },
          second: {
            hour: timeSecondLocationHour,
            minute: timeSecondLocationMinute,
            amPm: timeSecondLocationAmPm
          }
        },
        selectedFirstTime: `${timeFirstLocationHour}:${timeFirstLocationMinute} ${timeFirstLocationAmPm}`,
        selectedSecondTime: `${timeSecondLocationHour}:${timeSecondLocationMinute} ${timeSecondLocationAmPm}`,
        selectedDays: selectedDays
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
          const updatedSelectedDays = (schedule.selectedDays?.includes(day) ? 
                                        schedule.selectedDays.filter((selectedDay) => selectedDay !== day) :
                                        [...(schedule.selectedDays || []), day]);
          // Update selectedDays directly
          setSelectedDays(updatedSelectedDays);
          return { ...schedule, selectedDays: updatedSelectedDays };
        }
        return schedule;
      });
    });
  };
  

  const daysOfWeek = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'Sat'];

  const renderCheckbox = (day) => {
    return (
      <Checkbox
        key={day}
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
      timeSecondLocationHour: '12',
      timeSecondLocationMinute: '00',
      timeSecondLocationAmPm: 'AM',
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
            <Text style={styles.title}>{schedule.title}</Text>
            <Text>{schedule.location}</Text>
            <Text>{schedule.location2}</Text>
          </TouchableOpacity>
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
        <View style={styles.modalContainer}>
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
                  options={locations}
                  defaultValue={editedLocation}
                  onSelect={(value, buildingName) => setEditedLocation(buildingName)}
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
                  options={locations2}
                  defaultValue={editedLocation2}
                  onSelect={(value, buildingName) => setEditedLocation2(buildingName)}
                  style={styles.dropdown}
                  dropdownStyle={styles.dropdownMenu}
                  textStyle={styles.dropdownText}
                  dropdownTextStyle={styles.dropdownOptionText}
                />
              </View>
              {showSecondTimePicker && (
                <View>
                  <View style={styles.timePickerContainer}>
                    <Picker
                      style={styles.timePicker}
                      selectedValue={timeSecondLocationHour}
                      onValueChange={(itemValue) => setTimeSecondLocationHour(itemValue)}
                    >
                      {Array.from(Array(12).keys()).map((hour) => (
                        <Picker.Item key={hour} label={`${hour + 1}`} value={`${hour + 1}`} />
                      ))}
                    </Picker>
                    <Picker
                      style={styles.timePicker}
                      selectedValue={timeSecondLocationMinute}
                      onValueChange={(itemValue) => setTimeSecondLocationMinute(itemValue)}
                    >
                      {Array.from(Array(60).keys()).map((minute) => (
                        <Picker.Item key={minute} label={`${minute < 10 ? '0' + minute : minute}`} value={`${minute < 10 ? '0' + minute : minute}`} />
                      ))}
                    </Picker>
                    <Picker
                      style={styles.timePicker}
                      selectedValue={timeSecondLocationAmPm}
                      onValueChange={(itemValue) => setTimeSecondLocationAmPm(itemValue)}
                    >
                      <Picker.Item label="AM" value="AM" />
                      <Picker.Item label="PM" value="PM" />
                    </Picker>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={[styles.setButton, { padding: 8, width: 60, marginBottom: 8 }]}
                      onPress={() => {
                        setShowSecondTimePicker(false);
                        setSelectedSecondTime(`${timeSecondLocationHour}:${timeSecondLocationMinute} ${timeSecondLocationAmPm}`);
                      
                      }}
                    >
                      <Text style={styles.setButtonText}>Set</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {selectedSecondTime !== '' && (
                <Text style={{marginLeft: 8}}>Class End Time: {selectedSecondTime}</Text>
              )}
              {!showSecondTimePicker && (
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <TouchableOpacity
                    style={[styles.setButton, { padding: 8, width: 70, marginBottom: 10 }]}
                    onPress={() => setShowSecondTimePicker(true)}
                  >
                    <Text style={styles.setButtonText}>Change</Text>
                  </TouchableOpacity>
                </View>
              )}              
              <TouchableOpacity style={styles.setButton} onPress={saveChanges}>
                <Text style={styles.setButtonText}>Save</Text>
              </TouchableOpacity>
              </ScrollView>
            </View>           
            
        </View>
        
      </Modal> 
      </ScrollView>
    </View>
  );
}

export default Schedules;