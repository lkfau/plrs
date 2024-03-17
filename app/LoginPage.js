// LoginPage.js
import { useState } from 'react';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';

const LoginPage = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async () => {
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      process.env.EXPO_PUBLIC_SEED + password
    );

    const response = await fetch (`${process.env.EXPO_PUBLIC_SERVER_IP}/login`, {
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
    console.log(await response.json());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={email => setEmail(email)} 
      />
      <TextInput 
        style={styles.input}
        placeholder="Password" 
        secureTextEntry={true} 
        value={password} 
        onChangeText={pwd => setPassword(pwd)}  />
      <TouchableOpacity style={styles.button} onPress={logIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 200,
    color: 'black'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginPage;