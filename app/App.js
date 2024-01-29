// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CreateAccountPage from './CreateAccountPage';
import LoginPage from './LoginPage';
import MenuButton from './MenuButton';

const Stack = createStackNavigator();

const options = [
  { title: 'Create Account', screenName: 'CreateAccount' },
  { title: 'Log In', screenName: 'Login' },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="CreateAccount" 
          component={CreateAccountPage} 
          options={({ navigation }) => ({
            title: 'Create Account',
            headerRight: () => <MenuButton options={options} />,
          })}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginPage} 
          options={({ navigation }) => ({
            title: 'Log In',
            headerRight: () => <MenuButton options={options} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
