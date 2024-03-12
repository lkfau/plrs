import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Checkbox = ({ label, isChecked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
      <Text style={styles.checkboxText}>{label}</Text>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Ionicons name="checkmark-sharp" size={16} style={{color: 'white'}}></Ionicons>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    marginBottom: 2,
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    borderColor: 'gray',
  },
  checked: {
    backgroundColor: 'green',
  },
})

export default Checkbox;