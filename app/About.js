import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  paragraph: {
    paddingLeft: 50,
  },
  title: {
    textAlign: 'center',
    paddingTop: 50,
    fontSize: 25,
  },
  container: {
    paddingTop: 25,
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
});


const About = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.title}>About Page</Text>
      <Text style = {styles.container}>Mission statement. Why we created this app, what we hope to accomplish, and possible improvements</Text>
      <View style ={styles.container}>   
      <Text style = {styles.paragraph}><Image 
      style={styles.stretch}
      source={require('./assets/userPlaceholder.png')} />About you and contact information</Text>
      <Text style = {styles.paragraph}><Image 
      style={styles.stretch}
      source={require('./assets/userPlaceholder.png')} />About you and contact information</Text>
      <Text style = {styles.paragraph}><Image 
      style={styles.stretch}
      source={require('./assets/userPlaceholder.png')} />About you and contact information</Text>
      <Text style = {styles.paragraph}><Image 
      style={styles.stretch}
      source={require('./assets/userPlaceholder.png')} />About you and contact information</Text>
      <Text style = {styles.paragraph}><Image 
      style={styles.stretch}
      source={require('./assets/userPlaceholder.png')} />About you and contact information</Text>
      </View>
    </View>
  );
}

export default About;