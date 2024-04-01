import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './Settings.js';
import MyAccount from './MyAccount.js';
import About from './About.js';
import ChangePasswordPage from './ChangePasswordPage.js';

const OptionsPage = () => {
  const Stack = createStackNavigator();

  return <Stack.Navigator>
    <Stack.Screen
      name="Options"
      component={Settings}
      options={() => ({ title: 'Settings' })}
    />
    <Stack.Screen
      name="Account"
      component={MyAccount}
      options={() => ({ title: 'Account' })}
    />
    <Stack.Screen
      name="About"
      component={About}
      options={() => ({ title: 'About' })}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordPage}
      options={() => ({ title: 'Change Password' })}
    />
  </Stack.Navigator>
}

export default OptionsPage;