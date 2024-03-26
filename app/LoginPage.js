// LoginPage.js
import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { stylesLogin } from './Styles';
import DataContext from './context/data-context';


const LoginPage = () => {
  const navigation = useNavigation();
  const ctx = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Login Page</Text>
      <TextInput 
        style={stylesLogin.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={email => setEmail(email)} 
      />
      <TextInput 
        style={stylesLogin.input}
        placeholder="Password" 
        secureTextEntry={true} 
        value={password} 
        onChangeText={pwd => setPassword(pwd)}  />
      <TouchableOpacity style={stylesLogin.button} onPress={logIn}>
        <Text style={stylesLogin.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}


export default LoginPage;