import React from 'react';
import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { button, textInput, changeEmail } from './Styles'
import PageContainer from './UI/PageContainer';
import DataContext from './context/data-context';

const Settings = () => {
    const navigation = useNavigation();
    const ctx = useContext(DataContext);
  
    const [modalVisible, setModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState('');
  
    const handleChangeEmail = () => {
      // Add your logic to handle email change here
      console.log('New Email:', newEmail);
      // Reset email field
      setNewEmail('');
      // Close modal
      setModalVisible(false);
    };
  
    return (
      <PageContainer gradient={true}>
        <TouchableOpacity style={button.containerOutline} onPress={() => navigation.navigate('Account')}>
          <Text style={button.title}>My Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={button.containerOutline} onPress={() => navigation.navigate('Schedules')}>
          <Text style={button.title}>Schedules</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={button.containerOutline}>
          <Text style={button.title}>Permits</Text>
        </TouchableOpacity>
        
  
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={changeEmail.overlay}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={changeEmail.container}>
              <Text style={changeEmail.title}>Change Email</Text>
              <TextInput
                style={textInput}
                placeholder="New Email"
                value={newEmail}
                onChangeText={setNewEmail}
                placeholderTextColor="black"
              />
              <TouchableOpacity style={button.container} onPress={handleChangeEmail}>
                <Text style={button.title}>Submit</Text>
              </TouchableOpacity>
              
            </View>
          </TouchableOpacity>
        </Modal>
      </PageContainer>
    );
  };
export default Settings;