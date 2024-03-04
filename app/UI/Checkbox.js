import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({ label, isChecked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
      <Text style={styles.checkboxText}>{label}</Text>
      <View style={[styles.checkbox, isChecked && styles.checked]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  checked: {
    backgroundColor: 'green',
  },
})

export default Checkbox;