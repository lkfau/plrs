import { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Recommendation from './Recommendation';

const RecommendationList = ({ schedule_id, building_id }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [recommendations, setRecommendations] = useState(null);

  const navigation = useNavigation();

  const fetchRecommendations = async () => {
    let recommendURL = process.env.EXPO_PUBLIC_SERVER_URL + '/recommend'
    if (schedule_id) {
      recommendURL += '?schedule_id=' + schedule_id;
    } else if (building_id) {
      recommendURL += '?building_id=' + building_id;
    }
    const response = await fetch(recommendURL);
    let recommendation_results = await response.json();
    setRecommendations(recommendation_results);
  }

  const getNewRecommendationHandler = () => {
    navigation.navigate('GetRecommendation')
  };

  useEffect(() => {
    if (schedule_id || building_id) fetchRecommendations();
  }, [schedule_id, building_id])

  return (
    <SafeAreaView style={styles.container}>
      {recommendations &&
        <>
          <View>
            <TouchableOpacity 
              style={currentPage === 0 ? styles.transparent : {}} 
              disabled={currentPage === 0} 
              onPress={() => setCurrentPage(p => p-1)}
            >
              <Ionicons name={'arrow-back'} size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.recommendationContent}>
            {currentPage < recommendations.length ? (
              <Recommendation recommendation={recommendations[currentPage]} />
            ) : (
              <>
                <Text style={styles.title}>Sorry, out of recommendations.</Text>
                <TouchableOpacity style={styles.buttonLink} onPress={() => setCurrentPage(0)}>
                  <Text style={styles.buttonLinkText}>Return to first recommendation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLink} onPress={getNewRecommendationHandler}>
                  <Text style={styles.buttonLinkText}>Get new recommendations</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View>
            <TouchableOpacity 
             style={currentPage >= recommendations.length ? styles.transparent : {}} 
             disabled={currentPage >= recommendations.length} 
              onPress={() => setCurrentPage(p => p+1)}
            >
              <Ionicons name={'arrow-forward'} size={30} />
            </TouchableOpacity>
          </View>         
        </>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  transparent: {
    opacity: 0
  },
  buttonLink: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'transparent', // Remove background color
    alignSelf: 'center',
  },
  buttonLinkText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  recommendationContent: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: 'transparent', // Remove background color
  },
  arrowText: {
    fontSize: 30,
  },
});

export default RecommendationList;
