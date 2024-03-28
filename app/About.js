import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { pageHeader, paragraph, teamMember } from './Styles'; // Import the stylesheet
import PageContainer from './UI/PageContainer';

const About = () => {

  return (
    <PageContainer gradient={true} style={{paddingTop: 108.5}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: 20, gap: 30}}>
        <View>
          <Text style={styles.header}>Mission statement</Text>
          <Text style={styles.paragraph}>
            University parking is challenging for students, guests and faculty. So we designed this 
            System in order to automatically recommend parking lots based on lot availability and distance 
            to the desired destination. 
          </Text>
        </View>
        <View>
          <Text style={styles.header}>Meet the team</Text>
          <View style={styles.teamMember}>
            <Image style={styles.portrait} source={require('./assets/userPlaceholder.png')} />
            <Text style={styles.paragraph}>About you and contact information</Text>
          </View>
          <View style={styles.teamMember}>
            <Image style={styles.portrait} source={require('./assets/headshotRomeo.jpg')} />
            <Text style={styles.paragraph}>About you and contact information</Text>  
          </View>
          <View style={styles.teamMember}>
            <Image style={styles.portrait} source={require('./assets/headshotSadie.jpg')} />
            <Text style={styles.paragraph}>About you and contact information</Text>
          </View>
          <View style={styles.teamMember}>
            <Image style={styles.portrait} source={require('./assets/userPlaceholder.png')} />
            <Text style={styles.paragraph}>About you and contact information</Text>
          </View>
          <View style={styles.teamMember}>
            <Image style={styles.portrait} source={require('./assets/userPlaceholder.png')} />
            <Text style={styles.paragraph}>About you and contact information</Text>
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  header: pageHeader,
  paragraph: {...paragraph, color: '#fff'},
  teamMember: teamMember.container,
  portrait: teamMember.portrait,
})


export default About;
