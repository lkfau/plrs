import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PageContainer from './UI/PageContainer';
import { stylesHome, pageHeader, button } from './Styles';

const pageOptions = [
  { title: 'Schedules', description: 'Manage schedules' },
  { title: 'Recommend', description: 'Get a parking lot recommendation' },
  { title: 'Settings', description: 'Manage your account, Select permit type, Recommendation Preferences' },
];

const HomePage = ({ navigation }) => {
  return (
    <PageContainer gradient={true}>  
        <Text style={pageHeader}>Parking Lot Recommendation System</Text>
        {pageOptions.map(option => (
          <TouchableOpacity key={option.title} style={button.containerOutline} onPress={() => navigation.navigate(option.title)}>
            <Text style={button.title}>{option.title}</Text>
            <Text style={button.description}>{option.description}</Text>
          </TouchableOpacity>
        ))}
    </PageContainer>
  );
};

export default HomePage;
