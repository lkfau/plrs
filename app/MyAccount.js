import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { button, textInput, changeEmail, inputContLogin, stylesLogin } from './Styles'
import PageContainer from './UI/PageContainer';
import DataContext from './context/data-context';


const Account = () => {
  const ctx = useContext(DataContext);

  //Modals for both email and password
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  //const [oldEmail, setOldEmail] = useState(email)
  const [newEmail, setNewEmail] = useState('');
  const [isNewEmailFocused, setIsNewEmailFocused] = useState(false); // State to track email input focus

  const [oldEmail, setOldEmail] = useState('');
  const [isOldEmailFocused, setIsOldEmailFocused] = useState(false);

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

  const handleNewEmailFocus = () => setIsNewEmailFocused(true);
  const handleNewEmailBlur = () => setIsNewEmailFocused(false);

  const handleOldEmailFocus = () => setIsOldEmailFocused(true);
  const handleOldEmailBlur = () => setIsOldEmailFocused(false);


  const handleChangeEmail = () => {
    // Add your logic to handle email change here
    console.log('New Email:', newEmail);
    // Reset email field
    setNewEmail('');
    // Close modal
    setModalEmailVisible(false);
  };

  const handleChangePassword = () => {
    // Add your logic to handle email change here
    console.log('New Password:', newPassword);
    // Reset email field
    //setNewEmail('');
    // Close modal
    setModalPasswordVisible(false);
  };

  return (
    
    <PageContainer gradient={true}>
      <TouchableOpacity style={button.containerOutline} onPress={() => {setModalEmailVisible(true); getEmail();}}>
        <Text style={button.title}>Change Email</Text>
      </TouchableOpacity>
      <Modal
  animationType="fade"
  transparent={true}
  visible={modalEmailVisible}
  onRequestClose={() => setModalEmailVisible(false)}
>
  <TouchableOpacity
    style={changeEmail.overlay}
    activeOpacity={1}
    onPressOut={(event) => {
      if (event.target === event.currentTarget) {
        setModalEmailVisible(false);
      }
    }}
  >
    <View style={inputContLogin.container}>
    <Text style={{marginBottom:10, fontWeight:'bold'}}>Update email</Text>
      <TextInput
        style={[
          stylesLogin.inputPass,
          isNewEmailFocused && stylesLogin.inputFocused,
        ]}
        placeholder="New Email"
        placeholderTextColor="gray"
        value={newEmail}
        onChangeText={(email) => setNewEmail(email)}
        onFocus={handleNewEmailFocus}
        onBlur={handleNewEmailBlur}
      />
      <TouchableOpacity
        style={stylesLogin.button}
        onPress={() => {
          handleChangeEmail();
          setModalEmailVisible(false); // Close modal after submitting
        }}
      >
        <Text style={stylesLogin.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
</Modal>

      <TouchableOpacity style={button.containerOutline} onPress={() => setModalPasswordVisible(true)}>
        <Text style={button.title}>Change Password</Text>
      </TouchableOpacity>
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalPasswordVisible}
      onRequestClose={() => setModalPasswordVisible(false)}
    >
      <TouchableOpacity
        style={changeEmail.overlay}
        activeOpacity={1}
        onPressOut={(event) => {
          if (event.target === event.currentTarget) {
            setModalPasswordVisible(false);
          }
        }}
      >
        <View style={inputContLogin.container}>
        <Text style={{fontWeight:'bold',marginBottom:10}}>Update Password</Text>
          <TextInput
            style={[
              stylesLogin.inputPass,
              isOldPasswordFocused && stylesLogin.inputFocused,
            ]}
            placeholder="Old Password"
            placeholderTextColor="gray"
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
            placeholderTextColor="gray"
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
            placeholderTextColor="gray"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(pwd) => setConfirmPassword(pwd)}
            onFocus={handleConfirmPasswordFocus}
            onBlur={handleConfirmPasswordBlur}
          />
          <TouchableOpacity
            style={stylesLogin.button}
            onPress={() => {
              handleChangePassword();
              setModalPasswordVisible(false); // Close modal after submitting
            }}
          >
            <Text style={stylesLogin.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>

      <TouchableOpacity style={button.containerOutline} onPress={() => ctx.logOut()}>
        <Text style={button.title}>Log Out</Text>
      </TouchableOpacity>
    </PageContainer>
  );
};

export default Account;