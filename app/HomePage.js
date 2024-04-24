import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PageContainer from './UI/PageContainer';
import { stylesHome, pageHeader, button } from './Styles';

const pageOptions = [
  { title: 'Recommend', description: 'Get your parking lot recommendation' },
  { title: 'Schedules', description: 'View and edit your custom schedules' },
  { title: 'Settings', description: 'Manage your account and preferences' },
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
