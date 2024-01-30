import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Account Page</Text>      
    </View>
  );
}

export default Account;