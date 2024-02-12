// MenuButton.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Animated, View, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const MenuButton = ({ options }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleOptionPress = (screenName) => {
    setModalVisible(false);
    navigation.navigate(screenName);
  };

  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: modalVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, -50],
  });

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
      <Ionicons name={modalVisible ? 'close' : 'menu-outline'} size={32} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.close} onPress={() => setModalVisible(false)}></TouchableOpacity>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, index < options.length-1 && styles.optionBorder]}
              onPress={() => handleOptionPress(option.screenName)}
            >
              <Text style={styles.optionText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  modalContainer: {
    marginTop: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 5,
  },
  option: {
    padding: 10,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 20
  },
  close: {
    width: 40,
    marginLeft: 'auto',
    height: 60,
    elevation: 100
  }
});

export default MenuButton;
