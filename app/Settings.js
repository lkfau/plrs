import React from 'react';
import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { button, textInput, changeEmail } from './Styles';
import PageContainer from './UI/PageContainer';
import DataContext from './context/data-context';

const pageOptions = [
  { title: 'Account', description: 'Change email, Change password, Log out' },
  { title: 'Schedules', description: 'Manage schedules' },
  { title: 'Permits', description: 'Select permit type(s)' },
  { title: 'About', description: 'Mission statement, Meet the team' }
];

const Settings = () => {
  const navigation = useNavigation();
    const ctx = useContext(DataContext);
  
    const [modalVisible, setModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState('');
  
    const handleChangeEmail = () => {
      // Reset email field
      setNewEmail('');
      // Close modal
      setModalVisible(false);
    };
  
    return (
      <PageContainer gradient={true}>
        {pageOptions.map(option => ( 
          <TouchableOpacity key={option.title} style={button.containerOutline} onPress={() => navigation.navigate(option.title)}>
            <Text style={button.title}>{option.title}</Text>
            <Text style={button.description}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </PageContainer>
    );
  };
export default Settings;