import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {stylesMyaccount} from './Styles'

const Account = () => {
  const navigation = useNavigation();
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
    <View style={stylesMyaccount.container}>
      <LinearGradient
          colors={['#ae3b54', '#284b85']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      <TouchableOpacity style={stylesMyaccount.button} onPress={() => navigation.navigate('Schedules')}>
        <Text style={stylesMyaccount.buttonText}>Schedules</Text>
      </TouchableOpacity>

      <TouchableOpacity style={stylesMyaccount.button}>
        <Text style={stylesMyaccount.buttonText}>Preferences</Text>
      </TouchableOpacity>

      <View>
        {/* <Text style={styles.subtitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          value={newEmail} // Set value to the state variable
          onChangeText={setNewEmail} // Update state variable on change
        /> */}
        <TouchableOpacity style={stylesMyaccount.button} onPress={() => setModalVisible(true)}>
          <Text style={stylesMyaccount.buttonText}>Change Email</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={stylesMyaccount.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={stylesMyaccount.modalContainer}>
            <Text style={stylesMyaccount.modalTitle}>Change Email</Text>
            <TextInput
              style={stylesMyaccount.input}
              placeholder="New Email"
              value={newEmail}
              onChangeText={setNewEmail}
              placeholderTextColor="white" // Set placeholder text color to white
            />
            <TouchableOpacity style={stylesMyaccount.changeButton} onPress={handleChangeEmail}>
              <Text style={stylesMyaccount.buttonText}>Submit</Text>
            </TouchableOpacity>
            
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity style={stylesMyaccount.button} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={stylesMyaccount.buttonText}>Change Password</Text>
      </TouchableOpacity>


    </View>
  );
};

export default Account;