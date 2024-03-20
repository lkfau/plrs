import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecommendScheduleSelector from './RecommendScheduleSelector';
import RecommendBuildingSelector from './RecommendBuildingSelector';
import Recommendation from './Recommendation';

const RecommendContainer = () => {
  const [recoSchedule, setRecoSchedule] = useState(null);
  const [recoBuilding, setRecoBuilding] = useState(null);

  const Stack = createStackNavigator();
  const navigation = useNavigation();

  const getRecommendationHandler = (schedule_id, building_id) => {
    setRecoSchedule(schedule_id);
    setRecoBuilding(building_id);
    navigation.navigate('RecommendationList');
  }

  return <Stack.Navigator>
    <Stack.Screen
      name="GetRecommendation"
      options={() => ({ title: 'Get Recommendation' })}
    >
      {() => (
        <Recommend
          onRecommend={getRecommendationHandler}
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
      {() => <Recommendation schedule_id={recoSchedule} building_id={recoBuilding}  />}
    </Stack.Screen>
  </Stack.Navigator>
}

const Recommend = ({ onRecommend }) => {

  // React hooks for managing state
  const [schedules, setSchedules] = useState(null);// State to store schedules data
  const [buildings, setBuildings] = useState(null);// State to store buildings data
  const [currentTab, setCurrentTab] = useState('Use Building');

  const [selectedSchedule, setSelectedSchedule] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState(1);

  const Tab = createMaterialTopTabNavigator(); // Material Top Tab Navigator for tabbed navigation

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

  const recommendHandler = () => {
    if (currentTab === 'Use Building')
      onRecommend(null, selectedBuilding);
    else
      onRecommend(selectedSchedule, null);
  }

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: "25%" }}>
        {schedules && buildings &&
          <Tab.Navigator
          
            screenListeners={({ navigation }) => ({
              state: (e) => {
                setCurrentTab(e.data.state.routeNames[e.data.state.index]);
              }
            })}
          >
            <Tab.Screen
              name="Use Schedule"
              children={(props) => <RecommendScheduleSelector schedules={schedules} onSelect={setSelectedSchedule} />}>
            </Tab.Screen>
            <Tab.Screen
              name="Use Building"
              children={() => <RecommendBuildingSelector buildings={buildings} onSelect={setSelectedBuilding} />}>
            </Tab.Screen>
          </Tab.Navigator>}
      </View>

      <Text style={{ textAlign: 'center', padding: 25 }}>Would you like to park closest to your first or last location?</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>First Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Last Location</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={{ textAlign: 'center', padding: 25 }}> Prioritize walking distance or lot vacancy in generating your parking lot recommendation?</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Walking Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lot vacancy</Text>
        </TouchableOpacity>
      </View> */}
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <TouchableOpacity style={styles.button}
          onPress={recommendHandler}>
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