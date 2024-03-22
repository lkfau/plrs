import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {stylesHome} from './Styles';

const pageOptions = [
  { title: 'Account', description: 'Manage your account, change password, change email, manage preferences' },
  { title: 'Schedules', description: 'Manage schedules' },
  { title: 'Recommend', description: 'Get a parking lot recommendation' },
  { title: 'About', description: 'Mission statement, meet the team' }
];

const HomePage = ({ navigation }) => {
  return (
    <View style={stylesHome.container}>
      <LinearGradient
        colors={['#ae3b54', '#284b85']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View style={stylesHome.innerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={stylesHome.header}>Parking Lot Recommendation System</Text>
        </TouchableOpacity>
        {pageOptions.map(option => (
          <TouchableOpacity key={option.title} style={stylesHome.button} onPress={() => navigation.navigate(option.title)}>
            <Text style={stylesHome.buttonText}>{option.title}</Text>
            <Text style={stylesHome.buttonDescription}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomePage;
