import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import PageContainer from './UI/PageContainer';
import { aboutPage } from './Styles'; // Import the stylesheet

const About = () => {
  // Array of image sources
  const teamMembers = [
    {
      image: require('./assets/headshot1.jpg'),
      description: 'Romeo Francois graduated in Spring 2024 with a B.S in Computer Science and a data science certification. He worked primarily on designing UI elements for this app.',
    },
    {
      image: require('./assets/headshot2.jpg'),
      description: 'Sadie Shank graduated in Spring 2024 with a B.S. in Computer Science and a B.A. in History. She has a passion for design through technology and was a main contributor to the design elements of this app.',
    },
    {
      image: require('./assets/headshot3.jpg'),
      description: 'Owen Levine graduated in Spring 2024 with a B.S. in Computer Science. He worked primarily on managing and setting up the server, creating and testing the algorithms, and account security for this app.',
    },
    {
      image: require('./assets/headshot4.jpg'),
      description: 'Description for team member 4',
    },
    {
      image: require('./assets/headshot5.jpg'),
      description: 'Description for team member 5',
    },
  ];

  return (
    <PageContainer gradient={true} style={{ paddingTop: 108.5 }}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator='false'>
          <View style={{ marginBottom: 20, marginTop: 20}}>
            <Text style={aboutPage.header}>Mission statement</Text>
            <View style={aboutPage.textContainerStatement}>
              <Text style={aboutPage.paragraph}>
                University parking presents challenges for students, guests, and faculty. Hence, we developed a system to remedy the situation and make parking a breeze.
              </Text>
            </View>
          </View>

          <View>
            <Text style={aboutPage.header}>Meet the team</Text>
            {teamMembers.map((member, index) => (
              <View style={aboutPage.teamMember} key={index}>
                <Image style={aboutPage.portrait} source={member.image} />
                <View style={aboutPage.textContainer}>
                  <Text style={aboutPage.memberText}>
                    {member.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </PageContainer>
  );
}

export default About;