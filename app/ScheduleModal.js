import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import ScheduleModalItem from './ScheduleModalItem';

const ScheduleModal = ({ visible, schedule, onClose, onSave }) => {
  const [scheduleName, setScheduleName] = useState(schedule?.name || "");
  const [scheduleItems, setScheduleItems] = useState(schedule?.items || []);
  const itemChangeHandler = (itemFunction, index) => {
    setScheduleItems(prevItems => {
      let newItems = prevItems.slice();
      newItems[index] = itemFunction(newItems[index]);
      return newItems;
    })
  }
  useEffect(() => {
    setScheduleName(schedule?.name || "");
    setScheduleItems(schedule?.items || []);
  }, [schedule])
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {schedule !== null && 
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <ScrollView keyboardShouldPersistTaps="handled">
                <TextInput
                  style={styles.modalTextInput}
                  placeholder="Enter title"
                  value={scheduleName}
                  onChangeText={setScheduleName}
                />
                {scheduleItems.map((item, index) => (
                  <ScheduleModalItem key={index} item={item} onChange={(itemFunction) => itemChangeHandler(itemFunction, index)} />
                ))}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    }
    </Modal> 
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
   modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: 350, // Adjust the width of the modalmarginTop: '10%', // Adjust the marginTop to move the modal down
    marginLeft: '50%',
    marginRight: '50%',
    marginTop: 50,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  }
});

export default ScheduleModal;