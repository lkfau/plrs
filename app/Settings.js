import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { button, changePermit, checkBox } from './Styles';
import PageContainer from './UI/PageContainer';
import DataContext from './context/data-context';

// Import the checkmark icon from FontAwesome
import { FontAwesome5 } from '@expo/vector-icons';

const pageOptions = [
  { title: 'Account', description: 'Change email, Change password, Log out' },
  { title: 'Schedules', description: 'Manage schedules' },
  { title: 'Permits', description: 'Select permit type(s)' },
  { title: 'About', description: 'Mission statement, Meet the team' }
];

const permitOptions = ['Red', 'blue', 'black', 'orange'];

const Settings = () => {
  const navigation = useNavigation();
  //const ctx = useContext(DataContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPermits, setSelectedPermits] = useState([]);

  const handlePermitSelection = (permit) => {
    const isSelected = selectedPermits.includes(permit);
    if (isSelected) {
      setSelectedPermits(selectedPermits.filter(item => item !== permit));
    } else {
      setSelectedPermits([...selectedPermits, permit]);
    }
  };

  return (
    <PageContainer gradient={true}>
      {pageOptions.map(option => ( 
        <TouchableOpacity 
          key={option.title} 
          style={button.containerOutline}
          onPress={() => {
            if (option.title === 'Permits') {
              setModalVisible(true);
            } else {
              navigation.navigate(option.title);
            }
          }}
        >
          <Text style={button.title}>{option.title}</Text>
          <Text style={button.description}>{option.description}</Text>
        </TouchableOpacity>
      ))}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={changePermit.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={{ backgroundColor: '#fff', marginVertical: 200, padding: 100, borderRadius: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text>Select your permits</Text>
              {permitOptions.map(option => (
                <TouchableOpacity 
                  style={{ flexDirection: 'row', alignSelf: 'flex-start', marginVertical: 10 }} 
                  key={option}
                  onPress={() => handlePermitSelection(option)}
                >
                  <View style={[checkBox.box, { backgroundColor: selectedPermits.includes(option) ? 'green' : 'white' }]}>
                    {/* Display checkmark icon if the permit is selected */}
                    {selectedPermits.includes(option) && <FontAwesome5 name="check" size={20} color="white" />}
                  </View>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </PageContainer>
  );
};

export default Settings;
