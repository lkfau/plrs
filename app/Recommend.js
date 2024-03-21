import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecommendScheduleSelector from './RecommendScheduleSelector';
import RecommendBuildingSelector from './RecommendBuildingSelector';
import Recommendation from './Recommendation';
import { stylesRecommend } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';

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
      <LinearGradient
            colors={['#ae3b54', '#284b85']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
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
      <Text style={stylesRecommend.txt}>Would you like to park closest to your first or last location?</Text>
      <View style={stylesRecommend.container}>
        <TouchableOpacity style={stylesRecommend.button}>
          <Text style={stylesRecommend.buttonText}>First Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRecommend.button}>
          <Text style={stylesRecommend.buttonText}>Last Location</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={{ textAlign: 'center', padding: 25 }}> Prioritize walking distance or lot vacancy in generating your parking lot recommendation?</Text>
      <View style={stylesRecommend.container}>
        <TouchableOpacity style={stylesRecommend.button}>
          <Text style={stylesRecommend.buttonText}>Walking Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRecommend.button}>
          <Text style={stylesRecommend.buttonText}>Lot vacancy</Text>
        </TouchableOpacity>
      </View> */}
      <View style={[stylesRecommend.container, { justifyContent: 'center' }]}>
        <TouchableOpacity style={stylesRecommend.button}
          onPress={recommendHandler}>
          <Text style={stylesRecommend.buttonText}>Get Recommendation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecommendContainer;