import React, { useCallback, useContext, useState, useMemo } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecommendScheduleSelector from './RecommendScheduleSelector';
import RecommendBuildingSelector from './RecommendBuildingSelector';
import RecommendationList from './RecommendationList';
import { stylesRecommend } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';
import DataContext from './context/data-context';
import { button } from './Styles';

const RecommendPage = () => {
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
        <GetRecommendation
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
      {() => <RecommendationList schedule_id={recoSchedule} building_id={recoBuilding}  />}
    </Stack.Screen>
  </Stack.Navigator>
}

const GetRecommendation = ({ onRecommend }) => {
  const ctx = useContext(DataContext);

  // React hooks for managing state
  const [schedules, setSchedules] = useState(null); // State to store schedules data
  const [buildings, setBuildings] = useState(null); // State to store buildings data
  const [currentTab, setCurrentTab] = useState('Use Building');

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const Tab = createMaterialTopTabNavigator(); // Material Top Tab Navigator for tabbed navigation

  const recommendDisabled = useMemo(() => (
       (currentTab === 'Use Schedule' && selectedSchedule === null) 
    || (currentTab === 'Use Building' && selectedBuilding === null)
  ), [currentTab, selectedSchedule, selectedBuilding]);

  //Fetching schedule/user data
  async function fetchData() {
    try {
      // Fetch schedules data
      const scheduleResponse = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/schedules`, {
        headers: {Authorization: 'Bearer ' + ctx.getSessionID()}
      });

      // Fetch buildings data
      const buildingResponse = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/buildings`);

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

  // useFocusEffect hook to fetch data when the screen shows
  useFocusEffect(useCallback(() => { 
    fetchData(); 
  }, [])); 

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
      <Text style={stylesRecommend.txt}>Would you like to park near your first or last location?</Text>
      <View style={stylesRecommend.container}>
        <TouchableOpacity style={stylesRecommend.button}>
          <Text style={stylesRecommend.buttonText}>First Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRecommend.button}>
          <Text style={stylesRecommend.buttonText}>Last Location</Text>
        </TouchableOpacity>
      </View>

      <View style={[stylesRecommend.container, { justifyContent: 'center' }]}>
        <TouchableOpacity 
          disabled={recommendDisabled} 
          style={button.containerOutline}
          onPress={recommendHandler}
        >
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

export default RecommendPage;