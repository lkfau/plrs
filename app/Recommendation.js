import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Recommendation = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Recommendation Page</Text>      
    </View>
  );
}

export default Recommendation;