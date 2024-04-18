import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './Settings.js';
import MyAccount from './MyAccount.js';
import About from './About.js';
import ChangePasswordPage from './ChangePasswordPage.js';


const OptionsPage = () => {
  const Stack = createStackNavigator();
  const [stackNav, setStackNav] = useState(null);

  useFocusEffect(useCallback(() => {
    if (stackNav) stackNav.navigate('Options')
  }, [stackNav]));

  return (
    <Stack.Navigator screenOptions={({ navigation }) => {
        if (stackNav === null) setStackNav(navigation)
    }}>
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
  );
}

export default OptionsPage;