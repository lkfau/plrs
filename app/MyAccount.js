import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { button, textInput, changeEmail } from './Styles'
import PageContainer from './UI/PageContainer';
import DataContext from './context/data-context';

const Account = () => {
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
    <PageContainer>
      <TouchableOpacity style={button.container} onPress={() => navigation.navigate('Schedules')}>
        <Text style={button.title}>Schedules</Text>
      </TouchableOpacity>

      <TouchableOpacity style={button.container}>
        <Text style={button.title}>Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={button.container} onPress={() => setModalVisible(true)}>
        <Text style={button.title}>Change Email</Text>
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

      <TouchableOpacity style={button.container} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={button.title}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={button.container} onPress={() => ctx.logOut()}>
        <Text style={button.title}>Log Out</Text>
      </TouchableOpacity>
    </PageContainer>
  );
};

export default Account;