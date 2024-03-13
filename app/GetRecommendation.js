import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecommendScheduleSelector from './RecommendScheduleSelector';
import RecommendBuildingSelector from './RecommendBuildingSelector';

const GetRecommendation = () => {

  const [schedules, setSchedules] = useState(null);
  const [buildings, setBuildings] = useState(null);
  // const [selectedTab, setSelectedTab] = useState('schedule');

  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();

  //Fetching schedule/user data
  async function fetchData() {
    try {
      const scheduleResponse = await fetch(`http://${process.env.EXPO_PUBLIC_SERVER_IP}/schedules?user_id=1`);
      const buildingResponse = await fetch(`http://${process.env.EXPO_PUBLIC_SERVER_IP}/buildings`);

      if (!scheduleResponse.ok || !buildingResponse.ok)
        throw new Error('Network response was not ok');

      const scheduleData = await scheduleResponse.json();
      const buildingData = await buildingResponse.json();
      
      setSchedules(scheduleData);
      setBuildings(buildingData);

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{height: "25%"}}>
        {schedules && buildings && 
        <Tab.Navigator>
          <Tab.Screen
            name="Use Schedule"
            children={() => <RecommendScheduleSelector schedules={schedules} />}>
          </Tab.Screen> 
          <Tab.Screen 
            name="Use Building"
            children={() => <RecommendBuildingSelector buildings={buildings} />}>
          </Tab.Screen> 
        </Tab.Navigator>}
      </View>
     
      <Text style={{ textAlign: 'center', padding: 25 }}> Prioritize walking distance or lot vacancy in generating your parking lot recommendation?</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Walking Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lot vacancy</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Recommendation</Text>
      </TouchableOpacity>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  selectedButton: {
    backgroundColor: '#00f'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row', // to arrange elements horizontally
    justifyContent: 'space-between', // to space the elements evenly
    paddingHorizontal: 20, // optional: adds padding to the sides
  },
});

export default GetRecommendation;