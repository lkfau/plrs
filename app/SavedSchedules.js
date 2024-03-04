import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ScrollView, Modal } from 'react-native';
import DataContext from './context/data-context.js';
import ScheduleView from './ScheduleView.js';
import ScheduleModal from './ScheduleModal.js';


const Schedules = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const ctx = useContext(DataContext);

  useEffect(() => {
    getBuildingData();
    getScheduleData();
  }, []);

  async function getBuildingData() {
    const buildingResponse = await fetch('http://10.0.2.2:5000/buildings');
    if (buildingResponse.ok)
      ctx.setBuildings(await buildingResponse.json());
    else
      throw new Error('Network response was not ok');
  }

  async function getScheduleData() {
    const scheduleResponse = await fetch('http://10.0.2.2:5000/schedules?get_items=true&user_id=1');
    if (scheduleResponse.ok)
      setSchedules(await scheduleResponse.json());
    else
      throw new Error('Network response was not ok');
  }

  const toggleScheduleModal = (schedule) => {
    setSelectedSchedule(schedule);
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
      <Text style={{ textAlign: 'center', marginTop: 50, marginBottom:25, fontSize: 20, fontWeight: 'bold' }}>Schedules</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {schedules.length > 0 && schedules.map((schedule) => (
          <ScheduleView key={schedule.schedule_id} schedule={schedule} onPress={toggleScheduleModal} />
        ))}
        <TouchableOpacity style={styles.addButton} onPress={createSchedule}>
          <Text style={styles.addButtonText}>Create Schedule</Text>
        </TouchableOpacity>
        <ScheduleModal 
          visible={modalVisible} 
          schedule={selectedSchedule} 
          onClose={() => toggleScheduleModal(null)} 
        />
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

export default Schedules;