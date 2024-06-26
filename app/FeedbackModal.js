import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import { feedback } from './Styles';

const FeedbackModal = ({ lot_id, visible, onFeedback, onHide }) => {

  const navigation = useNavigation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={feedback.modalBackground}>
        <View style={feedback.popupContainer}>
          <View style={feedback.header}>
            <Text style={feedback.popupTitle}>Feedback</Text>
            <TouchableOpacity style={feedback.closeButton} onPress={onHide}>
              <Ionicons color={'rgb(100, 100, 100)'} name={'close'} size={24} />
            </TouchableOpacity>
          </View>
          <Text style={feedback.popupText}>Is the parking lot fully occupied?</Text>
          <View style={feedback.buttonContainer}>
            <TouchableOpacity style={[feedback.modalButton, feedback.greenButton]} onPress={() => onFeedback(lot_id, false, true)}>
              <Text style={feedback.buttonText}>Not full</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[feedback.modalButton, feedback.redButton]} onPress={() => onFeedback(lot_id, true, true)}>
              <Text style={feedback.buttonText}>Full</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    marginLeft: 'auto'
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  popupText: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30
  },
  modalButton: {
    flex: 1,
    paddingVertical: 50,
    borderRadius: 10,
    marginBottom: 30,
  },
  greenButton: {
    backgroundColor: 'rgb(122, 245, 122)',
  },
  redButton: {
    backgroundColor: 'rgb(255, 139, 135)',
  }
});
export default FeedbackModal;