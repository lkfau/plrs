// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CreateAccountPage from './CreateAccountPage';
import LoginPage from './LoginPage';
import MenuButton from './MenuButton';
import HomePage from './HomePage';
import CustomHeader from './CustomHeader';

const Stack = createStackNavigator();

const options = [
  { title: 'Home', screenName: 'Home' },
  { title: 'Create Account', screenName: 'CreateAccount' },
  { title: 'Log In', screenName: 'Login' },
];

const headerTitle = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>PLRS</Text>
  </TouchableOpacity>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="Home" 
          component={HomePage} 
          options={({ navigation }) => ({
            title: 'Home',
            headerTitle: () => <CustomHeader navigation={navigation} />,
            headerRight: () => <MenuButton options={options} />,
          })}
        />
        <Stack.Screen 
          name="CreateAccount" 
          component={CreateAccountPage} 
          options={({ navigation }) => ({
            title: 'Create Account',
            headerTitle: () => <CustomHeader navigation={navigation} />,
            headerRight: () => <MenuButton options={options} />,
          })}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
          options={({ navigation }) => ({
            title: 'Log In',
            headerTitle: () => <CustomHeader navigation={navigation} />,
            headerRight: () => <MenuButton options={options} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
