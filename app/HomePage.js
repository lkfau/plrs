// HomePage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const pageOptions = ['Account', 'Schedules', 'Recommendation', 'About']

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.header}>Parking Lot Recommendation System</Text>
      </TouchableOpacity>
      {pageOptions.map(option => <TouchableOpacity key={option }style={styles.button} onPress={() => navigation.navigate(option)}>
        <Text style={styles.buttonText}>{option}</Text>
      </TouchableOpacity>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
    marginTop: -100,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 250,
   
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomePage;
