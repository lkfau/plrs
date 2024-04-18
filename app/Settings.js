import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { button, changePermit, checkBox } from './Styles';
import PageContainer from './UI/PageContainer';
import PermitModal from './PermitModal';
import PreferencesModal from './PreferencesModal';

const pageOptions = [
  { title: 'Account', description: 'Change email, Change password, Log out' },
  { title: 'Schedules', description: 'Manage schedules' },
  { title: 'Permits', description: 'Select permit type(s)' },
  { title: 'Preferences', description: 'Recommendation preferences' },
  { title: 'About', description: 'Mission statement, Meet the team' }
];

const Settings = () => {
  const navigation = useNavigation();
  //const ctx = useContext(DataContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  

  return (
    <PageContainer gradient={true}>
      {pageOptions.map(option => ( 
        <TouchableOpacity 
          key={option.title} 
          style={button.containerOutline}
          onPress={() => {
            if (option.title === 'Permits') {
              setModalVisible(true);
            } else if (option.title === 'Preferences') {
              setPopupVisible(true);
            } else {
              navigation.navigate(option.title);
            }
          }}
        >
          <Text style={button.title}>{option.title}</Text>
          <Text style={button.description}>{option.description}</Text>
        </TouchableOpacity>
      ))}
      <PermitModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <PreferencesModal visible={popupVisible} onClose={() => setPopupVisible(false)} />
    </PageContainer>
  );
};

export default Settings;