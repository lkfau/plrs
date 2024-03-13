import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView, View, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Autocomplete from 'react-native-autocomplete-input';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';

const GetRecommendation = () => {

  const navigation = useNavigation();
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');


  /*useEffect(() => {
    fetchData();
  }, []);*/
  
  //Fetching schedule/user data
  async function fetchData() {
    try {
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_SERVER_IP}/schedules?user_id=1`);
      const responseB = await fetch(`http://${process.env.EXPO_PUBLIC_SERVER_IP}/buildlings`);
    

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (!responseB.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const dataB = await responseB.json();
  


      const scheduleNames = data.map(schedule => schedule.name);
      setSchedules(scheduleNames);
      setSelectedSchedule(scheduleNames[0]);

      const buildingNames = data.map(building => building.building_name);
      setLocations(buildingNames);
      setSelectedLocation(buildingNames[0]);
    
      return data, dataB;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  const findSchedule = (query) => {
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return schedules.filter(schedule => schedule.search(regex) >= 0);
  }

  const findBuilding = (query) => {
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return locations.filter(building => building.search(regex) >= 0);
  }
  
  function ScheduleScreen() {
    return (
      <SafeAreaView>
      <Text style={{ textAlign: 'center', padding: 25 }}>Select saved schedule</Text>
      <Autocomplete style={{ textAlign: 'center' }}
        placeholder='Choose Schedule'
        data={findSchedule(query)}
        //defaultValue={selectedSchedule}
        onChangeText={text => setQuery(text)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setQuery(item);
            setSelectedSchedule(item);
          }}>
          <Text style={styles.dropdownOptionText}>{item}</Text>
          </TouchableOpacity>
        )}
        inputContainerStyle={styles.dropdown}
        listStyle={styles.dropdownMenu}
        textStyle={styles.dropdownText}
      />
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
  
  function BuildingScreen() {
    return (
      <SafeAreaView>
      <Text style={{ textAlign: 'center', padding: 25 }}>Select Buildings</Text>
      <Autocomplete style={{ textAlign: 'center' }}
        placeholder='Choose Building'
        data={findBuilding(query)}
        //defaultValue={selectedSchedule}
        onChangeText={text => setQuery(text)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setQuery(item);
            setSelectedLocation(item);
          }}>
            <Text style={styles.dropdownOptionText}>{item}</Text>
          </TouchableOpacity>
        )}
        inputContainerStyle={styles.dropdown}
        listStyle={styles.dropdownMenu}
        textStyle={styles.dropdownText}
      />
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

  const Tab = createMaterialTopTabNavigator();
  
  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="Building" component={BuildingScreen} />
      </Tab.Navigator>
    );
  }


return (
  <SafeAreaView style={{ flex: 1 }}>
    <MyTabs/>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    padding: 8,
  },
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

export default GetRecommendation;
