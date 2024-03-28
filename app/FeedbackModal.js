import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
const FeedbackModal = ({ lot_id, visible, onHide }) => {

  const navigation = useNavigation();

  const submitFeedback = async (lotIsFull) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lot_id: lot_id,
        lot_is_full: lotIsFull
      }),
    });
    if (response.status == 200) {
      navigation.navigate('GetRecommendation');
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.popupContainer}>
          <View style={styles.header}>
            <Text style={styles.popupTitle}>Feedback</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onHide}>
              <Ionicons color={'rgb(100, 100, 100)'} name={'close'} size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.popupText}>Is the parking lot fully occupied?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.modalButton, styles.greenButton]}>
              <Text style={styles.buttonText} onPress={() => submitFeedback(false)}>Not full</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.redButton]}>
              <Text style={styles.buttonText} onPress={() => submitFeedback(true)}>Full</Text>
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