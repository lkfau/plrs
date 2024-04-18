import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Checkbox = ({ label, isChecked, onChange, size = 20}) => {
  return (
    <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
      {label && <Text style={styles.checkboxText}>{label}</Text>}
      <View style={[ styles.checkbox, {width: size, height: size}, isChecked && styles.checked]}>
        {isChecked && <Ionicons name="checkmark-sharp" size={size * 0.8} style={{color: 'white'}}></Ionicons>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxText: {
    marginBottom: 2,
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  checked: {
    backgroundColor: '#0073ef',
  },
})

export default Checkbox;