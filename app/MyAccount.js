import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { button, textInput, changeEmail } from './Styles'
import PageContainer from './UI/PageContainer';
import DataContext from './context/data-context';


const Account = () => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();
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
      <TouchableOpacity style={button.containerOutline} onPress={() => setModalVisible(true)}>
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
          <View style={changeEmail.containerOutline}>
            <Text style={changeEmail.title}>Change Email</Text>
            <TextInput
              style={textInput}
              placeholder="New Email"
              value={newEmail}
              onChangeText={setNewEmail}
              placeholderTextColor="black"
            />
            <TouchableOpacity style={button.containerOutline} onPress={handleChangeEmail}>
              <Text style={button.title}>Submit</Text>
            </TouchableOpacity>
            
          </View>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity style={button.containerOutline} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={button.title}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={button.containerOutline} onPress={() => ctx.logOut()}>
        <Text style={button.title}>Log Out</Text>
      </TouchableOpacity>
    </PageContainer>
  );
};

export default Account;