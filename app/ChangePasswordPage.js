import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import DataContext from './context/data-context';
import { inputContLogin, stylesLogin } from './Styles';

const ChangePasswordPage = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const ctx = useContext(DataContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isOldPasswordFocused, setIsOldPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const handleOldPasswordFocus = () => setIsOldPasswordFocused(true);
  const handleOldPasswordFocusBlur = () => setIsOldPasswordFocused(false);

  const handleNewPasswordFocus = () => setIsNewPasswordFocused(true);
  const handleNewPasswordBlur = () => setIsNewPasswordFocused(false);

  const handleConfirmPasswordFocus = () => setIsConfirmPasswordFocused(true);
  const handleConfirmPasswordBlur = () => setIsConfirmPasswordFocused(false);

  const handlePressOutsideModal = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    // Add your submit logic here
    onClose(); // Close the modal after submitting
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={stylesLogin.overlay}
        activeOpacity={1}
        onPress={handlePressOutsideModal}
      >
        <View style={inputContLogin.container}>
          <TextInput
            style={[
              stylesLogin.inputPass,
              isOldPasswordFocused && stylesLogin.inputFocused,
            ]}
            placeholder="Old Password"
            value={oldPassword}
            onFocus={handleOldPasswordFocus}
            onBlur={handleOldPasswordFocusBlur}
          />
          <TextInput
            style={[
              stylesLogin.inputPass,
              isNewPasswordFocused && stylesLogin.inputFocused,
            ]}
            placeholder="New Password"
            secureTextEntry={true}
            value={newPassword}
            onFocus={handleNewPasswordFocus}
            onBlur={handleNewPasswordBlur}
          />
          <TextInput
            style={[
              stylesLogin.inputPass,
              isConfirmPasswordFocused && stylesLogin.inputFocused,
            ]}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(pwd) => setConfirmPassword(pwd)}
            onFocus={handleConfirmPasswordFocus}
            onBlur={handleConfirmPasswordBlur}
          />
          <TouchableOpacity style={stylesLogin.button} onPress={handleSubmit}>
            <Text style={stylesLogin.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChangePasswordPage;