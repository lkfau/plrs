import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PageContainer from './UI/PageContainer';
import { stylesHome, pageHeader, button } from './Styles';

const pageOptions = [
  { title: 'Account', description: 'Manage your account, change password, change email, manage preferences' },
  { title: 'Schedules', description: 'Manage schedules' },
  { title: 'Recommend', description: 'Get a parking lot recommendation' },
  { title: 'About', description: 'Mission statement, meet the team' }
];

const HomePage = ({ navigation }) => {
  return (
    <PageContainer gradient={true}>  
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={pageHeader}>Parking Lot Recommendation System</Text>
        </TouchableOpacity>
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
