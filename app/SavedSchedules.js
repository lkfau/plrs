import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Schedules = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Saved Schedules Page</Text>      
    </View>
  );
}

export default Schedules;