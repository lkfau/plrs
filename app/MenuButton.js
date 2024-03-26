// MenuButton.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Animated, View, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { stylesMenubutton } from './Styles';

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
      <TouchableOpacity onPress={() => setModalVisible(true)} style={stylesMenubutton.button}>
      <Ionicons name={modalVisible ? 'close' : 'menu-outline'} size={32} />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={stylesMenubutton.close} onPress={() => setModalVisible(false)}></TouchableOpacity>
        <Animated.View style={[stylesMenubutton.modalContainer, { transform: [{ translateY }] }]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[stylesMenubutton.option, index < options.length-1 && stylesMenubutton.optionBorder]}
              onPress={() => handleOptionPress(option.screenName)}
            >
              <Text style={stylesMenubutton.optionText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Modal>
    </View>
  );
};

export default MenuButton;
