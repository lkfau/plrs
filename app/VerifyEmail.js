import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DataContext from "./context/data-context";
import PageContainer from "./UI/PageContainer";
import { pageHeader, paragraph, textInput, button, buttonDelete} from './Styles';

const VerifyEmail = () => {
  const ctx = useContext(DataContext);
  const [authCode, setAuthCode] = useState('');

  const verifyEmail = async() => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/verify_user_email`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + ctx.getSessionID()},
      body: JSON.stringify({
        auth_code: authCode
      })
    });

    console.log(response.status)
    if (response.status == 200) {
      ctx.logIn(ctx.getSessionID(), false);
    } else if (response.status == 401) {
      console.log('wrong auth code :(')
    }
  }
  return <PageContainer gradient={true} style={{justifyContent: 'begin', alignItems: 'begin', paddingTop: 108.5}}>
    <Text style={[pageHeader, {textAlign: 'left'}]}>Verify email</Text> 
    <Text style={[paragraph, {color: 'white'}]}>An email was sent to {ctx.verifyingEmail}. Please enter the authorization code from the email message below.</Text>

    <TextInput value={authCode} maxLength={7} onChangeText={setAuthCode} style={[textInput, {marginTop: 50}]}></TextInput>
    <TouchableOpacity 
      style={[button.containerOutline, authCode.length < 7 ? button.disabled : null]} 
      disabled={authCode.length < 7} 
      onPress={verifyEmail}
    >
      <Text style={button.title} >Verify Email</Text>
    </TouchableOpacity>
    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
      <Text style={{color: 'white'}}>or </Text>
      <TouchableOpacity onPress={ctx.logOut}>
        <Text style={{textDecorationLine: 'underline', color: '#007bff'}}>cancel email verification</Text>
      </TouchableOpacity>
    </View>
  </PageContainer>
}

export default VerifyEmail;