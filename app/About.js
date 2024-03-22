import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import {stylesAbout} from './Styles'; // Import the stylesheet


const About = () => {
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator='False'>
        <View>
          <LinearGradient
            colors={['#ae3b54', '#284b85']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text style={stylesAbout.title}>Mission statement</Text>
          <Text style={stylesAbout.m_paragraph}>
            University parking is challenging for students, guests and faculty. So we designed this 
            System in order to automatically recommend parking lots based on lot availability and distance 
            to the desired destination. 
          </Text>
        </View>
        <View>
          <Text style={stylesAbout.b_paragraph}>Meet the team</Text>
          <View style={stylesAbout.teamMember}>
            <Image style={stylesAbout.img} source={require('./assets/userPlaceholder.png')} />
            <Text style={stylesAbout.paragraph}>About you and contact information</Text>
          </View>
          <View style={[stylesAbout.teamMember, stylesAbout.reverse]}>
            <Text style={stylesAbout.paragraph}>About you and contact information</Text>
            <Image style={stylesAbout.img} source={require('./assets/userPlaceholder.png')} />
          </View>
          <View style={stylesAbout.teamMember}>
            <Image style={stylesAbout.img} source={require('./assets/userPlaceholder.png')} />
            <Text style={stylesAbout.paragraph}>About you and contact information</Text>
          </View>
          <View style={[stylesAbout.teamMember, stylesAbout.reverse]}>
            <Text style={stylesAbout.paragraph}>About you and contact information</Text>
            <Image style={stylesAbout.img} source={require('./assets/userPlaceholder.png')} />
          </View>
          <View style={stylesAbout.teamMember}>
            <Image style={stylesAbout.img} source={require('./assets/headshotRomeo.jpg')} />
            <Text style={stylesAbout.paragraph}>About you and contact information</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


export default About;
