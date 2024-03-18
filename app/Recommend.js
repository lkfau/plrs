import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecommendScheduleSelector from './RecommendScheduleSelector';
import RecommendBuildingSelector from './RecommendBuildingSelector';
import Recommendation from './Recommendation';

const RecommendContainer = () => {
  const Stack = createStackNavigator();

  return <Stack.Navigator>
    <Stack.Screen
      name="GetRecommendation"
      options={() => ({ title: 'Get Recommendation' })}
    >
      {() => (
        <Recommend

        />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="RecommendationList"
      options={() => ({
        title: 'Recommendation',
        // title: selectedSchedule?.name?.length ? selectedSchedule.name : 'Edit Schedule',
      })}
    >
      {() => <Recommendation />}
    </Stack.Screen>
  </Stack.Navigator>
}

const Recommend = () => {

  // React hooks for managing state
  const [schedules, setSchedules] = useState(null);// State to store schedules data
  const [buildings, setBuildings] = useState(null);// State to store buildings data



  const navigation = useNavigation(); // Navigation hook for accessing navigation functions
  const Tab = createMaterialTopTabNavigator(); // Material Top Tab Navigator for tabbed navigation

  const getRecommendationHandler = () => {
    navigation.navigate('RecommendationList'); // Navigate to the 'Recommendation' page
  };

  //Fetching schedule/user data
  async function fetchData() {
    try {
      const scheduleResponse = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/schedules?user_id=1`);// Fetch schedules data
      const buildingResponse = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/buildings`);// Fetch buildings data

      // Check if both responses are successful
      if (!scheduleResponse.ok || !buildingResponse.ok)
        throw new Error('Network response was not ok');

      // Parse response data into JSON format
      const scheduleData = await scheduleResponse.json();
      const buildingData = await buildingResponse.json();

      // Update state with fetched data
      setSchedules(scheduleData);
      setBuildings(buildingData);

    } catch (error) {
      // Log and throw error if fetching fails
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: "25%" }}>
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
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <TouchableOpacity style={styles.button}
          onPress={getRecommendationHandler}>
          <Text style={styles.buttonText}>Get Recommendation</Text>
        </TouchableOpacity>
      </View>
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

export default RecommendContainer;