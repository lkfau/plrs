import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { inputContLogin, stylesLogin } from './Styles';
import DataContext from './context/data-context';
import PageContainer from './UI/PageContainer';

const LoginPage = () => {
  const navigation = useNavigation();
  const ctx = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false); // State to track email input focus
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // State to track password input focus

  const handleEmailFocus = () => setIsEmailFocused(true);
  const handleEmailBlur = () => setIsEmailFocused(false);
  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);

  const logIn = async () => {
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      process.env.EXPO_PUBLIC_SEED + password
    );

    const response = await fetch (`${process.env.EXPO_PUBLIC_SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        pwd: passwordHash
      })
    });
    
    console.log(response.status);
    if (response.status === 200) {
      if (ctx.logIn(await response.json())) navigation.navigate('Home')
    }
  }

  return (
    <PageContainer gradient={true}>
      <View style={inputContLogin.container}>
        <TextInput
          style={[
            stylesLogin.inputPass,
            isEmailFocused && stylesLogin.inputFocused, // Apply focused style conditionally
          ]}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
        />
        <TextInput
          style={[
            stylesLogin.inputPass,
            isPasswordFocused && stylesLogin.inputFocused, // Apply focused style conditionally
          ]}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(pwd) => setPassword(pwd)}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
        />
        <TouchableOpacity style={stylesLogin.button} onPress={logIn}>
          <Text style={stylesLogin.buttonText}>Sign On</Text>
        </TouchableOpacity>
        <View style={{flex: 1, marginTop: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'center'}}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Create Account')}>
            <Text style={{marginLeft: 5, color: '#007bff', textDecorationLine: 'underline'} }>Create an account.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageContainer>
  );
};

export default LoginPage;
