import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Picker} from '@react-native-picker/picker';


const Schedules = () => {
  const [locations, setLocations] = useState([]);
  const [locations2, setLocations2] = useState([]);
  const [schedules, setSchedules] = useState([]);
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

        setSchedules([{ id: 1, title: 'Schedule 1', location: buildingNames[0], location2: buildingNames[0], info: '', timeFirstLocation: '', timeSecondLocation: '' }]);
        return data; // Return the result if you need to further manipulate it 
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
    const timeFirst = schedule.timeFirstLocation.split(':');
    setTimeFirstLocationHour(timeFirst[0]);
    setTimeFirstLocationMinute(timeFirst[1]);
    setTimeFirstLocationAmPm(timeFirst[2]);
    const timeSecond = schedule.timeSecondLocation.split(':');
    setTimeSecondLocationHour(timeSecond[0]);
    setTimeSecondLocationMinute(timeSecond[1]);
    setTimeSecondLocationAmPm(timeSecond[2]);
    setTimeValues(schedule.timeFirstLocation, setTimeFirstLocationHour, setTimeFirstLocationMinute, setTimeFirstLocationAmPm);
    setTimeValues(schedule.timeSecondLocation, setTimeSecondLocationHour, setTimeSecondLocationMinute, setTimeSecondLocationAmPm);
    setModalVisible(true);
    setShowSecondTimePicker(false);
    setShowFirstTimePicker(false);
  };

  const setTimeValues = (timeString, setHour, setMinute, setAmPm) => {
    if (timeString) {
      const [hour, minute, amPm] = timeString.split(':');
      setHour(hour);
      setMinute(minute);
      setAmPm(amPm);
    } else {
      // If timeString is empty, set default values to 1:00 AM
      setHour('1');
      setMinute('00');
      setAmPm('AM');
    }
  };

  const saveChanges = () => {
    const timeFirst = `${timeFirstLocationHour}:${timeFirstLocationMinute}:${timeFirstLocationAmPm}`;
    const timeSecond = `${timeSecondLocationHour}:${timeSecondLocationMinute}:${timeSecondLocationAmPm}`;
    setSchedules(schedules.map(schedule =>
      schedule.id === selectedSchedule.id
        ? { ...schedule, title: editedTitle, location: editedLocation, location2: editedLocation2, timeFirstLocation: timeFirst, timeSecondLocation: timeSecond }
        : schedule
    ));
    setSelectedSchedule(null);
    setModalVisible(false);
    setShowFirstTimePicker(false);
    setShowSecondTimePicker(false);
    setSelectedFirstTime(`${timeFirstLocationHour}:${timeFirstLocationMinute} ${timeFirstLocationAmPm}`);
    setSelectedSecondTime(`${timeSecondLocationHour}:${timeSecondLocationMinute} ${timeSecondLocationAmPm}`);
  };
  

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const daysOfWeek = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'Sat'];

  const renderCheckbox = (day, isSelected, toggleDaySelection) => {
    return (
      <Checkbox
        key={day}
        label={day}
        isChecked={isSelected}
        onChange={() => toggleDaySelection(day)}
      />
    );
  };

  const renderItem = ({ item }) => {
    return renderCheckbox(item, selectedDays.includes(item), toggleDaySelection);
  };
  
  const DaysOfWeekCheckbox = () => {
    return (
      <View style={styles.container}>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.columnContainer}>
            <Text style={styles.dayText}>{day}</Text>
            <Checkbox
              isChecked={selectedDays.includes(day)}
              onChange={() => toggleDaySelection(day)}
            />
          </View>
        ))}
      </View>
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
      timeFirstLocation: '12:00 AM',
      timeSecondLocation: '12:00 AM',
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
      backgroundColor: 'green', // Change to your preferred checked color
    },
    columnContainer: {
      alignItems: 'center',
      marginHorizontal: 10,
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
                  {daysOfWeek.map((day) => renderCheckbox(day, selectedDays.includes(day), toggleDaySelection))}
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