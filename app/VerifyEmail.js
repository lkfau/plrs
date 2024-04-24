import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DataContext from "./context/data-context";
import PageContainer from "./UI/PageContainer";
import { pageHeader, paragraph, textInput, button, buttonDelete, stylesLogin} from './Styles';

const VerifyEmail = () => {
  const ctx = useContext(DataContext);
  const [authCode, setAuthCode] = useState('');
  const [isCodeFocused, setIsCodeFocused] = useState(false); // State to track email input focus
  const [invalidMessage, setInvalidMessage] = useState(null);
  const handleIsCodeFocus = () => setIsCodeFocused(true);
  const handleIsCodeFocusBlur = () => setIsCodeFocused(false);

  const verifyEmail = async() => {
    setInvalidMessage(null);
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
      setInvalidMessage('The authorization code is incorrect or expired.')
    }
  }

  return (
    <PageContainer gradient={true} style={{paddingTop: 108.5, flexDirection: 'column', justifyContent: 'center'}}>
      {/* <Text style={[pageHeader, {textAlign: 'center'}]}>Verify email</Text>  */}
        <View style={{backgroundColor: '#fff', flexDirection: 'column', borderRadius:10, padding: 20, margin: 20, justifyContent:'center'}}>
        <Text style={[pageHeader, {textAlign: 'center', color:'black', marginBottom:8}]}>Verify email</Text> 
          <View style={{flexDirection:'column', alignItems:'center', gap: 10}}>
            <Text style={paragraph}>An email was sent to</Text>
            <Text style={[paragraph, {fontSize: 16, color: '#555'}]}>{ctx.verifyingEmail}</Text>
            <Text style={[paragraph, {textAlign: 'center'}]}>Please enter the authorization code from the email message below.</Text>
            <TextInput 
              value={authCode} 
              maxLength={7} 
              onChangeText={setAuthCode} 
              placeholder="Enter code" 
              style={[
                stylesLogin.inputPass,
                isCodeFocused && stylesLogin.inputFocused // Apply focused style conditionall
              ]}
              onFocus={handleIsCodeFocus}
              onBlur={handleIsCodeFocusBlur}
            />
            
            {invalidMessage !== null && (
              <Text style={{ maxWidth: 290, color: 'red', textAlign: 'center' }}>{invalidMessage}</Text>
            )}

            <TouchableOpacity 
              style={[button.containerOutline, {borderRadius:50, maxWidth:200}, authCode.length < 7 ? button.disabled : null]} 
              disabled={authCode.length < 7} 
              onPress={verifyEmail}
            >
              <Text style={button.title}>Verify Email</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
            <Text style={{color: 'black'}}>or </Text>
            <TouchableOpacity onPress={ctx.logOut}>
              <Text style={{textDecorationLine: 'underline', color: '#007bff'}}>cancel email verification</Text>
            </TouchableOpacity>
          </View>
      </View>
    </PageContainer>
  )
}

export default VerifyEmail;