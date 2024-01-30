// MenuButton.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuButton = ({ options }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleOptionPress = (screenName) => {
    setModalVisible(false);
    navigation.navigate(screenName);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleOptionPress(option.screenName)}
            >
              <Text>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  menuIcon: {
    fontSize: 24, // Increase the font size to make the icon larger
  },
  modalContainer: {
    marginTop: 60,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MenuButton;
