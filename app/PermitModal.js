import { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import DataContext from './context/data-context';
import { changePermit, checkBox } from './Styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { button, badge } from './Styles';
import Checkbox from './UI/Checkbox';

const PermitModal = ({ visible, onClose }) => {
  const ctx = useContext(DataContext);
  const [permits, setPermits] = useState([]);

  const fetchPermits = async() => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/permits`, {
      headers: {'Authorization': 'Bearer ' + ctx.getSessionID()}
    });
    let permit_results = await response.json();
    setPermits(permit_results);
  }

  const savePermits = async() => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/permits`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ctx.getSessionID()},
      body: JSON.stringify(permits.filter(permit => permit.user_has_permit).map(permit => permit.permit_type_id))
    });

    if (response.status === 200) {
      console.log('work');
      onClose();
    }
  }

  const handlePermitSelection = (permit_type_id) => {
    setPermits(prevPermits => {
      const newPermitIndex = prevPermits.findIndex(permit => permit.permit_type_id === permit_type_id)
      let newPermits = [ ...prevPermits ];

      newPermits[newPermitIndex].user_has_permit = !newPermits[newPermitIndex].user_has_permit;
      return newPermits;
    });
  };

  useEffect(() => {
    setPermits([]);
    if (visible) fetchPermits();
  }, [visible]);

  const handlePressOut = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  console.log(permits)
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={changePermit.overlay}
      activeOpacity={1}
      onPressOut={handlePressOut} // Use the custom handler
    >
        <View style={{ display: 'flex', backgroundColor: '#fff', width: 300, height: 450, padding: 15, borderRadius: 10 }}>
          <Text style={{color: 'black', textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Select your permits</Text>
          <ScrollView>
            {permits.map(option => (
              <View 
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexDirection: 'row',  marginVertical: 7 }} 
                key={option.permit_type_id}
              >
                <View style={[badge, {backgroundColor: option.badge_color}]}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>{option.type_name}</Text>
                </View>
               
                <Checkbox size={30} isChecked={option.user_has_permit} onChange={() => handlePermitSelection(option.permit_type_id)}></Checkbox>
                
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={button.containerOutline} onPress={savePermits}>
            <Text style={button.title}>Save permits</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )  
}

export default PermitModal;