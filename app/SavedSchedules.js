import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ScrollView, Modal } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DataContext from './context/data-context.js';
import ScheduleView from './ScheduleView.js';
import ScheduleEditor from './ScheduleEditor.js';

const SchedulesContainer = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const Stack = createStackNavigator();

  const nameChangeHandler = (newName) => {
    setSelectedSchedule(prevSchedule => ({...prevSchedule, name: newName}));
  }
  return <Stack.Navigator>
     <Stack.Screen
      name="SchedulesList" 
      options={() => ({
        title: 'Schedules',
      })}
      >
        {props => <Schedules navigation={props.navigation} setSchedule={setSelectedSchedule} />}
      </Stack.Screen>
      <Stack.Screen
        name="EditSchedule" 
        options={() => ({title: selectedSchedule?.name?.length ? selectedSchedule.name : 'Edit Schedule'})}
      >
        {() => <ScheduleEditor schedule={selectedSchedule} onNameChange={nameChangeHandler}  />}
      </Stack.Screen>
  </Stack.Navigator>
}

const Schedules = ({ navigation, setSchedule }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const ctx = useContext(DataContext);

  useEffect(() => {
    getBuildingData();
    getScheduleData();
  }, []);

  async function getBuildingData() {
    const buildingResponse = await fetch('http://10.0.2.2:5000/buildings');
    if (buildingResponse.ok && ctx.setBuildings)
      ctx.setBuildings(await buildingResponse.json());
    else
      throw new Error('Building network response was not ok');
  }

  async function getScheduleData() {
    const scheduleResponse = await fetch('http://10.0.2.2:5000/schedules?get_items=true&user_id=1');
    if (scheduleResponse.ok)
      setSchedules(await scheduleResponse.json());
    else
      throw new Error('Schedule network response was not ok');
  }

  const toggleScheduleModal = (schedule) => {
    setSchedule(schedule);
    navigation.navigate('EditSchedule');
    setModalVisible(schedule !== null);
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {schedules.length > 0 && schedules.map((schedule) => (
          <ScheduleView key={schedule.schedule_id} schedule={schedule} onPress={toggleScheduleModal} />
        ))}
        <TouchableOpacity style={styles.addButton} onPress={createSchedule}>
          <Text style={styles.addButtonText}>Create Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>   
  );
}

const styles = StyleSheet.create({
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
  }
});

export default SchedulesContainer;