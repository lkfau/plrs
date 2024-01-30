// CustomHeader.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomHeader = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 20 }}>PLRS</Text>
    </TouchableOpacity>
  );
};

export default CustomHeader;
