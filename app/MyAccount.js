import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { button, textInput, changeEmail } from './Styles'
import PageContainer from './UI/PageContainer';

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
    <PageContainer>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Schedules')}>
        <Text style={styles.buttonText}>Schedules</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Change Email</Text>
      </TouchableOpacity>
      

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Email</Text>
            <TextInput
              style={styles.input}
              placeholder="New Email"
              value={newEmail}
              onChangeText={setNewEmail}
              placeholderTextColor="black"
            />
            <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  button: button.container,
  buttonText: button.title,
  input: textInput,
  modalOverlay: changeEmail.overlay,
  modalContainer: changeEmail.container,
  modalTitle: changeEmail.title
})

export default Account;