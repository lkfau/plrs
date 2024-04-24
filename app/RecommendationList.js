import { useCallback, useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DataContext from './context/data-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Recommendation from './Recommendation';
import { stylesRecommendation, button } from './Styles';

const RecommendationList = ({ schedule_id, building_id, first_or_last_location }) => {
  const ctx = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [recommendations, setRecommendations] = useState(null);
  const [loginState, setLoginState] = useState(ctx.loggedIn)

  const navigation = useNavigation();

  const fetchRecommendations = async () => {
    let recommendURL = process.env.EXPO_PUBLIC_SERVER_URL + '/recommend'
    if (schedule_id !== null && first_or_last_location !== null) {
      recommendURL += `?schedule_id=${schedule_id}&first_or_last_location=${first_or_last_location ? 'last' : 'first'}`;
    } else if (building_id !== null) {
      recommendURL += `?building_id=${building_id}`;
    }
    const response = await fetch(recommendURL, {
      headers: ctx.loggedIn ? {Authorization: 'Bearer ' + ctx.getSessionID() } : {}
    });
    let recommendation_results = await response.json();
    setRecommendations(recommendation_results);
  }

  const submitFeedback = async (lotID, lotIsFull, fetchOrNavigate) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ctx.loggedIn ? 'Bearer ' + ctx.getSessionID() : null
      },
      body: JSON.stringify({
        lot_id: lotID,
        lot_is_full: lotIsFull
      }),
    });
    if (response.status == 200) {
      if (fetchOrNavigate) {
        navigation.navigate('GetRecommendation');
      } else {
        fetchRecommendations();
      }
      return true;
    }
    console.log('error saving feedback');
    return false;
  }

  useEffect(() => {
    if (schedule_id || building_id) fetchRecommendations();
  }, [schedule_id, building_id])

  useFocusEffect(useCallback(() => {
    if (loginState !== ctx.loggedIn) {
      navigation.navigate('GetRecommendation')
      setLoginState(ctx.loggedIn);
    }
  }, [ctx.loggedIn]))

  return (
    <SafeAreaView style={stylesRecommendation.arrowContainer}>
      {recommendations &&
        <>
          <TouchableOpacity 
            style={[{paddingVertical: 100} , currentPage === 0 ? stylesRecommendation.transparent : {}]} 
            disabled={currentPage === 0} 
            onPress={() => setCurrentPage(p => p-1)}
          >
            <Ionicons name={'arrow-back'} size={20} />
          </TouchableOpacity>    
          <View style={stylesRecommendation.recommendationContent}>
            {currentPage < recommendations.length ? (
              <Recommendation recommendation={recommendations[currentPage]} onFeedback={submitFeedback} />
            ) : (
              <>
                <Text style={stylesRecommendation.lotText}>Sorry, out of recommendations.</Text>
                <TouchableOpacity style={button.containerOutline} onPress={() => setCurrentPage(0)}>
                  <Text style={button.title}>Review recommendations</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button.containerOutline} onPress={() => navigation.navigate('GetRecommendation')}>
                  <Text style={button.title}>Get new recommendations</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View>
            <TouchableOpacity 
            style={[{paddingVertical: 100}, currentPage >= recommendations.length ? stylesRecommendation.transparent : {}]} 
            disabled={currentPage >= recommendations.length} 
              onPress={() => setCurrentPage(p => p+1)}
            >
              <Ionicons name={'arrow-forward'} size={20} />
            </TouchableOpacity>
          </View>         
        </>}
    </SafeAreaView>
  );
}

export default RecommendationList;