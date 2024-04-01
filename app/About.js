import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { pageHeader, paragraph, teamMember } from './Styles'; // Import the stylesheet
import PageContainer from './UI/PageContainer';
import { aboutPage } from './Styles';

const About = () => {
  return (
    <PageContainer gradient={true} style={{paddingTop: 108.5}}>
      <ScrollView 
        style={aboutPage.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={aboutPage.contentContainer}
      >
        <View>
          <Text style={aboutPage.header}>Mission statement</Text>
          <View style={aboutPage.textContainerStatement}>
            <Text style={aboutPage.paragraph}>
              University parking presents challenges for students, guests, and faculty. Hence, we developed a system to automatically suggest parking lots based on availability and proximity to your destination.
            </Text>
          </View>
        </View>

        <View>
          <Text style={aboutPage.header}>Meet the team</Text>
          <View style={aboutPage.teamMember}>
            <Image style={aboutPage.portrait} source={require('./assets/userPlaceholder.png')} />
            <View style={aboutPage.textContainer}>
              <Text style={aboutPage.paragraph}>About you and contact information</Text>
            </View>
          </View>
          <View style={aboutPage.teamMember}>
            <Image style={aboutPage.portrait} source={require('./assets/headshotRomeo.jpg')} />
            <View style={aboutPage.textContainer}>
              <Text style={aboutPage.paragraph}>About you and contact information</Text>
            </View> 
          </View>
          <View style={aboutPage.teamMember}>
            <Image style={aboutPage.portrait} source={require('./assets/headshotSadie.jpg')} />
            <View style={aboutPage.textContainer}>
              <Text style={aboutPage.paragraph}>Sadie is graduating in Spring 2024 with a B.S. in Computer with a minor in Mathematics, a B.A. in History, and a certificate in Data Science. </Text>
            </View> 
          </View>
          <View style={aboutPage.teamMember}>
            <Image style={aboutPage.portrait} source={require('./assets/userPlaceholder.png')} />
            <View style={aboutPage.textContainer}>
              <Text style={aboutPage.paragraph}>About you and contact information</Text>
            </View> 
          </View>
          <View style={aboutPage.teamMember}>
            <Image style={aboutPage.portrait} source={require('./assets/userPlaceholder.png')} />
            <View style={aboutPage.textContainer}>
              <Text style={aboutPage.paragraph}>About you and contact information</Text>
            </View>            
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
}

export default About;