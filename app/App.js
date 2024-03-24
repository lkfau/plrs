// App.js
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DataContextProvider } from './context/data-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import pageOptions from './data/pageOptions';

const App = () => {
  const Tab = createBottomTabNavigator();
  const loggedIn = 1; //temporary
  const pageOptionsFiltered = pageOptions.filter(opt => loggedIn ? opt.showLoggedIn : opt.showLoggedOut) 

  return (
    <DataContextProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ size }) => { return <Ionicons name={pageOptions.find(opt => opt.title == route.name).icon} size={size*.8} /> },
              headerShown: pageOptions.find(opt => opt.title == route.name).showTitle
            })}>
          {pageOptionsFiltered.map(page => <Tab.Screen 
            key={page.title}
            name={page.title}
            component={page.component}
            options={{
              headerTransparent: page.transparentTitle,
              headerBackground: page.transparentTitle ? () => (
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)'}} />
              ) : undefined,
              headerTintColor: page.transparentTitle ? '#fff' : '#000'
            }}
          />)}
        </Tab.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  );
}

export default App;
