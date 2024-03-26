// App.js
import { useContext } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DataContext, { DataContextProvider } from './context/data-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import pageOptions from './data/pageOptions';

const AppContextContainer = () => {
  return <DataContextProvider>
    <App />
</DataContextProvider>
}
const App = () => {
  const Tab = createBottomTabNavigator();
  const ctx = useContext(DataContext);

  const pageOptionsFiltered = pageOptions.filter(opt => ctx.loggedIn ? opt.showLoggedIn : opt.showLoggedOut) 

  return (
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
  );
}

export default AppContextContainer;
