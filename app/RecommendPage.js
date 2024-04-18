import React, { useCallback, useContext, useState, useMemo } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecommendScheduleSelector from './RecommendScheduleSelector';
import RecommendBuildingSelector from './RecommendBuildingSelector';
import RecommendationList from './RecommendationList';
import { recommendButtons, stylesRecommend, button } from './Styles';
import DataContext from './context/data-context';

const RecommendPage = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [firstOrLastLocation, setFirstOrLastLocation] = useState(null);

  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return <Stack.Navigator>
    <Stack.Screen
      name="GetRecommendation"
      options={() => ({ title: 'Get Recommendation' })}
    >
      {() => (
        <GetRecommendation
          schedule={selectedSchedule}
          setSchedule={setSelectedSchedule}
          building={selectedBuilding}
          setBuilding={setSelectedBuilding}
          firstOrLastLocation={firstOrLastLocation}
          setFirstOrLastLocation={setFirstOrLastLocation}
          onRecommend={() => navigation.navigate('RecommendationList')}
        />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="RecommendationList"
      options={{ title: 'Recommendation' }}
    >
      {() => <RecommendationList
        schedule_id={selectedSchedule}
        building_id={selectedBuilding}
        first_or_last_location={firstOrLastLocation}
      />}
    </Stack.Screen>
  </Stack.Navigator>
}

const GetRecommendation = ({
  schedule,
  setSchedule,
  building,
  setBuilding,
  firstOrLastLocation,
  setFirstOrLastLocation,
  onRecommend
}) => {
  const ctx = useContext(DataContext);

  // React hooks for managing state
  const [schedules, setSchedules] = useState(null); // State to store schedules data
  const [buildings, setBuildings] = useState(null); // State to store buildings data
  const [currentTab, setCurrentTab] = useState('Use Building');

  const Tab = createMaterialTopTabNavigator(); // Material Top Tab Navigator for tabbed navigation

  const recommendDisabled = useMemo(() => (
    (currentTab === 'Use Schedule' && (schedule === null || firstOrLastLocation === null))
    || (currentTab === 'Use Building' && building === null)
  ), [currentTab, schedule, building, firstOrLastLocation]);

  async function fetchScheduleData() {
    try {
      const scheduleResponse = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/schedules`, {
        headers: { Authorization: 'Bearer ' + ctx.getSessionID() }
      });

      if (!scheduleResponse.ok)
        throw new Error('Network response was not ok');

      const scheduleData = await scheduleResponse.json();
      setSchedules(scheduleData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function fetchBuildingData() {
    try {
      const buildingResponse = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/buildings`);

      if (!buildingResponse.ok)
        throw new Error('Network response was not ok');

      const buildingData = await buildingResponse.json();
      setBuildings(buildingData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // useFocusEffect hook to fetch data when the screen shows
  useFocusEffect(useCallback(() => {
    setSchedule(null);
    setBuilding(null);
    fetchBuildingData();
    if (ctx.loggedIn)
      fetchScheduleData();
  }, [ctx.loggedIn]));

  return (
    <SafeAreaView style={recommendButtons.container}>
      <View style={{ flexGrow: 1}}>
        {buildings && (
          (ctx.loggedIn ) ? (schedules && (
            <Tab.Navigator
              screenListeners={{
                state: (e) => {
                  setCurrentTab(e.data.state.routeNames[e.data.state.index]);
                }
              }}
            >
              <Tab.Screen
                name="Use Schedule"
                children={() => (
                  <RecommendScheduleSelector
                    schedules={schedules}
                    setSchedule={setSchedule}
                    firstOrLastLocation={firstOrLastLocation}
                    setFirstOrLastLocation={setFirstOrLastLocation}
                  />
                )}>
              </Tab.Screen>
              <Tab.Screen
                name="Use Building"
                children={() => <RecommendBuildingSelector buildings={buildings} onSelect={setBuilding} invertGradient={true} />}>
              </Tab.Screen>
            </Tab.Navigator>
          )) : (
            <RecommendBuildingSelector buildings={buildings} onSelect={setBuilding} invertGradient={false}/>
          )
        )}
      </View>
      <View>
        <TouchableOpacity
          disabled={recommendDisabled}
          style={[button.container, {marginTop: 0, borderRadius: 0, paddingVertical: 30}, recommendDisabled ? button.disabled : null]}
          onPress={onRecommend}
        >
          <Text style={stylesRecommend.recommendButtonText}>Get Recommendation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default RecommendPage;