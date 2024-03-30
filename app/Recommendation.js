import { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FeedbackModal from './FeedbackModal';
import { stylesRecommendation } from './Styles';

const initialRegion = {
  latitude: 26.371449,
  longitude: -80.102117,
  latitudeDelta: 0.024,
  longitudeDelta: 0.024
};

const fullnessOptions = [
  { text: 'Vacant', color: 'green', threshold: 0.25},
  { text: 'Most likely vacant', color: 'gold', threshold: 0.5},
  { text: 'Most likely full', color: 'orange', threshold: 0.75},
  { text: 'Full', color: 'red', threshold: 1},
];

const Recommendation = ({ recommendation }) => {


  const [showModal, setShowModal] = useState(false);

  const destination = useMemo(() => ({
    latitude: parseFloat(recommendation.latitude),
    longitude: parseFloat(recommendation.longitude),
    latitudeDelta: 0.024,
    longitudeDelta: 0.024
  }), [recommendation.latitude, recommendation.longitude]);

  const openMapHandler = () => {
    // Open Apple Maps with directions from current location to the destination
    let destinationURL = null;
    if (Platform.OS == 'ios') {
      destinationURL = `http://maps.apple.com/?daddr=${destination.latitude},${destination.longitude}`;
    } else if (Platform.OS === 'android') {
      destinationURL = `https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`;
    }
    if (destinationURL) Linking.openURL(destinationURL);
  };
  console.log(recommendation)
  const fullnessOption = useMemo(() => fullnessOptions.find(option => recommendation.fullness < option.threshold), [recommendation.fullness]);

  return (
    <>
      <View style={stylesRecommendation.recommendationContent}>
        <Text style={stylesRecommendation.lotText}>{recommendation.lot_name}</Text>
        <View style={stylesRecommendation.mapContainer}>
          <MapView style={{ flex: 1 }} initialRegion={initialRegion}>      
            <Marker coordinate={destination} title={recommendation.lot_name} />        
          </MapView>
        </View>
        <Text style={[stylesRecommendation.statusText, {color: fullnessOption.color}]}>{fullnessOption.text}</Text>
        <TouchableOpacity style={stylesRecommendation.button} onPress={openMapHandler}>
          <Text style={stylesRecommendation.buttonText}>Get Directions</Text>
        </TouchableOpacity>    
        <TouchableOpacity style={stylesRecommendation.button} onPress={() => setShowModal(true)}>
          <Text style={stylesRecommendation.iparkedButton}>I Parked</Text>
        </TouchableOpacity>    
      </View>
      <FeedbackModal lot_id={recommendation.lot_id} visible={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default Recommendation;