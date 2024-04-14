import { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import DataContext, { DataContextProvider } from './context/data-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import VerifyEmail from './VerifyEmail';
import pageOptions from './data/pageOptions';

const AppContainer = () => {
  return <DataContextProvider>
    <NavigationContainer>
      <App /> 
    </NavigationContainer>
  </DataContextProvider>
}

const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const ctx = useContext(DataContext);
  const navigation = useNavigation();
  const pageOptionsFiltered = pageOptions.filter(opt => ctx.loggedIn ? opt.showLoggedIn : opt.showLoggedOut)

  useEffect(() => {
    if (ctx.verifyingEmail)
      navigation.navigate("verifyEmail")
    else
      navigation.navigate("main")
  }, [ctx.verifyingEmail])

  return (
      <Stack.Navigator>
        <Stack.Screen name="main" options={{headerShown: false}}>
          {props => (
            <Tab.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ size }) => { return <Ionicons name={pageOptions.find(opt => opt.title == route.name).icon} size={size * .8} /> },
              headerShown: pageOptions.find(opt => opt.title == route.name).showTitle
            })}>
              {pageOptionsFiltered.map(page => <Tab.Screen
                key={page.title}
                name={page.title}
                component={page.component}
                options={{
                  headerTransparent: page.transparentTitle,
                  headerBackground: page.transparentTitle ? () => (
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
                  ) : undefined,
                  headerTintColor: page.transparentTitle ? '#fff' : '#000'
                }}
              />)}
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="verifyEmail" component={VerifyEmail} options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
  );
};

export default AppContainer;