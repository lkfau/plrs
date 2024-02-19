// App.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import pageOptions from './pageOptions';

const Tab = createBottomTabNavigator();


const loggedIn = 0; //temporary
const loggedIn = 1; //temporary

const pageOptionsFiltered = pageOptions.filter(opt => loggedIn ? opt.showLoggedIn : opt.showLoggedOut) 
const headerTitle = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>PLRS</Text>
  </TouchableOpacity>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ size }) => { return <Ionicons name={pageOptions.find(opt => opt.title == route.name).icon} size={size*.8} /> }
          })}>
        {pageOptionsFiltered.map(page => <Tab.Screen 
          key={page.title}
          name={page.title}
          component={page.component}
        />)}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
