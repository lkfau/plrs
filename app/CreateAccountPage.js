// CreateAccountPage.js
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';
import { stylesCreateaccount } from './Styles';

const CreateAccountPage = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async () => {
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      process.env.EXPO_PUBLIC_SEED + password
    );

    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/create_user`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        pwd: passwordHash
      })
    });

    console.log(await response.json());
  }

  return (
    <View style={stylesCreateaccount.container}>
      <Text style={stylesCreateaccount.title}>Create Account</Text>

      <View style={stylesCreateaccount.inputContainer}>
        <TextInput
          style={stylesCreateaccount.input}
          placeholder="Email"
          value={email}
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={stylesCreateaccount.inputContainer}>
        <TextInput style={stylesCreateaccount.input} placeholder="Password" secureTextEntry={true} />
      </View>

      <View style={stylesCreateaccount.inputContainer}>
        <TextInput style={stylesCreateaccount.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={password}
          onChangeText={pwd => setPassword(pwd)} />
      </View>

      <TouchableOpacity style={stylesCreateaccount.button} onPress={createAccount}>
        <Text style={stylesCreateaccount.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

export default CreateAccountPage;