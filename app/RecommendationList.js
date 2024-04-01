import { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Recommendation from './Recommendation';
import { stylesRecommendation, button } from './Styles';
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
    <SafeAreaView style={stylesRecommendation.arrowContainer}>
      {recommendations &&
        <>
          <View>
            <TouchableOpacity 
              style={currentPage === 0 ? stylesRecommendation.transparent : {}} 
              disabled={currentPage === 0} 
              onPress={() => setCurrentPage(p => p-1)}
            >
              <Ionicons name={'arrow-back'} size={30} />
            </TouchableOpacity>
          </View>
          <View style={stylesRecommendation.recommendationContent}>
            {currentPage < recommendations.length ? (
              <Recommendation recommendation={recommendations[currentPage]} />
            ) : (
              <>
                <Text style={stylesRecommendation.lotText}>Sorry, out of recommendations.</Text>
                <TouchableOpacity style={button.containerOutline} onPress={() => setCurrentPage(0)}>
                  <Text style={button.title}>Back to Beginning</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button.containerOutline} onPress={getNewRecommendationHandler}>
                  <Text style={button.title}>Start Over</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View>
            <TouchableOpacity 
             style={currentPage >= recommendations.length ? stylesRecommendation.transparent : {}} 
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

export default RecommendationList;