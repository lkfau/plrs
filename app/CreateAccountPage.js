import { useCallback, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DataContext from './context/data-context';
import * as Crypto from 'expo-crypto';
import { inputContCreate, stylesCreateaccount, inputCreate, btn } from './Styles';
import PageContainer from './UI/PageContainer';

const CreateAccountPage = () => {
  const ctx = useContext(DataContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const [invalidMessage, setInvalidMessage] = useState(null);
  const handleEmailFocus = () => setIsEmailFocused(true);
  const handleEmailBlur = () => setIsEmailFocused(false);
  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);
  const handleConfirmPasswordFocus = () => setIsConfirmPasswordFocused(true);
  const handleConfirmPasswordBlur = () => setIsConfirmPasswordFocused(false);

  
  const createAccount = async () => {
    setInvalidMessage(null);
    if (!email || email.length < 2) {
      setInvalidMessage('Email is invalid.');
      return;
    }

    if (password.length < 3) {
      setInvalidMessage('Password is invalid.');
      return;
    }

    if (password !== confirmPassword) {
      setInvalidMessage('Passwords do not match.');
      return;
    }

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

    if (response.status === 200) {
      const data = await response.json();
      if (data.session_id && data.email_sent)
        ctx.logIn(data.session_id, email)
      else 
        console.log('create account fail :(')
    } else if (response.status == 400) {
      setInvalidMessage('Email or password invalid. Ensure the email is a valid university email address.')
    } else if (response.status == 409) {
      setInvalidMessage('Account with that email already exists.');
    }
  }

useFocusEffect(useCallback(() => {
  setEmail('');
  setPassword('');
}, []));

return (
  <PageContainer gradient={true}>
    <View style={inputContCreate.container}>
      <TextInput 
        style={[
          stylesCreateaccount.inputPass, 
          isEmailFocused && stylesCreateaccount.inputFocused
        ]}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        onFocus={handleEmailFocus}
        onBlur={handleEmailBlur}
      />
      
      <TextInput 
        style={[
          stylesCreateaccount.inputPass, 
          isPasswordFocused && stylesCreateaccount.inputFocused
        ]}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={pwd => setPassword(pwd)}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
      />

      <TextInput
        style={[
          stylesCreateaccount.inputPass, 
          isConfirmPasswordFocused && stylesCreateaccount.inputFocused
        ]}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={pwd => setConfirmPassword(pwd)}
        onFocus={handleConfirmPasswordFocus}
        onBlur={handleConfirmPasswordBlur}
      />

      {invalidMessage !== null && (
        <Text style={{ maxWidth: 270, color: 'red', marginTop: 10 }}>{invalidMessage}</Text>
      )}
      
      <TouchableOpacity style={btn.button} onPress={createAccount}>
        <Text style={stylesCreateaccount.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{marginLeft: 5, color: '#007bff', textDecorationLine: 'underline'}}>Log in.</Text>
        </TouchableOpacity>
      </View>
    </View>
  </PageContainer>
);
}
export default CreateAccountPage;