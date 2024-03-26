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
          <Text style={styles.header}>Parking Lot Recommendation System</Text>
        </TouchableOpacity>
        {pageOptions.map(option => (
          <TouchableOpacity key={option.title} style={styles.button} onPress={() => navigation.navigate(option.title)}>
            <Text style={styles.buttonTitle}>{option.title}</Text>
            <Text style={styles.buttonDescription}>{option.description}</Text>
          </TouchableOpacity>
        ))}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  header: pageHeader,
  button: button.containerOutline,
  buttonTitle: button.title,
  buttonDescription: button.description
})

export default HomePage;
