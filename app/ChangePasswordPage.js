import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { button, inputContLogin, stylesLogin } from './Styles';
import DataContext from './context/data-context';
import PageContainer from './UI/PageContainer';

const ChangePasswordPage = () => {
  const navigation = useNavigation();
  const ctx = useContext(DataContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isOldPasswordFocused, setIsOldPasswordFocused] = useState(false); // State to track email input focus
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false); // State to track password input focus
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false); // State to track password input focus


  const handleOldPasswordFocus = () => setIsOldPasswordFocused(true);
  const handleOldPasswordFocusBlur = () => setIsOldPasswordFocused(false);

  const handleNewPasswordFocus = () => setIsNewPasswordFocused(true);
  const handleNewPasswordBlur = () => setIsNewPasswordFocused(false);

  const handleConfirmPasswordFocus = () => setIsConfirmPasswordFocused(true);
  const handleConfirmPasswordBlur = () => setIsConfirmPasswordFocused(false);

//   const EditAccount = async () => {
//     const passwordHash = await Crypto.digestStringAsync(
//       Crypto.CryptoDigestAlgorithm.SHA256,
//       process.env.EXPO_PUBLIC_SEED + password
//     );

//     const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/create_user`, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         pwd: passwordHash
//       })
//     });

//     console.log(await response.json());
//   }

  return (
    <PageContainer gradient={true}>
      <View style={inputContLogin.container}>
        <TextInput
          style={[
            stylesLogin.inputPass,
            isOldPasswordFocused && stylesLogin.inputFocused, // Apply focused style conditionally
          ]}
          placeholder="Old Password"
          value={oldPassword}
        //onChangeText={(pwd) => setEmail(pwd)}
          onFocus={handleOldPasswordFocus}
          onBlur={handleOldPasswordFocusBlur}
        />
        <TextInput
          style={[
            stylesLogin.inputPass,
            isNewPasswordFocused && stylesLogin.inputFocused, // Apply focused style conditionally
          ]}
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
         // onChangeText={(pwd) => setPassword(pwd)}
          onFocus={handleNewPasswordFocus}
          onBlur={handleNewPasswordBlur}
        />
       <TextInput
          style={[
            stylesLogin.inputPass,
            isConfirmPasswordFocused && stylesLogin.inputFocused, // Apply focused style conditionally
          ]}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(pwd) => setConfirmPassword(pwd)}
          onFocus={handleConfirmPasswordFocus}
          onBlur={handleConfirmPasswordBlur}
        />
        <TouchableOpacity style={stylesLogin.button}>
          <Text style={stylesLogin.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
};

export default ChangePasswordPage;
